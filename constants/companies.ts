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

export interface Company {
    name: string;
    logo: LogoImageData;
    url: string;
    /** Additional URLs for this company (e.g. LinkedIn company page) included in sameAs. */
    urlAliases?: string[];
    wikidataUrl: string;
}

const Companies: Record<string, Company> = {
    McCraeTech: {
        name: "McCrae Tech",
        logo: Logos.McCraeTech,
        url: "https://mccrae.tech/",
        urlAliases: ["https://www.linkedin.com/company/mccraetech"],
        wikidataUrl: "https://www.wikidata.org/entity/Q139961796",
    },
    OrionHealth: {
        name: "Orion Health",
        logo: Logos.OrionHealth,
        url: "https://www.orionhealth.com/",
        urlAliases: ["https://www.linkedin.com/company/orion-health"],
        wikidataUrl: "https://www.wikidata.org/entity/Q39045500",
    },
    WSO2: {
        name: "WSO2",
        logo: Logos.WSO2,
        url: "https://wso2.com/",
        urlAliases: ["https://www.linkedin.com/company/wso2"],
        wikidataUrl: "https://www.wikidata.org/entity/Q9095380",
    },
};

export default Companies;
