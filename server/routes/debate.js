const { Router } = require('express');
const {
    create,
    getById,
    joinTeam,
    addArg,
    getCurrentRoundArguments,
    upvoteArgument,
    getAll
} = require('../services/debate');
const isModeratorMiddleware = require('../middleware/isModeratorMiddleware');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.get('/', getAll);
router.post('/', isModeratorMiddleware, create);
router.post('/:debateId/teams/:teamId', authUserMiddleware, joinTeam);
router.post('/:debateId/arguments', authUserMiddleware, addArg);
router.get('/:debateId/rounds/current/arguments', getCurrentRoundArguments);
router.patch(
    '/:debateId/rounds/current/arguments/:argumentId/upvote',
    upvoteArgument
);
router.get('/:debateId', getById);

module.exports = router;
