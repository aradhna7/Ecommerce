const _ = require('lodash');

const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');

//get category by id
exports.categoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category)=>{
        if(err || !category){
            return res.status(400).json({
                error: 'Category does not exists'
            })
        }

        req.category = category;
        next();
    })
}


//get a category
exports.read = (req, res)=>{
    res.json(req.category);
}



//create a category
exports.create = (req, res) =>{

    const category = new Category(req.body);
    category.save((err, data)=>{
        if(err || !data){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({data});
    })
}



//delete a category
exports.remove = (req, res) =>{
    
    let category = req.category;

    category.remove((err, categoryDeleted) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Category deleted succesfully'
        })
    })
}



//update a category
exports.update = (req, res) =>{

    let category = req.category;

    category = _.extend(category, req.body);

    category.save((err, data)=>{
        if(err || !data){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({data});
    })
}



//GET ALL THE CATEGORIES
exports.list = (req, res) =>{
    Category.find().exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}