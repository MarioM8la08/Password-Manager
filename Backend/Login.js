const { ipcRenderer } = require('electron');
const messageContainer = document.getElementById("message-container");
function displayMessage(message, messageType) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(messageType);
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageElement);
}
// Funzione per gestire il tentativo di login
function attemptLogin() {
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    // Invia i dati di login al processo principale di Electron tramite IPC
    if(inputUsername !== `` && inputPassword !== ``){
        ipcRenderer.send('login', inputUsername, inputPassword);
    } else {
        displayMessage('-> Insert credentials', 'error');
    }
}
function millisecondsToMinutesSeconds(milliseconds) {
    var totalSeconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return { minutes: minutes, seconds: seconds };
}
// Ascolta il messaggio di successo o errore di login dal processo principale di Electron
ipcRenderer.on('login-successful', () => {
    console.log('Login riuscito.');
    window.close();
    // Aggiorna l'interfaccia utente o esegui altre azioni in risposta al login riuscito
});
ipcRenderer.on('login-failed', () => {
    console.log('Credenziali errate.');
    displayMessage('-> Incorrect credentials', 'error');
    // Aggiorna l'interfaccia utente o esegui altre azioni in risposta al login fallito
});
ipcRenderer.on('time-block', (event, messagge) => {
    console.log(messagge)
    if (messagge !== true)  {
        let scritta = `-> Mancano ${millisecondsToMinutesSeconds(messagge).minutes} minuti e ${millisecondsToMinutesSeconds(messagge).seconds} secondi`
        displayMessage(scritta, 'timer');
    } else {
        displayMessage(`-> Ritenta`, `timer`);
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        attemptLogin()
    }
});