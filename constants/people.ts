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

export interface Person {
    name: string;
    profile: string;
}

export const People: Record<string, Person> = {
    AndrewNg: {
        name: "Andrew Ng",
        profile: "https://en.wikipedia.org/wiki/Andrew_Ng",
    },
    SharonZhou: {
        name: "Sharon Zhou",
        profile: "https://www.coursera.org/instructor/sharon-zhou",
    },
    AdamWhite: {
        name: "Adam White",
        profile: "https://www.coursera.org/instructor/adam-white",
    },
    MarthaWhite: {
        name: "Martha White",
        profile: "https://www.coursera.org/instructor/martha-white",
    },
};
