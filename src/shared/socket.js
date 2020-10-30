import io from 'socket.io-client';

const socket = io();

if (process.env.NODE_ENV !== 'production') {
    var onevent = socket.onevent;
    socket.onevent = function(packet) {
        var args = packet.data || [];
        onevent.call(this, packet); // original call
        packet.data = ['*'].concat(args);
        onevent.call(this, packet); // additional call to catch-all
    };

    socket.on('*', (...args) => {
        console.log('🔌', ...args);
    });
}
export default socket;
