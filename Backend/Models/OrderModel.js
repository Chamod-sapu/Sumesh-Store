const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNO : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    quantity : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    },
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;