const path = require('path')
const express = require('express')
const app = express()
const appWorkingPort = require(path.join(__dirname, '..', 'package.json'))['appWorkingPort']

app.listen(appWorkingPort)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', req.originalUrl))
})
