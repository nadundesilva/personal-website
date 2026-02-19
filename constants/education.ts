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

import { Date, DateRange } from "./date";
import Institutes, { type Institute } from "@/constants/institutes";

export interface Education {
    title: string;
    institute: Institute;
    timePeriod: DateRange | Date;
}

const Educations: Record<string, Education> = {
    BScUniversityOfMoratuwa: {
        title: "B.Sc. (Hons.) in Engineering (Computer Science and Engineering)",
        institute: Institutes.UniversityOfMoratuwa,
        timePeriod: new DateRange(
            new Date(2014, "March"),
            new Date(2017, "June"),
        ),
    },
    ALStJosephsCollegeColombo10: {
        title: "G.C.E. Advanced Level",
        institute: Institutes.StJosephsCollegeColombo10,
        timePeriod: new Date(2012),
    },
};

export default Educations;
