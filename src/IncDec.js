import React, { useContext,} from 'react';
import './App.css';
import { MyContext } from './AppContext';

const IncDec = (props) => {

  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)

    return(
      <React.Fragment>
        <button onClick={() => dispatch({type: 'inc'})}>+</button>
        <button onClick={() => dispatch({type: 'dec'})}>-</button>
        <button onClick={() => dispatch({type: 'resetCount'})}>Reset</button>
        <p>Count from using reducer: {state.value}</p>
      </React.Fragment>
    )
}

export default IncDec;