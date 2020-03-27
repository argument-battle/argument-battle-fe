const { Router } = require('express');
const { create, getByBattle } = require('../services/message');
const authBattleParticipantMiddleware = require('../middleware/authBattleParticipantMiddleware');

const router = new Router();

router.post('/', authBattleParticipantMiddleware, create);
router.get('/', getByBattle);

module.exports = router;
