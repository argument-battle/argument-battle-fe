const Battle = require('../models/battle');

async function create(req, res) {
    const { topic } = req.body;
    const { user } = res.locals;
    try {
        const data = new Battle({ topic, defender: user._id });
        const battle = await data.save();

        res.status(201).send({ battle });
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function getById(req, res) {
    const { id } = req.params;
    const userSelectQuery = 'username avatarUrl _id';
    try {
        const battle = await Battle.findById(id).populate([
            { path: 'attacker', select: userSelectQuery },
            { path: 'defender', select: userSelectQuery }
        ]);

        res.status(200).send({ battle });
    } catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = { create, getById };
