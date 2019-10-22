import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap';
import { MyContext } from './AppContext';
import { countTypeOfProduct } from './Basket'

const incrementOrNewProduct = (cart, newProduct) => {
  let arrayOfIds = []
  cart.forEach(product => {
    arrayOfIds.push(product.sku)
    })
  arrayOfIds.filter(sku => sku === newProduct.sku)
  if (arrayOfIds) {
    console.log("increment")
    return
  }
  else {
    console.log("add a new product")
    return
  }
}

const selectedProduct = (sku) => {
  const increaseQuantity = {
    type: 'increaseQuantity',
    payload: sku
  }
  return increaseQuantity
}

const addProduct = (product) => {
  //pass the product not the state
  const addProduct = {
    type: 'addProduct',
    payload: product  
    }
  return addProduct
}

    const Products = (props) => {
      const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
      return (
        <Card>
        {state.products.map((product) => {
        return (
          <div>
            <Card.Body 
            idnumber={product.sku}>
              ID:{product.sku} 
              Name: {product.productName} 
              Cost: {product.price}<br/>
              <Button
              onClick={() => {
                dispatch(selectedProduct(product.sku, state))}} 
              variant="primary">
                Increment
              </Button>
              <Button
              onClick={() => {
                incrementOrNewProduct(state.cart, product)
                dispatch(addProduct(product))}}
              >
                Add product
              </Button>
            </Card.Body>
          </div>
        )
      })}
    </Card>
  )
}

export { Products }