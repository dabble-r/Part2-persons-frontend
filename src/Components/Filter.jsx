

const Filter = (props) => {
  return (<>
              <form>
                <div>
                  filter: <input onChange={props.filterHandler} value={props.filter}/>
                  
                  <div>
                  <span><br></br></span>
                    <button type="submit" onClick={props.submitFilter}>search</button>
                  </div>
                  
                </div>
              </form>
         </>)
}

export default Filter