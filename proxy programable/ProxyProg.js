const net = require('net');
const LOCAL_PORT = 8100;
const LOCAL_IP = '127.0.0.1';

remote_IP = '';
remote_Port = 0;



const server = net.createServer(function (clientSocket) {

	console.log('Client connesso');

	clientSocket.on('data', function (msg) {
		console.log ('messaggio ricevuto dal client: ' + msg.toString());
		var buffer = msg.toString().replace('\r\n', '').split(' ');
		for (let i in buffer){
			if(buffer[i] === 'remote_IP'){
				i++;
				remote_IP = buffer[i]
				console.log('- remote_IP: ' + remote_IP);
			}
			if(buffer[i] === 'remote_Port'){
				i++;
				remote_Port = parseInt(buffer[i]);
				console.log('- remote_Port: ' + remote_Port);
			}
		}
		
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
	});


	clientSocket.on('end', function() {
		console.log('client disconnected');
	});


}).listen(LOCAL_PORT, LOCAL_IP);
console.log("TCP server accepting connection on port: " +
LOCAL_PORT);
