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
                onClick={()=>console.log('remove!')}
                >Remove from basket</Button>
            </Card.Body> 
          )
        })
        }
        </p>
        {/* <p>Number of Products: {makeArrayOfItems(state.cart)}</p> */}
        <p>Subtotal: £</p>
        <Button>Empty Basket</Button>
      </div>
    </Card>
  )
}

export { Basket, countTypeOfProduct }