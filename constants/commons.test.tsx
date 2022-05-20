/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FormattableTime, Now, Time, TimeRange } from "./commons";

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
