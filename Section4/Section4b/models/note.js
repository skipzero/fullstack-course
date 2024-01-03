const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  note: {
    type: String,
  }
})

notesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', notesSchema)
