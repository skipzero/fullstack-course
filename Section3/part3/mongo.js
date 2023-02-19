const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
console.log('PROcess', process.argv)
const password = process.argv[2]

const url =
  `mongodb+srv://bfalcon510:${password}@fsclusterzed.uh8mopv.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close();
    })
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number
  })

  person.save().then(result => {
    console.log(`${name} saved to DB...`)
  }).then(
    mongoose.connection.close()
  )
}


Person.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })