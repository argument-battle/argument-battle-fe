const mongoose = require('mongoose');
const Debate = require('./debate');
const Round = require('./round');
const ObjectId = mongoose.Schema.Types.ObjectId;

const argumentSchema = new mongoose.Schema(
    {
        content: String,
        rating: { type: Number, default: 0 },
        raters: [
            {
                user: { type: ObjectId, ref: 'user' },
                rating: Number
            }
        ],
        user: { type: ObjectId, ref: 'user' },
        battle: { type: ObjectId, ref: 'battle' }
    },
    { timestamps: true }
);

argumentSchema.post('save', async (doc, next) => {
    const { _id, debate, round } = doc;
    await new Promise.all([
        Debate.findByIdAndUpdate(debate, { $push: { arguments: _id } }),
        Round.findByIdAndUpdate(round, { $push: { arguments: _id } })
    ]);
    next();
});

const Message = mongoose.model('argument', argumentSchema);

module.exports = Message;
