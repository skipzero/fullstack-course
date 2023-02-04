const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// create custom token for morgan logger
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

// we add our token to the output string
const output = ':method :url :status :res[content-length] - :response-time ms :body';

app.use(express.json()) // JSON parser
app.use(express.static('build')) // Serve our static files here...
app.use(morgan(output)) // Logger, using custom token (body)
app.use(cors()); // CORS Module for cross browser support

// get our data from the hardcoded file
let notes = require('./data')

// get all entries
app.get('/api/notes', (req, res) => {
  res.send(notes)
})

// get a single entry
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(note => note.id === id)
  if (note) {
    res.send(note)
  } else {
    res.status(404).end();
  }
})

// Add entry
app.post('/api/notes', (req, res) => {
  const body = req.body;

  const id = () => {
    return Math.floor(Math.random() * 10000)
  }

  // Throw error if no name or number sent
  if (!body.content) {
    return res.status(400).json({
      error: 'Content needed; no blank notes'
    })
  } 
  
  // TODO: fix so it doesn't post if names dup
  notes.filter(note => {
    if (note.content.toLowerCase() === body.content.toLowerCase()) {
      return res.status(400).json({
        error: 'Content must be unique'
      }).end()
    } 
  })
  const entry = {
    id: id(),
    content: body.content
  }
  notes = notes.concat(entry)
  res.json(entry)
  
})

// update a single entry by id
app.put('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  console.log('PUT...', req.body)
  note = notes.find(note => note.id === id)
  res.json(note);

})

// our info page
app.get('/info', (req, res) =>{
  const entries = notes.length;
  res.send(`Notebook has entries for ${entries} notes <br> ${new Date()}`)
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})