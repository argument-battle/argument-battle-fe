const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const battleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'lobby', 'ended'],
        default: 'lobby'
    },
    attacker: { type: ObjectId, ref: 'User' },
    defender: { type: ObjectId, ref: 'User', required: true },
    messages: [{ type: ObjectId, ref: 'Message' }]
});

battleSchema.post('save', async (doc, next) => {
    const User = require('./user');
    const { defender, _id } = doc;

    await User.findByIdAndUpdate(defender, { $push: { battles: _id } });
    next();
});

const Battle = mongoose.model('Battle', battleSchema);

module.exports = Battle;
