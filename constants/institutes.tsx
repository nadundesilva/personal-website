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

export interface Institute {
    name: string;
    link: string;
}

export const Institutes: { [key: string]: Institute } = {
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
