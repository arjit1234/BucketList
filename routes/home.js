const express = require('express');
const Bucket  = require('../models/Buckets')
const home = express.Router();


home.get('' , async(req,res) => {
    try {

        const buckets = await Bucket.find({});
     
        res.json(buckets);
    } catch (error) {
        console.log(error);
    }
})

module.exports = home