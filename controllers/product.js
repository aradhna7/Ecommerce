const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product');
const {errorHandler} = require('../helpers/dbErrorHandler');
const { updateOne } = require('../models/product');



//find product by id
exports.productById = async (req, res, next, id) =>{

    Product.findById(id)
    .populate("category")
    .exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error: 'Product not found'
            })
        }

        req.product = product;
        next();
    })
}


//get product
exports.read = (req, res) =>{
    req.product.photo = undefined;
    res.json(req.product);
}



//create a product
exports.create = (req, res) =>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        //check for all fields
        const {name, description, price, quantity, shipping, category} = fields;

        if(!name || !description || !price || !quantity || !shipping || !category){
            return res.status(400).json({
                error: "All fields are neccesary"
            })
        }

        let product = new Product(fields);

        if(files.photo){

            //check file size
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image shoulb be less than 1 mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        

        product.save((err, data)=>{
            if(err || !data){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json(data);
        })

    })


}



//delete a product
exports.remove = (req, res) =>{

    let product = req.product;

    product.remove((err, productDeleted)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: "Product deleted succesfully"
        })
    })
}





//update a product
exports.update = (req, res) =>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        //check for all fields
        // const {name, description, price, quantity, shipping, category} = fields;

        // if(!name || !description || !price || !quantity || !shipping || !category){
        //     return res.status(400).json({
        //         error: "All fields are neccesary"
        //     })
        // }

        let product = req.product;
        product = _.extend(product, fields);

        if(files.photo){

            //check file size
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image shoulb be less than 1 mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        

        product.save((err, data)=>{
            if(err || !data){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json(data);
        })

    })


}











/**
 * sell/arrival
 * by sell = /products/?sortBy=sold&order=desc&limit=4
 * by arrival = /products/?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, return all products
 */

//get all products
exports.list = (req, res) =>{

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6 ;


    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, data)=>{
            if(err || !data){
                return res.status(400).json({
                    error: 'Products not found'
                })
            }
            res.json(data);
        })
}


/**
 * it will find the products based on req product category
 * other product that has same category will be returned
 */

//get related products
exports.listRelated = (req, res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 6 ;

    Product.find({_id: {$ne: req.product._id}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id, name')
        .exec((err, data)=>{
            if(err){
                return res.status(400).json({
                    error: 'Products not found'
                })
            }

            res.json(data);
        })
}




//to get only that categories that have products
exports.listCategories = (req, res) =>{
    Product.distinct("category", {}, (err, categories)=>{
        if(err){
            return res.status(400).json({
                error: 'Categories not found'
            })
        }
        res.json(categories)
    })
}



/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
*/
 
 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};





//get the product photo  //middleware
exports.photo = (req, res)=>{
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);

    }
    next();
}



exports.listSearch = (req, res) =>{
    //create query obj to hold search and category value
    const query = {}
    
    //assign search value to query.name
    if(req.query.search){
        query.name = {$regex: req.query.search, $options: 'i'}
        //assign category value to query.category
        if(req.query.category && req.query.category !== 'All'){
            query.category = req.query.category;
        }

        //find objects based on query with 2 properties
        //search and category
        Product.find(query, (err, product)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(product);
        }).select('-photo')
    }
}




//update product quantity //middleware
exports.decreaseQuantity = (req, res, next) =>{
    let bulkOps = req.body.order.products.map((item)=>{
        return {
            updateOne: {
                filter: {_id: item._id},
                update: {$inc: {quantity: -item.count, sold: +item.count}}
            }
        }
    })

    Product.bulkWrite(bulkOps, {}, (error, products)=>{
        if(error){
            return res.status(400).json({
                error: "Could not update the quantity"
            })
        }
        next();
    })
}