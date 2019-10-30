import React, { useContext, useEffect } from 'react'
import {Button, Card, Table } from 'react-bootstrap'
import { MyContext } from './AppContext'
import ApolloClient from 'apollo-boost'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const GETPRODUCTSFROMSHOPIFY = gql`
query getProducts {
  products(first: 10) {
    edges {
      node {
        id
        title
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        productType
        images (first: 1) {
          edges {
            node {
              originalSrc
            }
          }
        }
      }
    }
  }
}`


const GetProducts = (props) => {
  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
  const { loading, error, data } = useQuery(GETPRODUCTSFROMSHOPIFY)
  console.log(error)
  console.log(data)
    // const getMeProducts = async () => {
    //     const info = await axios.get('http://localhost:3003/products')
    //     const getProducts = {
    //       type: 'getProducts',
    //       payload: info.data.products
    //     }
    //     //dispatch the result of getMeProducts, which is the obj getProducts, not the whole funciton!!!!
    //     dispatch(getProducts)
    //   }
    return (
      <Button
      onClick={()=>{}}>
        Get products
      </Button>
    )
}

export { GetProducts }