import React,{useEffect, useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated}  from '../auth/index'
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        photo: '',
        shipping: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToReferer: false,
        formData: ''
    });
    

    //destructure user and token from localstorage
    const {user, token} = isAuthenticated();
    const {name, description, price, category, categories, quantity, shipping, loading, error, photo, redirectToReferer, formData, createdProduct} = values;


    const init = (productId) =>{

        getProduct(productId).then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }
            else{
                setValues({
                    ...values, 
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                })
                initCategories();
         
            }
       
        })

  

    }

    //load categories & set form data
    const initCategories = () =>{
        getCategories()
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }
            else{
                setValues({categories: data, formData: new FormData()})
            }
        })
    }



    useEffect(()=>{

        init(match.params.productId);
    
        // console.log(categories)

    }, [])


    const handleChange = name => e => {
        const value = name ==='photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value}) 
      
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setValues({
            ...values,
            error: '',
            loading: true
        })

       
        console.log(formData, name);

        updateProduct(match.params.productId, user._id, token, formData)
        .then((data)=>{
            if(data.error){
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                })
            }
            else{
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    quantity: '',
                    photo: '',
                    shipping: '',
                    loading: false,
                    createdProduct: data.name,
                    formData:'',
                    redirectToReferer: true

                })
            }
            
            //console.log(data, data.name)
            
        })
    }

    const showSuccess = () =>{
        return <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
                <h2>{`${createdProduct} is updated`}</h2>
            </div>
    }

    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = () =>(
        loading && (<div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
    )

    const goBack = () =>{
        return <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back To Dashboard</Link>
        </div>
    }


    const newPostForm = () =>{
        return <form onSubmit={handleSubmit} action="" className="mb-3">
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" id=""/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input name="name" type="text" className="form-control" onChange={handleChange('name')} value={name} />       
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea name="description" type="text" className="form-control" onChange={handleChange('description')} value={description} />       
            </div>
            
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input name="price" type="number" className="form-control" onChange={handleChange('price')} value={price} />       
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select name="category" className="form-control" onChange={handleChange('category')} >
                    <option>Please Select</option>
                    {categories && categories.map((c, i)=>(
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>       
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input name="quantity" type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} />       
            </div>


            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select name="shipping" className="form-control" onChange={handleChange('shipping')}  >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>       
            </div>

            <button className="btn btn-outline-primary">Update Product</button>
            
        </form>
    }

    const redirectUser = () =>{
        if(redirectToReferer){
            if(!error){
                return <Redirect to="/" />
            }
        }
    }

    return (<Layout title="Add a new Product" description={`Hello ${user.name}, ready to add a new product?`}>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        
                        {showError()}
                        {showSuccess()}
                        {showLoading()}
                        {newPostForm()}
                        {goBack()}
                        {redirectUser()}
                    </div>
                </div>
                
            </Layout>
            
    )
}

export default UpdateProduct
