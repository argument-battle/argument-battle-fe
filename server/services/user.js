const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getAll(req, res) {
    const users = await User.find({});
    res.status(200).send({ users });
}

async function create(req, res) {
    try {
        const salt = 10;
        const hash = await bcrypt.hash(req.body.password, salt);
        const user = new User(Object.assign(req.body, { password: hash }));

        await user.save();
        res.status(201).send({ message: 'Success' });
    } catch (error) {
        res.status(400).send({ error }); //TODO: fix register
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
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
        res.status(500).send({ error });
    }
}

module.exports = { getAll, create, login };
