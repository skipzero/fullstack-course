const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.error(`Error connecting to MongoDB: ${err.message}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 6,
  },
  number: {
    type: Number,
    minLength:7,
    validate: {
      validator: function (val) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val)
      },
      message: props => `${props.value} is not a valid phone number`,
    },
    required: [true, 'user phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)