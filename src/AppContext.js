import React, { createContext, useState, useReducer, useContext } from 'react'

const MyContext = createContext(
  // [{}, ()=>{}]
  //what do? 
  )
  
  const AppContext = (props) => {
    
    const [peteState, setpeteState] = useState({
      numberOfClicks: 0,
      value: 99,
      color: 'red'
    })
    
    const [statey, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case 'inc': 
          return { ...state,  value: state.value +1 }
          case 'dec': 
          return { ...state,  value: state.value -1 }
          case 'resetCount': 
          return { ...state,  value: 0 }
          default:
            return console.log("error mofo")
          } 
      }, peteState)
  
  return (
    <MyContext.Provider value={[peteState, setpeteState, dispatch, statey]}>
        {props.children}
    </MyContext.Provider>
  )
}

export { AppContext, MyContext }