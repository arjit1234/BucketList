const express = require('express');
const Bucket  = require('../models/Buckets')
const home = express.Router();


home.get('' , async(req,res) => {
    try {

       re.status(200);
    } catch (error) {
        console.log(error);
    }
})

module.exports = home