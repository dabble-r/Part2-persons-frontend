

const Filter = (props) => {
  return (<>
              <form>
                <div>
                  filter: <input onChange={props.filterHandler} value={props.filter}/>
                  <div>
                    <button type="submit" onClick={props.submitFilter}>search</button>
                  </div>
                  <div>
                    debug: {props.filter}
                  </div>
                </div>
              </form>
         </>)
}

export default Filter