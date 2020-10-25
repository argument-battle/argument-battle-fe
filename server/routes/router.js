const { Router } = require('express');
const userRouter = require('./user');
const clubsRouter = require('./debateClub');
const debateRouter = require('./debate');
const argumentRouter = require('./argument');

const router = new Router();

router.use('/users', userRouter);
router.use('/clubs', clubsRouter);
router.use('/debates', debateRouter);
router.use('/arguments', argumentRouter);

module.exports = router;
