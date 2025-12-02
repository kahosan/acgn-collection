'use strict';

const { kaho } = require('eslint-config-kaho');

module.exports = kaho(
  {
    react: true
  },
  {
    rules: {
      'sukka/no-chain-array-higher-order-functions': 'off'
    }
  }
);
