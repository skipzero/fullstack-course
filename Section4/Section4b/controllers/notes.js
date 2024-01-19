const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body
  
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  
  if (!note.content) {
    res.status(400)
  }

  try {
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch(exception) {
    next(exception)
  }
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  console.log('NOTE', Note, req.params)
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

notesRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter