# Broker RouterRouter con Statistiche

Questo progetto implementa un **Broker RouterRouter** con funzionalità avanzate per la gestione delle richieste dei client e la distribuzione ai worker disponibili. Inoltre, il broker monitora e mostra periodicamente statistiche sui worker connessi, fornendo informazioni utili sull'utilizzo del sistema.

## Funzionamento

Il Broker opera come intermediario tra i client e i worker, con un sistema di gestione delle richieste e delle risposte. Di seguito sono descritti i passaggi principali del funzionamento:

1. **Connessioni**:
   - Il broker ascolta su due porte: una dedicata al frontend per i client e una al backend per i worker.
   - I worker si connettono al broker tramite la porta backend.
   - I client si connettono al broker tramite la porta frontend.

2. **Gestione delle richieste**:
   - Le richieste dei client vengono inoltrate al primo worker disponibile.
   - Se nessun worker è disponibile, la richiesta viene messa in una coda di attesa.

3. **Elaborazione delle risposte**:
   - Quando un worker completa l'elaborazione di una richiesta, invia la risposta al broker.
   - Il broker inoltra quindi la risposta al client corrispondente.

4. **Statistiche**:
   - Il broker registra il totale delle richieste elaborate e il numero di richieste elaborate da ciascun worker.
   - Ogni 5 secondi, il broker stampa le statistiche aggiornate.

## Struttura del Progetto

La struttura della cartella include i seguenti file:

- **`brokerRouterRouter.js`**: Il file principale che implementa il broker con gestione delle statistiche.
- **`cliente.js`**: Simula i client che inviano richieste al broker.
- **`workerReq.js`**: Implementa i worker che elaborano le richieste ricevute dal broker.

## Come Eseguire

Per eseguire il progetto, segui questi passaggi:

1. Avvia il broker eseguendo il file `brokerRouterRouter.js` specificando la porta frontend e backend, ad esempio:  
   ```bash
   node brokerRouterRouter.js 9000 9001
   ```

2. Avvia uno o più worker eseguendo il file `workerReq.js` specificando il nome del worker, l'indirizzo del broker e la porta backend, ad esempio:  
   ```bash
   node workerReq.js w1 localhost 9001
   ```

3. Avvia uno o più client eseguendo il file `cliente.js` specificando il nome del client, l'indirizzo del broker e la porta frontend, ad esempio:  
   ```bash
   node cliente.js A localhost 9000
   ```

4. Il broker mostrerà periodicamente le statistiche relative al totale delle richieste elaborate e a ciascun worker.

## Note Importanti

- Il progetto utilizza **ZeroMQ** per la comunicazione asincrona tra client, broker e worker.
- Assicurati di installare tutte le dipendenze richieste prima di eseguire il progetto con il comando `npm install`.
- La configurazione prevede che tutti i componenti vengano eseguiti sulla stessa macchina (`localhost`). Tuttavia, possono essere distribuiti su diverse macchine modificando gli indirizzi IP.

## Contributi e Riconoscimenti

Questo progetto è stato sviluppato come parte delle attività didattiche per consolidare i concetti di design pattern e comunicazione asincrona.

---

Grazie per l'interesse nel progetto! Per qualsiasi domanda o suggerimento, non esitare a creare un issue su questo repository.
