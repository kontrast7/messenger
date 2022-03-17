module.exports = {
  root: true,
  extends: "airbnb-typescript/base",
  plugins: ["import", "prettier"],
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  rules: {
    "no-shadow": "off",
    "no-alert": "error",
    "no-plusplus": "off",
    "no-debugger": "error",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "no-multiple-empty-lines": ["error", {"max": 1, "maxB0F": 1}]

  },
};
