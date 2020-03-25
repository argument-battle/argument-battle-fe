const { Router } = require('express');
const { create, getById } = require('../services/battle');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.post('/', authUserMiddleware, create);
router.get('/:id', getById);

module.exports = router;
