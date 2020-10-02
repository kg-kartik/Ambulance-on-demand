const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const User = new Schema({
    name : {
        type : String,
        required : true
    },

    email: {
        type : String,
        required : true
    },

    contact : {
        type : String,
        required : true
    },

    address: {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
})

const exportUser = mongoose.model('User', User)

module.exports = exportUser