const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema(
    {
        content: String,
        user: { type: ObjectId, ref: 'User' },
        battle: { type: ObjectId, ref: 'Battle' }
    },
    {
        timestamps: true
    }
);

messageSchema.post('save', async (doc, next) => {
    const Battle = require('./battle');
    const { battle, _id } = doc;

    await Battle.findByIdAndUpdate(battle, { $push: { messages: _id } });
    next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
