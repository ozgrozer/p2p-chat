const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const packageJson = require(path.join(__dirname, '..', '..', 'package.json'))
require(path.join(__dirname, '..', 'backend', 'server.js'))

let win
const appWorkingPort = packageJson.appWorkingPort

const createWindow = () => {
  win = new BrowserWindow({
    show: false,
    width: 960,
    height: 633,
    titleBarStyle: 'hidden',
    backgroundColor: '#fff'
  })
  win.loadURL('http://127.0.0.1:' + appWorkingPort + '/index.html')
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    win = null
  })

  ipcMain.on('getPersonsAndMessages', (event, arg) => {
    require('./getPersonsAndMessages').then((res) => {
      event.sender.send('personsAndMessages', res)
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
