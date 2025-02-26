const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//updated
const cartSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    itemId : {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    quantity : {
        type: String,
        required: true
    },
    userID : {
        type: String,
        required: true
    },
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;