const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
    ambulanceid : {
        type : String,
        required : true
    },
    displayName : {
        type : String,
        required :true
    },
    phone : {
        type : Number,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true
    },
    location : {
        type : {
            type : String,
            required : true,
            default : "Point"
        },
        address : {
            type : String
        },
        coordinates : [Number]
    }
})

const ambulanceModel = mongoose.model('ambulanceModel',ambulanceSchema);
module.exports = ambulanceModel;