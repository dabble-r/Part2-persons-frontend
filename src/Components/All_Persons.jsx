

const All_Persons = (props) => {
  return (
    <>
      <div>
        <ul>
          {props.persons.length ? props.persons.map(ele=> <li key={ele.id}>{ele.name ? ele.name : ''} {ele.number ? '-- ' + ele.number : ''} <button onClick={props.deletePerson} value={ele.id} name={ele.name}>delete</button></li>) : ""}
        </ul>
      </div>
    
    
    </>
  )
}

export default All_Persons