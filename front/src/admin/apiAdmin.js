import { json } from "body-parser";
import { API } from "../config";


//add a new category
export const createCategory = (category, userId, token) =>{
    return fetch(`${API}/category/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}


//add a new product  -------------      
export const createProduct = (product, userId, token) =>{

    return fetch(`${API}/product/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response=>{
        return response.json();
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


//get all ORDERS
export const listOrders = (userId, token) =>{
    return fetch(`${API}/order/list/${userId}`,{
        method:'GET',
        headers: {
            Accept: 'application/json',
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


export const getStatusValues = (userId, token) =>{
    return fetch(`${API}/order/status-values/${userId}`,{
        method:'GET',
        headers: {
            Accept: 'application/json',
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


export const updateOrderStatus = (userId, token, orderId, status) =>{
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
        method:'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({orderId, status})
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err);
    })
}