import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import New_Person from './Components/New_Person'
import All_Persons from './Components/All_Persons'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filterObj, setFilterObj] = useState({});
  

// effect hook, render once, initial state of persons array (db.json)
useEffect(() => {
  personsService  
      .getAll()
      .then(initialPersons=>setPersons(initialPersons))
},[])

/*
// create new person on db
personsService 
  .create(personObj)
  .then(returnPerson => {
    setPersons(persons.concat(returnPerson))
    resetNewName()
    resetNewNumber()
  })

// update person on db
  personsService 
    .update(id, changedPerson) 
    .then(returnPerson => {
      setPersons(persons.concat(returnPerson))
      resetNewName()
      resetNewNumber()
    })
  */

  // update input name to add
  const newNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

//check if name to add exists
  const newNameExists = () => {
    for (let i = 0; i < persons.length; i++) {
      if (!persons[i]['name']) {
        return false;
      } else if (persons[i]['name'].toLowerCase() === newName.toLowerCase()) {
        return true;
      }
    }
  }

 // id generator for new person
 
const idGenerator = () => {
  let temp = Math.floor(Math.random() * 1000);
  return temp;
}


 // if name to add does not exists, add to perosns array of objs
  const newPersonSubmit = (event) => {
    event.preventDefault();
    let ranId = String(idGenerator());

    let personObj = {};
      if (newNameExists()) {
        window.alert(`${newName} already exists!`)
      } else if (!newNameExists()) {
        personObj['name'] = newName;
        personObj['number'] = newNumber;
        personObj['id'] = ranId;
      }
      personsService 
        .create(personObj)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
     })
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

  const deletePersonById = (event) => {
    event.preventDefault();
    let id = event.target.value;
    
    personsService  
      .deleteById(id)
      .then(returnPersons => setPersons(persons.filter(ele => ele.id !== id)))
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterHandler={filterNameHandler} filter={filter} submitFilter={submitFilter} />

      <New_Person newNameHandler={newNameHandler} newName={newName} newNumberHandler={newNumberHandler} 
                  newNumber={newNumber} newNameSubmit={newPersonSubmit} debugNewNumber={newNumber} debugNewName={newName} />


      
      <h2>Numbers:</h2>
        
        <All_Persons persons={persons} deletePerson={deletePersonById} />
    </div>
  )
}

export default App