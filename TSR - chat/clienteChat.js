const {zmq, lineaOrdenes, error, adios, conecta} = require('../tsr')
lineaOrdenes("nick hostServidor portDifusion portPipeline")

let entrada = zmq.socket('sub')
let salida  = zmq.socket('push')
conecta(salida, hostServidor, portPipeline)
conecta(entrada,hostServidor, portDifusion)
entrada.subscribe('')
entrada.on('message', (nick, msg) => {console.log('['+nick+'] ' + msg)})

process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data' ,(str) => {salida.send([nick, str.slice(0,-1)])})
process.stdin.on('end',() => {salida.send([nick, 'CLIENT-ENDED-CONNECTION']); adios([entrada,salida],"Adios")()}) 

salida.on('error', (msg) => {error(`${msg}`)})
process.on('SIGINT', () => {salida.send([nick, 'CLIENT-ENDED-CONNECTION']); adios([entrada,salida],"abortado con CTRL-C")()})

salida.send([nick,'CLIENT-STARTED-CONNECTION'])
