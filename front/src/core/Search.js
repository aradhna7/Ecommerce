import React, { useEffect, useState } from 'react'
import {getCategories, getProducts, list} from './apiCore'
import Card from './Card'

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: "",
        results: [],
        searched: false
    });

    const {category, categories, search, results, searched} = data;

    const loadCategories = () =>{
        getCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setData({
                    ...data,
                    categories: data
                })
            }
        })
    }

    useEffect(()=>{
        loadCategories()
    }, [])

    const searchData = () =>{
        console.log(search, category);
        if(search){
            list({search: search || undefined, category: category})
            .then(response=>{
                if(response.error){
                    console.log(response.error);
                }
                else{
                    setData({
                        ...data, results: response, searched: true
                    })
                }
            })
        }
        console.log(results);
    }


    const searchSubmit = e =>{
        e.preventDefault();
        searchData();
    }

    const handleChange = name => e =>{
        setData({
            ...data,
            [name]: e.target.value,
            searched: false
        })
    }

    const searchedMessage = (searched, results) =>{
        if(searched && results.length>0){
            return `Found ${results.length} products`
        }
        if(searched && results.length<1){
            return `No products Found`
        }
    }

    const searchedProducts = (results= []) =>{
        return <div>
            <h2 className="mt-4 mb-4">
                {searchedMessage(searched, results)}
            </h2>
            <div className="row">
                
                {results && results.map((r,i)=>(
                    <Card key={i} product={r} />
                ))}
            </div>
        </div>
    }


    const searchForm = () =>{
        return <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-md">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")} name="" id="">
                            <option value="All">All Category</option>
                            {categories.map((c,i)=>(
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" name="search" onChange={handleChange('search')} className="form-control" placeholder="Search by Name"/>                    
                </div>
                <div className="btn input-group-append" style ={{border:"none"}} >
                    <button className="input-group-text">
                        Search
                    </button>
                </div>
            </span>
        </form>
    }

    return (
        <div>
            <div className="container mb-3">
                {searchForm()}
                
               
            </div>
            <div className="container-fluid mb-3" style={{paddingLeft:"0"}}>
                        {searchedProducts(results)}                    
            </div>
        </div>
    )
}

export default Search
