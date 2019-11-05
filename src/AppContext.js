import React, { createContext, useState, useReducer,} from 'react'

const MyContext = createContext([{}, ()=>{}])

const setLocalStorage = (updatedState) => 
  window.localStorage.setItem('cart', JSON.stringify(updatedState.cart))
  
  const AppContext = (props) => {
    const [peteState, setPeteState] = useState({
      cart: [],
      showingSuccessfulAddToCart: false
    })
    
    const [state, dispatch] = useReducer(
      (state, action) => {

        let cart = []
        let updatedState = {}
        let cleanCart = []
        let outputCart = []
        let productIndex = ''
        switch (action.type) {
          
          case 'getProducts': 
            cart = [...state.cart]
            updatedState = Object.assign({}, state, {products: action.payload, loaded: true})
            return updatedState
          
          case 'increaseQuantity':
            cart = [...state.cart]
            productIndex = cart.findIndex(product => action.payload === product.node.id)
            cleanCart = cart.filter(cartItem => cartItem.node.id !== action.payload)
            const incrementTarget = cart.find(cartItem => cartItem.node.id === action.payload)
            const incremented = Object.assign({}, incrementTarget, {...incrementTarget, quantity: incrementTarget.quantity + 1})
            cleanCart.splice(productIndex, 0, incremented)
            outputCart = cleanCart
            updatedState = Object.assign({}, state, {showingSuccessfulAddToCart: true, cart: outputCart})
            setLocalStorage(updatedState)
            return updatedState

          case 'decreaseQuantity':
            cart = [...state.cart]
            productIndex = cart.findIndex(product => action.payload === product.node.id)
            cleanCart = cart.filter(cartItem => cartItem.node.id !== action.payload)
            const decreaseTarget = cart.find(cartItem => cartItem.node.id === action.payload)
            const decreased = Object.assign({}, decreaseTarget, {...decreaseTarget, quantity: decreaseTarget.quantity - 1 })
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
            cart = [...state.cart]
            updatedState = Object.assign({},state, {cart: [...cart, action.payload], showingSuccessfulAddToCart: true,})
            setLocalStorage(updatedState)
            return updatedState

          case 'removeItemFromCart':
              cart = [...state.cart]
            const cartRemovedItem = cart.filter(product => product.node.id !== action.payload)
            updatedState = Object.assign({}, state, {cart: cartRemovedItem})
            setLocalStorage(updatedState)
            return updatedState

          case 'emptyCart':
            cart = [...state.cart]
            updatedState = Object.assign({}, state, {cart: []})
            setLocalStorage(updatedState)
            return updatedState

          case 'removeAlert':
            cart = [...state.cart]
            updatedState = Object.assign({}, state, {showingSuccessfulAddToCart: false})
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