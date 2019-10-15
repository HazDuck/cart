import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap'
import { MyContext } from './AppContext'

const Basket = (props) => {
  const [dispatch, statey, peteState, setPeteState] = useContext(MyContext)
  return (
    <>
      <p>Welcome to the basket</p>
      <p>Number of Products: {statey.cart.numberOfProducts}</p>
      <p>Subtotal: £{statey.cart.subtotal}</p>
      {/* <p>{statey.cart.products.map((product)=>{
        return (
            <Card.Body>
              ID:{product[1].id} 
              Name: {product[1].productName} 
              Cost: {product[1].price}<br/>
            </Card.Body> 
        )
      })}</p> */}
    </>
  )
}

export default Basket