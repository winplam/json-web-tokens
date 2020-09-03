const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const dotenv = require('dotenv')
// get config vars
dotenv.config()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

function authenticateToken (req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // Exits with "Unauthorized" error

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err) // JsonWebTokenError
    if (err) return res.sendStatus(403) // Exits with "Forbidden" error
    console.log('---------- USER')
    req.user = user
    console.log(req.user)
    next() // pass the execution off to whatever request the client intended
  })
}

// method for signing tokens:
// username is in the form { username: "my cool username" }
function generateAccessToken (username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

app.get('/api/userOrders', authenticateToken, (req, res) => {
  res.send('Hello World!')
})

app.post('/api/createNewUser', (req, res) => {
  console.log('---------- createNewUser')
  const token = generateAccessToken({ username: req.body.username })
  res.json(token)
})

// generate token secret
// console.log(require('crypto').randomBytes(64).toString('hex'))
// console.log(process.env.TOKEN_SECRET)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})