import React from 'react'
import './App.css'
import { AppContext } from './AppContext'
import { Products } from './Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Basket } from './Basket';

function App(props) {

  return (
    <div>
      <AppContext>
        <Products/>
        <Basket/>
      </AppContext>
    </div>
  )
}

export default App;
