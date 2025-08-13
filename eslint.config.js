import react from "eslint-config-react";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import next from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    prettierRecommended,
    next.flatConfig.coreWebVitals,
    globalIgnores([
        "node_modules/**",
        "cypress/**",
        "coverage/**",
        "**/*.js",
        "**/*.d.ts",
    ]),
    {
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 12,
                sourceType: "module",
                globals: {
                    ...globals.browser,
                    ...globals.es2021,
                },
            },
        },
        plugins: { react },
    },
]);
