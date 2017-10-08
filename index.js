// main starting point of the applicationnode

const express = require('express')
const http = require ('http') // low-level native Node library
const bodyParser = require('body-parser')
const morgan = require ('morgan')
const router = require('./router')
const mongoose = require('mongoose')

const app = express()

// DB setup
mongoose.connect('mongodb://localhost:auth/auth') // last param 'auth' is name of DB

// App setup
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)
