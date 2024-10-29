const net = require('net');
const serverName = 'Paulo';

const server = net.createServer( function(c) { //connection listener
	console.log('server: client connected');
 	c.on('end', function() {
		console.log('server: client disconnected');
 	});
 
 	c.on('data', function(data) {
 		const msg = data.toString();
 		let msgcopy = msg.split(" ");
 		var clientName = msgcopy[2];
 		clientName = clientName.replace('.', '');
 		
 		
 		process.stdout.write('- client message received: ' + msg);
 		console.log('- client name: ' + clientName);
		c.write('Hola ' + clientName + ', soy ' + serverName + '\r\n'); // send resp
 		c.end(); // close socket
 	});
});

server.listen(8000, function() { //listening listener
	console.log('server bound');
});
