import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import New_Person from './Components/New_Person'
import All_Persons from './Components/All_Persons'

const App = () => {

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filterObj, setFilterObj] = useState({});


useEffect(() => {
  axios 
    .get('http://localhost:3001/persons')
    .then(response => {
      const data = response.data;
      //console.log(data)
      //persons.push(data)
      setPersons(data)
    })
},[])



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

  // set name to filter 
  const filterNameHandler = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  }

  // if name to filter exists, update filter obj to existing person
  const checkFilterExists = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i]['name'].toLowerCase() === filter.toLowerCase()) {
        filterObj['name'] = persons[i]['name'];
        filterObj['number'] = persons[i]['number'];
        setFilterObj(filterObj);
      } 
    }
  }

  // on click, dispay alert message with filtered name if it exists
  const submitFilter = (event) => {
    event.preventDefault();
    checkFilterExists();
    if (filterObj['name']) {
      window.alert(`${filterObj['name']} : ${filterObj['number']}`)
    } else {
      window.alert('Name does not exist')
    }
    resetFilter()
    resetFilterObj()
  }

  const resetFilter = () => {
    setFilter('');
  }

  const resetFilterObj = () => {
    setFilterObj({});
  }


  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterHandler={filterNameHandler} filter={filter} submitFilter={submitFilter} />

      <New_Person newNameHandler={newNameHandler} newName={newName} newNumberHandler={newNumberHandler} 
                  newNumber={newNumber} newNameSubmit={newNameSubmit} debugNewNumber={newNumber} debugNewName={newName} />


      
      <h2>Numbers:</h2>
        
        <All_Persons persons={persons} />
    </div>
  )
}

export default App