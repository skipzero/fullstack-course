const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://bfalcon510:${password}@fsclusterzed.uh8mopv.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const connectMongo = async () => {
  await mongoose.connect(url, {})
  return mongoose;
}

(async () => {
  await connectMongo();
  console.log('fired...')
  mongoose.set('strictQuery',false)
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
  debugger;
  person.save()
    .then(() => {
      mongoose.connection.close();
    });
  // mongoose.connection.close();

  if (process.argv.length === 3) {
    Person.find({})
      .then(result => {
        result.forEach(person => {
          console.log(person)
        })
      })
      .then(() => {
        mongoose.connection.close();
      })
  }

})()