const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.post('/api/notes', (req, res) => {
  body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const generateId = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => n.id))
        : 0;
        
        return maxId + 1;
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }
  
  notes = notes.concat(note)
  console.log('POST Note', note)
  res.json(note)
})

app.get('/api/notes/:id', (request, response) => {
  const id = parseInt(request.params.id);
  console.log('id', id)
  const note = notes.find(note => note.id === id);
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  people = notes.filter(note => note.id !== id)
  res.status(204).end();
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})