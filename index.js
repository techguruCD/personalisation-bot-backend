require('dotenv').config()
const fs = require('fs')
const https = require('https')
const http = require('http')
const express = require('express')
const cors = require('cors')
// const db = require('./db')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', express.static(path.join(__dirname, 'build')))

// app.use('/api', require('./middleware/getUser'))
// app.use('/api', require('./routes/normal'))
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/user', require('./routes/user'))
// app.use('/api/admin', require('./routes/admin'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).send({
      message: { error: err.error.toString() },
      isJoi: true,
      errors: err.error.details
    });
  } else {
    // pass on to another error handler
    next(err);
  }
})

let server = null;
if (process.env.MODE === 'development') {
  server = http.createServer(app)
} else {
  server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/personalisationgpt.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/personalisationgpt.com/fullchain.pem')
  }, app)
}

const redirectionApp = express()
redirectionApp.get('*', (req, res) => {
  console.log(req.originalUrl)
  res.redirect(301, process.env.BASE_URL + req.originalUrl)
})

async function main() {
    // await connectDB()
    const PORT = process.env.PORT || 5000
    server.listen(PORT, () => {
      console.log('Listening to', PORT)
    })
    if (process.env.MODE !== 'development') {
      await redirectionApp.listen(80, '0.0.0.0')
      console.log('redirection server is listening')
    }
    // await app.listen(PORT, '0.0.0.0')
  }
  
  main()