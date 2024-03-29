const notesRouter = require('express').Router()
const Note = require('../models/note')
const mongoose = require('mongoose')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.post('/', async (req, res) => {
  const body = req.body
  
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  
  if (!note.content) {
    res.status(400)
  }

    const savedNote = await note.save()
    res.status(201).json(savedNote)
})

notesRouter.get('/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
    res.status(400).send({ error: 'malformatted id' }).end()
  }
  const note = await Note.findById(req.params.id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.delete('/:id', async (req, res) => {
  
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', (req, res) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => error)
})

module.exports = notesRouter