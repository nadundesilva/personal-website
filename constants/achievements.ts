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

import { type FormattableDate, Date, DateRange } from "./date";
import Logos, { type LogoImageData } from "@/constants/logos";

export interface Achievement {
    title: string;
    logo: LogoImageData;
    logoSx: { height: string };
    date: FormattableDate;
}

const Achievements: Record<string, Achievement> = {
    WSO2SustainedOutstandingContributionAward: {
        title: "WSO2 Sustained Outstanding Contribution Award",
        logo: Logos.WSO2,
        logoSx: { height: "2.5em" },
        date: new DateRange(new Date(2019), new Date(2021)),
    },
    PlacementsOnTheDeansList: {
        title: "Placements on the Dean\u2019s List at the University of Moratuwa",
        logo: Logos.UniversityOfMoratuwa,
        logoSx: { height: "4em" },
        date: new DateRange(new Date(2014), new Date(2018)),
    },
    NasaSpaceAppsChallengeGlobalFinalist: {
        title: "NASA Space Apps Challenge - Galactic Impact - Global Finalist",
        logo: Logos.NasaSpaceAppsChallenge,
        logoSx: { height: "2.5em" },
        date: new Date(2017),
    },
    WSO2InternalHackathonHonorableMention: {
        title: "WSO2 Internal Hackathon - Honorable Mention",
        logo: Logos.WSO2,
        logoSx: { height: "2.5em" },
        date: new Date(2017),
    },
    AngelHackFinalist: {
        title: "Angel Hack - Finalist",
        logo: Logos.AngelHack,
        logoSx: { height: "2.5em" },
        date: new Date(2016),
    },
    HackaDevFinalist: {
        title: "HackaDev - Finalist",
        logo: Logos.HackaDev,
        logoSx: { height: "4.5em" },
        date: new Date(2015),
    },
    BritishCouncilHSBCYouthEnterpriseAwardsFinalist: {
        title: "British Council HSBC Youth Enterprise Awards - Finalist",
        logo: Logos.BritishCouncil,
        logoSx: { height: "2.5em" },
        date: new Date(2015),
    },
};

export default Achievements;
