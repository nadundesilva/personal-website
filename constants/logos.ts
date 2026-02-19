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

import type { StaticImageData } from "next/image";

import deepLearningAiLogoImage from "@/assets/certifications/deep-learning-ai-logo.png";
import universityOfAlbertaLogoImage from "@/assets/certifications/university-of-alberta-logo.png";
import ckaLogoImage from "@/assets/certifications/cka-logo.png";
import ckadLogoImage from "@/assets/certifications/ckad-logo.png";

import indexityLogoImage from "@/assets/projects/indexity-logo.svg";
import indexityLogoWhiteImage from "@/assets/projects/indexity-logo-white.svg";
import choreoLogoImage from "@/assets/projects/choreo-logo.svg";
import choreoLogoWhiteImage from "@/assets/projects/choreo-logo-white.svg";
import ballerinaLogoImage from "@/assets/projects/ballerina-logo.svg";
import ballerinaLogoWhiteImage from "@/assets/projects/ballerina-logo-white.svg";
import celleryLogoImage from "@/assets/projects/cellery-logo.svg";
import celleryLogoWhiteImage from "@/assets/projects/cellery-logo-white.svg";
import siddhiLogoImage from "@/assets/projects/siddhi-logo.svg";
import siddhiLogoWhiteImage from "@/assets/projects/siddhi-logo-white.svg";
import k8sReplicatorLogoImage from "@/assets/projects/personal/k8s-replicator-logo.png";
import meshManagerLogoImage from "@/assets/projects/personal/mesh-manager-logo.png";

import uomLogoImage from "@/assets/education/university-of-moratuwa-logo.png";
import sjcLogoImage from "@/assets/education/st-josephs-college-colombo-10-logo.png";

import gsocLogoImage from "@/assets/experience/gsoc-logo.svg";
import gsocLogoWhiteImage from "@/assets/experience/gsoc-logo-white.svg";
import wso2LogoImage from "@/assets/experience/wso2-logo.svg";
import wso2LogoWhiteImage from "@/assets/experience/wso2-logo-white.svg";
import orionHealthLogoImage from "@/assets/experience/orion-health-logo.svg";
import orionHealthLogoWhiteImage from "@/assets/experience/orion-health-logo-white.svg";
import mccraeTechLogoImage from "@/assets/experience/mccrae-tech-logo.svg";
import mccraeTechLogoWhiteImage from "@/assets/experience/mccrae-tech-logo-white.svg";

import nasaSpaceAppsChallengeLogoImage from "@/assets/achievements/nasa-space-apps-logo.png";
import nasaSpaceAppsChallengeLogoWhiteImage from "@/assets/achievements/nasa-space-apps-logo-white.png";
import angelHackLogoImage from "@/assets/achievements/angel-hack-logo.png";
import angelHackLogoWhiteImage from "@/assets/achievements/angel-hack-logo-white.png";
import hackaDevLogoImage from "@/assets/achievements/hackadev-logo.png";
import hackaDevLogoWhiteImage from "@/assets/achievements/hackadev-logo-white.png";
import britishCouncilLogoImage from "@/assets/achievements/british-council-logo.png";

export interface LogoImageData {
    srcLight: StaticImageData;
    srcDark: StaticImageData;
}

const Logos: Record<string, LogoImageData> = {
    DeepLearningAi: {
        srcLight: deepLearningAiLogoImage,
        srcDark: deepLearningAiLogoImage,
    },
    UniversityOfAlberta: {
        srcLight: universityOfAlbertaLogoImage,
        srcDark: universityOfAlbertaLogoImage,
    },
    CKA: {
        srcLight: ckaLogoImage,
        srcDark: ckaLogoImage,
    },
    CKAD: {
        srcLight: ckadLogoImage,
        srcDark: ckadLogoImage,
    },
    Indexity: {
        srcLight: indexityLogoImage,
        srcDark: indexityLogoWhiteImage,
    },
    Choreo: {
        srcLight: choreoLogoImage,
        srcDark: choreoLogoWhiteImage,
    },
    Ballerina: {
        srcLight: ballerinaLogoImage,
        srcDark: ballerinaLogoWhiteImage,
    },
    Cellery: {
        srcLight: celleryLogoImage,
        srcDark: celleryLogoWhiteImage,
    },
    Siddhi: {
        srcLight: siddhiLogoImage,
        srcDark: siddhiLogoWhiteImage,
    },
    K8sReplicator: {
        srcLight: k8sReplicatorLogoImage,
        srcDark: k8sReplicatorLogoImage,
    },
    MeshManager: {
        srcLight: meshManagerLogoImage,
        srcDark: meshManagerLogoImage,
    },
    UniversityOfMoratuwa: {
        srcLight: uomLogoImage,
        srcDark: uomLogoImage,
    },
    StJosephsCollegeColombo10: {
        srcLight: sjcLogoImage,
        srcDark: sjcLogoImage,
    },
    GoogleSummerOfCode: {
        srcLight: gsocLogoImage,
        srcDark: gsocLogoWhiteImage,
    },
    WSO2: {
        srcLight: wso2LogoImage,
        srcDark: wso2LogoWhiteImage,
    },
    OrionHealth: {
        srcLight: orionHealthLogoImage,
        srcDark: orionHealthLogoWhiteImage,
    },
    McCraeTech: {
        srcLight: mccraeTechLogoImage,
        srcDark: mccraeTechLogoWhiteImage,
    },
    NasaSpaceAppsChallenge: {
        srcLight: nasaSpaceAppsChallengeLogoImage,
        srcDark: nasaSpaceAppsChallengeLogoWhiteImage,
    },
    AngelHack: {
        srcLight: angelHackLogoImage,
        srcDark: angelHackLogoWhiteImage,
    },
    HackaDev: {
        srcLight: hackaDevLogoImage,
        srcDark: hackaDevLogoWhiteImage,
    },
    BritishCouncil: {
        srcLight: britishCouncilLogoImage,
        srcDark: britishCouncilLogoImage,
    },
};

export default Logos;
