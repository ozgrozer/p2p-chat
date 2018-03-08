const path = require('path')
const electron = require('electron')
const sqlite3 = require('sqlite3').verbose()
const packageJson = require(path.join(__dirname, '..', '..', 'package.json'))

const appName = packageJson.name
const userFolderPath = (electron.app || electron.remote.app).getPath('userData')
const appFolderPath = path.join(userFolderPath, appName)
const dbFilePath = path.join(appFolderPath, 'db.sqlite')
const db = new sqlite3.Database(dbFilePath)

const lastMessage = (persons) => {
  return new Promise((resolve, reject) => {
    persons.forEach((person) => {
      const lastItemId = Object.keys(person.messages).pop()
      if (lastItemId) {
        persons[person.id].lastMessage = person.messages[lastItemId].text
        persons[person.id].lastMessageTime = person.messages[lastItemId].time
      }
    })

    resolve(persons)
  })
}

const getMessages = (persons) => {
  return new Promise((resolve, reject) => {
    db.all('select id, personId, direction, text, time from messages', (err, rows) => {
      if (err) throw err

      rows.forEach((row) => {
        if (persons[row.personId]) {
          persons[row.personId].messages[row.id] = {
            id: row.id,
            direction: row.direction,
            text: row.text,
            time: row.time
          }
        }
      })

      resolve(persons)
    })
  })
}

const getPersons = () => {
  return new Promise((resolve, reject) => {
    db.all('select id, name, statusMessage from persons', (err, rows) => {
      if (err) throw err

      let persons = []

      rows.forEach((row) => {
        persons[row.id] = {
          id: row.id,
          name: row.name,
          statusMessage: row.statusMessage,
          messages: [],
          lastMessage: '',
          lastMessageTime: '',
          profilePicture: `https://randomuser.me/api/portraits/men/${row.id}.jpg`
        }
      })

      resolve(persons)
    })
  })
}

const getPersonsAndMessages = () => {
  return new Promise((resolve, reject) => {
    getPersons()
      .then(getMessages)
      .then(lastMessage)
      .then((res) => {
        resolve(res)
      })
  })
}

module.exports = getPersonsAndMessages()
