const delay = require('./helpers/delay');
const { startDebate, endDebate } = require('./services/debate');
const { startRound, endActiveRounds } = require('./services/round');

function socketEvents(io) {
    io.on('connection', socket => {
        socket.on('join debate', debateId => {
            socket.join(debateId).emit('debate update', 'join ' + debateId);
        });

        socket.on('leave debate', debateId => {
            socket.leave(debateId);
        });

        socket.on('join debate team', debateId => {
            io.in(debateId).emit('debate update');
        });

        socket.on('send argument', debateId => {
            io.in(debateId).emit('arguments update');
        });

        socket.on('update argument', debateId => {
            io.in(debateId).emit('arguments update');
        });

        socket.on('start debate', async debateId => {
            const roundCount = await startDebate(debateId);
            const waitTime = 10_000;
            const roundPromises = [...Array(roundCount)].map(async (_, i) => {
                await delay(i * waitTime);
                await endActiveRounds(debateId);
                await startRound(debateId);
                io.in(debateId).emit('debate update', 'start round ' + i);
                io.in(debateId).emit('arguments update');
            });
            await Promise.all(roundPromises);
            await delay(waitTime);
            await endActiveRounds(debateId);
            await endDebate(debateId);
            io.in(debateId).emit('debate update', 'ended');
        });
    });
}

module.exports = socketEvents;
