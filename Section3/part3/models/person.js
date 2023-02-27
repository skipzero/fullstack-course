const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URI;

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.error(`Error connecting to MongoDB: ${err.message}`)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)