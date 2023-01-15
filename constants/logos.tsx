/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type ResolveSrcFunc = (theme: "light" | "dark") => string;

export interface LogoAsset {
    src: ResolveSrcFunc;
    alt: string;
    width: number;
    height: number;
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

const generateResolveSrcFunc = (image: {
    src: string;
    srcWhite: string;
}): ResolveSrcFunc => {
    return (theme: "light" | "dark") => {
        return theme === "light" ? image.src : image.srcWhite;
    };
};

export const Logos: Record<string, LogoAsset> = {
    StJosephsCollegeColombo10: {
        src: generateResolveSrcFunc({
            src: ST_JOSEPHS_COLLEGE_COLOMBO_10_LOGO_SRC,
            srcWhite: ST_JOSEPHS_COLLEGE_COLOMBO_10_LOGO_SRC,
        }),
        alt: "St. Joseph's College, Colombo 10",
        width: 264,
        height: 300,
    },
    NASASpaceAppsChallenge: {
        src: generateResolveSrcFunc({
            src: "/assets/achievements/nasa-space-apps-logo.png",
            srcWhite: "/assets/achievements/nasa-space-apps-logo-white.png",
        }),
        alt: "NASA Space Apps Challenge",
        width: 3192,
        height: 3192,
    },
    AngelHack: {
        src: generateResolveSrcFunc({
            src: "/assets/achievements/angel-hack-logo.png",
            srcWhite: "/assets/achievements/angel-hack-logo-white.png",
        }),
        alt: "Angel Hack",
        width: 1920,
        height: 550,
    },
    HackaDev: {
        src: generateResolveSrcFunc({
            src: "/assets/achievements/hackadev-logo.png",
            srcWhite: "/assets/achievements/hackadev-logo-white.png",
        }),
        alt: "HackaDev",
        width: 300,
        height: 56,
    },
    BritishCouncil: {
        src: generateResolveSrcFunc({
            src: BRITISH_COUNCIL_LOGO_SRC,
            srcWhite: BRITISH_COUNCIL_LOGO_SRC,
        }),
        alt: "British Council",
        width: 166,
        height: 218,
    },
    GoogleSummerOfCode: {
        src: generateResolveSrcFunc({
            src: "/assets/experience/gsoc-logo.svg",
            srcWhite: "/assets/experience/gsoc-logo-white.svg",
        }),
        alt: "Google Summer of Code",
        width: 3192,
        height: 3192,
    },
    UniversityOfMoratuwa: {
        src: generateResolveSrcFunc({
            src: UNIVERSITY_OF_MORATUWA_LOGO_SRC,
            srcWhite: UNIVERSITY_OF_MORATUWA_LOGO_SRC,
        }),
        alt: "University of Moratuwa",
        width: 166,
        height: 218,
    },
    CKAD: {
        src: generateResolveSrcFunc({
            src: CKAD_LOGO_SRC,
            srcWhite: CKAD_LOGO_SRC,
        }),
        alt: "Certified Kubernetes Application Developer",
        width: 340,
        height: 340,
    },
    CKA: {
        src: generateResolveSrcFunc({
            src: CKA_LOGO_SRC,
            srcWhite: CKA_LOGO_SRC,
        }),
        alt: "Certified Kubernetes Administrator",
        width: 340,
        height: 340,
    },
    DeepLearningAI: {
        src: generateResolveSrcFunc({
            src: DEEP_LEARNING_AI_LOGO_SRC,
            srcWhite: DEEP_LEARNING_AI_LOGO_SRC,
        }),
        alt: "DeepLearning.AI",
        width: 322,
        height: 322,
    },
    UniversityOfAlberta: {
        src: generateResolveSrcFunc({
            src: UNIVERSITY_OF_ALBERTA_LOGO_SRC,
            srcWhite: UNIVERSITY_OF_ALBERTA_LOGO_SRC,
        }),
        alt: "University of Alberta",
        width: 243,
        height: 270,
    },
    WSO2: {
        src: generateResolveSrcFunc({
            src: "/assets/experience/wso2-logo.svg",
            srcWhite: "/assets/experience/wso2-logo-white.svg",
        }),
        alt: "WSO2",
        width: 3192,
        height: 3192,
    },
    Siddhi: {
        src: generateResolveSrcFunc({
            src: "/assets/projects/siddhi-logo.svg",
            srcWhite: "/assets/projects/siddhi-logo-white.svg",
        }),
        alt: "Siddhi",
        width: 3192,
        height: 3192,
    },
    Cellery: {
        src: generateResolveSrcFunc({
            src: "/assets/projects/cellery-logo.svg",
            srcWhite: "/assets/projects/cellery-logo-white.svg",
        }),
        alt: "Cellery",
        width: 3192,
        height: 3192,
    },
    Ballerina: {
        src: generateResolveSrcFunc({
            src: "/assets/projects/ballerina-logo.svg",
            srcWhite: "/assets/projects/ballerina-logo-white.svg",
        }),
        alt: "Ballerina",
        width: 3192,
        height: 3192,
    },
    Choreo: {
        src: generateResolveSrcFunc({
            src: "/assets/projects/choreo-logo.svg",
            srcWhite: "/assets/projects/choreo-logo-white.svg",
        }),
        alt: "Choreo",
        width: 3192,
        height: 3192,
    },
};
