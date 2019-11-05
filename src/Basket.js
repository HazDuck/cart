import React, { useContext } from 'react'
import { MyContext } from './AppContext'
import { increaseQuantity, incrementOrNewProduct } from './Products';
import {Button, Card, Table, Image, Spinner } from 'react-bootstrap'

const cartTotal = (accumulator, currentValue ) => {
  const itemTotal = currentValue.quantity * currentValue.node.priceRange.maxVariantPrice.amount
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

const decreaseQuantity = sku => {
  const decreaseQuantity = {
    type: 'decreaseQuantity',
    payload: sku
  }
  return decreaseQuantity
}

const Basket = (props) => {
  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
  const locaStoragelState = JSON.parse(window.localStorage.getItem('cart'))
  
  const removeCartAlert = () => {
    setTimeout(()=>{
      dispatch({type: 'removeAlert'})
    }, 500)
  } 

  if (locaStoragelState) {
    state.cart = locaStoragelState
  }
  return (
      <div>
        <Card>
          <p>Welcome to the basket</p>
        </Card>
        <div>{state.cart.map((product)=>{
          return (
            <Card border="primary" key={product.node.id}>
              <Card.Body className="lineItem">
                <Image className="productImages" src={product.node.images.edges[0].node.originalSrc} rounded />
                {product.node.title}
                <Button
                onClick={() => {dispatch(incrementOrNewProduct(state.cart, product, removeCartAlert))}}>
                  +
                </Button>
                {product.quantity}
                <Button
                onClick={() => {dispatch(decreaseQuantity(product.node.id))}}>
                  -
                </Button>
                {product.node.priceRange.maxVariantPrice.amount}
                <Button
                onClick={() => {dispatch(removeItemFromCart(product.node.id))}}>
                  Remove from basket
                </Button>
              </Card.Body>
            </Card>
          )
        })
      }
        </div>
        <p>Subtotal: £{state.cart.length > 0 ? state.cart.reduce(cartTotal, 0) : 0}</p>
        <Button onClick={() => {dispatch(emptyCart())}}>
          Empty Basket
        </Button>
      </div>
  )
}

export { Basket, cartTotal }