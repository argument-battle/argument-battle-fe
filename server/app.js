const express = require('express');
const router = require('./routes/router');
const cookieParser = require('cookie-parser');
const Bundler = require('parcel-bundler');
const path = require('path');
const mongoose = require('mongoose');
const socketEvents = require('./socketEvents');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const entryFiles = path.join(__dirname, '../public/index.html');

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_, res) =>
        res.sendFile(path.join(__dirname, '../dist/index.html'))
    );
} else {
    const bundler = new Bundler(entryFiles, { detailedReport: true });
    app.use(bundler.middleware());
}

socketEvents(io);

module.exports = server;
