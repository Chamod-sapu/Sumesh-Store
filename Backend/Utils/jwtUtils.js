const jwt = require('jsonwebtoken');
const { secretKey } = require('../Configurations/jwtConfig');

function generateToken(user) {
    const payload = {
        id: user._id, // Changed from user.id to user._id
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

module.exports = {
    generateToken
};