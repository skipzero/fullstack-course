const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

// create custom token for morgan logger
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({error: 'Malformed Id'})
  }
  next(err)
}

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
app.use(express.static('build')) // our frontend static code
app.use(morgan(output)) // Logger, using custom token (body)
app.use(cors()); // CORS Module for cross browser support
app.use(logger); // our own homespun midedleware for logging...

// get all entries
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(result => {
      console.log(result)
      res.json(result)
      })
    .catch(err => {
      next(err)
    })
})

// get a single entry
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.parms.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})


// update entry
app.put('api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

// Add entry
app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  console.log('POST', body)
  
  // Throw error if no name or number sent
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name & number needed'
    })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    }) 
    .catch(err => next(err))
})

// Delete a single entry by id
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(resp => {
    if (resp) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  })
  .catch(err => {
    next(err);
  });
})

// our info page
app.get('/info', (req, res, next) =>{
  Person.find({})
    .then(people => {  
      const entries = people.length;
      res.send(`Phonebood has entries for ${entries} people <br> ${new Date()}`)
    })
    .catch(err => next(err))
})


// our middleware to catch any rtoutes user tries to hit that don't exist
app.use(unknownEndpoint)
app.use(errorHandler)



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})