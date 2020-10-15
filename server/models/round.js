const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const roundSchema = new mongoose.Schema(
    {
        startedAt: Date,
        endedAt: Date,
        status: {
            type: String,
            required: true,
            enum: ['inactive', 'active', 'ended'],
            default: 'inactive'
        },
        arguments: [{ type: ObjectId, ref: 'argument' }]
    },
    { timestamps: true }
);

roundSchema.post('save', async (doc, next) => {
    const Debate = require('./debate');
    const { debate, _id } = doc;

    await Debate.findByIdAndUpdate(debate, { $push: { rounds: _id } });
    next();
});

const Round = mongoose.model('round', roundSchema);

module.exports = Round;
