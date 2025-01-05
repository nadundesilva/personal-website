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

import { type FormattableTime, Now, Time, TimeRange } from "./commons";

test.each([
    {
        time: new Time(2022, "January"),
        formattedTime: "January 2022",
    },
    {
        time: new Time(2020),
        formattedTime: "2020",
    },
    {
        time: Now,
        formattedTime: "Now",
    },
])(
    "Test time formats (time: $time)",
    ({
        time,
        formattedTime,
    }: {
        time: FormattableTime;
        formattedTime: string;
    }) => {
        expect(time.format()).toBe(formattedTime);
    },
);

test("Test invalid time", () => {
    expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const time = new Time(1993);
    }).toThrowError(
        Error("Invalid year; expected to be greater than year of birth (1993)"),
    );
});

test.each([
    {
        timeRange: new TimeRange(new Time(2020, "January"), Now),
        formattedTime: "January 2020 to Now",
    },
    {
        timeRange: new TimeRange(
            new Time(2020, "January"),
            new Time(2021, "February"),
        ),
        formattedTime: "January 2020 to February 2021",
    },
])(
    "Test time ranges (timeRange: $timeRange)",
    ({
        timeRange,
        formattedTime,
    }: {
        timeRange: TimeRange;
        formattedTime: string;
    }) => {
        expect(timeRange.format()).toBe(formattedTime);
    },
);
