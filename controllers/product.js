const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product');
const {errorHandler} = require('../helpers/dbErrorHandler');



//find product by id
exports.productById = async (req, res, next, id) =>{

    Product.findById(id).exec((err, product)=>{
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
        const {name, description, price, quantity, shipping, category} = fields;

        if(!name || !description || !price || !quantity || !shipping || !category){
            return res.status(400).json({
                error: "All fields are neccesary"
            })
        }

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



