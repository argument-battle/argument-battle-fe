const jwt = require('jsonwebtoken');
const expiresIn = '10h';

function generateToken({ email, password }) {
    return jwt.sign({ email, password }, process.env.JWT_KEY, {
        expiresIn
    });
}

module.exports = generateToken;
