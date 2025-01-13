# Publicador-Subscriptor

Questo progetto implementa un sistema di comunicazione basato sul pattern **pub/sub (publisher/subscriber)**, in cui un **publicador** invia messaggi su determinati argomenti e i **suscriptores** si iscrivono per ricevere i messaggi di loro interesse. È inclusa anche una variante con un **publicador rotatorio** che ciclicamente invia messaggi su argomenti predefiniti.

## Funzionamento

1. **Publicador**:
   - Il publicador invia messaggi su uno o più argomenti predefiniti.
   - Gli argomenti sono identificati da stringhe che rappresentano categorie o canali.

2. **Suscriptores**:
   - I suscriptores si connettono al publicador e si iscrivono agli argomenti di loro interesse.
   - Ricevono solo i messaggi relativi agli argomenti a cui sono iscritti.

3. **Publicador Rotatorio**:
   - Una variante del publicador invia messaggi ciclicamente su un set di argomenti specificati.
   - Ogni messaggio include l'argomento, un numero progressivo del messaggio e il numero della "ronda" attuale.

## Struttura del Progetto

La cartella del progetto include i seguenti file:

- **`publicador.js`**: Implementa il publicador semplice, che invia messaggi su argomenti definiti.
- **`publicadorRotatorio.js`**: Implementa il publicador rotatorio, che invia messaggi ciclici su una lista di argomenti.
- **`suscriptor.js`**: Implementa i suscriptores, che si iscrivono agli argomenti di loro interesse e ricevono i messaggi associati.

## Come Eseguire

1. Avvia il publicador specificando la porta e gli argomenti:
   - Per il publicador semplice:
     node publicador.js <porta> <argomento1> <argomento2> ...
   - Per il publicador rotatorio:
     node publicadorRotatorio.js <porta> <numero_messaggi> <argomento1> <argomento2> ...

   Esempio:
   - Publicador semplice:
     ```bash
     node publicador.js 9990 Economia Sport Cultura
     ```
   - Publicador rotatorio:
     ```bash
     node publicadorRotatorio.js 9990 10 Politica Tecnologia Cultura
     ```

2. Avvia uno o più suscriptores specificando la porta del publicador e l'argomento a cui iscriversi:
   node suscriptor.js <nome_suscriptor> <indirizzo_publicador> <porta_publicador> <argomento>

   Esempio:
   ```bash
   node suscriptor.js A localhost 9990 Economia
   ```

4. I suscriptores riceveranno i messaggi relativi agli argomenti a cui sono iscritti, mentre gli altri messaggi saranno ignorati.

## Note Importanti

- Assicurati che le porte specificate siano disponibili prima di avviare i componenti.
- Gli argomenti devono essere univoci e rappresentativi del contenuto che il publicador invierà.
- La configurazione prevede che tutti i componenti vengano eseguiti su `localhost`, ma è possibile adattarla a configurazioni distribuite modificando gli indirizzi IP.

---

Grazie per l'interesse nel progetto! Per suggerimenti o domande, sentiti libero di creare un issue su questo repository.
