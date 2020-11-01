import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {signup} from '../auth'
import Layout from '../core/Layout'


const Signup = () => {

    const [formData, setFormdata] = useState({
        name: '', 
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, error, success} = formData;

    const handleChange = (e) =>{
        setFormdata({
            ...formData,
            error: false,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormdata({...formData, error: false})
        signup({name, email, password})
        .then(data =>{
            if(data.error){
                console.log(data.error);
                setFormdata({
                    ...formData,
                    error: data.error,
                    success: false
                })
            }
            else{
                setFormdata({
                    ...formData,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }



    const signupForm = () => (
        <form onSubmit={e=> handleSubmit(e)}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" name="name" value={name} onChange={e=> handleChange(e)} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" name="email" value={email} onChange={e=> handleChange(e)} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" name="password" value={password}  onChange={e=> handleChange(e)}className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () =>{
        return <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>
            {error}
        </div>
    }

    const showSuccess = () =>{
        return <div className="alert alert-info" style={{display : success ? '' : 'none'}}>
            New Account is created. Please <Link to="/signin">Signin</Link>.
        </div>
    }
    


    return (
        <div>
            <Layout title="Signup" description="Signup to Node React E-Commerce App" className="container col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {signupForm()}
            </Layout>
        </div>
    )
}

export default Signup
