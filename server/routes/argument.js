const { Router } = require('express');
const { upvote } = require('../services/argument');

const router = new Router();

router.post('/:argumentId', upvote);

module.exports = router;
