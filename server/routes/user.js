const { Router } = require('express');
const { getAll, create, login } = require('../services/user');

const router = new Router();

router.get('/', getAll);
router.post('/', create);
router.post('/login', login);

module.exports = router;
