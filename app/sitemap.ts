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
import { CvPdfPath, WebsiteHome, type Route } from "@/constants/routes";
import {
    BLOG_ARTICLE_FILE,
    BLOG_ARTICLES_DIRECTORY_PREFIX,
    BLOG_ARTICLES_GROUP_FILE,
    resolveWebsiteBlogArticlesSubPath,
} from "@/utils/server/blog-articles";
import { getLastModifiedDate } from "@/utils/server/git";

interface SitemapEntry {
    path: string;
    filePath: string;
}

const resolveRouteFilePath = (routePath: string): string => {
    if (routePath === "/blog-articles") {
        return "app/(content)/blog-articles/page.tsx";
    }
    if (routePath.startsWith("/blog-articles/")) {
        const subPath = routePath.slice("/blog-articles/".length);
        return `${BLOG_ARTICLES_DIRECTORY_PREFIX}/${subPath}/${BLOG_ARTICLES_GROUP_FILE}`;
    }
    return `app/(content)${routePath}/page.tsx`;
};

const buildMainSitemapEntries = (
    currentRoutes: Record<string, Route> | undefined,
): SitemapEntry[] => {
    let entries: SitemapEntry[] = [];
    if (currentRoutes) {
        Object.values(currentRoutes).forEach((route) => {
            const routePath = route.path as string;
            entries.push({
                path: routePath,
                filePath: resolveRouteFilePath(routePath),
            });
            if (route.subRoutes !== undefined) {
                entries = entries.concat(
                    buildMainSitemapEntries(route.subRoutes),
                );
            }
        });
    }
    return entries;
};

const buildBlogArticleSitemapEntries = (): SitemapEntry[] => {
    const blogArticleSubGroups = globSync(
        `${BLOG_ARTICLES_DIRECTORY_PREFIX}/*/**/${BLOG_ARTICLES_GROUP_FILE}`,
    ).map((filePath) => ({
        path: `/blog-articles/${resolveWebsiteBlogArticlesSubPath(filePath)}`,
        filePath,
    }));

    const blogArticles = globSync(
        `${BLOG_ARTICLES_DIRECTORY_PREFIX}/**/${BLOG_ARTICLE_FILE}`,
    ).map((filePath) => ({
        path: `/blog-articles/${resolveWebsiteBlogArticlesSubPath(filePath)}`,
        filePath,
    }));

    return [...blogArticleSubGroups, ...blogArticles];
};

const resolveChangeFrequency = (
    path: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] => {
    // /blog-articles/{category} has depth 3; individual articles have depth 4+
    if (path.startsWith("/blog-articles/"))
        return path.split("/").length <= 3 ? "weekly" : "yearly";
    return "monthly";
};

const sitemap = (): MetadataRoute.Sitemap => {
    const entries: SitemapEntry[] = [
        { path: "/", filePath: "app/(home)/page.tsx" },
        { path: CvPdfPath, filePath: "public/nadundesilva-cv.pdf" },
        ...buildMainSitemapEntries(WebsiteHome.subRoutes),
        ...buildBlogArticleSitemapEntries(),
    ];

    return entries.map(({ path, filePath }) => ({
        url: `${WEBSITE_PUBLIC_URL}${path}`,
        // lastModified uses only the page's own source file. Component
        // dependencies are intentionally excluded — infrastructure changes
        // (refactors, SEO additions) are not content changes and should not
        // shift lastModified, which crawlers use to gauge content freshness.
        lastModified: getLastModifiedDate(filePath),
        changeFrequency: resolveChangeFrequency(path),
    }));
};

export default sitemap;
export const dynamic = "force-static";
