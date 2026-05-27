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

interface DateRenderSegment {
    text: string;
    dateTime?: string;
}

export interface FormattableDate {
    format: () => string;
    getRenderSegments: () => DateRenderSegment[];
}

export abstract class AbstractFormattableDate implements FormattableDate {
    format(): string {
        return this.getRenderSegments()
            .map((segment) => segment.text)
            .join("");
    }

    abstract getRenderSegments(): DateRenderSegment[];
}

const MONTHS: Month[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export class Date extends AbstractFormattableDate {
    year: number;
    month?: Month;

    constructor(year: number, month?: Month) {
        super();
        if (year < 1994) {
            throw Error(
                `Invalid year; expected to be greater than or equal to year of birth (1994), but got ${year}`,
            );
        }
        this.year = year;
        this.month = month;
    }

    static fromJsDate(date: globalThis.Date): Date {
        return new Date(date.getFullYear(), MONTHS[date.getMonth()]);
    }

    toJsDate(): globalThis.Date {
        const monthIndex =
            this.month !== undefined ? MONTHS.indexOf(this.month) : 0;
        return new globalThis.Date(this.year, monthIndex);
    }

    toISOString(): string {
        if (this.month !== undefined) {
            const monthIndex = MONTHS.indexOf(this.month) + 1;
            return `${this.year}-${String(monthIndex).padStart(2, "0")}`;
        }
        return this.year.toString();
    }

    getRenderSegments(): DateRenderSegment[] {
        let text = "";
        if (this.month !== undefined) {
            text += this.month + " ";
        }
        text += this.year.toString();
        return [
            {
                text,
                dateTime: this.toISOString(),
            },
        ];
    }
}

class NowDate extends AbstractFormattableDate {
    getRenderSegments(): DateRenderSegment[] {
        return [
            {
                text: "Now",
            },
        ];
    }
}

export const Now = new NowDate();

export class DateRange extends AbstractFormattableDate {
    from: Date;
    to: Date | NowDate;

    constructor(from: Date, to: Date | NowDate) {
        super();
        this.from = from;
        this.to = to;
    }

    getRenderSegments(): DateRenderSegment[] {
        return [
            ...this.from.getRenderSegments(),
            { text: " to " },
            ...this.to.getRenderSegments(),
        ];
    }
}
