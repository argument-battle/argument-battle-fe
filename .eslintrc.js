const prettierRules = require('./.prettierrc.js');
module.exports = {
    extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
    plugins: ['prettier', 'react-hooks', 'react'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        browser: true,
        node: true
    },
    rules: {
        'react/prop-types': 0,
        strict: 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': ['error', prettierRules]
    },
    settings: {
        react: { version: 'detect' }
    }
};
