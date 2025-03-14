const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
let Cart = require("../Models/CartModel.js");

// Create a Cart item

router.route('/add').post(async (req, res) => {
    const {name, itemId, price, quantity, userID} = req.body;
    
    const newCartItem = new Cart({
        name, 
        itemId, 
        price, 
        quantity, 
        userID
    });

    newCartItem.save()
        .then(() => res.json('Item Added Successfully'))
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Fetch Cart items
router.route('/').get(async (req, res) => {
    Cart.find()
        .then(items => res.json(items)) // Note the variable name 'items'
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Delete a Cart item
router.route('/delete/:id').delete(async (req, res) => { 
    const itemId = req.params.id;

    try {
        await Cart.findByIdAndDelete(itemId); // Should be 'Cart' not 'Booking'
        res.status(200).send({ status: 'Item deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with deleting Item', error: err.message });
    }
});

// Update a Cart item 
router.route('/update/:id').put(async (req, res) => {
    let id = req.params.id;

    const {name, itemId, price, quantity, userID} = req.body;

    const updateItem = {
        name, 
        itemId, 
        price, 
        quantity, 
        userID
    }; 

    try {
        await Cart.findByIdAndUpdate(id, updateItem);
        res.status(200).send({ status: 'Item updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating Item', error: err.message });
    }
}); 

module.exports = router;
