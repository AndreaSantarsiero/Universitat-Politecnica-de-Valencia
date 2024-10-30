const net = require('net');
const CLIENT_PORT = 8100;
const PROGRAMADOR_PORT = 8101;
const LOCAL_IP = '127.0.0.1';
var serviceSocket;
var clientSocket;



const clientServer = net.createServer(function (cSocket) {
    clientSocket=cSocket
	console.log('Client connesso');
	clientSocket.on('data', function (data) {
	    try {
	        const message = JSON.parse(data.toString());
		    let remote_IP = message.remote_IP
		    let remote_Port = parseInt(message.remote_Port)
		    console.log('richiesta di connessione al server ' + remote_IP + ':' + remote_Port)
		    process.stdout.write('messaggio ricevuto dal client: ' + message.clientHola);
		    serverConnect(clientSocket, remote_Port, remote_IP, message.clientHola)
		} catch (error) {
            console.error('Errore nel parsing del messaggio:', error);
        }
	});


	clientSocket.on('end', function() {
		console.log('client disconnected');
	});


}).listen(CLIENT_PORT, LOCAL_IP);
console.log("TCP server accepting client connection on port: " + CLIENT_PORT);



const programadorServer = net.createServer(function (programadorSocket) {
	console.log('Programador connesso');
	programadorSocket.on('data', function (data) {
	    try {
	        const message = JSON.parse(data.toString());
		    let remote_IP = message.remote_IP
		    let remote_Port = parseInt(message.remote_Port)
		    console.log('richiesta di modifica connessione al server ' + remote_IP + ':' + remote_Port)
		    serverModify(remote_Port, remote_IP)
		} catch (error) {
            console.error('Errore nel parsing del messaggio:', error);
        }
	});


	programadorSocket.on('end', function() {
		console.log('programador disconnected');
	});


}).listen(PROGRAMADOR_PORT, LOCAL_IP);
console.log("TCP server accepting programador connection on port: " + PROGRAMADOR_PORT);



function serverConnect(remote_Port, remote_IP, msg){
    //creazione socket del server basato sui dati inviati dal client
	serviceSocket = new net.Socket();
	serviceSocket.connect(remote_Port, remote_IP, () => {
		serviceSocket.write(msg);
	});

	serviceSocket.on('data', function (data) {
		process.stdout.write('messaggio ricevuto dal server: ' + data);
		clientSocket.write(data);
	});

	serviceSocket.on('error', function (err) {
		console.log('Impossibile connettersi al server richiesto (' + err + ')');
		clientSocket.write('Impossibile connettersi al server richiesto (' + err + ')\r\n');
	});
}


function serverModify(remote_Port, remote_IP){
    //modifica socket basata sui parametri inviati dal programador
	if (serviceSocket) {
        serviceSocket.end(); // chiude il socket precedente
    }
    
    serviceSocket = new net.Socket();
	serviceSocket.connect(remote_Port, remote_IP, () => {
		clientSocket.write('La connessione è ora impostata a ' + remote_IP + ':' + remote_Port)
	});

	serviceSocket.on('data', function (data) {
		process.stdout.write('messaggio ricevuto dal server: ' + data);
		clientSocket.write(data);
	});

	serviceSocket.on('error', function (err) {
		console.log('Impossibile connettersi al server richiesto (' + err + ')');
		clientSocket.write('Impossibile connettersi al server richiesto (' + err + ')\r\n');
	});
}
