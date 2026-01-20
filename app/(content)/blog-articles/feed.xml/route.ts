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
import RSS from "rss";

import {
    FULL_NAME,
    MAIN_DESCRIPTION,
    WEBSITE_PUBLIC_URL,
} from "@/constants/metadata";
import { getBlogArticleGroups, type BlogArticle } from "@/utils/blog-articles";
import { getImageType } from "@/utils/image-metadata";

export const dynamic = "force-static";

export async function GET() {
    const { currentGroup, subGroups } = await getBlogArticleGroups(".");

    const feed = new RSS({
        title: `${FULL_NAME} Blog`,
        description: `Computer Science and Software Engineering blog by ${FULL_NAME}. ${MAIN_DESCRIPTION}`,
        site_url: `${WEBSITE_PUBLIC_URL}/blog-articles`,
        feed_url: `${WEBSITE_PUBLIC_URL}/blog-articles/feed.xml`,
        copyright: `${new Date().getFullYear()} ${FULL_NAME}`,
        language: "en-US",
        pubDate: new Date(),
    });

    const processArticle = (article: BlogArticle) => {
        feed.item({
            title: article.title,
            description: article.description,
            url: `${WEBSITE_PUBLIC_URL}/blog-articles/${article.websiteSubPath}`,
            date: article.publishedDate,
            categories: article.keywords,
            author: FULL_NAME,
            enclosure: {
                url: new URL(article.image.src, WEBSITE_PUBLIC_URL).toString(),
                type: getImageType(article.image.src),
            },
        });
    };

    if (currentGroup) {
        currentGroup.articles.forEach(processArticle);
    }

    subGroups.forEach((group) => {
        group.articles.forEach(processArticle);
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
