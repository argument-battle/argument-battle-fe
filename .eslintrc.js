const prettierRules = require('./.prettierrc.js');
module.exports = {
    extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
    plugins: ['prettier', 'react-hooks', 'react', 'jest'],
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
        node: true,
        ['jest/globals']: true
    },
    rules: {
        'react/prop-types': 0,
        strict: 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': ['error', prettierRules],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error'
    },
    settings: {
        react: { version: 'detect' }
    }
};
