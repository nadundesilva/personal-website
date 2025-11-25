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
import { globSync } from "glob";
import type { MetadataRoute } from "next";

import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";
import { WebsiteHome, type Route } from "@/constants/routes";

const buildMainSitemapUrls = (
    currentRoutes: Record<string, Route> | undefined,
): string[] => {
    let urls: string[] = [];
    if (currentRoutes) {
        Object.values(currentRoutes).forEach((route) => {
            urls.push(route.path);
            if (route.subRoutes !== undefined) {
                urls = urls.concat(buildMainSitemapUrls(route.subRoutes));
            }
        });
    }
    return urls;
};

const blogArticles = globSync(
    "app/(content)/blog-articles/(articles)/**/page.mdx",
).map(
    (filePath) =>
        "/blog-articles/" +
        filePath
            .replace(/^(app\/\(content\)\/blog-articles\/\(articles\)\/)/, "")
            .replace(/\/page\.mdx$/, ""),
);

const currentTime = new Date();

const sitemap = (): MetadataRoute.Sitemap =>
    ["/", "/nadundesilva-cv.pdf"]
        .concat(buildMainSitemapUrls(WebsiteHome.subRoutes))
        .concat(blogArticles)
        .map((url) => ({
            url: `${WEBSITE_PUBLIC_URL}${url}`,
            lastModified: currentTime,
            changeFrequency: "daily",
        }));

export default sitemap;
export const dynamic = "force-static";
