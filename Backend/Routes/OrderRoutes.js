const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
let Order = require("../Models/OrderModel.js");

// Create an Order
router.route('/add').post(async (req, res) => {
    const {orderNO, name, quantity, address, price,status} = req.body;
    
    const newOrder = new Order({
        orderNO, 
        name, 
        quantity, 
        address, 
        price,
        status
    });

    newOrder.save()
        .then(() => res.json('Order Added Successfully'))
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Fetch Orders
router.route('/').get(async (req, res) => {
    Order.find()
        .then(orders => res.json(orders)) // Note the variable name 'orders'
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
});

// Delete an Order
router.route('/delete/:id').delete(async (req, res) => { 
    const orderNO = req.params.id;

    try {
        await Order.findByIdAndDelete(orderNO); // Should be 'Order'
        res.status(200).send({ status: 'Order deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with deleting Order', error: err.message });
    }
});

// Update an Order
router.route('/update/:id').put(async (req, res) => {
    let id = req.params.id;

    const {orderNO, name, quantity, address, price,status} = req.body;

    const updateOrder = {
        orderNO, 
        name, 
        quantity, 
        address, 
        price,
        status
    };

    try {
        const update = await Order.findByIdAndUpdate(id, updateOrder, { new: true });
        res.status(200).send({ status: 'Order updated', order: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating order', error: err.message });
    }
});

module.exports = router;
