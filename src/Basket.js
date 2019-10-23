import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap'
import { MyContext } from './AppContext'

const onlyUnique = (value, index, self) => { 
  return self.indexOf(value) === index;
}

const makeArrayOfProducts = (products) => {
  let arrayOfIds = []
  products.forEach(product => {
    arrayOfIds.push(product.id)
    })
    return arrayOfIds
}

const makeUniqueIDArray = array => array.filter(onlyUnique)

const countTypeOfProduct = (products) => {
  const arrayOfIds = makeArrayOfProducts(products)
  const uniqueVals = makeUniqueIDArray(arrayOfIds)
  const countOfProducts = countNumberOfEachProduct(arrayOfIds, uniqueVals)
  return countOfProducts
}

const countNumberOfEachProduct = (arrayOfIds, uniqueVals) => {
  const productCount = {}
  uniqueVals.forEach((index)=>{
    productCount[index] = 0
  })
  arrayOfIds.forEach(id => {
    uniqueVals.forEach(value => {
      if (id === value) {
        productCount[value]++
      } 
    })
  })
  return productCount
}

const makeArrayOfItems = (data) => {
  let arrayOfIds = []
  data.forEach(lineItem => {
    arrayOfIds.push(lineItem.quantity)
    })
    return arrayOfIds
}

const cartTotal = (accumulator, currentValue ) => {
  const itemTotal = currentValue.quantity * currentValue.price
  return accumulator + itemTotal
}

const removeItemFromCart = sku => {
  const removeItemFromCart = {
    type: 'removeItemFromCart',
    payload: sku
  }
  return removeItemFromCart
}

const emptyCart = () => {
  const emptyCart = {
    type: 'emptyCart',
  }
  return emptyCart
}

const Basket = (props) => {
  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
  return (
    <Card>
      <div>
        <p>Welcome to the basket</p>
        <p>{state.cart.map((product)=>{
            return (
              <Card.Body>
              ID:{product.sku}
              Name:{product.productName}
              Cost:{product.price}
              Count: {product.quantity}
              <Button
                onClick={() => {dispatch(removeItemFromCart(product.sku))}}
                >Remove from basket</Button>
            </Card.Body> 
          )
        })
        }
        </p>
        <p>Subtotal: £{state.cart.length > 0 ? state.cart.reduce(cartTotal, 0) : 0}</p>
        <Button
          onClick={() => {dispatch(emptyCart())}}
        >Empty Basket</Button>
      </div>
    </Card>
  )
}

export { Basket, countTypeOfProduct }