import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filterObj, setFilterObj] = useState({});


  // update input name to add
  const newNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

//check if name to add exists
  const newNameExists = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i]['name'].toLowerCase() === newName.toLowerCase()) {
        return true;
      }
    }
  }

 // if name to add does not exists, add to perosns array of objs
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

 // reset new name to add
  const resetNewName = () => {
    setNewName('');
  }

 // reset new humber to add
  const resetNewNumber = () => {
    setNewNumber('');
  }

 // new number handler, new number to add
  const newNumberHandler = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value)
  }

  
  const filterNameHandler = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  }

  const checkFilterExists = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i]['name'].toLowerCase() === filter.toLowerCase()) {
        filterObj['name'] = persons[i]['name'];
        filterObj['number'] = persons[i]['number'];
        setFilterObj(filterObj);
      }
    }
  }

  const submitFilter = (event) => {
    event.preventDefault();
    checkFilterExists();
    window.alert(`${filterObj['name']} : ${filterObj['number']}`)
    resetFilter('')
  }

  const resetFilter = () => {
    setFilter('');
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          filter: <input onChange={filterNameHandler} value={filter}/>
          <div>
            <button type="submit" onClick={submitFilter}>search</button>
          </div>
          <div>
            debug: {filter}
          </div>
        </div>
      </form>
      <form>
        <h2>Add new:</h2>
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
      <h2>Numbers:</h2>
        <ul>
          {persons.map(ele=> <li key={ele.name}>{ele.name ? ele.name : 'Phonebook empty'} {ele.number ? '--' + ele.number : ''}</li>)}
        </ul>
    </div>
  )
}

export default App