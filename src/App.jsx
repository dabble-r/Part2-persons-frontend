import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');


  const newNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

  const newNameExists = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i]['name'].toLowerCase() === newName.toLowerCase()) {
        return true;
      }
    }
  }

  const newNameSubmit = (event) => {
    event.preventDefault();
      if (newNameExists()) {
        window.alert(`${newName} already exists!`)
      } else if (!newNameExists()) {
        persons.push({name: newName, number: newNumber})
        setPersons(persons);
      }
      resetNewName();
      resetNewNumber();
    //console.log(newName)
  }

  const resetNewName = () => {
    setNewName('');
  }

  const resetNewNumber = () => {
    setNewNumber('');
  }

  const newNumberHandler = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value)
  }

  


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={newNameHandler} value={newName}/>
          <br></br>
          number: <input onChange={newNumberHandler} value={newNumber}/>
        </div>
        <div>
          <button type="submit" onClick={newNameSubmit}>add</button>
        </div>
        <div>
          debug: {newName}
          <br></br>
          debug: {newNumber}
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(ele=> <li key={ele.name}>{ele.name ? ele.name : 'Phonebook empty'} {ele.number ? '--' + ele.number : ''}</li>)}
        </ul>
    </div>
  )
}

export default App