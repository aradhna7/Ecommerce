const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');

//find user by id
exports.userById = async (req, res, next, id) =>{

    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }

        req.profile = user;
        next();
    })
}


//get user profile
exports.read = (req, res) =>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    res.json(req.profile);
}


//update profile
exports.update = (req, res) =>{
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'No authorization'
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    })
}


//add order to history middleware
exports.addOrderToUserHistory = (req, res, next) =>{
    const history= [];
    req.body.order.products.forEach((item)=>{
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category:item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount,
        })
        

    })

    User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: history}}, {new: true}, (error, data)=>{
        if(error){
            return res.status(400).json({
                error: "Could not update user purrchase history"
            })
        }
        next();
    })
}

