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
 * © 2025 Nadun De Silva. All rights reserved.
 */
import {
    SiFacebook,
    SiGithub,
    SiGooglescholar,
    SiInstagram,
    SiMedium,
    SiX,
    type IconType,
} from "@icons-pack/react-simple-icons";
import type React from "react";

import LinkedInIcon from "@/components/icons/LinkedInIcon";

export type ProfileIcon =
    | IconType
    | React.ComponentType<{ size?: number; className?: string }>;

export interface Profile {
    name: string;
    username: string;
    Icon: ProfileIcon;
    url: string;
    urlAliases?: string[];
    /** Wikidata property URL (e.g. Property:P2037 for GitHub) that maps this platform's
     *  external ID — used as schema:identifier propertyID in JSON-LD. */
    wikidataPropertyId: string;
}

export const TWITTER_HANDLE = "@nadunrds";
export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/nadundesilva";

const Profiles: Record<string, Profile> = {
    LinkedIn: {
        name: "LinkedIn",
        username: "nadundesilva",
        Icon: LinkedInIcon,
        url: LINKEDIN_PROFILE_URL,
        wikidataPropertyId: "https://www.wikidata.org/wiki/Property:P6634",
    },
    GitHub: {
        name: "GitHub",
        username: "nadundesilva",
        Icon: SiGithub,
        url: "https://github.com/nadundesilva",
        wikidataPropertyId: "https://www.wikidata.org/wiki/Property:P2037",
    },
    Medium: {
        name: "Medium",
        username: "nadundesilva",
        Icon: SiMedium,
        url: "https://medium.com/@nadundesilva",
        wikidataPropertyId: "https://www.wikidata.org/wiki/Property:P3899",
    },
    GoogleScholar: {
        name: "Google Scholar",
        username: "CdXo_YQAAAAJ",
        Icon: SiGooglescholar,
        url: "https://scholar.google.com/citations?user=CdXo_YQAAAAJ&hl=en&oi=ao",
        wikidataPropertyId: "https://www.wikidata.org/wiki/Property:P1960",
    },
    Facebook: {
        name: "Facebook",
        username: "nadunrds",
        Icon: SiFacebook,
        url: "https://www.facebook.com/nadunrds",
        wikidataPropertyId: "https://www.wikidata.org/wiki/Property:P2013",
    },
    Instagram: {
        name: "Instagram",
        username: "nadunrds",
        Icon: SiInstagram,
        url: "https://www.instagram.com/nadunrds",
        wikidataPropertyId: "https://www.wikidata.org/wiki/Property:P2003",
    },
    X: {
        name: "X",
        username: "nadunrds",
        Icon: SiX,
        url: "https://x.com/nadunrds",
        urlAliases: ["https://twitter.com/nadunrds"],
        wikidataPropertyId: "https://www.wikidata.org/wiki/Property:P2002",
    },
};

export default Profiles;
