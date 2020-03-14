const path = require('path');

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', '..', 'argument_battle_db.sqlite'),
        logging: false
    },
    test: {
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    },
    production: {
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', '..', 'argument_battle_db.sqlite'),
        logging: console.log
    }
};
