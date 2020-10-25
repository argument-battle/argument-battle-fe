const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const argumentSchema = new mongoose.Schema(
    {
        content: String,
        rating: { type: Number, default: 0 },
        user: { type: ObjectId, ref: 'user' },
        team: { type: ObjectId, ref: 'team' }
    },
    { timestamps: true }
);

const Message = mongoose.model('argument', argumentSchema);

module.exports = Message;
