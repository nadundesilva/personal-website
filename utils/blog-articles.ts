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

import { glob } from "glob";

export interface BlogArticle {
    title: string;
    description: string;
    keywords: string[];
    image: string;
    publishedDate: Date;
    websiteSubPath: string;
}

export interface BlogArticleGroupMetadata {
    title: string;
    websiteSubPath: string;
}

export interface BlogArticleGroup extends BlogArticleGroupMetadata {
    articles: BlogArticle[];
}

export const BLOG_ARTICLES_DIRECTORY_PREFIX =
    "app/(content)/blog-articles/(articles)";
export const BLOG_ARTICLES_GROUP_FILE = "page.tsx";
export const BLOG_ARTICLE_FILE = "page.mdx";

export function resolveWebsiteBlogArticlesSubPath(filePath: string): string {
    return filePath
        .replace(/^app\/\(content\)\/blog-articles\/\(articles\)\//, "")
        .replace(/(^|\/)page\.(mdx|tsx)$/, "");
}

async function getBlogArticles(subPath: string): Promise<BlogArticle[]> {
    const blogArticlesFilePathPattern = `${BLOG_ARTICLES_DIRECTORY_PREFIX}/${subPath}/**/${BLOG_ARTICLE_FILE}`;
    const articles = await Promise.all(
        (await glob(blogArticlesFilePathPattern)).map(async (filePath) => {
            const websiteSubPath = resolveWebsiteBlogArticlesSubPath(filePath);
            const { metadata, blogMetadata } = await import(
                `app/(content)/blog-articles/(articles)/${websiteSubPath}/${BLOG_ARTICLE_FILE}`
            );

            return {
                title: metadata.title as string,
                description: metadata.description as string,
                keywords: blogMetadata.keywords as string[],
                image: blogMetadata.image as string,
                publishedDate: blogMetadata.publishedDate as Date,
                websiteSubPath,
            };
        }),
    );
    return articles.sort(
        (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime(),
    );
}

async function getCurrentGroupMetadata(
    subPath: string,
): Promise<BlogArticleGroupMetadata | null> {
    const currentGroupFilePathPattern = `${BLOG_ARTICLES_DIRECTORY_PREFIX}/${subPath}/${BLOG_ARTICLES_GROUP_FILE}`;
    const currentGroupFilePaths = await glob(currentGroupFilePathPattern);

    if (currentGroupFilePaths.length === 0) {
        return null;
    }
    if (currentGroupFilePaths.length > 1) {
        throw new Error(
            `Expected less than or equal to one group file for sub path ${subPath}, but got ${currentGroupFilePaths.length}`,
        );
    }

    const websiteSubPath = resolveWebsiteBlogArticlesSubPath(
        currentGroupFilePaths[0],
    );
    const { metadata } = await import(
        `app/(content)/blog-articles/(articles)/${websiteSubPath}/${BLOG_ARTICLES_GROUP_FILE}`
    );

    return {
        title: metadata.title as string,
        websiteSubPath,
    };
}

async function getSubGroupMetadatas(
    subPath: string,
): Promise<BlogArticleGroupMetadata[]> {
    const groupFilePathPattern = `${BLOG_ARTICLES_DIRECTORY_PREFIX}/${subPath}/*/**/${BLOG_ARTICLES_GROUP_FILE}`;

    return await Promise.all(
        (await glob(groupFilePathPattern)).map(async (filePath) => {
            const websiteSubPath = resolveWebsiteBlogArticlesSubPath(filePath);
            const { metadata } = await import(
                `app/(content)/blog-articles/(articles)/${websiteSubPath ? `${websiteSubPath}/` : ""}${BLOG_ARTICLES_GROUP_FILE}`
            );

            return {
                title: metadata.title as string,
                websiteSubPath,
            };
        }),
    );
}

function groupArticles(
    articles: BlogArticle[],
    currentGroupMetadata: BlogArticleGroupMetadata | null,
    articleGroupMetadatas: BlogArticleGroupMetadata[],
): { currentGroup: BlogArticleGroup | null; subGroups: BlogArticleGroup[] } {
    let currentGroup: BlogArticleGroup | null = null;
    const subGroupsMap = new Map<string, BlogArticleGroup>();

    for (const article of articles) {
        let belongsToGroup = false;

        // Check if article belongs to any group
        if (
            currentGroupMetadata &&
            article.websiteSubPath.startsWith(
                currentGroupMetadata.websiteSubPath,
            )
        ) {
            if (!currentGroup) {
                currentGroup = {
                    ...currentGroupMetadata,
                    articles: [],
                };
            }
            currentGroup.articles.push(article);

            belongsToGroup = true;
        } else {
            for (const groupMetadata of articleGroupMetadatas) {
                if (
                    article.websiteSubPath.startsWith(
                        groupMetadata.websiteSubPath,
                    )
                ) {
                    if (!subGroupsMap.has(groupMetadata.websiteSubPath)) {
                        subGroupsMap.set(groupMetadata.websiteSubPath, {
                            ...groupMetadata,
                            articles: [],
                        });
                    }
                    subGroupsMap
                        .get(groupMetadata.websiteSubPath)
                        ?.articles.push(article);

                    belongsToGroup = true;
                    break;
                }
            }
        }

        if (!belongsToGroup) {
            throw new Error(
                `Blog article ${article.title} does not belong to any group`,
            );
        }
    }
    if (currentGroup === null && subGroupsMap.size === 0) {
        throw new Error("No blog article groups found");
    }

    return {
        currentGroup,
        subGroups: Array.from(subGroupsMap.values()).sort(
            (groupA, groupB) =>
                groupB.articles[0].publishedDate.getTime() -
                groupA.articles[0].publishedDate.getTime(),
        ),
    };
}

export async function getBlogArticleGroups(subPath: string): Promise<{
    currentGroup: BlogArticleGroup | null;
    subGroups: BlogArticleGroup[];
}> {
    const [blogArticles, currentGroupMetadata, subGroupMetadatas] =
        await Promise.all([
            getBlogArticles(subPath),
            getCurrentGroupMetadata(subPath),
            getSubGroupMetadatas(subPath),
        ]);
    return groupArticles(blogArticles, currentGroupMetadata, subGroupMetadatas);
}
