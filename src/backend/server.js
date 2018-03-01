const path = require('path')
const express = require('express')
const electron = require('electron')
const sqlite3 = require('sqlite3').verbose()
const packageJson = require(path.join(__dirname, '..', '..', 'package.json'))

const app = express()
const userFolderPath = (electron.app || electron.remote.app).getPath('userData')
const dbFilePath = path.join(userFolderPath, 'db.sqlite')
const db = new sqlite3.Database(dbFilePath)
const appWorkingPort = packageJson.appWorkingPort

db.serialize(() => {
  db.run('create table if not exists persons (id integer primary key, name text, statusMessage text)')
  db.run('create table if not exists messages (id integer primary key, personId integer, direction text, text text, time int)')
})
db.close()

app.use('/public', express.static('public'))
app.listen(appWorkingPort)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', req.originalUrl))
})
