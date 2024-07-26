

const New_Person = (props) => {
  return (
    <>
      <form>
        <h2>Add new:</h2>

        <div>
          name: <input onChange={props.newNameHandler} value={props.newName}/>
          <br></br>
          number: <input onChange={props.newNumberHandler} value={props.newNumber}/>
        </div>

        <div>
          <button type="submit" onClick={props.newNameSubmit}>add</button>
        </div>

        <div>
          debug: {props.debugNewName}
          <br></br>
          debug: {props.debugNewNumber}
        </div>
      </form>
    </>
  )
}

export default New_Person