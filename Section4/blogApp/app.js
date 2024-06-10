const { MONGODB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const { requestLogger } = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const {errorHandler, requestLogger } = require('./utils/middleware')
const {unknownEndpoint, info, error } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

info('Connecting to DB...', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((err) => {
    error('error connecting to MongoDB', err.message)
  })

app.disable('x-powered-by')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
