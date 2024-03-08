const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const register  = express.Router();

const User = require('../models/User');

login.post( '/', async (req, res) => { 
    console.log("Login");
    const { email, password } = req.body;
    console.log(email, password);
    try {

        const user = await User.findOne({ email });
        console.log(user);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { 
            return res.status(401).json({ message: "Invalid Password!" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log('Error finding user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

register.post('/', async (req, res) => {

    console.log("register");
    const { email, firstName, lastName, password, mobile, qualification, university } = req.body;
    console.log(email, firstName, lastName, password, mobile, qualification, university);
    try{
        const existingUser = await User.findOne( {email} );
        if (existingUser) {
            return  res.status(400).json({ message: 'User already Exist'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            firstName,
            lastName,
            qualification,
            mobile,
            university,
            password: hashedPassword, // Save the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    login: login,
    register: register
}