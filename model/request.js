const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    requestId : Schema.Types.ObjectId,
    requestTime :{
        type : Date,
        default : Date.now()
    },
    location : {
        coordinates : {
           type :  [Number]
        },
        address : {
            type : String
        }
    },
    patientId : {
        type : String
    },
    status : {
        type : String
    }
    
})

const Request = mongoose.model('Request',requestSchema);
module.exports = Request;