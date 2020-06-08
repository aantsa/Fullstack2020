import React, { useState } from 'react'
import Person from './components/Person'
import Persons from './components/Persons'

const App = (props) => {
  const [ persons, setPersons] = useState([]) 
  const [ person, setPerson] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  console.log(newName)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={addPerson}>
        <div>
          name: <input 
          value = {newName}
          onChange = {handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
      <h2>Numbers</h2>
        {persons.map((person, i) =>
        <Person key={i} person={person}/>
        )}
      </div>
    </div>
  )
}

export default App