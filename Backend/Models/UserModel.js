const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
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
        required: false
    },
    //add password and role
    password : {
        type: String,
        required: false
    },
    role : {
        type: String,
        required: false
    },

})

const User = mongoose.model('User', userSchema);

module.exports = User;