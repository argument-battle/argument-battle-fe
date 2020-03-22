const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    battles: {
        type: ObjectId,
        ref: 'Battle'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
