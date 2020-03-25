const { Router } = require('express');
const { create } = require('../services/message');
const authBattleParticipantMiddleware = require('../middleware/authBattleParticipantMiddleware');

const router = new Router();

router.post('/', authBattleParticipantMiddleware, create);

module.exports = router;
