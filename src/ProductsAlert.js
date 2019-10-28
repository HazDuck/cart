import React, { useContext, useEffect } from 'react'
import {Alert} from 'react-bootstrap'
import { MyContext } from './AppContext'


const ProductsAlert = (props) => {
  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
  return(
    <div>
      {state.showingSuccessfulAddToCart ? 
        <Alert variant="success">Added to cart</Alert>
        :
        ''
      }
    </div>
  )
}

export { ProductsAlert }