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
        teams: [
            {
                name: { type: String, required: true, unique: true },
                members: [{ type: ObjectId, ref: 'user' }]
            }
        ],
        arguments: [{ type: ObjectId, ref: 'argument' }],
        creator: { type: ObjectId, ref: 'user' },
        participatingClubs: [{ type: ObjectId, ref: 'debateclub' }],
        rounds: [{ type: ObjectId, ref: 'round' }]
    },
    { timestamps: true }
);

debateSchema.post('save', async (doc, next) => {
    const User = require('./user');
    const { defender, _id } = doc;

    await User.findByIdAndUpdate(defender, { $push: { debates: _id } });
    next();
});

const Debate = mongoose.model('debate', debateSchema);

module.exports = Debate;
