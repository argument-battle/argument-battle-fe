const { Router } = require('express');
const { getAll } = require('../services/debateClub');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.get('/', authUserMiddleware, getAll);

module.exports = router;
