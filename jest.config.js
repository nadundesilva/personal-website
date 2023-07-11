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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */

const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
    errorOnDeprecated: true,
    collectCoverage: true,
    coverageReporters: ["text-summary", "clover", "html"],
    moduleDirectories: ["node_modules", "<rootDir>/"],
    modulePathIgnorePatterns: ["<rootDir>/cypress/"],
    moduleNameMapper: {
        "@/components/(.*)": ["<rootDir>/components/$1"],
        "@/constants/(.*)": ["<rootDir>/constants/$1"],
        "@/styles/(.*)": ["<rootDir>/styles/$1"],
    },
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
    testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
