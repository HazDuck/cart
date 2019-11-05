import gql from 'graphql-tag'

const GETPRODUCTSFROMSHOPIFY = gql`
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

export { GETPRODUCTSFROMSHOPIFY }