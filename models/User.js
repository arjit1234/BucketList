const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: false,
    },
    mobile: {
        type: Number,
        required: false,
    },
    universirty:{
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User