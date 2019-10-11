import React from 'react'
import './App.css'

function Info({numberOfClicks}) {
  return (
    <div numberOfClicks={numberOfClicks}>{numberOfClicks}</div>
  )
}

export default Info;
