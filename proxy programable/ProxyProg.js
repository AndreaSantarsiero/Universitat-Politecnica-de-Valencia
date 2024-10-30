const net = require('net');
const LOCAL_PORT = 8100;
const LOCAL_IP = '127.0.0.1';

remote_IP = '';
remote_Port = 0;



const server = net.createServer(function (clientSocket) {
	console.log('Client connesso');
	clientSocket.on('data', function (data) {
	    try {
	        const message = JSON.parse(data.toString());
		    remote_IP = message.remote_IP
		    remote_Port = parseInt(message.remote_Port)
		    console.log('richiesta di connessione al server ' + remote_IP + ':' + remote_Port)
		    process.stdout.write('messaggio ricevuto dal client: ' + message.clientHola);
		    serverConnect(clientSocket, message.clientHola)
		} catch (error) {
            console.error('Errore nel parsing del messaggio:', error);
        }
	});


	clientSocket.on('end', function() {
		console.log('client disconnected');
	});


}).listen(LOCAL_PORT, LOCAL_IP);
console.log("TCP server accepting connection on port: " +
LOCAL_PORT);


function serverConnect(clientSocket, msg){
    //creazione socket del server basato sui dati inviati dal client
	const serviceSocket = new net.Socket();
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