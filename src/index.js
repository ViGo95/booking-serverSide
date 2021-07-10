const config = require('./config')
const db = require('./config/db')
const router = require('./routes')

const express = require('express')
const App = express()
const Server = require('http').Server(App)
require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')

// App.use(cors)
App.use(bodyParser.urlencoded({extended: false}))
App.use(bodyParser.json())

router(App)

db(config.DB.URL)

Server.listen(config.SERVER.PORT, () => {
  console.log('App ready on: ' + config.SERVER.HOST + config.SERVER.PORT)
})