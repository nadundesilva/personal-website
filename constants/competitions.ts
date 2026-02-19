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

import Logos, { type LogoImageData } from "@/constants/logos";

export interface Competition {
    name: string;
    link: string;
    logo: LogoImageData;
}

const Competitions: Record<string, Competition> = {
    BritishCouncilHSBCYouthEnterpriseAwards: {
        name: "British Council HSBC Youth Enterprise Awards",
        link: "https://www.britishcouncil.lk/programmes/education/internationalising-higher-education/hsbc-youth-enterprise-awards",
        logo: Logos.BritishCouncil,
    },
    NasaSpaceAppsChallenge: {
        name: "NASA Space Apps Challenge",
        link: "https://www.spaceappschallenge.org/",
        logo: Logos.NasaSpaceAppsChallenge,
    },
    HackaDev: {
        name: "HackaDev",
        link: "https://www.hackadev.lk/",
        logo: Logos.HackaDev,
    },
    AngelHack: {
        name: "Angel Hack",
        link: "https://angelhack.com/",
        logo: Logos.AngelHack,
    },
};

export default Competitions;
