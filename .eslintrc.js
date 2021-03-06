module.exports = {
  plugins: ['@typescript-eslint', 'react-hooks', 'jest', 'prettier'],
  env: {
    browser: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-var': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': 'off',
    'no-bitwise': 'warn',
    'react/no-array-index-key': 'warn',
  },
  overrides: [
    {
      files: ['*.d.ts', 'utils.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
