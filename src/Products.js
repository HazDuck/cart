import React, { useContext, useEffect, useState } from 'react'
import {Button, Card, Table, Image, Spinner } from 'react-bootstrap'
import { MyContext } from './AppContext'
import axios from 'axios'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { GETPRODUCTSFROMSHOPIFY } from './GetProducts'
import { cartTotal } from './Basket'

const incrementOrNewProduct = (cart, newProduct, removeCartAlert) => {
  let arrayOfIds = []
  cart.forEach(product => {
    arrayOfIds.push(product.node.id)
    })
  const productSKU = arrayOfIds.find(product => product === newProduct.node.id)
  if (productSKU) {
    return increaseQuantity(newProduct.node.id, removeCartAlert)
  }
  else {
    return addProduct(newProduct, removeCartAlert)
  }
}

const increaseQuantity = (sku, removeCartAlert) => {
  const increaseQuantity = {
    type: 'increaseQuantity',
    payload: sku
  }
  removeCartAlert()
  return increaseQuantity
}

const addProduct = (product, removeCartAlert) => {
  //pass the product not the state!!
  const addProduct = {
    type: 'addProduct',
    payload: {...product, quantity: 1, showingSuccessfulAddToCart: true}
  }
  removeCartAlert()
  return addProduct
}

const Products = (props) => {

  const {data, loading, error, fetchMore} = useQuery(GETPRODUCTSFROMSHOPIFY)
  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
  const [fetchingState, setFetchingState] = useState({
    fetchingMoreProducts: false,
    abletoRequestMoreProducts: true
  })
  if (error) {
    console.log(error)
    return <p>it done error</p>}

  const removeCartAlert = () => {
    setTimeout(()=>{
      dispatch({type: 'removeAlert'})
    }, 500)
  }

  const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Cost</th>
            <th>Add to cart</th>
          </tr>
        </thead>
        <tbody>
          {loading ? 
            <Spinner animation="border" variant="info" />
            :       
            data.products.edges.map((product) => {
              return (
                <tr key={product.node.id}>
                    <td>{product.node.title}</td>
                    <td><Image className="productImages" src={product.node.images.edges[0].node.originalSrc} rounded /></td>
                    <td>{product.node.priceRange.maxVariantPrice.amount}<br/></td>
                    <td><Button variant="primary"
                    onClick={() => {dispatch(incrementOrNewProduct(state.cart, product, removeCartAlert))}}>
                      Add
                    </Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <p>Subtotal: £{state.cart.length > 0 ? state.cart.reduce(cartTotal, 0) : 0}</p>
      <div>
        {fetchingState.fetchingMoreProducts ?
        <Spinner animation="border" variant="info" />
        :
        fetchingState.abletoRequestMoreProducts ?
        <Button onClick={()=>{
          setFetchingState({...fetchingState, 
            fetchingMoreProducts: true})
          
          const findLastProductCursor = (data) => {
            const lastProduct = data.products.edges[data.products.edges.length -1]
            return lastProduct.cursor
          }
          
          const lastProductCursor = findLastProductCursor(data)
          fetchMore({
            variables:{"cursor": lastProductCursor},
            updateQuery: (prev, {fetchMoreResult}) => {
              console.log('fmr')
              console.log(fetchMoreResult)
              if (fetchMoreResult.products.edges.length === 0) {
                //need to use use state
                setFetchingState({
                  ...fetchingState, 
                    fetchingMoreProducts: false,
                    abletoRequestMoreProducts: false
                })
                console.log('no more results')
                console.log(fetchingState.abletoRequestMoreProducts)
                return prev
              }

              const updatedData = Object.assign({}, prev, {...prev,
                products: {edges: [...prev.products.edges, ...fetchMoreResult.products.edges], __typename: "ProductConnection"}
              })
              setFetchingState({
                ...fetchingState, 
                  fetchingMoreProducts: false})
              return updatedData
              }
            }
          )
          }}>
          Get more products
        </Button>
        :
        <Button variant="secondary" size="lg" disabled>
        No more products
        </Button>
        }
      </div>
    </div>
  )
}

export { Products, increaseQuantity, incrementOrNewProduct }