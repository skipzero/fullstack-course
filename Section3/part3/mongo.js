const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

mongoose.set('strictQuery',false)

const password = process.argv[2]

const url =
  `mongodb+srv://bfalcon510:${password}@fsclusterzed.uh8mopv.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const connectMongo = async () => {
  await mongoose.connect(url, {})
  return mongoose;
}

(async () => {
  await connectMongo();
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: Number
  });

  const Person = mongoose.model('Person', personSchema)
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number
  });
  
  if (process.argv.length === 5) {
    person.save()
      .then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
      })
      .then(() => {
        mongoose.connection.close();
      });
  }

  if (process.argv.length === 3) {
    Person.find({})
      .then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          if (person.name !== undefined) {
            console.log(person.name, person.number)
          }
        })
      })
      .then(() => {
        mongoose.connection.close();
      })
  }

})()