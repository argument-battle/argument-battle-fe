const Router = require('express').Router;
const userRouter = require('./user');

const router = new Router();

router.use('/users', userRouter);

module.exports = router;
