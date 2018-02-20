const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const appWorkingPort = require(path.join(__dirname, '..', 'package.json'))['appWorkingPort']
let win

if (!isDev) {
  require('./server.js')
}

const createWindow = () => {
  win = new BrowserWindow({
    show: false,
    width: 960,
    height: 700,
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
