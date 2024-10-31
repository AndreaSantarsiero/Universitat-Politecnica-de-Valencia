const net = require('net');
const clientHola = 'Hola, soy Andrea\r\n';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let remote_IP = '';
let remote_Port = 0;
let intervalId;


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


client.on('data', function(data) {
    try {
        const response = JSON.parse(data.toString());
        let remote_IP = response.remote_IP
        let remote_Port = parseInt(response.remote_Port)
        console.log(response.message + remote_IP + ':' + remote_Port)
    } catch (error) {
        process.stdout.write('Messaggio ricevuto dal server: ' + data.toString() + '\n');
    }
    
    if (!intervalId) {    //avvio il timer solo se non è già attivo
        intervalId = setInterval(() => {client.write(clientHola);}, 2500);
    }
});



client.on('end', function() {
    console.log('Client disconnesso');
    clearInterval(intervalId);    //fermo l'invio periodico di messaggi
    intervalId = null; //resetto la variabile
    rl.close();
});


client.on('error', function(err) {
    console.log('Impossibile connettersi al proxy richiesto: ' + err);
    clearInterval(intervalId);    //fermo l'invio periodico di messaggi
    rl.close();
});

