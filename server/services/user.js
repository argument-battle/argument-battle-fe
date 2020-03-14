const { User } = require('../models');
const bcrypt = require('bcryptjs');

async function getAll(req, res) {
    const users = await User.findAll({ raw: true });
    res.status(200).send({ users });
}

async function create(req, res) {
    try {
        const salt = 10;
        const user = req.body;

        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;

        await User.create(user);
        res.status(201).send({ message: 'Success' });
    } catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = { getAll, create };
