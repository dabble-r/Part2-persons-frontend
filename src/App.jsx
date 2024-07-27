import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import New_Person from './Components/New_Person'
import All_Persons from './Components/All_Persons'
import Notification from './Components/Notification'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newPerson, setNewPerson] = useState({});
  const [updatePerson, setUpdatePerson] = useState({});
  const [filter, setFilter] = useState('');
  const [filterObj, setFilterObj] = useState({});
  const [notification, setNotification] = useState(null);
  

// effect hook, render once, initial state of persons array (db.json)
useEffect(() => {
  personsService  
      .getAll()
      .then(initialPersons=>setPersons(initialPersons))
},[])

  // update input name to add
  const newNameHandler = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }


// check if name to add exists
// made redundant by checkFilterExists fucnction
/*
  const newNameExists = () => {
    let flag;
    for (let i = 0; i < persons.length; i++) {
      if (!persons[i]['name']) {
        return false;
      } 
      if (persons[i]['name'].toLowerCase() === newName.toLowerCase()) {
        flag = true;
        Object.assign(newPerson, persons[i])
        setNewPerson(newPerson)
      }
    }
    return flag === true;
  }
*/

 // id generator for new person
const idGenerator = () => {
  let temp = Math.floor(Math.random() * 1000);
  return temp;
}

//functio to check if newNumber is a number
const isNumber = (num) => {
  return typeof num === 'number';
}


 // if name to add does not exists, add to perosns array of objs
  const newPersonSubmit = (event) => {
    event.preventDefault();
    checkUpdatePersonExists();
    //console.log('found', updatePerson)

      if (updatePerson['name']) {
        //console.log('found', filterObj)
        let id = updatePerson['id'];
        let number = updatePerson['number']
        if (window.confirm(`${newName} already exists! Would you like to update the phone number?`)) {
          if (isNumber(number)) {
            updatePerson['number'] = newNumber;
            // update found perosn with new number
          personsService  
            .update(id, updatePerson)
            .then(returnPerson => {
                setPersons(persons.map(ele => ele.id !== id ? ele : returnPerson));
              })
            .catch(error => {
                setNotification(`There was an error updating ${updatePerson['name']}`)
              })
          } else if (!isNumber(number)) {
            setNotification(`${newNumber} is not a number`)
            setTimeout(() => setNotification(null), 2000)
          } 
        }
      } 
      if (!updatePerson['name']) {
        if (isNumber(newNumber)) {
          let ranId = String(idGenerator());
          newPerson['name'] = newName;
          newPerson['number'] = newNumber;
          newPerson['id'] = ranId;
            setNewPerson(newPerson);
        // create new person if no person found
        personsService 
          .create(newPerson)
          .then(returnPerson => {
            setPersons(persons.concat(newPerson))
            
        })
        setNotification(`Added ${newPerson['name']}`)
        setTimeout(() => setNotification(null),2000)
        } else if (!isNumber(newNumber)) {
          setNotification(`${newNumber} is not a number`)
          setTimeout(() => setNotification(null),2000)
        }
        
    }
      resetNewName();
      resetNewNumber();
      resetNewPerson();
      resetUpdatePerson();
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
        filterObj['id'] = persons[i]['id'];
        setFilterObj(filterObj);
      } 
    }
  }
  
  // submit new person, check if perosn exists
  // sets state of updat person to new number, same name, same id
  const checkUpdatePersonExists = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i]['name'].toLowerCase() === newName.toLowerCase()) {
        Object.assign(updatePerson, persons[i]);
        setUpdatePerson(updatePerson);
      } 
    }
  }

  // remove a person form the phonebook with delete functionaility
  const deletePersonById = (event) => {
    event.preventDefault();
    let id = event.target.value;
    let name = event.target.name;
    window.confirm(`Are you sure you want to delete ${name}`);
    personsService  
      .deleteById(id)
      .then(returnPerson => setPersons(persons.filter(ele => ele.id !== id)))
      .catch(error => {
        setNotification(`${name} already deleted!`)
        setTimeout(() => setNotification(null),1000)
      })
      setNotification(`Deleted ${name}`)
      setTimeout(() => setNotification(null),2000)
  }
  
  // on click, dispay alert message with filtered name if it exists
  const submitFilter = (event) => {
    event.preventDefault();
    checkFilterExists();
    if (filterObj['name']) {
      window.confirm(`${filterObj['name']} : ${filterObj['number']}`)       
    } else {
      window.alert('Name does not exist')
    }
    resetFilter()
    resetFilterObj()
  }

  // reset the filtered name
  const resetFilter = () => {
    setFilter('');
  }

  // reset to initila state the person obj, output form name filter
  const resetFilterObj = () => {
    setFilterObj({});
  }

  // reset new name to add
  const resetNewName = () => {
    setNewName('');
  }

 // reset new humber to add
  const resetNewNumber = () => {
    setNewNumber('');
  }

  // reset newPerson to initla state
  const resetNewPerson = () => {
    Object.assign(newPerson, {})
    setNewPerson(newPerson);
  }

  const resetUpdatePerson = () => {
    Object.assign(updatePerson, {})
    setUpdatePerson(updatePerson);
  }

  

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification notification={notification} />


      <Filter filterHandler={filterNameHandler} filter={filter} submitFilter={submitFilter} />

      <New_Person newNameHandler={newNameHandler} newName={newName} newNumberHandler={newNumberHandler} 
                  newNumber={newNumber} newNameSubmit={newPersonSubmit} debugNewNumber={newNumber} debugNewName={newName} />


      
      <h2>Numbers:</h2>
        
        <All_Persons persons={persons} deletePerson={deletePersonById} />
    </div>
  )
}

export default App