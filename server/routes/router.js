const { Router } = require('express');
const userRouter = require('./user');
const battleRouter = require('./battle');

const router = new Router();

router.use('/users', userRouter);
router.use('/battles', battleRouter);

module.exports = router;
