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

router.get("/nearestambulance", (req,res) => {
  ambulanceModel.find({
      location : {
          $near : {
                  coordinates : [77.6411549999997,12.9718915]
              },
              $maxDistance : 2000
      }
  }).then((err,result) => {
      if(err) {
          res.json(err);
      }
      else {
          res.json(result);
      }
  })
})

module.exports = router;