import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap';
import { MyContext } from './AppContext';
import { countTypeOfProduct } from './Basket'

const incrementOrNewProduct = (cart, newProduct) => {
  let arrayOfIds = []
  cart.forEach(product => {
    arrayOfIds.push(product.sku)
    })
  const productSKU = arrayOfIds.find(product => product === newProduct.sku)
  if (productSKU) {
    return increaseQuantity(newProduct.sku)
  }
  else {
    return addProduct(newProduct)
  }
}

const increaseQuantity = (sku) => {
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
          <div key={product.sku}>
            <Card.Body 
            idnumber={product.sku}>
              ID:{product.sku} 
              Name: {product.productName} 
              Cost: {product.price}<br/>
              <Button
              onClick={() => {dispatch(incrementOrNewProduct(state.cart, product))}}>
                Add to cart
              </Button>
            </Card.Body>
          </div>
        )
      })}
    </Card>
  )
}

export { Products, increaseQuantity }