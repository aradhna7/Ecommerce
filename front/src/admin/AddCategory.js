import React, { useState } from 'react'
import Layout from '../core/Layout'
import {isAuthenticated}  from '../auth/index'
import { Link } from 'react-router-dom';
import { createCategory } from "./apiAdmin";

const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and token from localstorage
    const {user, token} = isAuthenticated();


    const handleChange = (e) =>{
        setError('');
        setName(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setError('');
        
        createCategory({name}, user._id, token)
        .then((data)=>{
            if(data.error){
                setSuccess(false);
            }
            else{
                setSuccess(true);
                setError('');
            }
            
        })
    }

    const showSuccess = () =>{
        if(success){
            return <h3 className="text-success">{name} category is created</h3>
        }
    }

    const showError = () =>{
        if(!success){
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = () =>{
        return <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back To Dashboard</Link>
        </div>
    }

    const newCategoryForm = () =>{
        return <form onSubmit={handleSubmit}>
            <div className="form-group">
                
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
                <br/>
                <button className="btn btn-outline-primary">Create Category</button>
            </div>

        </form>
    }


    return (<Layout title="Add a new Category" description={`Hello ${user.name}, ready to add a new category?`}>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showError()}
                        {showSuccess()}
                        {newCategoryForm()}
                        {goBack()}
                    </div>
                </div>
                
            </Layout>
            
    )
}

export default AddCategory
