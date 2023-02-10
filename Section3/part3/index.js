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
app.use(morgan(output)) // Logger, using custom token (body)
app.use(cors()); // CORS Module for cross browser support

// get our data from the hardcoded file
let people = require('./data')

// get all entries
app.get('/people', (req, res) => {
  res.send(people)
})

// get a single entry
app.get('/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find(person => person.id === id)
  if (person) {
    res.send(person)
  } else {
    res.status(404).end();
  }
})

// Add entry
app.post('/people', (req, res) => {
  const body = req.body;
  console.log('POST', body)
  const id = () => {
    const max = 9999;
    const getMin = () => {
      people.sort((a,b) => {
        a.id > b.id ? 1 : 
        a.id < b.id ? -1 :
        0
      })
      people.reverse()
      return people[0].id
    }
    const min = getMin();
    console.log('mib----=', people.reverse(), min)
    return Math.floor(Math.random() * (max - min + 1) - min)
  }
  
  // Throw error if no name or number sent
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name & number needed'
    })
  } 
  
  // TODO: fix so it doesn't post if names dup
  people.filter(person => {
    if (person.name.toLowerCase() === body.name.toLowerCase()) {
      return res.status(400).json({
        error: 'names must be unique'
      }).end()
    } 
  })
  
  
  const entry = {
    id: id(),
    name: body.name,
    number: body.number,
  }
  people = people.concat(entry)
  res.json(entry)
  
})

// Delete a single entry by id
app.delete('/people/:id', (req, res) => {
  const id = parseInt(req.params.id)
  person = people.filter(person => person.id !== id)
  res.status(204).end();

})

// our info page
app.get('/info', (req, res) =>{
  const entries = people.length;
  res.send(`Phonebood has entries for ${entries} people <br> ${new Date()}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})