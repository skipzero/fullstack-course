const { MONGODB_URI} = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const { requestLogger } = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

const usersRoutes = require('./controllers/users')

mongoose.set('strictQuery', false)

info('Connecting to DB...')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

mongoose.connect(MONGODB_URI)
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Connected to DB...'))

app.disable('x-powered-by')
app.use(cors)
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

module.exports = app
