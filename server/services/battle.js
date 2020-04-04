const Battle = require('../models/battle');

async function create(req, res) {
    const { topic } = req.body;
    const { user } = res.locals;
    try {
        const data = new Battle({ topic, defender: user._id });
        const battle = await data.save();

        res.status(201).send({ battle });
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function getById(req, res) {
    const { id } = req.params;
    const userSelectQuery = 'username avatarUrl _id';
    try {
        const battle = await Battle.findById(id).populate([
            { path: 'attacker', select: userSelectQuery },
            { path: 'defender', select: userSelectQuery }
        ]);

        res.status(200).send({ battle });
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function getAll(req, res) {
    const { pageSize = 10, page, topic } = req.query;
    const pageSizeNum = Number(pageSize);
    const pageNum = Number(page) - 1;
    try {
        const findBy = { topic: { $regex: topic || '', $options: 'i' } };
        const totalCount = await Battle.countDocuments(findBy);

        if (!page) {
            const battles = await Battle.find(findBy)
                .select('-messages')
                .sort({ createdAt: 'desc' });
            return res.status(200).send({ totalCount: battles.length, battles });
        }

        const battles = await Battle.find(findBy)
            .select('-messages')
            .sort({ createdAt: 'desc' })
            .limit(pageSizeNum)
            .skip(pageSizeNum * pageNum);

        let totalPages = Math.round(totalCount / pageSizeNum);
        totalPages = totalPages === 0 ? 1 : totalPages;
        res.status(200).send({ totalCount, totalPages, battles });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}

module.exports = { create, getById, getAll };
