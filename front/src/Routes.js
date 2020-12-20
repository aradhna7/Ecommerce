import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home'
import Menu from './core/Menu'
import AdminDashboard from './user/AdminDashboard'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'
import './App.css'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Orders'



const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path = "/" component={Home} />
                <Route exact path = "/shop" component={Shop} />
                <Route exact path ="/signup" component={Signup} />
                <Route exact path = "/signin" component={Signin} />
                <PrivateRoute exact path = "/user/dashboard" component={UserDashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
                <AdminRoute exact path="/create/category" component={AddCategory}/>
                <AdminRoute exact path="/create/product" component={AddProduct}/>
                <AdminRoute exact path="/admin/orders" component={Orders}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path = "/product/:productId" component={Product} />
            </Switch>
            
        </Router>
    )
}

export default Routes;
