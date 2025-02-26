const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//updated 
const itemSchema = new Schema({
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
    description : {
        type: String,
        required: true
    },
    sku : {
        type: String,
        required: true
    },
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;