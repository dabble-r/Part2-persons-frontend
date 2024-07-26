

const All_Persons = (props) => {
  return (
    <>
      <div>
        <ul>
          {props.persons.map(ele=> <li key={ele.name}>{ele.name ? ele.name : 'Phonebook empty'} {ele.number ? '--' + ele.number : ''}</li>)}
        </ul>
      </div>
    
    
    </>
  )
}

export default All_Persons