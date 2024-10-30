const net = require('net');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let remote_IP = '';
let remote_Port = 0;


const programador = net.connect({ port: 8101 }, function() {
    console.log('Programador connected to proxy');
    askForRemoteSocket();
});

function askForRemoteSocket() {
    rl.question('- remote_IP: ', (ipAnswer) => {
        remote_IP = ipAnswer;
        rl.question('- remote_Port: ', (portAnswer) => {
            remote_Port = parseInt(portAnswer, 10);
            sendConnectionRequest();
        });
    });
}

function sendConnectionRequest() {
    const msg = JSON.stringify({remote_IP, remote_Port});
    programador.write(msg);
    console.log('Richiesta modifica socket remoto a ' + remote_IP + ':' + remote_Port + ' inviata');
}

programador.on('data', function(data) {
    process.stdout.write('Messaggio ricevuto dal proxy: ' + data.toString());
    programador.end();
});

programador.on('end', function() {
    console.log('Client disconnesso');
    rl.close();
});

programador.on('error', function(err) {
    console.log('Impossibile connettersi al proxy richiesto: ' + err);
    rl.close();
});

