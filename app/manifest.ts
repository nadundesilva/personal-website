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
import { type MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
    name: "Nadun De Silva",
    short_name: "Nadun De Silva",
    description:
        "Nadun De Silva is an aspiring Software Engineer interested in Deep Learning, Observability, Anomaly Detection &amp; Cloud Technologies.",
    start_url: "/",
    background_color: "#ffffff",
    theme_color: "#000000",
    display: "standalone",
    orientation: "portrait",
    icons: [
        {
            src: "favicon.ico",
            sizes: "144x144 64x64 32x32 24x24 16x16",
            type: "image/x-icon",
        },
        {
            src: "icon-maskable-x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
        },
    ],
});

export default manifest;
