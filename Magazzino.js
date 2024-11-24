const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const { request } = require('http');
const axios = require('axios');
const { count } = require('console');

const SECRET_KEY = `M8lAsheigt`;
const key = `7c3c631f8e501165ba4b785524c3753b`;

function cripta(data) {
    // Converti l'oggetto JavaScript in stringa JSON
    const jsonString = JSON.stringify(data);

    // Cripta la stringa JSON utilizzando AES (Advanced Encryption Standard)
    const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();

    return encrypted;
};
function decripta(encryptedData) {
    // Decripta il contenuto utilizzando la chiave
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
};
function encryptPassword(password) {
    if (typeof password === 'undefined' || password === null) {
        throw new Error('Password is undefined or null');
    }
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(encryptedPassword);
    const hmacDigest = hmac.digest('hex');
    return {
        encryptedPassword,
        key: key.toString('hex'),
        iv: iv.toString('hex'),
        hmac: hmacDigest
    };
};
function saveCredentials(username, encryptedPassword, key, iv, hmac) {
    const data = { username, encryptedPassword, key, iv, hmac };
    const jsonData = JSON.stringify(data);
    let jsondatadcr = cripta(jsonData);
    const folderPath = path.join(app.getAppPath(), 'Dati', 'Reg-access');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, 'credentials.json');
    try {
        fs.writeFileSync(filePath, jsondatadcr);
    } catch (err) {
        console.error('Error saving credentials:', err);
    }
};
function decryptPassword(encryptedPassword, key, iv, hmac) {
    const hmacReceived = crypto.createHmac('sha256', SECRET_KEY);
    hmacReceived.update(encryptedPassword);
    const hmacDigestReceived = hmacReceived.digest('hex');
    if (hmacDigestReceived !== hmac) {
        throw new Error('Invalid HMAC signature. Data may have been tampered with.');
    }
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
    decryptedPassword += decipher.final('utf8');
    return decryptedPassword;
};
function loadCredentials() {
    const filePath = path.join(app.getAppPath(), 'Dati', 'Reg-access', 'credentials.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        let jsondatadcr = decripta(data);
        const credentials = JSON.parse(jsondatadcr);
        return credentials;
    } catch (err) {
        console.error('Error loading credentials:', err);
        return null;
    }
};
function credentialsExist() {
    const filePath = path.join(app.getAppPath(), 'Dati', 'Reg-access', 'credentials.json');
    return fs.existsSync(filePath);
};
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: false,
            contentSecurityPolicy: "script-src 'self' 'unsafe-eval';"
        }
    });
    if (credentialsExist()) {
        win.loadFile('Frontend/Login/Animation/index.html');
    } else {
        win.loadFile('Frontend/Reg/Animation/index.html');
    } 
    //win.loadFile('Frontend/Home/Home.html'); // Aggiunta da levare quando si leva sopra
    win.setMenu(null);
    // win.webContents.openDevTools();
};
function deleteCards(data) {
    const folderPath = path.join(app.getAppPath(), 'Dati', 'card-log');
    const filePath = path.join(folderPath, 'Cardslog.json');
    const { company, email, pass, username, note } = data;
    console.log(data)
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    let records = [];

    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            let jsoncontentdcr = decripta(fileContent);
            records = JSON.parse(jsoncontentdcr);
        } catch (err) {
            console.error('Error reading credentials file:', err);
        }
    }
    for(i=0; i < records.length; i++){
        const decryptedPassword = decryptPassword(records[i][`password`], records[i][`key`], records[i][`iv`], records[i][`hmac`]);
        let Companyfile = records[i][`company`];
        let Emailfile = records[i][`email`];
        let Passwordfile = decryptedPassword;
        let Nicknamefile = records[i][`nickname`];
        let Notefile = records[i][`note`];
        if(Companyfile == company && Emailfile == email && Passwordfile == pass && Nicknamefile == username && Notefile == note){
            records.splice(i, 1);
            break;
        } else{
            console.log(`not found`);
        }
    }

    try {
        const jsonData = JSON.stringify(records, null, 2);
        let JsonDatacr = cripta(jsonData);
        fs.writeFileSync(filePath, JsonDatacr);
    } catch (err) {
        console.error('Error saving cards:', err);
    };
};
function deleteupdate(data) {
    const folderPath = path.join(app.getAppPath(), 'Dati', 'card-log');
    const filePath = path.join(folderPath, 'Cardslog.json');
    const { company1, email1, pass1, username1, note1 } = data;
    console.log(data)
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    let records = [];

    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            let jsoncontentdcr = decripta(fileContent);
            records = JSON.parse(jsoncontentdcr);
        } catch (err) {
            console.error('Error reading credentials file:', err);
        }
    }
    for(i=0; i < records.length; i++){
        const decryptedPassword = decryptPassword(records[i][`password`], records[i][`key`], records[i][`iv`], records[i][`hmac`]);
        let Companyfile = records[i][`company`];
        let Emailfile = records[i][`email`];
        let Passwordfile = decryptedPassword;
        let Nicknamefile = records[i][`nickname`];
        let Notefile = records[i][`note`];
        if(Companyfile == company1 && Emailfile == email1 && Passwordfile == pass1 && Nicknamefile == username1 && Notefile == note1){
            records.splice(i, 1);
            break;
        } else{
            console.log(`not found`);
        }
    }

    try {
        const jsonData = JSON.stringify(records, null, 2);
        let JsonDatacr = cripta(jsonData);
        fs.writeFileSync(filePath, JsonDatacr);
    } catch (err) {
        console.error('Error saving cards:', err);
    };
};
function saveCards(data) {
    const folderPath = path.join(app.getAppPath(), 'Dati', 'card-log');
    const filePath = path.join(folderPath, 'Cardslog.json');
    const { company, email, password, nickname, note } = data;
    const encryptedData = encryptPassword(password);
    const record = {
        company, email, password: encryptedData.encryptedPassword,
        key: encryptedData.key, iv: encryptedData.iv,
        hmac: encryptedData.hmac, nickname, note
    };
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    let records = [];

    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            let jsoncontentdcr = decripta(fileContent)
            records = JSON.parse(jsoncontentdcr);
            console.log(records)
        } catch (err) {
            console.error('Error reading credentials file:', err);
        }
    }

    records.push(record);

    try {
        const jsonData = JSON.stringify(records, null, 2);
        let JsonDatacr = cripta(jsonData);
        fs.writeFileSync(filePath, JsonDatacr);
    } catch (err) {
        console.error('Error saving cards:', err);
    };
};
function saveLogExist() {
    const filePath = path.join(app.getAppPath(), 'Dati', 'Save-log', 'save-log.json');
    return fs.existsSync(filePath);
};
function countJson(){
    if(saveLogExist()){
        let Json = readLog();  
        let i = Json.length + 1;
        return i++
    } else {
        return i = 1;
    }
}
async function saveLog(status) {
    const geoResponse = await axios.get('https://ipapi.co/json/');
    let latitude = geoResponse[`data`][`latitude`]
    let longitude = geoResponse[`data`][`longitude`]
    const locationResponse = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6679f4e298885698511074ucdf42215`);
    const city = locationResponse[`data`][`address`][`county`];
    let Data = new Date();
    let day = Data.toLocaleDateString();
    let time = Data.toLocaleTimeString();
    let log = {Status: status, data: day, hour: time, Position: city, total: Data.getTime(), count: countJson()};
    let arrayy = [log]
    let dati = JSON.stringify(arrayy, null, 2);

    const folderPath = path.join(app.getAppPath(), 'Dati', 'Save-log');
    const filePath = path.join(app.getAppPath(), 'Dati', 'Save-log', `save-log.json`);

    if (saveLogExist()) {
        try {
            let encryptedData = fs.readFileSync(filePath, 'utf8');
            let jsonData = decripta(encryptedData);
            jsonData = JSON.parse(jsonData);
            jsonData.push(log);

            const dati = JSON.stringify(jsonData, null, 2);
            const encryptedContent = cripta(dati);
    
            fs.writeFileSync(filePath, encryptedContent, 'utf8');
    
            console.log(jsonData);
        } catch (err) {
            console.error('Errore durante l\'aggiunta dei dati al file:', err);
        }
    } else {
        if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
        try {
            let daticrt = cripta(dati);
            fs.writeFileSync(filePath, daticrt, 'utf8');
            
            console.log('File JSON creato con successo.');
        } catch (err) {
            console.error('Errore durante la creazione del file JSON:', err);
        }
    }
};
function readLog() {
    const filePath = path.join(app.getAppPath(), 'Dati', 'Save-log', `save-log.json`);
    let encryptedData = fs.readFileSync(filePath, 'utf8');
    let jsonData = decripta(encryptedData);
    jsonData = JSON.parse(jsonData);
    return jsonData;
};
function antiAttack(){
    let totalI = readLog().length;
    let Json = readLog(); 


    if (totalI > 3){
        let back1 = Json[totalI - 1][`Status`]; 
        let back2 = Json[totalI - 2][`Status`];
        let hour1 = new Date().getTime();
        let hour2 = Json[totalI - 2][`total`];
        let enoughTime = hour1 - hour2;
        let tempomin = 20000; // 15min 900000
        let temporimanente = tempomin - enoughTime;
        console.log(back1, back2, hour1, hour2, enoughTime, temporimanente);
        if (back1 === false && back2 === false && enoughTime < tempomin && enoughTime > 0){
            return temporimanente;
        } else {
            return true;
        }
    } else {
        return true;
    }
}
// Richieste gestite dei file a livello client
ipcMain.on('save-cards', (event, data) => {
    saveCards(data);
});
ipcMain.on('DeleteCard', (event, data) => {
    deleteCards(data);
});
ipcMain.on('update-card', (event, data) => {
    deleteupdate(data[1]);
    saveCards(data[0]);
});
ipcMain.on('save-credentials', (event, username, password) => {
    const { encryptedPassword, key, iv, hmac } = encryptPassword(password);
    saveCredentials(username, encryptedPassword, key, iv, hmac);
    saveLog(true);
    const win1 = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: false,
            contentSecurityPolicy: "script-src 'self' 'unsafe-eval';"
        }
    });
    win1.setMenu(null);
    win1.setMinimumSize(730, 730);
    //win1.webContents.openDevTools();
    win1.loadFile('Frontend/Home/Home.html');
});
ipcMain.on('login', (event, inputUsername, inputPassword) => {
    const credentials = loadCredentials();
    if (antiAttack() === true){
        if (credentials) {
            const { username, encryptedPassword, key, iv, hmac } = credentials;
            try {
                const decryptedPassword = decryptPassword(encryptedPassword, key, iv, hmac);
                if (inputUsername === username && inputPassword === decryptedPassword) {
                    event.sender.send('login-successful');
                    saveLog(true);
                    const win1 = new BrowserWindow({
                        width: 1200,
                        height: 800,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            sandbox: false,
                            contentSecurityPolicy: "script-src 'self' 'unsafe-eval';"
                        }
                    });
                    win1.setMenu(null);
                    win1.setMinimumSize(730, 730);
                    win1.loadFile('Frontend/Home/Home.html');
                    // win1.webContents.openDevTools();
                } else {
                    saveLog(false);
                    event.sender.send('login-failed');
                }
            } catch (error) {
                console.error('Error during login:', error.message);
                event.sender.send('login-failed');
            }
        } else {
            event.sender.send('login-failed');
        }
    } else {
        let block = setInterval(() => {
            event.sender.send('time-block', antiAttack());
            if (antiAttack() === true) {
                clearInterval(block);
            }
        }, 1000);        
    }
});
ipcMain.on('request-cards', (event) => {
    const folderPath = path.join(app.getAppPath(), 'Dati', 'card-log');
    const filePath = path.join(folderPath, 'Cardslog.json');
    let records = [];

    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            let filedecr = decripta(fileContent);
            records = JSON.parse(filedecr);
        } catch (err) {
            console.error('Error reading cards file:', err);
        }
    }

    const datacr = records.map(record => {
        const decryptedPassword = decryptPassword(record.password, record.key, record.iv, record.hmac);
        return {
            company: record.company,
            email: record.email,
            password: decryptedPassword,
            nickname: record.nickname,
            note: record.note
        };
    });
    // Invia le cards decriptate a Home.js usando webContents.send
    BrowserWindow.getAllWindows()[0].webContents.send('response-cards', datacr);

});
ipcMain.on('request-logs', (event) => {
    let datacr = readLog();
    BrowserWindow.getAllWindows()[0].webContents.send('response-logs', datacr);
});
// Avvia il tutto
app.on('ready', () => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});