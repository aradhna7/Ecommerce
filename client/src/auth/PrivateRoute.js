import React, {Component} from 'react'
import {Redirect, Link, Route} from 'react-router-dom'
import {isAuthenticated} from './index'

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props=> isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname:'/signin', state: {from: props.location}}} />
        )} />
    )
}

export default PrivateRoute
