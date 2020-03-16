const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        if (error.sql) {
            res.status(400).send({ errors: error.errors });
        }
        res.status(500).send({ errors: [error] });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username }, raw: true });
        if (!user) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const expiresIn = '10h';
        const token = jwt.sign({ username, password }, process.env.JWT_KEY, {
            expiresIn
        });

        res.cookie('user_token', token);
        res.status(200).send({
            message: 'Success'
        });
    } catch (error) {
        if (error.sql) {
            res.status(400).send({ errors: error.errors });
        }
        res.status(500).send({ errors: [error] });
    }
}

module.exports = { getAll, create, login };
