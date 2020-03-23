const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function getUserMiddleware(req, res, next) {
    const userToken = req.cookies['user_token'];

    try {
        if (!userToken) {
            throw new Error();
        }

        const { username } = jwt.verify(userToken, process.env.JWT_KEY);
        const user = await User.findOne({ username });
        if (user) {
            res.locals.user = user;
        } else {
            res.locals.user = null;
        }
    } catch {
        res.locals.user = null;
    }

    next();
}

module.exports = getUserMiddleware;
