const path = require('path')
const electron = require('electron')
const sqlite3 = require('sqlite3').verbose()
const packageJson = require(path.join(__dirname, '..', '..', 'package.json'))

const appName = packageJson.name
const userFolderPath = (electron.app || electron.remote.app).getPath('userData')
const appFolderPath = path.join(userFolderPath, appName)
const dbFilePath = path.join(appFolderPath, 'db.sqlite')
const db = new sqlite3.Database(dbFilePath)

module.exports = new Promise((resolve, reject) => {
  db.all('select id, name, statusMessage from persons', (err, rows) => {
    if (err) throw err

    let data = []

    rows.forEach((row) => {
      data[row.id] = {
        id: row.id,
        name: row.name,
        statusMessage: row.statusMessage,
        messages: [
          { direction: 'out', text: 'outgoing ' + row.id, time: 1519134357 },
          { direction: 'in', text: 'incoming ' + row.id, time: 1519134358 }
        ],
        lastMessage: 'Message ' + row.id,
        lastMessageTime: 'Today'
      }
    })

    resolve(data)
  })
})
