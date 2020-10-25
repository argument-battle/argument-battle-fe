const getUserMiddleware = require('./getUserMiddleware');

const authBattleParticipantMiddleware = [
    getUserMiddleware,
    async (_, res, next) => {
        const { user } = res.locals;
        if (user.isModerator) {
            next();
        } else {
            res.status(401).send({ error: 'Unauthorized' });
        }
    }
];

module.exports = authBattleParticipantMiddleware;
