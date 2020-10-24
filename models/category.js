const mongoose = require('mongoose');
const uuid = require('uuidv1');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    


}, {timestamps: true });



module.exports = mongoose.model('Category', categorySchema);