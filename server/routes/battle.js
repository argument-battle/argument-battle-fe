const { Router } = require('express');
const { create } = require('../services/battle');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.post('/', authUserMiddleware, create);

module.exports = router;
