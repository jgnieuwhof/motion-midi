module.exports = {
  extends: ['prettier', 'react-app'],
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 1,
    'prettier/prettier': [1, { trailingComma: 'all', singleQuote: true }],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
};
