const {zmq, lineaOrdenes, traza, error, adios, creaPuntoConexion} = require('../tsr')
lineaOrdenes("frontendPort backendPort")
let workers  =[] // workers disponibles
let workersStatistics =[]
let pendiente=[] // peticiones no enviadas a ningun worker
let frontend = zmq.socket('router')
let backend  = zmq.socket('router')
let totaleRisposte = 0;
creaPuntoConexion(frontend, frontendPort)
creaPuntoConexion(backend,  backendPort)


function procesaPeticion(cliente,sep,msg) { // llega peticion desde cliente
	traza('procesaPeticion','cliente sep msg',[cliente,sep,msg])
	if (workers.length) {
	    backend.send([workers.shift(),'',cliente,'',msg])
	}
	else pendiente.push([cliente,msg])
}


function procesaMsgWorker(worker,sep1,cliente,sep2,resp) {
	traza('procesaMsgWorker','worker sep1 cliente sep2 resp',[worker,sep1,cliente,sep2,resp])
	
	let workerStatistics = workersStatistics.find(w => w.id === worker.toString());
    if (workerStatistics) {
        workerStatistics.counter++; //se non è la prima risposta, incremento il contatore
        totaleRisposte++;
    }
    else{
        workersStatistics.push({ id: worker.toString(), counter: 0}); //se è la prima risposta, aggiungo il worker alle statistiche
    }
    
	if (pendiente.length) { // hay trabajos pendientes. Le pasamos el mas antiguo al worker
		let [c,m] = pendiente.shift()
		backend.send([worker,'',c,'',m])
	}
	else workers.push(worker); // añadimos al worker como disponible
	if (cliente) frontend.send([cliente,'',resp]) // habia un cliente esperando esa respuesta
}


function printStatistics(){
    console.log('# statistics')
    console.log('# totale richieste gestite: ' + totaleRisposte)
    workersStatistics.forEach(workerStatistics => {
        console.log(`# Worker ${workerStatistics.id}: ${workerStatistics.counter} richieste gestite`);
    });
}

setInterval(printStatistics, 5000);
frontend.on('message', procesaPeticion)
frontend.on('error'  , (msg) => {error(`${msg}`)})
 backend.on('message', procesaMsgWorker)
 backend.on('error'  , (msg) => {error(`${msg}`)})
 process.on('SIGINT' , adios([frontend, backend],"abortado con CTRL-C"))
