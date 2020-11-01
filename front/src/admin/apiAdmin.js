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