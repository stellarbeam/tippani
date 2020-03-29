const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {

    // Create a main window
    mainWindow = new BrowserWindow({
        title: 'Evernote Web',
        icon: `${__dirname}/assets/icons/png/evernote.png`,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })

    mainWindow.hide();

    // Load URL
    mainWindow.loadURL("http://www.evernote.com/client/web");

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('apply-styles');
        mainWindow.show();
        mainWindow.maximize();
    });


    mainWindow.on('closed', () => {
        app.quit();
    })

    // Add a menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
})

const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Toggle Dark Mode",
                click: () => {
                    mainWindow.webContents.send('toggle-dark-mode');
                }
            },
            {
                label: "Quit",
                accelerator: "CmdorCtrl+Q",
                click: () => {
                    app.quit();
                }
            }
        ]
    }
]

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform == 'darwin' ? "Command+Shift+I" : "Ctrl+Shift+I",
                click: (item, focusedWindow) => {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}


