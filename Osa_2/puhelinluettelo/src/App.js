import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={addPerson}>
        <div>
          name: <input />
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