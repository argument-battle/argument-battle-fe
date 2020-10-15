const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isModerator: {
        type: Boolean,
        default: false
    },
    debates: [{ type: ObjectId, ref: 'debate' }],
    avatarUrl: {
        type: String,
        required: true
    },
    debateClub: { type: ObjectId, ref: 'debateclub' },
    ratings: [{ type: ObjectId, ref: 'argument' }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
