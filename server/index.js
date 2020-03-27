require('dotenv').config();
const server = require('./app');

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
