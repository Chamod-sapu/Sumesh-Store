const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
let User = require("../Models/UserModel.js");

// Create a User
router.route('/add').post(async (req, res) => {
    const {username, email, address,phoneNumber} = req.body;
    
    const newUser = new User({
        username, 
        email, 
        address, 
        phoneNumber
    });

    newUser.save()
        .then(() => res.json('User Added Successfully'))
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Fetch Users
router.route('/').get(async (req, res) => {
    User.find()
        .then(users => res.json(users)) // Note the variable name 'users'
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Fetch a User by ID
router.route('/:id').get(async (req, res) => {
    let id = req.params.id;

    User.findById(id)
        .then(user => res.json(user))
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
}
);

// Delete a User
router.route('/delete/:id').delete(async (req, res) => { 
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId); // Should be 'User' not 'Booking'
        res.status(200).send({ status: 'User deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with deleting User', error: err.message });
    }
});

// Update a User
router.route('/update/:id').put(async (req, res) => {
    let id = req.params.id;

    const {username, email, address, phoneNumber} = req.body;

    const updateUser = {
        username, 
        email, 
        address, 
        phoneNumber
    };

    User.findByIdAndUpdate(id, updateUser)
        .then(() => res.json('User updated successfully'))
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

module.exports = router;