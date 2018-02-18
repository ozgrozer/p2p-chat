const path = require('path')
const express = require('express')
const app = express()
const port = 35797

app.listen(port)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public', req.originalUrl))
})
