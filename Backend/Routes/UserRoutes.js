const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
let User = require("../Models/UserModel.js");
const bcrypt = require('bcrypt');
const {login }= require('../Controllers/loginController.js');
// Create a User
router.route('/add').post(async (req, res) => {
    try {
        const { name, email, address, phoneNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            address,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.json('User Added Successfully');
    } catch (err) {
        console.log(err);
        res.status(400).json('Error: ' + err);
    }
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
    const id = req.params.id;
    const { name, email, address, phoneNumber } = req.body;
  
    const updateUser = { name, email, address, phoneNumber };
  
    try {
      await User.findByIdAndUpdate(id, updateUser);
      res.status(200).json('User updated successfully');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });
  
  // Change Password
  router.route('/change-password/:id').put(async (req, res) => {
    const id = req.params.id;
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json('Current password is incorrect');
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json('Password changed successfully');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

// Login a User
router.post('/login', login);

module.exports = router;