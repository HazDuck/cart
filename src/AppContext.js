import React, { createContext, useState, useReducer,} from 'react'

const MyContext = createContext(
  //what do? 
  [{}, ()=>{}]
  )

  const AppContext = (props) => {
    
    const [peteState, setPeteState] = useState({
      numberOfClicks: 0,
      value: 99,
      color: 'red',
      cart: [
        //line item
        { 
          sku: 101,
          quantity: 12,
          lineItemTotal: 0,
          product: {
            sku: 101, 
            productName: 'bob', 
            price: 112.00
          }
        }
      ],

      products: [
        {
          sku: 101,
          productName: 'cup',
          price: 5.00
        },
        {
          sku: 102,
          productName: 'fork',
          price: 10.00
        }
      ]
    })

    const [state, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case 'increaseQuantity':
          //get access to the cart spreading the cart.state inside an array as is req
          const cart = [...state.cart]
          //create a new array of everything we dont want effect. items with a sku that doesnt match the clicked item
          const cleanCart = cart.filter(cartItem => cartItem.sku !== action.payload)
          //grab our target obj from our original array
          const incrementTarget = cart.find(cartItem => cartItem.sku === action.payload)
          //object assign parameters are where its going, whats being copied, whats being amended
          const incremented = Object.assign({}, incrementTarget, {quantity: incrementTarget.quantity + 1})
          //puy the array of objects back together
          const outputCart = [...cleanCart, incremented]
          //create a fresh object, copy state and put it in, amend cart so be the reconstituted array of objects
          return Object.assign({}, state, {cart: outputCart})
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