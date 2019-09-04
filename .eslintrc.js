module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "new-cap": 0,
    "id-length": 0,
    "no-console": 0,
    "func-names": 0,
    "one-var": 0,
    "comma-dangle": [1, "never"],
    "key-spacing": [
      0,
      {
        beforeColon: true,
        afterColon: true
      }
    ],
    "no-else-return": 0,
    "space-before-function-paren": [0, "always"],
    "no-multi-spaces": 0,
    quotes: [2, "single"],
    indent: ["error", 2]
  }
};
