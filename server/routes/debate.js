const { Router } = require('express');
const { create, getById, joinTeam } = require('../services/debate');
const isModeratorMiddleware = require('../middleware/isModeratorMiddleware');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.post('/', isModeratorMiddleware, create);
router.put('/:debateId/teams/:teamId', authUserMiddleware, joinTeam);
router.get('/:debateId', getById);

module.exports = router;
