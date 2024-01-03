const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  console.log('/ get --req', req.body)
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

notesRouter.get('/:id', (req, res, next) => {
  console.log('IDget', req.body)
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

notesRouter.post('/', (req, res) => {
  const note = new Note(req.body)
  console.log('NOTES!!', note)
  note.save().then((result) => {
    res.status(201).json(result)
  })
})

module.exports = notesRouter
