const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
console.log('++++', process.env)

// create custom token for morgan logger
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

// we add our token to the output string
const output = ':method :url :status :res[content-length] - :response-time ms :body';

const logger = (req, res, next) => {
  console.log('Method', req.method)
  console.log('Path', req.path)
  console.log('Body', req.body)
  console.log('======')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json()) // JSON parser
app.use(morgan(output)) // Logger, using custom token (body)
app.use(cors()); // CORS Module for cross browser support
app.use(logger); // our own homespun midedleware for logging...

// get our data from the hardcoded file
let people = require('./data')

// get all entries
app.get('/api/persons', (req, res) => {
  res.json(people)
})

// get a single entry
app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end();
  }
})

// update entry
// app.put('api/people/:id', (req, res) => {
//   const id = parseInt(req.param.id);
//   const body = req.body;
//   console.log('PUPTT', id, body)
//   debugger;
//   people = people.map((person) => {
//     if (person.id !== id) {
//       return person;
//     } else {
//       body.id = id;
//       return body
//     }
//   })
//   if (body.name) {
//     console.log('body', body)
//   }
// })

// Add entry
app.post('/api/persons', (req, res) => {
  const body = req.body;
  console.log('POST', body)
  debugger
  // Throw error if no name or number sent
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name & number needed'
    })
  }
  
  // TODO: fix so it doesn't post if names dup
  people.filter(person => {
    if (person.name.toLowerCase().trim() === body.name.toLowerCase().trim()) {
      return res.status(400).json({
        error: 'names must be unique'
      }).end()
    } 
  })

  const randNumb = max => Math.floor(Math.random() * max);
  
  const entry = {
    id: randNumb(9999),
    name: body.name,
    number: body.number,
  }
  people = people.concat(entry)
  res.json(entry)
  
})

// Delete a single entry by id
app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  people = people.filter(person => person.id !== id)
  res.status(204).end();
})

// our info page
app.get('/info', (req, res, next) =>{
  const entries = people.length;
  res.send(`Phonebood has entries for ${entries} people <br> ${new Date()}`)
})

// our middleware to catch any rtoutes user tries to hit that don't exist
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})