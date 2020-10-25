const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const debateClubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    secretCode: {
        type: String,
        required: true,
        unique: true
    },
    members: [{ type: ObjectId, ref: 'user' }]
});

const DebateClub = mongoose.model('debateclub', debateClubSchema);

module.exports = DebateClub;
