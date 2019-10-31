import React from 'react'
import './App.css'
import { AppContext } from './AppContext'
import { Products } from './Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Basket } from './Basket';
import { Tabs, Tab, Dropdown } from 'react-bootstrap';
import { ProductsAlert } from './ProductsAlert';
import { GetProducts } from './GetProducts';
//packages required for apollo --> can you apollo-boost but took it apart when trying to get it to work
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'https://petes-store-test-123.myshopify.com/api/graphql',
})

const middlewareLink = setContext(() => ({
  //below is the shopify requirements - probs in their documentation
  headers: {
    'X-Shopify-Storefront-Access-Token': '3e73237a41f3dd632213a7b22dc8fe5d'
  }
}))

export const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  //again probs not needed if using boost
  cache: new InMemoryCache(),
})

function App(props) {
  return (
    <div> 
      <ApolloProvider client={client}>
        <AppContext>
          <Tabs defaultActiveKey="Products" id="uncontrolled-tab-example">
            <Tab eventKey="Products" title="Products">
              <Products/>
              <div className="height">
                <ProductsAlert/>
              </div>
              <GetProducts/>
            </Tab>
            <Tab eventKey="Basket" title="Basket">
              <Basket/>
            </Tab>
          </Tabs>
        </AppContext>
      </ApolloProvider>
    </div>
  )
}

export default App;
