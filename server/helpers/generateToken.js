const jwt = require('jsonwebtoken');
const expiresIn = '10h';

function generateToken({ username, password }) {
    return jwt.sign({ username, password }, process.env.JWT_KEY, {
        expiresIn
    });
}

module.exports = generateToken;
