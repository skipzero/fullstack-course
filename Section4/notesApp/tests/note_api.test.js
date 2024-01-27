const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Note = require('../models/note')
const helper = require('./test_helper')

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
  console.log('cleared...')

  // const noteObjects = helper.initialNotes
  //   .map(note => new Note(note))
  // const promiseArray = noteObjects.map(note => note.save())
  // await Promise.all(promiseArray)
  console.log('Done...')
})

describe('Notes Lists', () => {
  describe('When theres initially some notes saved', () => {
    test('notes are returned as json', async () => {    
      await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
      const response = await api.get('/api/notes')
      expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
      const response = await api.get('/api/notes')
      const contents = response.body.map(r => r.content)
      expect(contents).toContain(
        'Browser can execute only JavaScript'
      )
    })

  describe('viewing a specific note', () => {
    test('a valid note can be added ', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })
  })

    test('fails with 404 if note doesnt exist', async () => {
      const validNonExistingId = await helper.nonExistingId()
      await api
        .get(`/api/notes/${validNonExistingId}`)
        .expect(404)
    })

    test('Fails with 400 if not valid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
    
      const response = await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)

      expect(response.body).toEqual({ error: 'malformatted id' })
    })
  })
    
  describe('addition of new note', () => {

    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'this is a testing note...',
        important: false,
      }

      await api
        .post('/api/notes/')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(n => n.content)
        expect(contents).toContain('Browser can execute only JavaScript')
    })

    test('note without content is not added', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('status 204 if succeds', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]
      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
      
      const contents = notesAtEnd.map(r => r.content)
      expect(contents).not.toContain(noteToDelete.content)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})