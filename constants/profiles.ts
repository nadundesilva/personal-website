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
    Facebook,
    GitHub,
    Instagram,
    LinkedIn,
    Article,
    Twitter,
    School,
} from "@mui/icons-material";
import type { SvgIcon } from "@mui/material";

export interface Profile {
    name: string;
    Icon: typeof SvgIcon;
    link: string;
}

const Profiles: Profile[] = [
    {
        name: "LinkedIn",
        Icon: LinkedIn,
        link: "https://www.linkedin.com/in/nadundesilva",
    },
    {
        name: "GitHub",
        Icon: GitHub,
        link: "https://github.com/nadundesilva",
    },
    {
        name: "Medium",
        Icon: Article,
        link: "https://medium.com/@nadundesilva",
    },
    {
        name: "Google Scholar",
        Icon: School,
        link: "https://scholar.google.com/citations?user=CdXo_YQAAAAJ&hl=en&oi=ao",
    },
    {
        name: "Facebook",
        Icon: Facebook,
        link: "https://www.facebook.com/nadunrds",
    },
    {
        name: "Instagram",
        Icon: Instagram,
        link: "https://www.instagram.com/nadunrds",
    },
    {
        name: "Twitter",
        Icon: Twitter,
        link: "https://twitter.com/nadunrds",
    },
];

export default Profiles;
