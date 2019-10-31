import React from 'react'
import {Button} from 'react-bootstrap'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

const GETPRODUCTSFROMSHOPIFY = gql`
query getProducts {
  products(first: 5) {
    edges {
      cursor
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

const GETMOREPRODUCTSFROMSHOPIFY = gql`
query getProducts($count: Int = 5, $cursor: String) {
  products(first: $count, after: $cursor) {
    edges {
      cursor
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

  const [getProducts, { called, loading, data }] = useLazyQuery(GETMOREPRODUCTSFROMSHOPIFY, {
    variables: {
      "cursor": "eyJsYXN0X2lkIjo0MDUzNTkxMDMxODUzLCJsYXN0X3ZhbHVlIjoiNDA1MzU5MTAzMTg1MyJ9"
    }
  })
    return (
      <div>
        <Button onClick={()=>{getProducts()
          console.log(data)
        }}>
          Get more products (WIP)
        </Button>
      </div>
    )
}

export { GetProducts, GETPRODUCTSFROMSHOPIFY }