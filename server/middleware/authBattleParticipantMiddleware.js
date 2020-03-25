const getUserMiddleware = require('./getUserMiddleware');
const Battle = require('../models/battle');

const authBattleParticipantMiddleware = [
    getUserMiddleware,
    async (req, res, next) => {
        const { user } = res.locals;
        const { battle: battle_id } = req.query;

        try {
            const battle = await Battle.findById(battle_id);
            if (!battle) {
                throw new Error();
            }

            const { attacker, defender } = battle;
            const userId = user._id.toString();
            const isDefender = defender.toString() === userId;
            const isAttacker = attacker && attacker.toString() === userId;

            if (isDefender || isAttacker) {
                res.locals.battle = battle;
                next();
            } else {
                throw new Error();
            }
        } catch {
            res.status(401).send({ error: 'Unauthorized' });
        }
    }
];

module.exports = authBattleParticipantMiddleware;
