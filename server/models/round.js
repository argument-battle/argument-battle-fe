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
        arguments: [{ type: ObjectId, ref: 'argument' }],
        debate: { type: ObjectId, ref: 'debate' }
    },
    { timestamps: true }
);

const Round = mongoose.model('round', roundSchema);

module.exports = Round;
