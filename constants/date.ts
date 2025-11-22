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

export interface FormattableDate {
    type: "Date" | "DateRange";
    format: () => string;
}

export class Date implements FormattableDate {
    year: number;
    month?: Month;

    constructor(year: number, month?: Month) {
        if (year < 1994) {
            throw Error(
                `Invalid year; expected to be greater than or equal to year of birth (1994), but got ${year}`,
            );
        }
        this.year = year;
        this.month = month;
    }

    type: "Date" = "Date" as const;

    format(): string {
        let date = "";
        if (this.month !== undefined) {
            date += this.month + " ";
        }
        date += this.year.toString();
        return date;
    }
}

class NowDate implements FormattableDate {
    type: "Date" = "Date" as const;

    format(): string {
        return "Now";
    }
}

export const Now = new NowDate();

export class DateRange implements FormattableDate {
    from: Date;
    to: Date | NowDate;

    constructor(from: Date, to: Date | NowDate) {
        this.from = from;
        this.to = to;
    }

    type: "DateRange" = "DateRange" as const;

    format(): string {
        return this.from.format() + " to " + this.to.format();
    }
}
