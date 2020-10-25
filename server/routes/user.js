const { Router } = require('express');
const { getGuest, getMe, create, login, logout } = require('../services/user');
const authUserMiddleware = require('../middleware/authUserMiddleware');

const router = new Router();

router.get('/guest', getGuest);
router.get('/me', authUserMiddleware, getMe);
router.post('/', create);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
