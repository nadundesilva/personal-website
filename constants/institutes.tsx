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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */

export interface Institute {
    name: string;
    link: string;
}

export const Institutes: Record<string, Institute> = {
    StJosephsCollegeColombo10: {
        name: "St. Joseph's College",
        link: "https://www.stjosephscollege.lk/",
    },
    UniversityOfMoratuwa: {
        name: "University of Moratuwa",
        link: "https://uom.lk/",
    },
    BritishCouncilHSBCYouthEnterpriseAwards: {
        name: "British Council HSBC Youth Enterprise Awards",
        link: "https://www.britishcouncil.lk/programmes/education/internationalising-higher-education/hsbc-youth-enterprise-awards",
    },
    NASA: {
        name: "NASA",
        link: "https://www.nasa.gov/",
    },
    WSO2: {
        name: "WSO2",
        link: "https://wso2.com/",
    },
    DeepLearningAi: {
        name: "DeepLearning.AI",
        link: "https://www.deeplearning.ai/",
    },
    Coursera: {
        name: "Coursera",
        link: "https://www.coursera.org/",
    },
    LinuxFoundation: {
        name: "Linux Foundation",
        link: "https://www.linuxfoundation.org/",
    },
    UniversityOfAlberta: {
        name: "University of Alberta",
        link: "https://www.ualberta.ca/",
    },
    AlbertaMachineIntelligenceInstitute: {
        name: "Alberta Machine Intelligence Institute (Amii)",
        link: "https://www.amii.ca/",
    },
};
