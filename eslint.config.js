import { kaho } from 'eslint-config-kaho';

export default kaho(
  {
    react: true
  },
  {
    rules: {
      'sukka/no-chain-array-higher-order-functions': 'off'
    }
  }
);
