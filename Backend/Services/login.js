const bcrypt = require('bcrypt');
const user = require('../Models/UserModel');
const {generateToken} = require('../Utils/jwtUtils');

async function login(email, password) {
    try {
        const existingUser = await user.findOne({ email: email });
        if (!existingUser) {
            throw new Error('Invalid email');
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = generateToken(existingUser);
        return { 
            token, 
            userId: existingUser._id 
        };
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    login
};