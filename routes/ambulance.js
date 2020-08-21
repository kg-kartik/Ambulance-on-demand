const express = require("express");
const router = express.Router();
const ambulanceModel = require("../model/ambulance");

router.post('/',(req,res) => {
    const {ambulanceid,displayName,phone,email,location} = req.body;

    const ambulance = new ambulanceModel({
        ambulanceid,
        displayName,
        phone,
        email,
        location
    })

    //Saving Ambulance Data
    ambulance.save((err,result) => {
         if(err) {
            res.status(404).json(err);
        }
        else {
            res.status(200).json(result);
        }
    })
})

//Fetching nearby Ambulancedata depending upon maxDistance specified from user
const nearestAmbulance =  (longitude,latitude,maxDistance) => {
    return ambulanceModel.find({
        location : {
          $near : {
                $geometry : {
                    type : "Point",
                    coordinates : [longitude,latitude]
                }, 
                $maxDistance : maxDistance        
            }
        }
    }).exec()
    .catch((err) => {
        console.log(err);
    })
}


router.get('/info/:ambulanceid', (req,res) => {
    const {ambulanceid} = req.params;
    ambulanceModel.findOne({
        ambulanceid 
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = {
    method : router,
    otherMethod : nearestAmbulance,
}