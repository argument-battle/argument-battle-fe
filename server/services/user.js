const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

async function getAll(req, res) {
    const users = await User.find({});
    res.status(200).send({ users });
}

async function getMe(req, res) {
    const userId = res.locals.user._id.toString();
    const user = await User.findById(userId)
        .lean()
        .populate({
            path: 'battles'
        });
    const newBattles = user.battles.map(({ _id, title, attacker, defender }) => {
        const isDefender = userId === defender.toString();
        const isAtacker = attacker && userId === attacker.toString();

        let userType = 'spectator';
        if (isDefender) {
            userType = 'defender';
        } else if (isAtacker) {
            userType = 'attacker';
        }

        return { _id, title, userType };
    });
    res.status(200).send({ user: { ...user, battles: newBattles } });
}

async function getGuest(req, res) {
    const username = 'Guest' + Math.floor(Math.random() * Math.floor(40000));
    const avatarUrl = gravatar.url(
        `${username}@argbattle.lt`,
        { size: '200', rating: 'x', default: 'robohash' },
        false
    );

    res.status(200).send({ username, avatarUrl });
}

async function get(req, res) {
    const id = req.params.id;
    const { username, avatarUrl } = await User.findById(id);

    res.status(200).send({ user: id, username, avatarUrl });
}

async function create(req, res) {
    try {
        const salt = 10;
        const hash = await bcrypt.hash(req.body.password, salt);
        const avatarUrl = gravatar.url(
            req.body.email,
            { size: '200', rating: 'x', default: 'robohash' },
            false
        );

        const user = new User({ ...req.body, password: hash, avatarUrl });

        await user.save();
        res.status(201).send({ message: 'Success' });
    } catch (error) {
        res.status(400).send({ error });
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
        res.status(200).send({ message: 'Success' });
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function logout(req, res) {
    res.clearCookie('user_token');
    res.status(200).send({ message: 'Success' });
}

module.exports = { getAll, getGuest, getMe, get, create, login, logout };
