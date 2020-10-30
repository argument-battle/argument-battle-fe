const Round = require('../models/round');

async function endActiveRounds(debateId) {
    try {
        await Round.findOneAndUpdate(
            { debate: debateId, status: 'active' },
            { status: 'ended', endedAt: new Date() }
        );
    } catch (error) {
        console.log(error);
    }
}

async function startRound(debateId) {
    try {
        await Round.findOneAndUpdate(
            { debate: debateId, status: 'inactive' },
            { status: 'active', startedAt: new Date() }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = { startRound, endActiveRounds };
