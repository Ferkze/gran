module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/typescript", "vuetify"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: ["error", "single"],
    semi: ["error", "never"],
    indent: ['error', 2]
  },
  "parser": "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  overrides: [
    {
      files: [
        'src/*.vue',
        'src/**/*.vue',
      ],
      rules: {
        'indent': 'off',
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/script-indent': ['error', 2, {
          'baseIndent': 1,
          'switchCase': 1,
          'ignores': []
        }],
        'vue/max-attributes-per-line': ['error', {
          'singleline': 1,
          'multiline': {
            'max': 1,
            'allowFirstLine': false
          }
        }],
        'vue/html-closing-bracket-newline': ['error', {
          'singleline': 'never',
          'multiline': 'always'
        }],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/no-v-html': 'off',
      }
    }
  ]
};
