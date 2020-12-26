import React from 'react'
import { API } from "../config";


const ShowImage = ({item, url}) => {
    return (
        <div className="product-img">
            <img src={`/api/${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{height:"300px", maxWidth:"211px"}} />
            
        </div>
    )
}

export default ShowImage
