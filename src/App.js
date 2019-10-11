import React, { useState, useContext} from 'react'
import Count from './Count'
import IncDec from './IncDec'
import './App.css'
import { AppContext } from './AppContext'

const axios = require('axios')

function App(props) {
  const [starWarsCharacter, setStarWarsCharacter] = useState('')
  
  const getMeAStarWarsCharacter = async () => {
    const response = await axios.get('https://swapi.co/api/people/1/')
    return setStarWarsCharacter(response.data.name)
  }

//question for leigh - why can i access peteState below?

  return (
    <div>
      <AppContext>
          <Count/>
          <IncDec/>
          <p onClick={getMeAStarWarsCharacter}>Get me a star wars character: {starWarsCharacter} </p>
      </AppContext>
    </div>
  )
}

export default App;
