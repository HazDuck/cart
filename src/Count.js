import React, { useContext } from 'react';
import { MyContext } from './AppContext'
import './App.css';

function Count(props) {
  const [peteState, setPeteState, dispatch, state] = useContext(MyContext)

  return(
    <div>
      <p>Here is a color: {state.color}</p>
      <button onClick={()=>{return setPeteState({...peteState, numberOfClicks: peteState.numberOfClicks + 1})}}>
        Increase Count
      </button>
      <button onClick={()=>{return setPeteState({...peteState, numberOfClicks: 0})}}>
        Clear
      </button>
      <p>Number of Clicks {peteState.numberOfClicks}</p>
      <p>{state.value}</p>
    </div>
  )
}

export default Count;
