import React, { useContext, useEffect } from 'react'
import {Button, Card, Table, Image } from 'react-bootstrap'
import { MyContext } from './AppContext'
import axios from 'axios'

const incrementOrNewProduct = (cart, newProduct, removeCartAlert) => {
  let arrayOfIds = []
  cart.forEach(product => {
    arrayOfIds.push(product.sku)
    })
  const productSKU = arrayOfIds.find(product => product === newProduct.sku)
  removeCartAlert()
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
  //pass the product not the state!!
  const addProduct = {
    type: 'addProduct',
    payload: product  
    }
  return addProduct
}


const Products = (props) => {
  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
  const removeCartAlert = () => {
    setTimeout(()=>{
      dispatch({type: 'removeAlert'})
    }, 500)
  }
  
    // useEffect(() => {
    //   const getMeProducts = async () => {
    //     const info = await axios.get('http://localhost:3003/products')
    //     const getProducts = {
    //       type: 'getProducts',
    //       payload: info.data.products
    //     }
    //     dispatch(getProducts)
    //   }
    //   getMeProducts()
    // }, [])
    
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Department</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Add to cart</th>
            </tr>
          </thead>
          <tbody>
            {state.loaded ?       
              state.products.map((product) => {
                return (
                  <tr key={product.sku}>
                      <td>{product.sku}</td>
                      <td><Image src={product.image} rounded /></td>
                      <td>{product.department}</td>
                      <td>{product.productName}</td>
                      <td>{product.price}<br/></td>
                      <td><Button variant="success"
                      onClick={() => {dispatch(incrementOrNewProduct(state.cart, product, removeCartAlert))}}>
                        Add to cart
                      </Button></td>
                  </tr>
                )
              })
              :
              <div>
                <p>loading....</p>
              </div> 
            }
          </tbody>
        </Table>
  )
}

export { Products, increaseQuantity }