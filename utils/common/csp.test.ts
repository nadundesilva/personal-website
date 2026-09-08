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
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import { createCspValues } from "@/utils/common/csp";

const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_BUILD_TYPE = process.env.BUILD_TYPE;

const setEnv = (key: "NODE_ENV" | "BUILD_TYPE", value?: string): void => {
    if (value === undefined) {
        delete process.env[key];
    } else {
        process.env[key] = value;
    }
};

const scriptSrc = (): string =>
    createCspValues().find((directive) =>
        directive.startsWith("script-src "),
    ) as string;

describe("createCspValues", () => {
    beforeEach(() => {
        setEnv("NODE_ENV", "production");
        setEnv("BUILD_TYPE", undefined);
    });

    afterEach(() => {
        setEnv("NODE_ENV", ORIGINAL_NODE_ENV);
        setEnv("BUILD_TYPE", ORIGINAL_BUILD_TYPE);
    });

    it("keeps eval out of the script policy on a production build", () => {
        expect(scriptSrc()).not.toContain("'unsafe-eval'");
    });

    // The e2e security spec can only assert directive *inclusion* because it
    // runs against a BUILD_TYPE=test build. This is the only place the exact
    // production policy can be pinned - widening script-src/connect-src or
    // dropping a directive would pass every other assertion in the suite.
    it("serves exactly the locked-down production policy", () => {
        expect(createCspValues()).toEqual([
            "default-src 'none'",
            "manifest-src 'self'",
            "img-src 'self' data:",
            "style-src 'unsafe-inline'",
            "style-src-elem 'self' 'unsafe-inline'",
            "font-src 'self'",
            "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
            "worker-src 'self' blob:",
            "child-src 'self' blob:",
            "connect-src 'self' https://o4507214991917056.ingest.us.sentry.io",
        ]);
    });

    it("allows eval so the dev server's tooling can run during development", () => {
        setEnv("NODE_ENV", "development");
        expect(scriptSrc()).toContain("'unsafe-eval'");
    });

    it("allows eval in an instrumented test build so Cypress can run", () => {
        setEnv("BUILD_TYPE", "test");
        expect(scriptSrc()).toContain("'unsafe-eval'");
    });

    it("only ever loosens the script policy, never any other directive", () => {
        const productionNonScript = createCspValues().filter(
            (directive) => !directive.startsWith("script-src "),
        );

        setEnv("BUILD_TYPE", "test");
        const testNonScript = createCspValues().filter(
            (directive) => !directive.startsWith("script-src "),
        );

        expect(testNonScript).toEqual(productionNonScript);
    });
});
