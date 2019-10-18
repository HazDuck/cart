import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap';
import { MyContext } from './AppContext';
import { countTypeOfProduct } from './Basket'

const selectedProduct = (e, state) => {
  const target = e.target
  const parent = target.parentElement
  const numberOfEachProduct = countTypeOfProduct(state.cart.products)
  const update = {
    type: 'addProductToCart',
    payload: {
      id: parent.getAttribute('idnumber'),
      products: state.cart.products,
      numberOfEachProduct: numberOfEachProduct
    }
  }
  return update
}

const Products = (props) => {

  const [dispatch, statey, peteState, setPeteState] = useContext(MyContext)
  const showProducts = Object.values(statey.products)
  return (
    <Card>
      {showProducts.map((product) => {
        return (
          <div>
            <Card.Body 
            idnumber={product.id}>
              ID:{product.id} 
              Name: {product.productName} 
              Cost: {product.price}<br/>
              <Button
              onClick={(e) => {
                dispatch(selectedProduct(e, statey))}} 
              variant="primary">
                Add to cart
              </Button>
            </Card.Body>
          </div>
        )
      })}
    </Card>
  )
}

export { Products }