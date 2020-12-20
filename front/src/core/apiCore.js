import { API } from "../config";
import queryString from 'query-string'


//get all products
export const getProducts = (sortBy) =>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}


//get all categories
export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}



//shop by filters
export const getFilteredProducts = (skip, limit, filters={}) =>{

    const data = {
        limit, 
        skip,
        filters
    }

    return fetch(`${API}/products/by/search`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}



//search
export const list = (params) =>{
    const query = queryString.stringify(params);
    console.log(query);
    return fetch(`${API}/products/search?${query} `,{
        method:'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}


//get particular product
export const read = (productId) =>{

    return fetch(`${API}/product/${productId}`,{
        method:'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}


//get related products
export const listRelated = (productId) =>{
    return fetch(`${API}/products/related/${productId}`,{
        method:'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}




//get braintree token
export const getBraintreeClientToken = (userId, token) =>{
    return fetch(`${API}/braintree/getToken/${userId}`,{
        method:'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}



//process payment
export const processPayment = (userId, token, paymentData) =>{
    return fetch(`${API}/braintree/payment/${userId}`,{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}



//create the order-------------  :)
export const createOrder = (userId, token, createOrderData) =>{
    return fetch(`${API}/order/create/${userId}`,{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: createOrderData})
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}