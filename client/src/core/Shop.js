import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getCategories, getFilteredProducts} from './apiCore'
import Card from './Card'
import Checkbox from './Checkbox'
import { prices } from './fixedPrice'
import RadioBox from './RadioBox'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResult, setFilteredResult] = useState([]);
    const [size, setSize] = useState(0);


    const init = () =>{
        getCategories()
        .then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setCategories(data);
            }
        })
    }

    const loadFilteresResults = (newFilters) =>{
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters)
        .then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setFilteredResult(data.data);
                setSize(data.size);
                setSkip(0);
            }
        })
    }

    const loadMore = () =>{
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters)
        .then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setFilteredResult([...filteredResult, ...data.data]);
                setSize(data.size);
                setSkip(0);
            }
        })
    }

    const loadMoreButton = () =>{
        return (size>0 && size>=limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
        ))
    }

    useEffect(()=>{
        init();
        loadFilteresResults(skip, limit, myFilters.filters);
    },[])


    const handleFilters = (filters, filterBy) =>{
        //console.log("shop", filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy === 'price'){
            let priceValue = handlePrice(filters);
            newFilters.filters[filterBy] = priceValue;
        }

        loadFilteresResults(myFilters.filters);
        setMyFilters(newFilters)
    }


    const handlePrice = (value) =>{
        let data = prices;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;
    }




    return (
        <div>
            <Layout title="Shop Page" description="Shop and find books of your choice" className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <h4>Filter by categories</h4>
                        <ul>
                            <Checkbox categories={categories} handleFilters={(filters, filterBy)=>handleFilters(filters, 'category')} />
                        </ul>

                        <h4>Filter by Price</h4>
                        <div>
                            <RadioBox prices={prices} handleFilters={(filters, filterBy)=>handleFilters(filters, 'price')} />
                        </div>
                    </div>
                    <div className="col-10">
                        <h2 className="mb-4"></h2>
                        <div className="row">
                            {filteredResult ? (filteredResult.map((product,i)=>(
                                <div key={i} className="col-6 col-md-3 mb-3">
                                    <Card product={product} />
                                </div>
                            ))): (
                                <h3>No product found</h3>
                            )}
                            
                        </div>
                        <hr/>
                        {loadMoreButton()}
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default Shop
