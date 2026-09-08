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
import { describe, expect, it } from "@jest/globals";

import { getLastModifiedDate } from "@/utils/server/git";

describe("getLastModifiedDate", () => {
    it("reports a real past commit date crawlers can use for freshness", () => {
        const lastModified = getLastModifiedDate("package.json");

        expect(lastModified).toBeInstanceOf(Date);
        expect(Number.isNaN(lastModified.getTime())).toBe(false);
        expect(lastModified.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it("fails loudly rather than reporting an empty freshness date to crawlers", () => {
        expect(() =>
            getLastModifiedDate("this-file-has-no-git-history.txt"),
        ).toThrow(/no git history/i);
    });
});
