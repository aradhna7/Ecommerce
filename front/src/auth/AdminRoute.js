import React, {Component} from 'react'
import {Redirect, Link, Route} from 'react-router-dom'
import {isAuthenticated} from './index'

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props=> isAuthenticated() && isAuthenticated().user.role===1 ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname:'/signin', state: {from: props.location}}} />
        )} />
    )
}

export default AdminRoute