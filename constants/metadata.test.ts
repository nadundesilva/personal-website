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
import { afterEach, describe, expect, it, jest } from "@jest/globals";

const ORIGINAL_WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

// metadata.ts reads process.env at module load, so each case needs a fresh
// module registry to re-evaluate the trailing-slash sanitisation.
const loadMetadata = async (
    websiteUrl?: string,
): Promise<typeof import("@/constants/metadata")> => {
    jest.resetModules();
    if (websiteUrl === undefined) {
        delete process.env.NEXT_PUBLIC_WEBSITE_URL;
    } else {
        process.env.NEXT_PUBLIC_WEBSITE_URL = websiteUrl;
    }
    return import("@/constants/metadata");
};

afterEach(() => {
    if (ORIGINAL_WEBSITE_URL === undefined) {
        delete process.env.NEXT_PUBLIC_WEBSITE_URL;
    } else {
        process.env.NEXT_PUBLIC_WEBSITE_URL = ORIGINAL_WEBSITE_URL;
    }
    jest.resetModules();
});

describe("WEBSITE_PUBLIC_URL", () => {
    it("keeps a configured site URL free of a trailing slash so derived URLs never double up", async () => {
        const { WEBSITE_PUBLIC_URL, SCHEMA_PERSON_ID, SCHEMA_WEBSITE_ID } =
            await loadMetadata("https://example.com/");

        expect(WEBSITE_PUBLIC_URL).toBe("https://example.com");
        expect(SCHEMA_PERSON_ID).toBe("https://example.com/#person");
        expect(SCHEMA_WEBSITE_ID).toBe("https://example.com/#website");
    });

    it("uses a configured site URL that has no trailing slash as-is", async () => {
        const { WEBSITE_PUBLIC_URL, SCHEMA_PROFILE_PAGE_ID } =
            await loadMetadata("https://example.com");

        expect(WEBSITE_PUBLIC_URL).toBe("https://example.com");
        expect(SCHEMA_PROFILE_PAGE_ID).toBe("https://example.com/#profilepage");
    });

    it("falls back to the public domain when no site URL is configured", async () => {
        const { WEBSITE_PUBLIC_URL, WEBSITE_DOMAIN } =
            await loadMetadata(undefined);

        expect(WEBSITE_PUBLIC_URL).toBe(`https://${WEBSITE_DOMAIN}`);
        expect(WEBSITE_PUBLIC_URL).not.toMatch(/\/$/);
    });
});
