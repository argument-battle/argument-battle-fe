const Router = require('express').Router;

const { getAll, create } = require('../services/user');

const router = new Router();

router.get('/', getAll);
router.post('/', create);

module.exports = router;
