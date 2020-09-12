module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "eslint:recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    indent: ["warn", "tab"],
    "linebreak-style": ["warn", "unix"],
    quotes: ["warn", "single"],
    semi: ["warn", "never"],
    '@typescript-eslint/interface-name-prefix': 'off'
  },
};
