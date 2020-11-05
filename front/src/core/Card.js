import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'

const Card = ({product, showViewButton = true}) => {


    const showAddToCartButton = () =>{
        return <Link to="/">
            <button className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
        </Link>
    }

    const showStock = (quantity) =>{
        return quantity>0 ? <span className="badge badge-primary badge-pill mb-2">In Stock</span> : <span>Out of stock</span>
    }



    return (
        
            <div className="card">
                <div className="card-header name">
                    {product.name}
                </div>
                <div className="card-body">
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
                    
                    {showAddToCartButton()}
                </div>
            </div>
  
    )
}

export default Card
