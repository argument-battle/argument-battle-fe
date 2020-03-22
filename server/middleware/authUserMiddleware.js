const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function authUserMiddleware(req, res, next) {
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
            throw new Error();
        }

        next();
    } catch {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

module.exports = authUserMiddleware;
