const path = require('path')
const express = require('express')
const packageJson = require(path.join(__dirname, '..', '..', 'package.json'))
const Store = require('electron-store-data')

const app = express()
const appName = packageJson.name
const appWorkingPort = packageJson.appWorkingPort

const storeSettings = new Store({
  path: `${appName}.settings`,
  defaults: {
    app: {
      launched: 0
    },
    window: {
      lorem: 'ipsum'
    }
  }
})

const launchCount = storeSettings.get('app').launched

if (!launchCount) {
  require('./firstLaunch')
}

app.use('/public', express.static('public'))
app.listen(appWorkingPort)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', req.originalUrl))
})

storeSettings.set('app', {
  launched: launchCount + 1
})
