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
import {
    BLOG_ARTICLE_FILE,
    BLOG_ARTICLES_DIRECTORY_PREFIX,
    BLOG_ARTICLES_GROUP_FILE,
    resolveWebsiteBlogArticlesSubPath,
} from "@/utils/blog-articles";

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

const buildBlogArticleSitemapUrls = (): string[] => {
    const blogArticleSubGroups = globSync(
        `${BLOG_ARTICLES_DIRECTORY_PREFIX}/*/**/${BLOG_ARTICLES_GROUP_FILE}`,
    ).map(
        (filePath) =>
            `/blog-articles/${resolveWebsiteBlogArticlesSubPath(filePath)}`,
    );

    const blogArticles = globSync(
        `${BLOG_ARTICLES_DIRECTORY_PREFIX}/**/${BLOG_ARTICLE_FILE}`,
    ).map(
        (filePath) =>
            `/blog-articles/${resolveWebsiteBlogArticlesSubPath(filePath)}`,
    );

    return [...blogArticleSubGroups, ...blogArticles];
};

const sitemap = (): MetadataRoute.Sitemap => {
    const currentTime = new Date();
    return [
        "/",
        "/nadundesilva-cv.pdf",
        ...buildMainSitemapUrls(WebsiteHome.subRoutes),
        ...buildBlogArticleSitemapUrls(),
    ].map((url) => ({
        url: `${WEBSITE_PUBLIC_URL}${url}`,
        lastModified: currentTime,
        changeFrequency: "daily",
    }));
};

export default sitemap;
export const dynamic = "force-static";
