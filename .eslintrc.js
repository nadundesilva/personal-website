/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard-with-typescript",
    "next/core-web-vitals"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint"
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
    "@typescript-eslint/indent": ["error", 4],
    "@typescript-eslint/quotes": ["error", "double"],
    "import/order": ["error", {
      "groups": ["builtin", "external"],
      "pathGroups": [
        {
          "pattern": "@/components/**",
          "group": "internal"
        }
      ],
      "newlines-between": "always",
      "alphabetize": {
        "order": 'asc',
        "caseInsensitive": true
      },
      "warnOnUnassignedImports": true
    }],
    "no-multiple-empty-lines": ["error", {
      "max": 1,
      "maxEOF": 1,
      "maxBOF": 0
    }],
    "no-duplicate-imports": ["error", { "includeExports": true }]
  }
}
