import React from 'react'
import './App.css'
import { AppContext } from './AppContext'
import { Products } from './Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Basket } from './Basket';
import { Tabs, Tab, Dropdown } from 'react-bootstrap';
import { ProductsAlert } from './ProductsAlert';

function App(props) {

  return (
    <div>
      <AppContext>
        <Tabs defaultActiveKey="Products" id="uncontrolled-tab-example">
          <Tab eventKey="Products" title="Products">
            <Products/>
            <ProductsAlert/>
          </Tab>
          <Tab eventKey="Basket" title="Basket">
            <Basket/>
          </Tab>
        </Tabs>
      </AppContext>
    </div>
  )
}

export default App;
