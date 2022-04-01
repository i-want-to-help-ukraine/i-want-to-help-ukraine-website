module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'warn',
    'import/no-named-as-default': 'off',
    'vue/multi-word-component-names': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', '.']],
        extensions: ['.vue', '.js'],
      },
    },
  },
}
