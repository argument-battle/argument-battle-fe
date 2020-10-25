const { Router } = require('express');
const {
    create,
    getById,
    joinTeam,
    addArg,
    getCurrentRoundArguments
} = require('../services/debate');
const isModeratorMiddleware = require('../middleware/isModeratorMiddleware');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.post('/', isModeratorMiddleware, create);
router.post('/:debateId/teams/:teamId', authUserMiddleware, joinTeam);
router.post('/:debateId/arguments', authUserMiddleware, addArg);
router.get('/:debateId/rounds/current/arguments', getCurrentRoundArguments);
router.get('/:debateId', getById);

module.exports = router;
