const express = require('express');
const app = express();
const morgan = require('morgan');

// create custom token for morgan logger
morgan.token('body', (req, res) => {
  console.log('BODY', req.body)
  return JSON.stringify(req.body)
})

// we add our token to the output string
const output = ':method :url :status :res[content-length] - :response-time ms :body';

app.use(express.json()) // JSON parser
app.use(morgan(output)) // Logger, using custom token (body)

// get our data from the hardcoded file
let people = require('./data')

// get all entries
app.get('/api/people', (req, res) => {
  res.send(people)
})

// get a single entry
app.get('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find(person => person.id === id)
  if (person) {
    res.send(person)
  } else {
    res.status(404).end();
  }
})

// Add entry
app.post('/api/people', (req, res) => {
  const body = req.body;

  const id = () => {
    return Math.floor(Math.random() * 10000)
  }

  // Throw error if no name or number sent
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name & number needed'
    })
  } 
  
  // TODO: fix so it doesn't post if names dup
  people.filter(person => {
    console.log('POST ppl', person.name, body.name)
    console.log('person', person)
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
app.delete('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id)
  person = people.filter(person => person.id !== id)
  res.status(204).end();

})

// our info page
app.get('/info', (req, res) =>{
  const entries = people.length;
  res.send(`Phonebood has entries for ${entries} people <br> ${new Date()}`)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})