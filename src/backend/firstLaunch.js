const path = require('path')
const electron = require('electron')
const sqlite3 = require('sqlite3').verbose()
const mkdirp = require('mkdirp')
const packageJson = require(path.join(__dirname, '..', '..', 'package.json'))

const appName = packageJson.name
const userFolderPath = (electron.app || electron.remote.app).getPath('userData')
const appFolderPath = path.join(userFolderPath, appName)
const dbFilePath = path.join(appFolderPath, 'db.sqlite')
const personsFolderPath = path.join(appFolderPath, 'persons')

mkdirp(appFolderPath, (err) => {
  if (err) throw err
})

const db = new sqlite3.Database(dbFilePath)
db.serialize(() => {
  db.run('create table if not exists persons (id integer primary key, name text, statusMessage text)')
  db.run('create table if not exists messages (id integer primary key, personId integer, direction text, text text, time int)')
})
db.close()

mkdirp(personsFolderPath, (err) => {
  if (err) throw err
  /* require('./helpers/addFakePersons') */
})
