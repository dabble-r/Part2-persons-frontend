import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('');


  const newNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

  const newNameSubmit = (event) => {
    event.preventDefault();
    persons.push({name: newName})
    //console.log(newName)
    setPersons(persons)
    resetNewName()
  }

  const resetNewName = () => {
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={newNameHandler} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={newNameSubmit}>add</button>
        </div>
        <div>
          debug: {newName}
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(ele=> <li key={ele.name}>{ele.name}</li>)}
        </ul>
    </div>
  )
}

export default App