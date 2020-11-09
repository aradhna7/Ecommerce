import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getBraintreeClientToken, processPayment} from './apiCore'
import Card from './Card'
import {emptyCart} from './cartHelpers'
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({products}) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = () =>{
        getBraintreeClientToken(userId, token)
        .then(data=>{
            if(data.error){
                setData({
                    ...data,
                    error: data.error
                });
            }
            else{
                setData({
                    clientToken: data.clientToken
                })
                console.log(data);
            }
        })
    }

    useEffect(()=>{
        getToken();
    },[])

    const getTotal = () =>{
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckOut = () =>{
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Signin To CheckOut</button>
            </Link>
        )
    }

    const buy = () =>{
        //send nounce to server
        //nounce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data=>{
            console.log(data);
            nonce = data.nonce;
            // once you have nonce (card type, card number) send nounce as 'paymentMethodNonce'
            // and also total to be charged
            //console.log('send nounce and total to process: ', nonce, getTotal(products));
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
            .then(response=>{
                console.log(response)
                setData({...data, success: response.success, error:''});
                emptyCart(()=>{
                    console.log('payment success and empty cart');
                })
                //empty cart
                //create order
            })
            .catch(error=>
                console.log(error)
            )

        })
        .catch(error=>{
            //console.log('dropin error: ', error);
            setData({...data, error: error.message})
        })
    }

    const showDropIn = () =>{
        return <div onBlur={()=> setData({...data, error:''})}>
            {data.clientToken !== null && products.length>0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance=> (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
                
            ) : null}
        </div>
    }

    const showError = error =>{
        return <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    }


    const showSuccess = success =>{
        return <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            Thanks your payment was succesful!!
        </div>
    }

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showError(data.error)}
            {showSuccess(data.success)}
            {showCheckOut()}
            
        </div>
    )
}

export default Checkout
