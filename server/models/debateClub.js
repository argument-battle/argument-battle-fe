const mongoose = require('mongoose');

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
    }
});

const DebateClub = mongoose.model('debateclub', debateClubSchema);

module.exports = DebateClub;
