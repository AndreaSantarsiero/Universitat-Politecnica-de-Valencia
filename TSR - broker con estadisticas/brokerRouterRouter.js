const {zmq, lineaOrdenes, traza, error, adios, creaPuntoConexion} = require('../tsr')
lineaOrdenes("frontendPort backendPort")
let workers  = [] // workers disponibles
let pendiente = [] // peticiones no enviadas a ningun worker
let statistics = {}
let frontend = zmq.socket('router')
let backend  = zmq.socket('router')
let totaleRisposte = 0;
creaPuntoConexion(frontend, frontendPort)
creaPuntoConexion(backend,  backendPort)


function procesaPeticion(cliente, sep, msg){
	traza('procesaPeticion', 'cliente sep msg', [cliente, sep, msg])
	if(workers.length){
	    backend.send([workers.shift(), '', cliente, '', msg])
	}
	else pendiente.push([cliente, msg])
}


function procesaMsgWorker(worker, sep1, cliente, sep2, resp){
	traza('procesaMsgWorker', 'worker sep1 cliente sep2 resp', [worker, sep1, cliente, sep2, resp])
	
    //il worker si è appena connesso
    if (cliente == ''){
        statistics[worker] = 0
        workers.push(worker)
        return
    }

    //il worker sta rispondendo a petizioni
    statistics[worker]++
    totaleRisposte++
    
	if (pendiente.length) { // hay trabajos pendientes. Le pasamos el mas antiguo al worker
		let [c, m] = pendiente.shift()
		backend.send([worker, '', c, '', m])
	}
	else workers.push(worker) // añadimos al worker como disponible
	if (cliente) frontend.send([cliente, '', resp]) // habia un cliente esperando esa respuesta
}


function printStatistics(){
    console.log('# statistics')
    console.log('# totale richieste gestite: ' + totaleRisposte)
    workers.forEach(worker => {
        console.log(`# Worker ${worker}: ${statistics[worker]} richieste gestite`)
    })
}

setInterval(printStatistics, 5000);
frontend.on('message', procesaPeticion)
backend.on('message', procesaMsgWorker)
frontend.on('error', (msg) => {error(`${msg}`)})
backend.on('error', (msg) => {error(`${msg}`)})
process.on('SIGINT', adios([frontend, backend],"abortado con CTRL-C"))