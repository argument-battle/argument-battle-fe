const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const teamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        members: [{ type: ObjectId, ref: 'user' }],
        debate: { type: ObjectId, ref: 'debate' }
    },
    { timestamps: true }
);

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
