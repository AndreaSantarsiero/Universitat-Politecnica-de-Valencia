const {zmq, lineaOrdenes, error, adios, creaPuntoConexion} = require('../tsr')
lineaOrdenes("portDifusion portEntrada")

let entrada = zmq.socket('pull')
let salida  = zmq.socket('pub')
let contatoreClient = 0;
creaPuntoConexion(salida, portDifusion)
creaPuntoConexion(entrada,portEntrada)

entrada.on('message', (id,txt) => {
	switch (txt.toString()) {
		case 'CLIENT-STARTED-CONNECTION':
		    salida.send(['server', id+' connected']);
		    console.log(id+' connected');
		    contatoreClient++;
		    break
		case 'CLIENT-ENDED-CONNECTION':
		    salida.send(['server', id+' disconnected']);
		    console.log(id+' disconnected');
		    contatoreClient--;
		    break
		default:
		    if(contatoreClient > 1){
		        salida.send([id,txt]);
		    }
		    else{
		        salida.send(['server', 'Warning: nobody is connected now']);
		    }
		    
	}
})

salida.on('error', (msg) => {error(`${msg}`)})
process.on('SIGINT', adios([entrada,salida],"abortado con CTRL-C"))
