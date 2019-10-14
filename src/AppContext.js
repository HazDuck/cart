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
      cart: {
        numberOfProducts: 0,
        products: '',
        subtotal: 0.00
      }, 
      products: {
        1: {
          id: 1,
          productName: 'cup',
          price: 5.00
        },
        2: {
          id: 2,
          productName: 'fork',
          price: 10.00
        }
      }
    })

    const [statey, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case 'addProductToCart':
            return {...state, cart: {
              numberOfProducts: state.cart.numberOfProducts + 1,
              subtotal: state.cart.subtotal + state.products[parseInt(action.payload.id)].price
            }}
            case 'inc': 
            return { ...state,  value: state.value +1 }
            case 'dec': 
            return { ...state,  value: state.value -1 }
            case 'resetCount': 
            return { ...state,  value: 0 }
            default:
            return console.log("error mofo")
          } 
      }, peteState)
  
  return (
    <MyContext.Provider value={[dispatch, statey, peteState, setPeteState]}>
        {props.children}
    </MyContext.Provider>
  )
}

export { AppContext, MyContext }