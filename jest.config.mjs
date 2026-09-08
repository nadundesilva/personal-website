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
import nextJest from "next/jest.js";

// next/jest wires in the project's SWC transform, tsconfig `paths`, and the
// asset/CSS/next-font module mocks - so the unit specs can import the same
// `@/constants/*` chain (raw .png imports, `export enum`) that the app does
// without any extra configuration. Runner-only: it never runs during
// `next build`, which stays on webpack.
const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig({
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text-summary"],
    collectCoverageFrom: ["constants/**", "utils/**", "build/**"],
});
