const Message = require('../models/message');

async function create(req, res) {
    const { content } = req.body;
    const { user, battle } = res.locals;

    const message = new Message({ content, user: user._id, battle: battle._id });

    try {
        await message.save();

        res.status(201).send({ message });
    } catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = { create };
