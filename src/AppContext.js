import React, { createContext, useState, useReducer,} from 'react'

const MyContext = createContext(
  //what do? 
  [{}, ()=>{}]
  )

const setLocalStorage = (updatedState) => 
  window.localStorage.setItem('cart', JSON.stringify(updatedState.cart))

const AppContext = (props) => {
    
  const [peteState, setPeteState] = useState({
    //line item - DONT USE NESTED ARRAYS, OBJECTS, ET-FUCKING-C - FLAT AND WIDE - MAKE YOUR LIFE EASY
    cart: [],
    products: [
      {
        sku: 101,
        productName: 'cup',
        price: 5.00,
        quantity: 1,
      },
      {
        sku: 102,
        productName: 'fork',
        price: 10.00,
        quantity: 1,
      },
      {
        sku: 103,
        productName: 'plate',
        price: 100.00,
        quantity: 1,
      }
    ]
  })

  const [state, dispatch] = useReducer(
    (state, action) => {
      //get access to the cart spreading the cart.state inside an array as is req
      let cart = []
      let updatedState = {}
      let cleanCart = []
      let outputCart = []
      let productIndex = ''
      switch (action.type) {

        case 'increaseQuantity':
          cart = [...state.cart]
          productIndex = cart.findIndex(product => action.payload === product.sku)
          //create a new array of everything we dont want to effect - all items with a sku that doesnt match the clicked item
          cleanCart = cart.filter(cartItem => cartItem.sku !== action.payload)
          //grab our target obj from our original array
          const incrementTarget = cart.find(cartItem => cartItem.sku === action.payload)
          //object assign parameters are where its going, whats being copied, whats being amended
          const incremented = Object.assign({}, incrementTarget, {quantity: incrementTarget.quantity + 1})
          //put the array of objects back together in the right order - splices mutates the original array
          cleanCart.splice(productIndex, 0, incremented)
          //rename clean cart so its clearer
          outputCart = cleanCart
          //create a fresh object, copy state and put it in, amend cart so be the reconstituted array of objects
          updatedState = Object.assign({}, state, {cart: outputCart})
          setLocalStorage(updatedState)
          return updatedState

        case 'decreaseQuantity':
          cart = [...state.cart]
          productIndex = cart.findIndex(product => action.payload === product.sku)
          cleanCart = cart.filter(cartItem => cartItem.sku !== action.payload)
          const decreaseTarget = cart.find(cartItem => cartItem.sku === action.payload)
          const decreased = Object.assign({}, decreaseTarget, {quantity: decreaseTarget.quantity - 1 })
          if (decreased.quantity === 0) {
            outputCart = cleanCart
          } else {
            cleanCart.splice(productIndex, 0, decreased)
            outputCart = cleanCart
          }
          updatedState = Object.assign({}, state, {cart: outputCart})
          setLocalStorage(updatedState)
          return updatedState

        case 'addProduct':
          //get access to the cart spreading the cart.state inside an array as is req
          cart = [...state.cart]
          updatedState = Object.assign({},state, {cart: [...cart, action.payload]})
          setLocalStorage(updatedState)
          return updatedState

        case 'removeItemFromCart':
            cart = [...state.cart]
          const cartRemovedItem = cart.filter(product => product.sku !== action.payload)
          //third parameter has to be an object?
          updatedState = Object.assign({}, state, {cart: cartRemovedItem})
          setLocalStorage(updatedState)
          return updatedState

        case 'emptyCart':
          cart = [...state.cart]
          updatedState = Object.assign({}, state, {cart: []})
          setLocalStorage(updatedState)
          return updatedState

        default:
          return console.log("error mofo")
        } 
    }, peteState)
  
  return (
    <MyContext.Provider value={[dispatch, state, peteState, setPeteState]}>
        {props.children}
    </MyContext.Provider>
  )
}

export { AppContext, MyContext }