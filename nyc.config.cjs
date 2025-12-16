/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.com
 *
 * © 2025 Nadun De Silva. All rights reserved.
 */
const baseConfig = require("@istanbuljs/nyc-config-typescript");

module.exports = {
    ...baseConfig,
    "check-coverage": true,
    "all": true,
    "include": ["{components,app,constants}/**/!(*.test.*).[tj]s?(x)"],
    "exclude": [
        "./_tests_/**/*.*",
        "app/{manifest,robots,sitemap}.ts",
        // Excluded from instrumentation: Next.js font loaders must be called directly at module scope.
        // Code coverage instrumentation wraps function calls, causing build failures.
        // See: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
        "components/theme/fonts.ts",
    ],
    "reporter": ["clover", "json", "html", "text-summary"],
    "report-dir": "coverage",
};
