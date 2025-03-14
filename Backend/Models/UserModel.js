const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type: String,
        required: false
    },
    email : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: false
    },
    phoneNumber : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    // role : {
    //     type: String,
    //     required: false,
    //     default: 'customer'
    // }

})

const User = mongoose.model('User', userSchema);

module.exports = User;