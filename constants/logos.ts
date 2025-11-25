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

import type { SxProps, Theme } from "@mui/material";

export interface LogoAsset {
    src: Record<"light" | "dark", string>;
    alt: string;
    width: number;
    height: number;
    recommendedSx?: SxProps<Theme>;
}

const CKAD_LOGO_SRC = "/assets/certifications/ckad-logo.png";
const CKA_LOGO_SRC = "/assets/certifications/cka-logo.png";
const DEEP_LEARNING_AI_LOGO_SRC =
    "/assets/certifications/deep-learning-ai-logo.png";
const UNIVERSITY_OF_ALBERTA_LOGO_SRC =
    "/assets/certifications/university-of-alberta-logo.png";
const ST_JOSEPHS_COLLEGE_COLOMBO_10_LOGO_SRC =
    "/assets/education/st-josephs-college-colombo-10-logo.png";
const UNIVERSITY_OF_MORATUWA_LOGO_SRC =
    "/assets/education/university-of-moratuwa-logo.png";
const BRITISH_COUNCIL_LOGO_SRC =
    "/assets/achievements/british-council-logo.png";

export const Logos: Record<string, LogoAsset> = {
    StJosephsCollegeColombo10: {
        src: {
            light: ST_JOSEPHS_COLLEGE_COLOMBO_10_LOGO_SRC,
            dark: ST_JOSEPHS_COLLEGE_COLOMBO_10_LOGO_SRC,
        },
        alt: "St. Joseph's College, Colombo 10",
        width: 264,
        height: 300,
    },
    NASASpaceAppsChallenge: {
        src: {
            light: "/assets/achievements/nasa-space-apps-logo.png",
            dark: "/assets/achievements/nasa-space-apps-logo-white.png",
        },
        alt: "NASA Space Apps Challenge",
        width: 3192,
        height: 3192,
    },
    AngelHack: {
        src: {
            light: "/assets/achievements/angel-hack-logo.png",
            dark: "/assets/achievements/angel-hack-logo-white.png",
        },
        alt: "Angel Hack",
        width: 1920,
        height: 550,
    },
    HackaDev: {
        src: {
            light: "/assets/achievements/hackadev-logo.png",
            dark: "/assets/achievements/hackadev-logo-white.png",
        },
        alt: "HackaDev",
        width: 300,
        height: 56,
    },
    BritishCouncil: {
        src: {
            light: BRITISH_COUNCIL_LOGO_SRC,
            dark: BRITISH_COUNCIL_LOGO_SRC,
        },
        alt: "British Council",
        width: 166,
        height: 218,
    },
    GoogleSummerOfCode: {
        src: {
            light: "/assets/experience/gsoc-logo.svg",
            dark: "/assets/experience/gsoc-logo-white.svg",
        },
        alt: "Google Summer of Code",
        width: 3192,
        height: 3192,
    },
    UniversityOfMoratuwa: {
        src: {
            light: UNIVERSITY_OF_MORATUWA_LOGO_SRC,
            dark: UNIVERSITY_OF_MORATUWA_LOGO_SRC,
        },
        alt: "University of Moratuwa",
        width: 166,
        height: 218,
    },
    CKAD: {
        src: {
            light: CKAD_LOGO_SRC,
            dark: CKAD_LOGO_SRC,
        },
        alt: "Certified Kubernetes Application Developer",
        width: 340,
        height: 340,
    },
    CKA: {
        src: {
            light: CKA_LOGO_SRC,
            dark: CKA_LOGO_SRC,
        },
        alt: "Certified Kubernetes Administrator",
        width: 340,
        height: 340,
    },
    DeepLearningAI: {
        src: {
            light: DEEP_LEARNING_AI_LOGO_SRC,
            dark: DEEP_LEARNING_AI_LOGO_SRC,
        },
        alt: "DeepLearning.AI",
        width: 322,
        height: 322,
    },
    UniversityOfAlberta: {
        src: {
            light: UNIVERSITY_OF_ALBERTA_LOGO_SRC,
            dark: UNIVERSITY_OF_ALBERTA_LOGO_SRC,
        },
        alt: "University of Alberta",
        width: 243,
        height: 270,
    },
    WSO2: {
        src: {
            light: "/assets/experience/wso2-logo.svg",
            dark: "/assets/experience/wso2-logo-white.svg",
        },
        alt: "WSO2",
        width: 3192,
        height: 3192,
    },
    Siddhi: {
        src: {
            light: "/assets/projects/siddhi-logo.svg",
            dark: "/assets/projects/siddhi-logo-white.svg",
        },
        alt: "Siddhi",
        width: 3192,
        height: 3192,
        recommendedSx: {
            my: 2,
        },
    },
    Cellery: {
        src: {
            light: "/assets/projects/cellery-logo.svg",
            dark: "/assets/projects/cellery-logo-white.svg",
        },
        alt: "Cellery",
        width: 3192,
        height: 3192,
        recommendedSx: {
            my: 2,
        },
    },
    Ballerina: {
        src: {
            light: "/assets/projects/ballerina-logo.svg",
            dark: "/assets/projects/ballerina-logo-white.svg",
        },
        alt: "Ballerina",
        width: 3192,
        height: 3192,
        recommendedSx: {
            my: 2,
        },
    },
    Choreo: {
        src: {
            light: "/assets/projects/choreo-logo.svg",
            dark: "/assets/projects/choreo-logo-white.svg",
        },
        alt: "Choreo",
        width: 3192,
        height: 3192,
        recommendedSx: {
            my: 2,
        },
    },
};
