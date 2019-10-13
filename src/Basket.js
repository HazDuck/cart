import React, { useContext } from 'react'
import { MyContext } from './AppContext';

const Basket = (props) => {
  const [dispatch, statey, peteState, setPeteState] = useContext(MyContext)
  return (
    <>
      <p>Welcome to the basket</p>
      <p>Number of Products: {statey.cart.numberOfProducts}</p>
      <p>Subtotal: £{statey.cart.subtotal}</p>
    </>
  )
}

export default Basket