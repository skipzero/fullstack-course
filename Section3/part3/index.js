const express = require('express');
const app = express();

app.use(express.json())

const people = require('./data')

app.get('/api/people', (req, res) => {
  console.log('RES', req.headers)
  res.send(people)
})

app.get('/api/people/:id', (req, res) => {
  console.log('GET', req.params)
  const id = parseInt(req.params.id);
  const person = people.find(person => person.id === id)
  console.log('RES', person, req)
  if (person) {
    res.send(person)
  } else {
    res.status(404).end();
  }
})

app.delete('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id)
  person = people.filter(person => person.id !== id)
  console.log('delete', person, people)
  res.status(204).end();

})

app.get('/info', (req, res) =>{
  const entries = people.length;
  res.send(`Phonebood has entries for ${entries} people <br> ${new Date()}`)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})