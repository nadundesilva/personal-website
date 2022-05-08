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
import { LogoAsset, Logos } from "./logos";

export interface Certificate {
    name: string;
    type: "Course" | "Certification" | "Specialization";
    link: string;
    logo: LogoAsset;
    issuer: string;
}

const UNIVERSITY_OF_ALBERTA_ISSUER = "University of Alberta";
const DEEP_LEARNING_ISSUER = "Deeplearning.AI";
const LINUX_FOUNDATION = "Linux Foundation";

export const Certificates: { [key: string]: Certificate } = {
    DeepLearningSpecialization: {
        name: "Deep Learning",
        type: "Specialization",
        link: "https://coursera.org/share/8e5db53bfef4c4b27f79004022edad72",
        logo: Logos.DeepLearningAI,
        issuer: DEEP_LEARNING_ISSUER,
    },
    FundamentalsOfReinforcementLearning: {
        name: "Fundamentals of Reinforcement Learning",
        type: "Course",
        link: "https://coursera.org/share/fcbebc1de9e6a9b3ecb186983af7b969",
        logo: Logos.UniversityOfAlberta,
        issuer: UNIVERSITY_OF_ALBERTA_ISSUER,
    },
    BuildBasicGenerativeAdversarialNetworks: {
        name: "Build Basic Generative Adversarial Networks (GANs)",
        type: "Course",
        link: "https://coursera.org/share/fed56feb8ba81177e6467779f22c0851",
        logo: Logos.DeepLearningAI,
        issuer: DEEP_LEARNING_ISSUER,
    },
    CertifiedKubernetesAdministrator: {
        name: "Certified Kubernetes Administrator (CKA)",
        type: "Certification",
        link: "https://www.youracclaim.com/badges/8241114b-7435-460a-a08f-9d33304c1470?source=linked_in_profile",
        logo: Logos.CKA,
        issuer: LINUX_FOUNDATION,
    },
    CertifiedKubernetesApplicationDeveloper: {
        name: "Certified Kubernetes Application Developer (CKAD)",
        type: "Certification",
        link: "https://www.youracclaim.com/badges/e9df4128-2017-41c3-9e7d-028e37176243/linked_in_profile",
        logo: Logos.CKAD,
        issuer: LINUX_FOUNDATION,
    },
};
