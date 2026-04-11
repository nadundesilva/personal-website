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
import Experiences from "@/constants/experience";
import { Date as CustomDate, Now } from "@/constants/date";

const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export const YEARS_EXPERIENCE_INCREMENT = 0.5;

export interface YearsOfExperienceDisplay {
    value: number;
    prefix?: string;
    suffix?: string;
}

/**
 * Returns years of experience as a structured object for display:
 * - `value`: rounded to the nearest `YEARS_EXPERIENCE_INCREMENT`
 * - `prefix`: "nearly " when rounded up, "" otherwise
 * - `suffix`: "+" when rounded down, "" otherwise
 *
 * Computed by summing the duration of each individual experience entry.
 */
export function calculateYearsOfExperienceForDisplay(): YearsOfExperienceDisplay {
    const now = new Date();
    const totalMs = Object.values(Experiences).reduce((sum, exp) => {
        const { from, to } = exp.timePeriod;
        let toMs: number;
        if (to instanceof CustomDate) {
            toMs = to.toJsDate().getTime();
        } else if (to === Now) {
            toMs = now.getTime();
        } else {
            throw new Error(
                `Unexpected date type in experience "${exp.name}": ${JSON.stringify(to)}`,
            );
        }
        return sum + (toMs - from.toJsDate().getTime());
    }, 0);

    const yearsOfExperience = totalMs / MILLISECONDS_PER_YEAR;
    const rounded =
        Math.round(yearsOfExperience / YEARS_EXPERIENCE_INCREMENT) *
        YEARS_EXPERIENCE_INCREMENT;

    if (yearsOfExperience < rounded) {
        return { value: rounded, prefix: "nearly " };
    }
    if (yearsOfExperience > rounded) {
        return { value: rounded, suffix: "+" };
    }
    return { value: rounded };
}
