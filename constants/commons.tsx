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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
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
