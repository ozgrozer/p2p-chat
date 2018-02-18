const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let win

if (!isDev) {
  require('./server.js')
}

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hidden'
  })
  win.loadURL('http://127.0.0.1:35797/index.html')
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
