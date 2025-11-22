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
 * © 2023 Nadun De Silva. All rights reserved.
 */

import { type FormattableDate, Now, Date, DateRange } from "./date";

test.each([
    {
        date: new Date(2022, "January"),
        formattedDate: "January 2022",
    },
    {
        date: new Date(2020),
        formattedDate: "2020",
    },
    {
        date: Now,
        formattedDate: "Now",
    },
])(
    "Test date formats (date: $date)",
    ({
        date,
        formattedDate,
    }: {
        date: FormattableDate;
        formattedDate: string;
    }) => {
        expect(date.format()).toBe(formattedDate);
    },
);

test("Test invalid date", () => {
    expect(() => {
        new Date(1993);
    }).toThrowError(
        Error(
            "Invalid year; expected to be greater than or equal to year of birth (1994), but got 1993",
        ),
    );
});

test.each([
    {
        dateRange: new DateRange(new Date(2020, "January"), Now),
        formattedDate: "January 2020 to Now",
    },
    {
        dateRange: new DateRange(
            new Date(2020, "January"),
            new Date(2021, "February"),
        ),
        formattedDate: "January 2020 to February 2021",
    },
])(
    "Test date ranges (dateRange: $dateRange)",
    ({
        dateRange,
        formattedDate,
    }: {
        dateRange: DateRange;
        formattedDate: string;
    }) => {
        expect(dateRange.format()).toBe(formattedDate);
    },
);
