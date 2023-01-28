import { useState, useEffect } from 'react';

import Form from './components/Form/';
import Person from './components/Person/'
import Filter from './components/Filter/'
import phoneServices from './services/phonebook'
import Notification from './components/Notification/';
const App = () => {

  const [people, setPeople] = useState([
    { name: 'Arto Hellas',
      number: '334-3344',
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [query, setQuery] = useState({
    search: '',
    list: []
  })
  const [message, setMessage] = useState({text:'', status: null})

  useEffect(() => {
    phoneServices
      .getAll()
      .then(res => {
        console.log('useEffect', res)
        setPeople(res)
        setQuery({
          query: '',
          list: res
        })
      })
      .catch(err => {
        console.error(`ERROR: ${err.message} occurred while loading entries`)
        setMessage({text: `ERROR: ${err.message} occurred while loading entries.`, status: 'error'})
        setTimeout(() => {
          setMessage({text: '', status: null})
        }, 2500)
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
    const testPerson = people.filter(person => person.name.toLowerCase() === newName.toLowerCase());
    const personObj = {
      name: newName,
      number: newNumber,
    }

    if (testPerson.length === 0) {
      phoneServices
        .create(personObj)
        .then(res => {
          console.log('create', res)
          setPeople(res.concat(personObj))
          setMessage({text: `${newName} was successfully added!`, status: 'success'})
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage({text: '', status: null})
          }, 2500)
        })
    } else if (window.confirm(`${newName} already exists, would you like to update the phone number?`)) {
      const id = testPerson[0].id
      phoneServices
        .update(id, personObj)
        .then(res => {
          setPeople(people.map(person => {
            if (person.id !== id) {
              return person;
            } else {
              return res;
            }
          }))
        })
        .catch(err => {
          console.error(`ERROR: ${err.message} occurred in updating number`)
          setMessage({text: `An error occurred when adding ${newName}`, status: 'error'})
          setTimeout(() => {
            setMessage({text: '', status: null})
          }, 2500)
        })
    }
  }

  const deletePerson = id => {
    phoneServices
      .remove(id)
      .then(res => {
        const deletedPerson = people.filter(person => id === person.id)
        setPeople(people.filter(person => id !== person.id))
        setMessage({text:`${deletedPerson} has been added`, status: 'success'})
        setTimeout(() => {
          setMessage({text: '', status: null})
        }, 2500)
      })
      .catch(err => {
        console.error(`ERROR: ${err.message} occurred while deleting`)
        setMessage({text: 'User already deleted', status: 'error'})
        setTimeout(() => {
          setMessage({text: '', status: null})
        }, 2500)
      })
  }

  const handleFilter = (event) => {
    console.log('Event', event)
    let targetFilter;
    if (event.target) {
      targetFilter = event.target.value;
    } else {
      targetFilter = event;
    }
    
    setFilter(targetFilter);
    
    const results = people.filter(person => {
      console.log('++++', person)
      if (targetFilter === '') return people;
      return person.name.toLowerCase().includes(targetFilter.toLowerCase())
    });
    setQuery({
      query: targetFilter,
      list: results
    });
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.text} status={message.status} />
      <Filter handleFilter={handleFilter} value={filter}/>
      <Form addPerson={addPerson}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newNumber={newNumber}
      newName={newName}
      />
      <h2>Numbers</h2>
      <ul>
        {
        query.list.map(({name, number, id}) => {
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