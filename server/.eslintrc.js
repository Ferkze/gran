module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
    "jest/globals": true
  },
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "eslint:recommended",
    "plugin:jest/recommended"
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
  overrides: {
    files: [
      "**/*.test.ts"
    ],
    env: {
      jest: true
    }
  }
};
