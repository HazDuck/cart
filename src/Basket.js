import React, { useContext } from 'react'
import {Button, Card } from 'react-bootstrap'
import { MyContext } from './AppContext'
import { array } from 'prop-types';

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

const Basket = (props) => {
  const [dispatch, statey, peteState, setPeteState] = useContext(MyContext)
  return (
    <Card>
      <div>
        <p>Welcome to the basket</p>
        <p>{statey.cart.products.map((product)=>{
          
            return (
              <Card.Body>
              ID:{product.id}
              Name:{product.productName}
              Cost:{product.price}
              Count: { statey.cart.numberOfEachProduct[product.id] 
                ? statey.cart.numberOfEachProduct[product.id] : 1 } 
              <Button
                onClick={()=>console.log('remove!')}
                >Remove from basket</Button>
            </Card.Body> 
          )
        })}</p>
        <p>Number of Products: {statey.cart.numberOfProducts}</p>
        <p>Subtotal: £{statey.cart.subtotal}</p>
        <Button>Empty Basket</Button>
      </div>
    </Card>
  )
}
// makeUniqueIDArray(makeArrayOfProducts(statey.cart.products))

export { Basket, countTypeOfProduct }