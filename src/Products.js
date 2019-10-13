import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap';
import { MyContext } from './AppContext';

const selectedProduct = (e, setPeteState) => {
  const target = e.target
  const parent = target.parentElement
  const update = {
    type: 'addProductToCart',
    payload: {
      id: parent.getAttribute('idNo')
    }
  }
  return setPeteState(update)
}

const Products = (props) => {

  const [dispatch, statey, peteState, setPeteState] = useContext(MyContext)
  const showProducts = Object.entries(statey.products)

  return (
    <Card>
      {showProducts.map((product) => {
        return (
          <React.Fragment>
            <Card.Body idNo={product[1].id} onClick={()=>{console.log(showProducts)}}>
                ID:{product[1].id} Name: {product[1].productName} Cost: {product[1].price}<br/>
              <Button 
              onClick={(e) => {
                console.log(selectedProduct(e))
                dispatch(selectedProduct(e))}} 
              variant="primary">Add to cart</Button>
            </Card.Body>
          </React.Fragment>
        )
      })}
    </Card>
  )
}

export { Products }