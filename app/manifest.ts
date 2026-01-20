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
import type { MetadataRoute } from "next";

import { FULL_NAME, MAIN_DESCRIPTION } from "@/constants/metadata";
import { getImageType } from "@/utils/image-metadata";

const manifest = (): MetadataRoute.Manifest => ({
    name: FULL_NAME,
    short_name: FULL_NAME,
    description: MAIN_DESCRIPTION,
    start_url: "/",
    background_color: "#ffffff",
    theme_color: "#000000",
    display: "standalone",
    orientation: "portrait",
    icons: [
        {
            src: "favicon.ico",
            sizes: "144x144 64x64 32x32 24x24 16x16",
            type: getImageType("favicon.ico"),
        },
        {
            src: "icon-maskable-x512.png",
            sizes: "512x512",
            type: getImageType("icon-maskable-x512.png"),
            purpose: "maskable",
        },
    ],
});

export default manifest;
export const dynamic = "force-static";
