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

import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";
import { Routes, type Route } from "@/constants/routes";

const buildSitemapUrls = (currentRoutes: Record<string, Route>): string[] => {
    let urls: string[] = [];
    Object.values(currentRoutes).forEach((route) => {
        urls.push(route.path);
        if (route.subRoutes !== undefined) {
            urls = urls.concat(buildSitemapUrls(route.subRoutes));
        }
    });
    return urls;
};

const time = new Date();

const sitemap = (): MetadataRoute.Sitemap =>
    ["/", "/nadundesilva-cv.pdf"]
        .concat(buildSitemapUrls(Routes))
        .map((url) => ({
            url: `${WEBSITE_PUBLIC_URL}${url}`,
            lastModified: time,
            changeFrequency: "daily",
        }));

export default sitemap;
