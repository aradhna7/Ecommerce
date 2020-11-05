import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {read, listRelated} from './apiCore'
import Card from './Card'

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId =>{
        read(productId)
        .then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setProduct(data);
                //fetch related products
                listRelated(data._id)
                .then(data=>{
                    if(data.error){
                        setError(data.error)
                    }
                    else{
                        setRelatedProduct(data);
                    }
                })
            }
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId;

        loadSingleProduct(productId)
    }, [props])

    return (
        <div>
            <Layout title={product && product.name} description={product && product.description && product.description} className="container-fluid">
                <div className="row">
                    <div className="col-8 mb-3">
                        {product && product.description && <Card product={product} showViewButton={false} />}
                    </div>
                    <div className="col-4 mb-3">
                        <h4>Related Products</h4>
                        {relatedProduct.map((r,i)=>(
                            <Card key={i} product={r}/>
                        ))}
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default Product
