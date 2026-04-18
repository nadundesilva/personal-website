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
    Icon: ProfileIcon;
    link: string;
}

export const TWITTER_HANDLE = "@nadunrds";
export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/nadundesilva";

const Profiles: Record<string, Profile> = {
    LinkedIn: {
        name: "LinkedIn",
        Icon: LinkedInIcon,
        link: LINKEDIN_PROFILE_URL,
    },
    GitHub: {
        name: "GitHub",
        Icon: SiGithub,
        link: "https://github.com/nadundesilva",
    },
    Medium: {
        name: "Medium",
        Icon: SiMedium,
        link: "https://medium.com/@nadundesilva",
    },
    GoogleScholar: {
        name: "Google Scholar",
        Icon: SiGooglescholar,
        link: "https://scholar.google.com/citations?user=CdXo_YQAAAAJ&hl=en&oi=ao",
    },
    Facebook: {
        name: "Facebook",
        Icon: SiFacebook,
        link: "https://www.facebook.com/nadunrds",
    },
    Instagram: {
        name: "Instagram",
        Icon: SiInstagram,
        link: "https://www.instagram.com/nadunrds",
    },
    X: {
        name: "X",
        Icon: SiX,
        link: "https://x.com/nadunrds",
    },
};

export default Profiles;
