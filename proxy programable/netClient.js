const net = require('net');
const clientHola = 'Hola, soy Andrea\r\n';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let remote_IP = '';
let remote_Port = 0;


const client = net.connect({ port: 8100 }, function() {
    console.log('Client connected to proxy');
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
    const msg = JSON.stringify({remote_IP, remote_Port, clientHola});
    client.write(msg);
    console.log('Richiesta di connessione a ' + remote_IP + ':' + remote_Port + ' inviata');
}

function createNewLoad(){
    setInterval(() => { client.write(clientHola);}, 1000)
}

client.on('data', function(data) {
    process.stdout.write('Messaggio ricevuto dal server: ' + data.toString() + '\n');
    createNewLoad();    //da qui in avanti il client inizia a inviare un messaggio al secondo
});


client.on('end', function() {
    console.log('Client disconnesso');
    rl.close();
});

client.on('error', function(err) {
    console.log('Impossibile connettersi al proxy richiesto: ' + err);
    rl.close();
});

