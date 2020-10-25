const { Router } = require('express');
const userRouter = require('./user');
const clubsRouter = require('./debateClub');
const debateRouter = require('./debate');
// const battleRouter = require('./battle');
// const messageRouter = require('./message');

const router = new Router();

router.use('/users', userRouter);
router.use('/clubs', clubsRouter);
router.use('/debates', debateRouter);
// router.use('/battles', battleRouter);
// router.use('/messages', messageRouter);

module.exports = router;
