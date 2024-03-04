const express = require('express');
const add = express.Router();
const Bucket = require('../models/Buckets');

add.get('', async (req, res) => {
    try {
        
        const topic = req.query.topic;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const timeframe = req.query.timeframe; 
        console.log(startDate,endDate);
        const bucket = new Bucket({ topic, startDate, endDate,  timeframe });
        try {
            await bucket.save();
            console.log('Bucketlist Saved');
        } catch (error) {
            console.log(error);
        }
        res.redirect('/home');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = {
    add : add
}