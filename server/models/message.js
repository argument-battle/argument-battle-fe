const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema(
    {
        content: String,
        user: { type: ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
