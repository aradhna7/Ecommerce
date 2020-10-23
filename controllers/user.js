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