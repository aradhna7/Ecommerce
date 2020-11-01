import { API } from "../config";


//get all categories
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