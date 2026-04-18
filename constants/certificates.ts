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
import Skills from "@/constants/skills";
import { type StaticImageData } from "next/image";
import { Date } from "./date";
import Institutes, { type Institute } from "./institutes";

import ckaLogoImage from "@/assets/certifications/cka-logo.png";
import ckadLogoImage from "@/assets/certifications/ckad-logo.png";
import deepLearningAiLogoImage from "@/assets/certifications/deep-learning-ai-logo.png";
import universityOfAlbertaLogoImage from "@/assets/certifications/university-of-alberta-logo.png";

export interface Certificate {
    name: string;
    type: "Course" | "Certification" | "Specialization";
    link: string;
    logo: {
        srcLight: StaticImageData;
        srcDark: StaticImageData;
        alt: string;
    };
    issuer: Institute;
    completedOn: Date;
    skills: string[];
}

const Certificates: Record<string, Certificate> = {
    DeepLearningSpecialization: {
        name: "Deep Learning",
        type: "Specialization",
        link: "https://coursera.org/share/8e5db53bfef4c4b27f79004022edad72",
        logo: {
            srcLight: deepLearningAiLogoImage,
            srcDark: deepLearningAiLogoImage,
            alt: "Deep Learning AI",
        },
        issuer: Institutes.DeepLearningAi,
        completedOn: new Date(2021, "June"),
        skills: [
            Skills.DeepLearning,
            Skills.NeuralNetworks,
            Skills.Python,
            Skills.TensorFlow,
        ],
    },
    FundamentalsOfReinforcementLearning: {
        name: "Fundamentals of Reinforcement Learning",
        type: "Course",
        link: "https://coursera.org/share/fcbebc1de9e6a9b3ecb186983af7b969",
        logo: {
            srcLight: universityOfAlbertaLogoImage,
            srcDark: universityOfAlbertaLogoImage,
            alt: "University of Alberta",
        },
        issuer: Institutes.UniversityOfAlberta,
        completedOn: new Date(2021, "September"),
        skills: [
            Skills.ReinforcementLearning,
            Skills.Python,
            Skills.TensorFlow,
        ],
    },
    BuildBasicGenerativeAdversarialNetworks: {
        name: "Build Basic Generative Adversarial Networks (GANs)",
        type: "Course",
        link: "https://coursera.org/share/fed56feb8ba81177e6467779f22c0851",
        logo: {
            srcLight: deepLearningAiLogoImage,
            srcDark: deepLearningAiLogoImage,
            alt: "Deep Learning AI",
        },
        issuer: Institutes.DeepLearningAi,
        completedOn: new Date(2021, "July"),
        skills: [
            Skills.DeepLearning,
            Skills.NeuralNetworks,
            Skills.Python,
            Skills.TensorFlow,
        ],
    },
    CertifiedKubernetesAdministrator: {
        name: "Certified Kubernetes Administrator (CKA)",
        type: "Certification",
        link: "https://www.youracclaim.com/badges/8241114b-7435-460a-a08f-9d33304c1470?source=linked_in_profile",
        logo: {
            srcLight: ckaLogoImage,
            srcDark: ckaLogoImage,
            alt: "Certified Kubernetes Administrator",
        },
        issuer: Institutes.LinuxFoundation,
        completedOn: new Date(2020, "December"),
        skills: [
            Skills.Kubernetes,
            Skills.Docker,
            Skills.Microservices,
            Skills.DevOps,
        ],
    },
    CertifiedKubernetesApplicationDeveloper: {
        name: "Certified Kubernetes Application Developer (CKAD)",
        type: "Certification",
        link: "https://www.youracclaim.com/badges/e9df4128-2017-41c3-9e7d-028e37176243/linked_in_profile",
        logo: {
            srcLight: ckadLogoImage,
            srcDark: ckadLogoImage,
            alt: "Certified Kubernetes Application Developer",
        },
        issuer: Institutes.LinuxFoundation,
        completedOn: new Date(2020, "January"),
        skills: [
            Skills.Kubernetes,
            Skills.Docker,
            Skills.Microservices,
            Skills.DevOps,
            Skills.CloudNativeApplicationDevelopment,
        ],
    },
};

export default Certificates;
