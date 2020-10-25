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