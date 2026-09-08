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

import { Date as CustomDate, DateRange, Now } from "@/constants/date";

describe("Date", () => {
    it("renders a month-and-year date as machine-readable YYYY-MM, zero-padding single-digit months", () => {
        expect(new CustomDate(2024, "January").toISOString()).toBe("2024-01");
        expect(new CustomDate(2024, "November").toISOString()).toBe("2024-11");
    });

    it("renders a year-only date as a bare year", () => {
        expect(new CustomDate(2024).toISOString()).toBe("2024");
        expect(new CustomDate(2024).getRenderSegments()).toEqual([
            { text: "2024", dateTime: "2024" },
        ]);
    });

    it("rejects a year before the owner's year of birth", () => {
        expect(() => new CustomDate(1993)).toThrow(
            "Invalid year; expected to be greater than or equal to year of birth (1994), but got 1993",
        );
    });

    it("preserves the month and year when converting to and from a JS date", () => {
        expect(
            CustomDate.fromJsDate(new Date("2024-03")).getRenderSegments(),
        ).toEqual([{ text: "March 2024", dateTime: "2024-03" }]);
    });
});

describe("DateRange", () => {
    it("reads a range as 'start to end'", () => {
        const range = new DateRange(
            new CustomDate(2020, "January"),
            new CustomDate(2022, "June"),
        );

        expect(range.format()).toBe("January 2020 to June 2022");
    });

    it("shows an ongoing range as running until now", () => {
        const range = new DateRange(new CustomDate(2020, "January"), Now);

        expect(range.format()).toBe("January 2020 to Now");
    });
});
