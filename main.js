const electron = require('electron');
const url = require('url');

const { app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', () => {

    // Create a main window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webviewTag: 'enable'
        }
    })

    // Load URL
    mainWindow.loadURL("http://www.evernote.com");

    mainWindow.on('closed', () => {
        app.quit();
    })
})

