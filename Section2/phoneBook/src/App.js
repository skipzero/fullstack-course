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
  const [message, setMessage] = useState({
    text:'',
    status: ''
  })

  const stopNotification = () => {
    setTimeout(() => {
      setMessage({
        text: '',
        status: ''
      })
    }, 3000)
  }

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
        return res
      }).then((res) => console.log('fetch', res))
      .catch(err => {
        console.error(`ERROR: ${err.message} occurred while loading entries`)
        setMessage({
          text: `ERROR: ${err.message} occurred while loading entries.`,
          status: 'error show'
        })
        stopNotification();
      })
    }, [])

  const handleNameChange = (e) => {
    const val = e.target.value;
    console.log('Target', val)
    setNewName(val)
  }

  const handleNumberChange = (e) => {
    const val = e.target.value;
    setNewNumber(val)

  }

  const addPerson = (e) => {
    e.preventDefault();
    const testPerson = people.filter(person => person.name.toLowerCase() === newName.toLowerCase().trim());
    const personObj = {
      name: newName.trim(),
      number: newNumber,
    }

    if (testPerson.length === 0) {
      phoneServices
        .create(personObj)
        .then(res => {
          console.log('create', res)
          setPeople(query.list.concat(personObj))
          setQuery({
            query: '',
            list: people.concat(personObj)
          })
          setMessage({
            text: `${newName} was successfully added!`,
            status: 'success show'
          })
          stopNotification();
          setNewName('')
          setNewNumber('')
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
          // setQuery(people.map(person => {
          //   if (person.id !== id) {
          //     return person;
          //   } else {
          //     return res;
          //   }
          // }))
          setMessage({
            text: `${newName} has been updated.`,
            status: 'success show'
          })
          stopNotification()
        })
        .catch(err => {
          console.error(`ERROR: ${err.message} occurred in updating number`)
          setMessage({
            text: `An error occurred when adding ${newName}`,
            status: 'error show'
          })
          stopNotification()
        })
    }
  }

  const deletePerson = id => {
    phoneServices
      .remove(id)
      .then(res => {
        const deletedPerson = people.filter(person => id === person.id)
        setPeople(people.filter(person => id !== person.id))
        setQuery({
          query: '',
          list: people.filter(person => id !== person.id)
        })
        setMessage({
          text:`${deletedPerson} has been deleted`, 
          status: 'success show'
        })
        stopNotification()
      })
      .catch(err => {
        console.error(`ERROR: ${err.message} occurred while deleting`)
        setMessage({
          text: 'User already deleted',
          status: 'error show'
        })
        stopNotification()
      })
  }

  const handleFilter = (event) => {
    let targetFilter;
    if (event.target) {
      targetFilter = event.target.value;
    } else {
      targetFilter = event;
    }
    
    setFilter(targetFilter);
    
    const results = people.filter(person => {
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
      <Notification text={message.text} status={message.status} setMessage={setMessage} />
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
          console.log('return', query.list)} {
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