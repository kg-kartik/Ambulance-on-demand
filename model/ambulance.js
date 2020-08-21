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
        coordinates : {
            type : [Number]
        }
    }
})
ambulanceSchema.index({"location": "2dsphere"});

const ambulanceModel = mongoose.model('ambulanceModel',ambulanceSchema);
module.exports = ambulanceModel;