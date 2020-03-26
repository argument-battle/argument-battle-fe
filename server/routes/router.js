const { Router } = require('express');
const userRouter = require('./user');
const battleRouter = require('./battle');
const messageRouter = require('./message');

const router = new Router();

router.use('/users', userRouter);
router.use('/battles', battleRouter);
router.use('/messages', messageRouter);

module.exports = router;
