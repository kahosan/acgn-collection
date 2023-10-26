'use strict';

const { kaho, node } = require('eslint-config-kaho');

module.exports = [
  ...kaho({ ts: { tsconfigPath: './tsconfig.json' }, react: true }),
  ...node({ files: ['./eslint.config.js'] }),
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-enum-comparison': 'off'
    }
  }
];
