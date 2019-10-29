import React, { useContext, useEffect } from 'react'
import {Button, Card, Table } from 'react-bootstrap'
import { MyContext } from './AppContext'
import axios from 'axios'


const GetProducts = (props) => {
  const [dispatch, state, peteState, setPeteState] = useContext(MyContext)
    const getMeProducts = async () => {
        const info = await axios.get('http://localhost:3003/products')
        const getProducts = {
          type: 'getProducts',
          payload: info.data.products
        }
        //dispatch the result of getMeProducts, which is the obj getProducts, not the whole funciton!!!!
        dispatch(getProducts)
      }
    return (
      <Button onClick={() => getMeProducts()}>Get products</Button>
    )
}

export { GetProducts }