const getUserMiddleware = require('./getUserMiddleware');

const authUserMiddleware = [
    getUserMiddleware,
    (req, res, next) => {
        const { user } = res.locals;
        if (user) {
            next();
        } else {
            res.status(401).send({ error: 'Unauthorized' });
        }
    }
];

module.exports = authUserMiddleware;
