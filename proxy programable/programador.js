const net = require('net');
const clientName = 'Andrea';

const client = net.connect({port:8100}, function() { //connect listener
	console.log('client connected');
	client.write('Hola, soy ' + clientName + '. Tengo que conectarme a remote_IP 127.0.0.1 remote_Port 8000\r\n');
});

client.on('data', function(data) {
 	process.stdout.write('server message received: ' + data.toString());
 	client.end(); //no more data written to the stream
});

client.on('end', function() {
	console.log('client disconnected');
});

client.on('error', function (err) {
	console.log('Impossibile connettersi al proxy richiesto (' + err + ')');
});
