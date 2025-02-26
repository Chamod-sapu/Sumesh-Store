const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
let Item = require("../Models/ItemModel.js");

// Create an Item (updated)
router.route('/add').post(async (req, res) => {
    const {name, itemId, price, quantity, description, sku} = req.body;
    
    const newItem = new Item({
        name, 
        itemId, 
        price, 
        quantity, 
        description, 
        sku
    });

    newItem.save()
        .then(() => res.json('Item Added Successfully'))
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Fetch Items
router.route('/').get(async (req, res) => {
    Item.find()
        .then(items => res.json(items)) // Note the variable name 'items'
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Delete an Item
router.route('/delete/:id').delete(async (req, res) => { 
    const itemId = req.params.id;

    try {
        await Item.findByIdAndDelete(itemId); // Should be 'Item' not 'Booking'
        res.status(200).send({ status: 'Item deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with deleting Item', error: err.message });
    }
});

// Update an Item
router.route('/update/:id').put(async (req, res) => {
    let id = req.params.id;

    const {name, itemId, price, quantity, description, sku} = req.body;

    const updateItem = {
        name, 
        itemId, 
        price, 
        quantity, 
        description, 
        sku
    };

    try {
        const update = await Item.findByIdAndUpdate(id, updateItem, { new: true });
        res.status(200).send({ status: 'Item updated', item: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating item', error: err.message });
    }
});

module.exports = router;
