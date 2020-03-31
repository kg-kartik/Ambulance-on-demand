const express = require("express");
const router = express.Router();
const ambulanceModel = require("../model/ambulance");

router.post('/',(req,res) => {
    const {ambulanceid} = req.body;
    const {displayName} = req.body;
    const {phone} = req.body;
    const {email} = req.body;
    const {location} = req.body;

    const ambulance = new ambulanceModel({
        ambulanceid,
        displayName,
        phone,
        email,
        location
    })

    ambulance.save((err,result) => {
         if(err) {
            res.status(404).json(err);
        }
        else {
            res.status(200).json(result);
        }
    })
})

const nearestAmbulance = (longitude,latitude,maxDistance) => {
  return ambulanceModel.find({
      location : {
          $near : {
                  coordinates : [longitude,latitude]
              },
              $maxDistance : maxDistance
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

hello = () => {
    console.log("hello");
}
router.get('/nearestAmbulance',(req,res) => {
    ambulanceModel.find({
        location : {
            $near : {
                    coordinates : [76,12]
                },
                $maxDistance : 206000
        }
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log("nearest ambulance wala error");
    })
})

module.exports = {
    method : router,
    otherMethod : nearestAmbulance,
    hello
}