
module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript',
  ],
}
