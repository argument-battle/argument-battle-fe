const Router = require('express').Router;

const { getAll } = require('../services/user');

const router = new Router();

router.get('/', getAll);

module.exports = router;
