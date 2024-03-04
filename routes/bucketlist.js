const express = require('express');
const add = express.Router();
const remove = express.Router();
const get = express.Router();
const edit = express.Router();
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

//Remove Bucket
remove.get('/:id', async(req, res) => {
    try {
        let id = req.params.id;
        console.log(id);
        try {
            const deletebucket = await Bucket.findOneAndDelete({ _id : id});
        } catch (error) {
            res.status(500).json({});
        }
        res.redirect('/home');
    } catch(error) {
        res.status(500).send(error.message);
    }
})

//Get Bucket
get.get('/:id', async(req, res) => {
    try{
        const itemId = req.params.id;
        const item = await Bucket.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Update Bucket
edit.get('/:id', async(req, res) => {
    try{
        const itemId = req.params.id;
        const {topic, startDate, endDate} = req.query;

        try {
            await Bucket.updateOne({_id : itemId}, {topic, startDate, endDate});
            console.log('Bucket Updated SuccessFully');
        } catch (error) {
            res.status(500).send(error.message);
        }

        res.redirect('/home');

    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = {
    add : add,
    remove: remove,
    edit: edit
}