const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
    topic:{
        type: String,
        require: true
    },
    startDate:{
       type: Date,
        require: true,
    },
    endDate:{
        type: Date,
        require: true
    },
    timeframe:{
        type: String,
        require: true
    }  
},{timestamps:true})

const Buckets = mongoose.model("Buckets",bucketSchema);

module.exports = Buckets