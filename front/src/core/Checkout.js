import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'

const Checkout = ({products}) => {

    const getTotal = () =>{
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckOut = () =>{
        return isAuthenticated() ? (
            <button className="btn btn-success">CheckOut</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Signin To CheckOut</button>
            </Link>
        )
    }



    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckOut()}
        </div>
    )
}

export default Checkout
