import { useState, useEffect } from 'react';

import Form from './components/Form/';
import Person from './components/Person/'
import Filter from './components/Filter/'
import phoneServices from './services/'
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
  const [list, setList] = useState([])
  const [message, setMessage] = useState({
    text:'',
    status: ''
  })

  const reset = () => {
    setNewName('')
    setNewNumber('')
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
        setList(res)
        return res
      }).then((res) => console.log('fetch', res))
      .catch(err => {
        console.error(`ERROR: ${err.message} occurred while loading entries`)
        setMessage({
          text: `ERROR: ${err.message} occurred while loading entries.`,
          status: 'error show'
        })
        reset();
      })
    }, [])

  const handleNameChange = (e) => {
    const val = e.target.value;
    console.log('Target', val)
    setNewName(val.trim())
  }

  const handleNumberChange = (e) => {
    const val = e.target.value;
    setNewNumber(val)
  }

  // add new record
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
          setPeople(people.concat(personObj))
          setList(list.concat(personObj))
          setMessage({
            text: `${newName} was successfully added!`,
            status: 'success show'
          })
          reset();
        })
      } else if (testPerson[0].name.toLowerCase() === newName.toLowerCase()) {
        setMessage({
          text: 'Name must be unique',
          status: 'error show'
        })
      }
      reset();
    
    // else if (window.confirm(`${newName} already exists, would you like to update the phone number?`)) {
    //   const id = testPerson[0].id
    //   phoneServices
    //     .update(id, personObj)
    //     .then(res => {
    //       setList(list.map(person => {
    //         debugger
    //         if (person.id !== id) {
    //           return person;
    //         } else {
    //           return res;
    //         }
    //       }))
    //       setPeople(list.map(person => {
    //         if (person.id !== id) {
    //           return person;
    //         } else {
    //           return res;
    //         }
    //       }))
    //       reset();
    //       setMessage({
    //         text: `${newName} has been updated.`,
    //         status: 'success show'
    //       })
    //       stopNotification()
    //     })
    //     .catch(err => {
    //       console.error(`ERROR: ${err.message} occurred in updating number`)
    //       setMessage({
    //         text: `An error occurred when adding ${newName}`,
    //         status: 'error show'
    //       })
    //       stopNotification()
    //     })
    // }
  }

  const deletedPerson = id => {
    phoneServices
      .remove(id)
      .then(res => {
        console.log('DELETE', id, res)
        const deletedPerson = people.filter(person => id === person.id)

        // setPeople(people.filter(person => id !== person.id))
        setList(list.filter(person => id !== person.id))
        console.log('DELETED', deletedPerson[0])
        setMessage({
          text:`${deletedPerson[0].name} has been deleted`, 
          status: 'success show'
        })
        reset();
      })
      .catch(err => {
        console.error(`ERROR: ${err.message} occurred while deleting`)
        setMessage({
          text: 'User already deleted',
          status: 'error show'
        })
        reset()
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
    setList(results)
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
          list.map(({name, number, id}) => {
            return (
            <li key={name}>
              <Person name={name} number={number} id={id} deletedPerson={deletedPerson}/>
            </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App;