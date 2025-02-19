'use strict';

const { kaho } = require('eslint-config-kaho');

const userConfig = [
  {
    files: ['**/*.tsx'],
    rules: {
      '@eslint-react/prefer-destructuring-assignment': 'off'
    }
  },
  {
    rules: {
      '@eslint-react/naming-convention/filename-extension': 'off',
      'n/prefer-global/process': 'off',
      'sukka/no-chain-array-higher-order-functions': 'off',
      'arrow-body-style': 'off'
    }
  }
];

module.exports = kaho({}, ...userConfig);
