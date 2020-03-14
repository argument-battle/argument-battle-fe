const express = require('express');
const router = require('./routes/router');
const cookieParser = require('cookie-parser');
const Bundler = require('parcel-bundler');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const app = express();

const entryFiles = path.join(__dirname, '../public/index.html');
const bundler = new Bundler(entryFiles, { sourceMaps: !isProd });

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(bundler.middleware());

module.exports = app;
