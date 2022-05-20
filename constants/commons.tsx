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
type Month =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export interface FormattableTime {
    format: () => string;
}

export class Time implements FormattableTime {
    year: number;
    month?: Month;

    constructor(year: number, month?: Month) {
        if (year < 1994) {
            throw Error(
                `Invalid year; expected to be greater than year of birth (${year})`,
            );
        }
        this.year = year;
        this.month = month;
    }

    format(): string {
        let time = "";
        if (this.month !== undefined) {
            time += this.month + " ";
        }
        time += this.year.toString();
        return time;
    }
}

class NowTime implements FormattableTime {
    format(): string {
        return "Now";
    }
}

export const Now = new NowTime();

export class TimeRange implements FormattableTime {
    from: Time | NowTime;
    to: Time | NowTime;

    constructor(from: Time, to: Time | NowTime) {
        this.from = from;
        this.to = to;
    }

    format(): string {
        return this.from.format() + " to " + this.to.format();
    }
}
