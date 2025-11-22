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
import { Date } from "./date";
import { type Institute, Institutes } from "./institutes";
import { type LogoAsset, Logos } from "./logos";

export interface Certificate {
    name: string;
    type: "Course" | "Certification" | "Specialization";
    link: string;
    logo: LogoAsset;
    issuer: Institute;
    completedOn: Date;
}

export const Certificates: Record<string, Certificate> = {
    DeepLearningSpecialization: {
        name: "Deep Learning",
        type: "Specialization",
        link: "https://coursera.org/share/8e5db53bfef4c4b27f79004022edad72",
        logo: Logos.DeepLearningAI,
        issuer: Institutes.DeepLearningAi,
        completedOn: new Date(2021, "June"),
    },
    FundamentalsOfReinforcementLearning: {
        name: "Fundamentals of Reinforcement Learning",
        type: "Course",
        link: "https://coursera.org/share/fcbebc1de9e6a9b3ecb186983af7b969",
        logo: Logos.UniversityOfAlberta,
        issuer: Institutes.UniversityOfAlberta,
        completedOn: new Date(2021, "September"),
    },
    BuildBasicGenerativeAdversarialNetworks: {
        name: "Build Basic Generative Adversarial Networks (GANs)",
        type: "Course",
        link: "https://coursera.org/share/fed56feb8ba81177e6467779f22c0851",
        logo: Logos.DeepLearningAI,
        issuer: Institutes.DeepLearningAi,
        completedOn: new Date(2021, "July"),
    },
    CertifiedKubernetesAdministrator: {
        name: "Certified Kubernetes Administrator (CKA)",
        type: "Certification",
        link: "https://www.youracclaim.com/badges/8241114b-7435-460a-a08f-9d33304c1470?source=linked_in_profile",
        logo: Logos.CKA,
        issuer: Institutes.LinuxFoundation,
        completedOn: new Date(2020, "December"),
    },
    CertifiedKubernetesApplicationDeveloper: {
        name: "Certified Kubernetes Application Developer (CKAD)",
        type: "Certification",
        link: "https://www.youracclaim.com/badges/e9df4128-2017-41c3-9e7d-028e37176243/linked_in_profile",
        logo: Logos.CKAD,
        issuer: Institutes.LinuxFoundation,
        completedOn: new Date(2020, "January"),
    },
};
