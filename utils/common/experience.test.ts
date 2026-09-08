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
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    jest,
} from "@jest/globals";

import {
    calculateYearsOfExperienceForDisplay,
    YEARS_EXPERIENCE_INCREMENT,
} from "@/utils/common/experience";

// "now" is frozen a few months apart at each check so the assertions hold
// regardless of which experience entries are current when this test runs -
// asserting exact values would break the next time an experience is added.
const FROZEN_NOWS = [
    new Date(2026, 0, 1),
    new Date(2026, 5, 1),
    new Date(2027, 0, 1),
];

describe("calculateYearsOfExperienceForDisplay", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("rounds the displayed value to the nearest half year", () => {
        FROZEN_NOWS.forEach((now) => {
            jest.setSystemTime(now);
            const { value } = calculateYearsOfExperienceForDisplay();
            expect(value % YEARS_EXPERIENCE_INCREMENT).toBe(0);
        });
    });

    it("never shows both a 'nearly' prefix and a '+' suffix at once", () => {
        FROZEN_NOWS.forEach((now) => {
            jest.setSystemTime(now);
            const { prefix, suffix } = calculateYearsOfExperienceForDisplay();
            expect(Boolean(prefix) && Boolean(suffix)).toBe(false);
        });
    });

    it("never shows fewer years of experience as time passes", () => {
        let previousValue = -Infinity;
        FROZEN_NOWS.forEach((now) => {
            jest.setSystemTime(now);
            const { value } = calculateYearsOfExperienceForDisplay();
            expect(value).toBeGreaterThanOrEqual(previousValue);
            previousValue = value;
        });
    });

    // The relative assertions above (rounding, prefix/suffix exclusivity,
    // monotonicity) all pass even if MILLISECONDS_PER_YEAR or the summation
    // logic is off by a constant factor. This pins the actual magnitude at a
    // fixed point in time. It is expected to need updating whenever an entry in
    // constants/experience.ts changes - that is deliberate: a job change is
    // exactly when the home page's headline stat and Person JSON-LD should be
    // re-verified by a human.
    it("computes the exact displayed years for the current experience data", () => {
        jest.setSystemTime(new Date(2026, 0, 1));
        expect(calculateYearsOfExperienceForDisplay()).toEqual({
            value: 8.5,
            prefix: "nearly ",
        });
    });

    // Swept month-by-month so both rounding directions occur regardless of which
    // experience entries exist when this runs: "nearly " while short of a
    // half-year mark, "+" once past it.
    it("marks the value 'nearly' before a half-year mark and '+' after it", () => {
        const marked: { value: number; marker: "nearly" | "plus" | "exact" }[] =
            [];
        for (let month = 0; month < 36; month++) {
            jest.setSystemTime(new Date(2026, month, 1));
            const { value, prefix, suffix } =
                calculateYearsOfExperienceForDisplay();
            marked.push({
                value,
                marker: prefix ? "nearly" : suffix ? "plus" : "exact",
            });
        }

        expect(marked.some(({ marker }) => marker === "nearly")).toBe(true);
        expect(marked.some(({ marker }) => marker === "plus")).toBe(true);

        // Within a plateau, elapsed experience only grows, so every "nearly"
        // month must come before every "plus" month. A swapped prefix/suffix
        // inverts this.
        for (const plateau of new Set(marked.map(({ value }) => value))) {
            const markers = marked
                .filter(({ value }) => value === plateau)
                .map(({ marker }) => marker);
            const lastNearly = markers.lastIndexOf("nearly");
            const firstPlus = markers.indexOf("plus");
            if (lastNearly !== -1 && firstPlus !== -1) {
                expect(lastNearly).toBeLessThan(firstPlus);
            }
        }
    });
});
