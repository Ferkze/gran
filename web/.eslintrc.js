module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'prettier/prettier': 'error',
    single: 'always'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
