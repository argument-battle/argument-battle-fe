const Argument = require('../models/argument');

async function upvote(req, res) {
    const { argumentId } = req.params;
    try {
        const argument = await Argument.findByIdAndUpdate(argumentId, {
            $inc: {
                rating: 1
            }
        });
        res.status(200).send(argument);
    } catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = {
    upvote
};
