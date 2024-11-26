## brocker con estadisticas
In questo progetto realizzo un broker che mostra periodicamente statistiche sui diversi worker connessi

## Funzionamento:
- il broker si mette in ascolto su due porte: una dedicata al frontend e una al backend
- ogni worker si connette al brocker sulla porta backend
- ogni clioent si connette al brocker sulla porta frontend
- il brocker riceve petizioni dai client e le inoltra al primo worker disponibile
- se non ci sono workers disponibili, il brocker aggiunge la petizione in una coda di atteasa
- quando il worker termina di processare il messaggio, inoltra la risposta al client attraverso il broker
- periodicamente, il broker mostra alcune statistiche
