import React from 'react'
import {Button} from 'react-bootstrap'
import gql from 'graphql-tag'

const GETPRODUCTSFROMSHOPIFY = gql`
query getProducts {
  products(first: 5) {
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
    return (
      <Button
      onClick={()=>{}}>
        Get more products (WIP)
      </Button>
    )
}

export { GetProducts, GETPRODUCTSFROMSHOPIFY }