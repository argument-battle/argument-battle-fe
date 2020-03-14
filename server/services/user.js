const { User } = require('../models');

async function getAll(req, res) {
    const users = await User.findAll({ raw: true });
    res.status(200).send({ users });
}

module.exports = { getAll };
