const fs = require('fs')
const path = require('path')
const axios = require('axios')
const electron = require('electron')
const sqlite3 = require('sqlite3').verbose()
const mkdirp = require('mkdirp')

const userFolderPath = (electron.app || electron.remote.app).getPath('userData')
const dbFilePath = path.join(userFolderPath, 'db.sqlite')
const db = new sqlite3.Database(dbFilePath)

const getRandomPerson = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://randomuser.me/api/?nat=us')
      .then((res) => {
        res = res.data.results[0]
        resolve({
          name: `${res.name.first} ${res.name.last}`,
          statusMessage: res.location.city,
          picture: res.picture.large
        })
      })
  })
}

const addToDatabase = (opts) => {
  return new Promise((resolve, reject) => {
    db.run('insert into persons (name, statusMessage) values (?, ?)', opts.name, opts.statusMessage, function (err) {
      if (err) throw err
      resolve({
        personId: this.lastID,
        pictureUrl: opts.picture
      })
    })
  })
}

const createFolder = (opts) => {
  return new Promise((resolve, reject) => {
    const personFolderPath = path.join(userFolderPath, 'persons', opts.personId.toString())
    mkdirp(personFolderPath, (err) => {
      if (err) throw err
      resolve({
        personId: opts.personId,
        pictureUrl: opts.pictureUrl,
        personFolderPath: personFolderPath
      })
    })
  })
}

const downloadImage = (opts) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: opts.pictureUrl,
      responseType: 'arraybuffer'
    }).then((res) => {
      const fileName = `${opts.personId}.jpg`
      const filePath = path.join(opts.personFolderPath, fileName)
      const fileContent = res.data
      fs.writeFileSync(filePath, fileContent)
      resolve(fileName)
    })
  })
}

for (let i = 0; i < 10; i++) {
  (() => {
    setTimeout(() => {
      getRandomPerson()
        .then(addToDatabase)
        .then(createFolder)
        .then(downloadImage)
        .then((res) => {
          console.log(i, res)
        })
    }, i * 1000)
  })(i)
}
