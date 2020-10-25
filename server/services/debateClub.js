const DebateClub = require('../models/debateClub');

async function getAll(_, res) {
    try {
        const clubs = await DebateClub.find({}, 'name').lean();
        res.status(200).send(clubs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { getAll };
