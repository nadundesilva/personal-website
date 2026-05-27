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

import Logos, { type LogoImageData } from "@/constants/logos";

export interface Institute {
    name: string;
    link: string;
    logo: LogoImageData;
    wikidataUrl: string;
}

const Institutes: Record<string, Institute> = {
    StJosephsCollegeColombo10: {
        name: "St. Joseph's College",
        link: "https://www.stjosephscollege.lk/",
        logo: Logos.StJosephsCollegeColombo10,
        wikidataUrl: "https://www.wikidata.org/entity/Q13567364",
    },
    UniversityOfMoratuwa: {
        name: "University of Moratuwa",
        link: "https://uom.lk/",
        logo: Logos.UniversityOfMoratuwa,
        wikidataUrl: "https://www.wikidata.org/entity/Q3523254",
    },
    DeepLearningAi: {
        name: "DeepLearning.AI",
        link: "https://www.deeplearning.ai/",
        logo: Logos.DeepLearningAi,
        wikidataUrl: "https://www.wikidata.org/entity/Q139973594",
    },
    Coursera: {
        name: "Coursera",
        link: "https://www.coursera.org/",
        logo: Logos.DeepLearningAi,
        wikidataUrl: "https://www.wikidata.org/entity/Q499962",
    },
    LinuxFoundation: {
        name: "Linux Foundation",
        link: "https://www.linuxfoundation.org/",
        logo: Logos.CKA,
        wikidataUrl: "https://www.wikidata.org/entity/Q858851",
    },
    UniversityOfAlberta: {
        name: "University of Alberta",
        link: "https://www.ualberta.ca/",
        logo: Logos.UniversityOfAlberta,
        wikidataUrl: "https://www.wikidata.org/entity/Q640694",
    },
    AlbertaMachineIntelligenceInstitute: {
        name: "Alberta Machine Intelligence Institute (Amii)",
        link: "https://www.amii.ca/",
        logo: Logos.UniversityOfAlberta,
        wikidataUrl: "https://www.wikidata.org/entity/Q112085318",
    },
};

export default Institutes;
