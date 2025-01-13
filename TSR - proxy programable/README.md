# Proxy Programmabile

Questo progetto implementa un **proxy programmabile**, che consente di gestire le connessioni tra client e server remoti con la possibilità di reindirizzare dinamicamente il client a un altro server tramite un programmatore.

## Funzionamento

Il proxy opera nel seguente modo:

1. **Connessione Client-Proxy**:
   - Il client si connette al proxy e invia le coordinate (indirizzo e porta) di un socket remoto.
   - Il proxy stabilisce la connessione tra il client e il server remoto specificato.

2. **Scambio di Messaggi**:
   - Una volta stabilita la connessione, client e server possono scambiare messaggi direttamente, senza che il proxy interferisca o modifichi il contenuto.

3. **Programmatore**:
   - È possibile modificare dinamicamente il server remoto a cui il client è connesso tramite un componente chiamato **programmatore**.
   - Il programmatore si connette al proxy su una porta dedicata e invia una richiesta per modificare il socket remoto.

## Struttura del Progetto

La cartella del progetto include i seguenti file:

- **`ProxyProg.js`**: Implementa il proxy programmabile, gestendo le connessioni e il reindirizzamento tramite il programmatore.
- **`netClient.js`**: Simula il client che si connette al proxy e interagisce con il server remoto.
- **`netServer8000.js` e `netServer8001.js`**: Implementano due server remoti che rispondono alle richieste del client.
- **`programador.js`**: Implementa il programmatore, che consente di modificare il server remoto associato al client.

## Come Eseguire

1. Avvia il proxy eseguendo il file `ProxyProg.js` specificando le porte per le connessioni client e programmatore, ad esempio:
   ```bash
   node ProxyProg.js 9000 9001
   ```

3. Avvia uno o più server remoti, ad esempio:
   ```bash
   node netServer8000.js
   node netServer8001.js
   ```

5. Avvia il client specificando l'indirizzo e la porta del proxy, ad esempio:
   ```bash
   node netClient.js localhost 9000
   ```

7. Per modificare il server remoto a cui è connesso il client, avvia il programmatore specificando l'indirizzo e la porta del proxy dedicata al programmatore, ad esempio:
   ```bash
   node programador.js localhost 9001
   ```

   Invia quindi una richiesta al proxy con le nuove coordinate del server remoto.

## Note Importanti

- Il proxy è progettato per funzionare su `localhost`, ma è possibile adattarlo a configurazioni distribuite modificando gli indirizzi IP.
- Assicurati che le porte specificate siano disponibili prima di avviare i componenti.
- Utilizza **Node.js** per eseguire i file JavaScript e installa eventuali dipendenze necessarie con `npm install`.

---

Grazie per l'interesse nel progetto! Per suggerimenti o domande, sentiti libero di creare un issue su questo repository.
