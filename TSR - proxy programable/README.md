# proxy programmabile
In questo progetto realizzo un proxy programmabile. Funzionamento:
- il client si connette al proxy e invia le coordinate di un socket
- il proxy crea la connessione tra client e server remoto
- client e server si scambiano messaggi senza che il proxy interferisca o modifichi il contenuto
- attraverso un programador, è possibile modificare il socket al quale il client è connesso
- per farlo, il programador si connette al proxy su una porta dedicata e invia una richiesta
