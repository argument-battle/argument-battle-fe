const { Router } = require('express');
const { create } = require('../services/debate');
const isModeratorMiddleware = require('../middleware/isModeratorMiddleware');

const router = new Router();

router.post('/', isModeratorMiddleware, create);

module.exports = router;
