import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {signin, authenticate} from '../auth'
import Layout from '../core/Layout'
import {isAuthenticated}  from '../auth/index'


const Signin = () => {
    const [formData, setFormdata] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, error, loading, redirectToReferrer} = formData;

    const handleChange = (e) =>{
        setFormdata({
            ...formData,
            error: false,
            [e.target.name]: e.target.value
        })
    }

    const {user} = isAuthenticated();


    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormdata({...formData, error: false, loading:true});
        signin({email, password})
        .then(data =>{
            if(data.error){
                console.log(data.error);
                setFormdata({
                    ...formData,
                    error: data.error,
                    loading: false
                })
            }
            else{
                authenticate(
                    data,
                    ()=>{
                        setFormdata({
                            ...formData,
                            loading: false,
                            redirectToReferrer: true
                        })
                    }
                )
            }
        })

        
    }



    const signinForm = () => (
        <form onSubmit={e=> handleSubmit(e)}>
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

    const showLoading = () =>{
        return <div className="alert alert-info" style={{display : loading ? '' : 'none'}}>
            LOADING...
        </div>
    }

    const redirectUser = () =>{
        if(redirectToReferrer){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
           
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    return (
        <div>
            <Layout title="Signin" description="Signin to Node React E-Commerce App" className="container col-md-8 offset-md-2">
                {showLoading()}
                {showError()}
                {signinForm()}
                {redirectUser()}
            </Layout>
           
        </div>
    )
}

export default Signin
