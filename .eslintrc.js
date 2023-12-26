// eslint-disable-next-line no-undef
module.exports = {
  extends: ['./node_modules/@lunaticenslaved/configs/eslint.client.js'],
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    'no-console': 0,
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};
