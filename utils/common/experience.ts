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

/**
 * Returns years of experience formatted for display:
 * - Rounded to the nearest half-year
 * - Suffixed with "+" when rounded down (e.g. "8+", "7.5+")
 * - Prefixed with "Nearly " when rounded up (e.g. "Nearly 8.5")
 *
 * Computed by summing the duration of each individual experience entry.
 */
export function calculateYearsOfExperienceForDisplay(): string {
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
    const rounded = Math.round(yearsOfExperience * 2) / 2;
    if (yearsOfExperience < rounded) {
        return `nearly ${rounded}`;
    }
    if (yearsOfExperience > rounded) {
        return `${rounded}+`;
    }
    return `${rounded}`;
}
