const path = require('path')
const axios = require('axios')
const electron = require('electron')
const sqlite3 = require('sqlite3').verbose()

const userFolderPath = (electron.app || electron.remote.app).getPath('userData')
const dbFilePath = path.join(userFolderPath, 'db.sqlite')
const db = new sqlite3.Database(dbFilePath)

const addRandomPerson = (i) => {
  axios.get('https://randomuser.me/api/?nat=us', {})
    .then((res) => {
      const data = res.data.results[0]
      db.run('insert into persons (name, statusMessage) values (?, ?)', data.name.first, data.location.city)
      console.log(i, data.name.first)
    })
}

for (let i = 0; i < 10; i++) {
  (() => {
    setTimeout(() => {
      addRandomPerson(i)
    }, i * 1000)
  })(i)
}
