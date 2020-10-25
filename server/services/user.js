const User = require('../models/user');
const DebateClub = require('../models/debateClub');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const generateToken = require('../helpers/generateToken');

async function getMe(_, res) {
    const userId = res.locals.user._id.toString();
    const user = await User.findById(userId)
        .populate({ path: 'debateClub', select: 'name' })
        .lean();
    res.status(200).send(user);
}

async function getGuest(_, res) {
    const username = 'Guest' + Math.floor(Math.random() * Math.floor(40000));
    const avatarUrl = gravatar.url(
        `${username}@argbattle.lt`,
        { size: '200', rating: 'x', default: 'robohash' },
        true
    );

    res.status(200).send({ username, avatarUrl });
}

async function create(req, res) {
    try {
        const salt = 10;
        const { password, email, secretCode } = req.body;
        const debateClub = await DebateClub.findOne({ secretCode });
        if (!debateClub) {
            throw new Error('Debate club does not exist');
        }
        const hash = await bcrypt.hash(password, salt);
        const avatarUrl = gravatar.url(
            email,
            { size: '200', rating: 'x', default: 'robohash' },
            true
        );

        const user = new User({
            ...req.body,
            password: hash,
            avatarUrl,
            debateClub: debateClub._id
        });

        await user.save();

        await DebateClub.findByIdAndUpdate(debateClub._id, {
            $push: { members: user._id }
        });

        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send({ error });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('password compare', isPasswordCorrect);
        if (!isPasswordCorrect) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const token = generateToken({ email, password });
        res.cookie('user_token', token);

        res.status(200).send({ message: 'Success' });
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function logout(_, res) {
    res.clearCookie('user_token');
    res.status(200).send({ message: 'Success' });
}

module.exports = { getGuest, getMe, create, login, logout };
