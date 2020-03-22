const Battle = require('../models/battle');

async function create(req, res) {
    const { title } = req.body;
    const { user } = res.locals;
    try {
        const data = new Battle({ title, defender: user._id });
        const battle = await data.save();

        res.status(201).send({ battle });
    } catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = { create };
