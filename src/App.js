import React from 'react'
import './App.css'
import { AppContext } from './AppContext'
import { Products } from './Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Basket } from './Basket';
import { Tabs, Tab, Dropdown } from 'react-bootstrap';
import { ProductsAlert } from './ProductsAlert';
import { GetProducts } from './GetProducts';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'

function App(props) {
  const client = new ApolloClient({
    uri: "https://petes-store-test-123.myshopify.com/api/2019-07/graphql"
  })
  return (
    <div>
      <ApolloProvider client={client}>
        <AppContext>
          <Tabs defaultActiveKey="Products" id="uncontrolled-tab-example">
            <Tab eventKey="Products" title="Products">
              <Products/>
              <ProductsAlert/>
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
