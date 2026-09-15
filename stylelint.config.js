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
 * © 2026 Nadun De Silva. All rights reserved.
 */
const config = {
    extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
    rules: {
        // Tailwind's @apply collides with the unrelated, dashed-ident-only @apply
        // grammar csstree gained from @csstools/css-syntax-patches-for-csstree.
        "at-rule-prelude-no-invalid": [true, { ignoreAtRules: ["apply"] }],
    },
};
export default config;
