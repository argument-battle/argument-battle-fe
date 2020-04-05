const { Router } = require('express');
const { create, getById, getAll, join } = require('../services/battle');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.post('/', authUserMiddleware, create);
router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id/join', authUserMiddleware, join);

module.exports = router;
