'use strict';

const { kaho } = require('eslint-config-kaho');

module.exports = kaho().then(config => [
  ...config,
  {
    files: ['app/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off'
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
]);
