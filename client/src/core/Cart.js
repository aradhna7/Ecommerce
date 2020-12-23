import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCart} from './cartHelpers'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'

const Cart = () => {

    const [items, setItems] = useState([]);

    useEffect(()=>{
        setItems(getCart());
    }, [items])


    const showItems = (items) =>{
        return <div>
            <h2>Your Cart has {`${items.length}`} items</h2>
            <hr/>
            {items.map((product, i)=>(
                    <Card key={i} product={product} showAddToButton={false} cartUpdate={true} showRemoveProductButton = {true} />
    
            ))}
        </div>
    }

    const noItemsMessage = () =>(
        <h2>Your Cart is Empty<br/><Link to="/shop">Shop Now</Link></h2>
    )


    return (
        <div>
            <Layout title="Shopping Cart" description="Manage your cart items. Add remove, checkout or continue shopping." className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        {items.length>0 ? showItems(items) : noItemsMessage()}
                    </div>
                    <div className="col-6">
                        <h2 className="mb-4">Your Cart Summary</h2>
                        <Checkout products={items} />
                        <p>show checkout options, payent options</p>
                    </div>
                   
                </div>

                {/* {showItems(items)} */}
             
                {/* {JSON.stringify(items)} */}
                
                
            </Layout>
        </div>
    )
}

export default Cart
