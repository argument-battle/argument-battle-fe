const Debate = require('../models/debate');
const Round = require('../models/round');
const User = require('../models/user');
const Team = require('../models/team');

async function create(req, res) {
    const { topic, participatingClubIds, roundCount } = req.body;
    const { user } = res.locals;
    try {
        let debate = new Debate({
            topic,
            creator: user._id,
            participatingClubs: participatingClubIds
        });
        await debate.save();

        const teams = await Team.insertMany([
            { name: 'Už', debate: debate._id },
            { name: 'Prieš', debate: debate._id }
        ]);
        debate.teams = teams.map(e => e._id);
        await debate.save();

        const rounds = new Array(roundCount).fill({ debate: debate._id });
        const savedRounds = await Round.insertMany(rounds);
        debate.rounds = savedRounds.map(e => e._id);
        await debate.save();

        await Promise.all(
            participatingClubIds.map(
                async clubId =>
                    await User.updateMany(
                        { debateClub: clubId },
                        {
                            $push: {
                                unjoinedDebates: '5f94bf02e7b3160fe8a67c1f' // debate._id
                            }
                        }
                    )
            )
        );

        res.status(201).send(debate);
    } catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = { create };
