import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'
import { update } from 'lodash'

const Card = ({product, showViewButton = true, showAddToButton=true, cartUpdate=false, showRemoveProductButton=false}) => {


    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () =>{
        addItem(product, ()=>{
            setRedirect(true);
        })
    }


    const shouldRedirect = redirect =>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }


    const showAddToCartButton = () =>{
        return <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
    }

    const showStock = (quantity) =>{
        return quantity>0 ? <span className="badge badge-primary badge-pill mb-2">In Stock</span> : <span>Out of stock</span>
    }

    const handleChange = productId => e=>{
        console.log(e.target.value);
        setCount(e.target.value< 1 ? 1 : e.target.value);
        if(e.target.value>1){
            updateItem(productId, e.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate =>{
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
            
            
        </div>
    }

    const showRemoveButton = (showRemoveProductButton) =>{
        return showRemoveProductButton && 
        <button onClick={() => removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
                Remove Product
        </button>
     
    }





    return (
        
            <div className="card">
                <div className="card-header name">
                    {product.name}
                </div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p className="lead mt-2">{product.description}</p>
                    <p className="black-10">${product.price}</p>

                    <p className="black-9">
                        Category: {product.category && product.category.name}
                    </p>

                    <p className="black-8">
                        Added {moment(product.createdAt).fromNow()}
                    </p>

                    {showStock(product.quantity)}
                    <br/>

                    {showViewButton && <Link to={`/product/${product._id}`}>
                        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                            View Product
                        </button>
                    </Link>}
                    
                    {showAddToButton && showAddToCartButton()}

                    {showRemoveButton(showRemoveProductButton)}

                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
  
    )
}

export default Card
