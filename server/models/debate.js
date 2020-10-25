const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const debateSchema = new mongoose.Schema(
    {
        topic: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: ['inactive', 'active', 'ended'],
            default: 'inactive'
        },
        startedAt: Date,
        endedAt: Date,
        teams: [{ type: ObjectId, ref: 'team' }],
        winnerTeam: { type: ObjectId, ref: 'team' },
        creator: { type: ObjectId, ref: 'user' },
        participatingClubs: [{ type: ObjectId, ref: 'debateclub' }],
        rounds: [{ type: ObjectId, ref: 'round' }]
    },
    { timestamps: true }
);

const Debate = mongoose.model('debate', debateSchema);

module.exports = Debate;
