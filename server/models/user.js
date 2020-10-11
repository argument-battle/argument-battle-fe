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
    battles: [
        {
            type: ObjectId,
            ref: 'Battle'
        }
    ],
    avatarUrl: {
        type: String,
        required: true
    },
    debateClub: {
        type: ObjectId,
        ref: 'DebateClub'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
