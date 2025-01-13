# Applicazione Chat di Gruppo

Questo progetto implementa una semplice applicazione di chat di gruppo. I client possono connettersi al server, inviare messaggi e ricevere le comunicazioni dagli altri utenti connessi in tempo reale.

## Funzionamento

L'applicazione opera seguendo i seguenti passaggi:

1. **Connessione al Server**:
   - Il server si pone in ascolto su una porta specifica.
   - I client si connettono al server tramite questa porta.

2. **Invio e Ricezione di Messaggi**:
   - I client iniziano a inviare messaggi al server.
   - Il server riceve ogni messaggio, aggiunge il nome dell'autore e lo inoltra a tutti i client connessi, compreso il mittente.

3. **Casi particolari**:
   - Se solo un client è connesso, quando prova a inviare messaggi, il server lo avvisa che nessun altro client è in ascolto.

## Struttura del Progetto

La struttura della cartella include i seguenti file:

- **`servidorChat.js`**: Implementa il server della chat, responsabile di gestire le connessioni dei client e di inoltrare i messaggi.
- **`clienteChat.js`**: Implementa il client della chat, che consente agli utenti di connettersi al server e inviare/ricevere messaggi.

## Come Eseguire

1. Avvia il server eseguendo il file `servidorChat.js` specificando le porte di ascolto, ad esempio:  
   ```bash
   node servidorChat.js 9000 9001
   ```

2. Avvia uno o più client eseguendo il file `clienteChat.js` specificando il nome del client e le porte del server, ad esempio:
   ```bash
   node clienteChat.js Andrea localhost 9000 9001
   ```

3. I client possono iniziare a inviare messaggi digitandoli nella console. Il server inoltrerà i messaggi a tutti i client connessi.

## Note Importanti

- Il server utilizza due porte per la gestione delle connessioni. Assicurati che queste porte siano libere prima di avviare il server.
- È consigliabile utilizzare **ZeroMQ** o un'altra libreria di comunicazione asincrona per garantire la gestione fluida delle connessioni e dei messaggi.
- La configurazione è progettata per funzionare su `localhost`, ma può essere adattata a configurazioni distribuite modificando gli indirizzi IP.

---

Grazie per l'interesse nel progetto! Per suggerimenti o domande, sentiti libero di creare un issue su questo repository.
