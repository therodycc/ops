/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:react-native-a11y/all',
    'plugin:react-perf/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks'],
  rules: {
    'prettier/prettier': 0,
    'comma-dangle': ['error', 'never'],
    'getter-return': 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'no-shadow': 'off', // turn off eslint/no-shadow
    '@typescript-eslint/no-shadow': ['error'], // turn on typescript-eslint/no-shadow
    'react-native-a11y/has-accessibility-hint': 'off', // do not enforce hint since we add complete labels
    'react/jsx-no-bind': [
      1,
      {
        // no arrow functions / function declared inline in JSX
        ignoreRefs: true // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
      }
    ],
    'react-perf/jsx-no-new-object-as-prop': ['warn'],
    'react-perf/jsx-no-new-array-as-prop': ['warn']
  },
  globals: {
    JSX: 'readonly'
  }
};
