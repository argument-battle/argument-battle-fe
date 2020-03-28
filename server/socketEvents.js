function socketEvents(io) {
    io.on('connection', socket => {
        socket.on('join battle', battleId => {
            socket.join(battleId);
        });

        socket.on('leave battle', battleId => {
            socket.leave(battleId);
        });

        socket.on('send message', ({ battleId }) => {
            io.in(battleId).emit('new message', null);
        });
    });
}

module.exports = socketEvents;