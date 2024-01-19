const { MONGODB_URI, HELLO } = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const { requestLogger } = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

info('Connecting to DB...', HELLO,  MONGODB_URI )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/notes', notesRouter)

mongoose.connect(MONGODB_URI, {dbName: 'notes'})
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Connected to DB...'))

app.disable('x-powered-by')
app.use(cors)
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

module.exports = app
