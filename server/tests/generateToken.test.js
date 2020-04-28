const generateToken = require('../helpers/generateToken.js');
const jwt = require('jsonwebtoken');
process.env.JWT_KEY = 'somesecret';

test('adds 1 + 2 to equal 3', () => {
    const username = 'test';
    const password = 'password123';
    const token = generateToken({ username, password });
    const { username: resultUsername, password: resultPassword } = jwt.verify(
        token,
        process.env.JWT_KEY
    );
    const isUserValid = username === resultUsername && password === resultPassword;

    expect(isUserValid).toBe(true);
});
