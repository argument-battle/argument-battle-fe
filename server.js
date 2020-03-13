const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');

(async () => {
    const port = process.env.PORT;
    const isProd = process.env.NODE_ENV === 'production';

    if (!port) {
        console.error('\x1b[31m%s\x1b[0m', 'PORT port not defined in .env file');
        process.exit(1);
    }
    const app = express();

    app.use(createProxyMiddleware('/api', { target: process.env.PROXY_TARGET_URL }));

    const bundler = new Bundler('./public/index.html', { sourceMaps: !isProd });

    if (isProd) {
        await bundler.bundle();
        app.use(express.static('./dist'));
    } else {
        app.use(bundler.middleware());
    }

    app.listen(port, () =>
        console.log('\x1b[33m%s\x1b[0m', `App running on http://localhost:${port}`)
    );
})();
