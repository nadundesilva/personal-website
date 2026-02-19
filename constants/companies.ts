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
    link: string;
    logo: LogoImageData;
}

const Companies: Record<string, Company> = {
    McCraeTech: {
        name: "McCrae Tech",
        link: "https://mccrae.tech/",
        logo: Logos.McCraeTech,
    },
    OrionHealth: {
        name: "Orion Health",
        link: "https://www.orionhealth.com/",
        logo: Logos.OrionHealth,
    },
    WSO2: {
        name: "WSO2",
        link: "https://wso2.com/",
        logo: Logos.WSO2,
    },
    WSO2ViaGoogleSummerOfCode: {
        name: "WSO2 via Google Summer of Code",
        link: "https://summerofcode.withgoogle.com/",
        logo: Logos.GoogleSummerOfCode,
    },
};

export default Companies;
