import { useState } from 'react';

import Form from './components/Form/';
import Person from './components/Person/'

const Filter = ({filter, onChange}) => {
  return (
    <>
      <label>Filter<input value={filter} onChange={onChange}/></label>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '334-3344',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

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
    const personObj = {
      name: newName,
      number: newNumber,

    }
    if (persons.filter((person) => person.name !== newName)) {

      console.log('peeps', persons, newName)
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} already exists. Please eneter a new name`)
    }
  }

  const handleFilter = (e) => {
    const filterName = e.target.value;
    const filteredArray = () => {
      return persons.filter((el) => el.name.toLowerCase().includes(filterName.toLowerCase()));
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
        persons.map(({name, number}) => {
          console.log('person', persons, name)
            return (
            <li key={name}>
              <Person name={name} number={number}/>
            </li>
            )
          })}
      </ul>
    </div>
  )
}

export default App;