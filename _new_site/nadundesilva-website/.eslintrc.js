module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
          "delimiter": "comma",
          "requireLast": true
      },
      "singleline": {
          "delimiter": "comma",
          "requireLast": false
      },
      "multilineDetection": "brackets"
    }],
    "@typescript-eslint/space-before-function-paren": ["error", "never"],
    "@typescript-eslint/indent": ["error", "tab"],
    "no-tabs": ["error", { allowIndentationTabs: true }]
  }
}
