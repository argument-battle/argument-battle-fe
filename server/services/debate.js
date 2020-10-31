const Debate = require('../models/debate');
const Round = require('../models/round');
const User = require('../models/user');
const Team = require('../models/team');
const Argument = require('../models/argument');

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

        const rounds = Array(Number(roundCount)).fill({
            debate: debate._id
        });
        const savedRounds = await Round.insertMany(rounds);
        debate.rounds = savedRounds.map(e => e._id);
        await debate.save();

        await Promise.all(
            participatingClubIds.map(async clubId => {
                await User.updateMany(
                    { debateClub: clubId, _id: { $ne: user._id } },
                    {
                        $push: {
                            unjoinedDebates: debate._id
                        }
                    }
                );
            })
        );

        await User.findByIdAndUpdate(user._id, {
            $push: {
                moderatedDebates: debate._id
            }
        });

        res.status(201).send(debate);
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function getById(req, res) {
    const { debateId } = req.params;
    try {
        const debate = await Debate.findById(debateId)
            .populate({
                path: 'teams',
                select: 'members debate name',
                populate: {
                    path: 'members',
                    select: 'username'
                }
            })
            .populate({ path: 'participatingClubs', select: 'name' })
            .populate({ path: 'rounds', select: 'status arguments startedAt' })
            .populate({ path: 'creator', select: 'username' })
            .populate({ path: 'winnerTeam', select: 'name' })
            .lean();

        res.status(200).send(debate);
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function joinTeam(req, res) {
    const { debateId, teamId } = req.params;
    const userId = res.locals.user._id;

    try {
        await Team.findByIdAndUpdate(teamId, { $push: { members: userId } });
        await User.findByIdAndUpdate(userId, {
            $push: { activeDebates: debateId },
            $pull: { unjoinedDebates: debateId }
        });
        res.status(200).send({});
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function getCurrentRoundArguments(req, res) {
    const { debateId } = req.params;
    try {
        const rounds = await Round.find({
            debate: debateId,
            status: 'active'
        })
            .populate({
                path: 'arguments',
                select: 'rating content user team createdAt',
                populate: {
                    path: 'user',
                    select: 'username'
                }
            })
            .lean();
        const args = rounds.map(e => e.arguments).flat();
        res.status(200).send(args);
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function addArg(req, res) {
    const { debateId } = req.params;
    const { content } = req.body;
    const user = res.locals.user._id;
    try {
        const team = await Team.findOne({
            debate: debateId,
            members: user
        });
        const argument = await Argument.create({
            content,
            user,
            team: team._id
        });
        await Round.findOneAndUpdate(
            { debate: debateId, status: 'active' },
            { $push: { arguments: argument._id } }
        );
        res.status(200).send({});
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function upvoteArgument(req, res) {
    const { debateId } = req.params;
    const { content } = req.body;
    const user = res.locals.user._id;
    try {
        const team = await Team.findOne({
            debate: debateId,
            members: user
        });
        const argument = await Argument.create({
            content,
            user,
            team: team._id
        });
        await Round.findOneAndUpdate(
            { debate: debateId, status: 'active' },
            { $push: { arguments: argument._id } }
        );
        res.status(200).send({});
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function startDebate(debateId) {
    try {
        const debate = await Debate.findByIdAndUpdate(debateId, {
            status: 'active',
            startedAt: new Date()
        });
        return debate.rounds.length;
    } catch (error) {
        console.log(error);
    }
}

async function endDebate(debateId) {
    try {
        await Debate.findByIdAndUpdate(debateId, {
            status: 'ended',
            endedAt: new Date()
            //winnerTeam
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create,
    getById,
    joinTeam,
    getCurrentRoundArguments,
    addArg,
    upvoteArgument,
    startDebate,
    endDebate
};
