import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
    ...nextCoreWebVitals,
    ...nextTs,
    prettier,
    globalIgnores([
        "next-env.d.ts",
        "public/**",
        "node_modules/**",
        ".next/**",
        "out/**",
        "build/**",
        "coverage/**",
    ]),
]);

export default eslintConfig;
