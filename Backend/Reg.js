const { ipcRenderer } = require('electron');

const messageContainer = document.getElementById("message-container");

function displayMessage(message, messageType) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(messageType);
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageElement);
}
function timerMessage(message, messageType) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    setTimeout(() =>{
        messageElement.classList.add(`error`);
    }, 1000);
    messageElement.classList.add(messageType);
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageElement);
}
function saveCredentials() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const Usval = username.value;
    const Pwval = password.value;

    if (Pwval.length > 11 && Pwval.length < 20 && Usval.length > 6 && Usval.length < 20) {
        ipcRenderer.send('save-credentials', Usval, Pwval);
        window.close();
    } else {
        if (!(Pwval.length > 11 && Pwval.length < 20)) {
            password.classList.remove('Input');
            password.classList.add('errorInp');
            displayMessage(`-> Invalid password (min 11 crt)`, `error`)
        } else {
            password.classList.remove('errorInp');
            password.classList.add('Input');
        }
        if (!(Usval.length > 6 && Usval.length < 20)) {
            username.classList.remove('Input');
            username.classList.add('errorInp');
            displayMessage(`-> Invalid username (min 6 crt)`, `error`)
        } else {
            username.classList.remove('errorInp');
            username.classList.add('Input');
        }
    }
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        saveCredentials()
    }
});