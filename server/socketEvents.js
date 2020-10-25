function socketEvents(io) {
    io.on('connection', socket => {
        socket.on('join debate', debateId => {
            socket.join(debateId).emit('debate update', null);
        });

        socket.on('leave debate', debateId => {
            socket.leave(debateId);
        });

        socket.on('send argument', debateId => {
            io.in(debateId).emit('new argument', null);
        });
    });
}

module.exports = socketEvents;
