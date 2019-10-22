import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap';
import { MyContext } from './AppContext';
import { countTypeOfProduct } from './Basket'

// const skuOfProducts = (data) => {
//   let arrayOfIds = []
//   data.forEach(lineItem => {
//     arrayOfIds.push(lineItem.sku)
//     })
//     return arrayOfIds
// }

const selectedProduct = (sku) => {
  const increaseQuantity = {
    type: 'increaseQuantity',
    payload: sku
  }
  return increaseQuantity
}

const addProduct = (sku) => {
  const addProduct = {

  }
}

  // const update = {
    //   type: 'addProductToCart',
    //   payload: {
      //     id: parent.getAttribute('idnumber'),
      
      //     products: state.cart.products,
      //     numberOfEachProduct: numberOfEachProduct
      //   }
      // }
      // return update
    


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