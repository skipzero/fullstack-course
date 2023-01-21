import { useState, useEffect } from 'react';

import Form from './components/Form/';
import Person from './components/Person/'
import Filter from './components/Filter/'
import phoneServices from './services/phonebook'
const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '334-3344',
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    phoneServices
      .getAll()
      .then(res => {
        console.log('useEffect', res)
        setPersons(res)
      })
    }, [])

  const handleNameChange = (e) => {
    console.log('Target', e)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log('numb', e.target)
    setNewNumber(e.target.value)

  }

  const addPerson = (e) => {
    e.preventDefault();
    const testPerson = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());
    const personObj = {
      name: newName,
      number: newNumber,
    }
    if (testPerson.length === 0) {

      phoneServices
        .create(personObj)
        .then(res => {
          setPersons(res.concat(personObj))
          setNewName('')
          setNewNumber('')
        })
    } else if (window.confirm(`${newName} already exists, would you like to update the phone number?`)) {
      const id = testPerson[0].id
      phoneServices
        .update(id, personObj)
        .then(res => {
          setPersons(persons.map(person => {
            if (person.id !== id) {
              return person;
            } else {
              return res;
            }
          }))
        })
        .catch(err => {
          console.error(`ERROR: ${err.message} occurred in updating number`)
        })
    }
  }

  const deletePerson = id => {
    phoneServices
      .remove(id)
      .then(res => {
        setPersons(persons.filter(person => id !== person.id))
      })
  }

  const handleFilter = (e) => {
    const filterName = e.target.value;
    const filteredArray = () => {
      const filteringArr = [...persons]
      return filteringArr.filter((el) => el.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    setFilterBy(filterName)
    setPersons(filteredArray)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilter} filter={filterBy}/>
      <Form addPerson={addPerson}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newNumber={newNumber}
      newName={newName}
      />
      <h2>Numbers</h2>
      <ul>
        {
        persons.map(({name, number, id}) => {
          console.log('person', persons, name)
            return (
            <li key={name}>
              <Person name={name} number={number} id={id} deletePerson={deletePerson}/>
            </li>
            )
          })}
      </ul>
    </div>
  )
}

export default App;