import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);

    const [productsByArrival, setProductsByArrival] = useState([]);

    const [error, setError] = useState(false);

    const loadProductBySell = () =>{
        getProducts('sold')
        .then(data=>{
            if(data.error){
                //setError(data.error);
            }
            else{
                setProductsBySell(data);
            }
        })
    }

    const loadProductByArrival = () =>{
        getProducts('createdAt')
        .then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setProductsByArrival(data);
            }
        })
    }


    useEffect(()=>{
        loadProductBySell();
        loadProductByArrival();
    },[])




    return (
        <div>
            <Layout title="Home Page" description="Node React E-Commerce App" className="container-fluid">
                <Search />
                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map((p,i)=>(
                        <div key={i} className="col-6 col-md-3 mb-3">
                            <Card product={p} />
                        </div>
                    ))}
                </div>
                
                <hr/>
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {productsByArrival.map((p,i)=>(
                        <div key={i} className="col-6 col-md-3 mb-3">
                            <Card product={p} />
                        </div>
                    ))}
                </div>
                
                
            </Layout>
        </div>
    )
}

export default Home
