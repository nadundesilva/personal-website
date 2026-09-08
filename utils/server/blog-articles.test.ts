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
import { describe, expect, it } from "@jest/globals";

import {
    BLOG_ARTICLES_GROUP_FILE,
    BLOG_ARTICLE_FILE,
    discoverBlogArticleFilePaths,
    discoverBlogArticleGroupFilePaths,
    groupArticles,
    resolveWebsiteBlogArticlesSubPath,
    type BlogArticle,
} from "@/utils/server/blog-articles";

const article = (
    websiteSubPath: string,
    publishedDate: Date,
    title = websiteSubPath,
): BlogArticle => ({
    title,
    description: `${title} description`,
    keywords: [],
    image: { src: "/x.png", height: 1, width: 1 },
    publishedDate,
    websiteSubPath,
    readingTimeMinutes: 1,
});

describe("resolveWebsiteBlogArticlesSubPath", () => {
    it("resolves the blog index's own group file to the listing root", () => {
        expect(
            resolveWebsiteBlogArticlesSubPath(
                `app/(content)/blog-articles/(articles)/${BLOG_ARTICLES_GROUP_FILE}`,
            ),
        ).toBe("");
    });

    it("maps an article's source file to its public sub-path", () => {
        expect(
            resolveWebsiteBlogArticlesSubPath(
                `app/(content)/blog-articles/(articles)/engineering/${BLOG_ARTICLE_FILE}`,
            ),
        ).toBe("engineering");
    });
});

describe("blog article discovery", () => {
    it("treats the blog index as its own group rather than a category inside itself", () => {
        const groupFiles = discoverBlogArticleGroupFilePaths();

        expect(groupFiles.length).toBeGreaterThan(0);
        expect(groupFiles).not.toContain(
            `app/(content)/blog-articles/(articles)/${BLOG_ARTICLES_GROUP_FILE}`,
        );
        for (const filePath of groupFiles) {
            expect(filePath.endsWith(`/${BLOG_ARTICLES_GROUP_FILE}`)).toBe(
                true,
            );
        }
    });

    it("finds the written articles and nothing but article files", () => {
        const articleFiles = discoverBlogArticleFilePaths();

        expect(articleFiles.length).toBeGreaterThan(0);
        for (const filePath of articleFiles) {
            expect(filePath.endsWith(`/${BLOG_ARTICLE_FILE}`)).toBe(true);
        }
    });
});

describe("groupArticles", () => {
    it("rejects an article that belongs to no group so broken content fails the build", () => {
        expect(() =>
            groupArticles(
                [article("orphan", new Date(2024, 0), "Orphan Article")],
                { title: "Java", websiteSubPath: "java" },
                [{ title: "Scala", websiteSubPath: "scala" }],
            ),
        ).toThrow("Blog article Orphan Article does not belong to any group");
    });

    it("rejects a listing with no groups at all so an empty blog fails the build", () => {
        expect(() => groupArticles([], null, [])).toThrow(
            "No blog article groups found",
        );
    });

    it("keeps an article in the current group even when a sub-group also matches its path", () => {
        const { currentGroup, subGroups } = groupArticles(
            [article("java/collections", new Date(2024, 0))],
            { title: "Java", websiteSubPath: "java" },
            [{ title: "Java", websiteSubPath: "java" }],
        );

        expect(currentGroup?.articles.map((a) => a.websiteSubPath)).toEqual([
            "java/collections",
        ]);
        expect(subGroups).toEqual([]);
    });

    it("does not absorb an article from a longer, unrelated category name sharing its prefix", () => {
        const { subGroups } = groupArticles(
            [article("javascript/promises", new Date(2024, 0))],
            null,
            [
                { title: "Java", websiteSubPath: "java" },
                { title: "JavaScript", websiteSubPath: "javascript" },
            ],
        );

        expect(subGroups.map((group) => group.websiteSubPath)).toEqual([
            "javascript",
        ]);
    });

    it("orders sub-groups by their newest article so the listing leads with fresh content", () => {
        const { subGroups } = groupArticles(
            [
                article("b/new", new Date(2024, 0)),
                article("a/new", new Date(2023, 0)),
                article("b/old", new Date(2022, 0)),
                article("a/old", new Date(2021, 0)),
            ],
            null,
            [
                { title: "A", websiteSubPath: "a" },
                { title: "B", websiteSubPath: "b" },
            ],
        );

        expect(subGroups.map((group) => group.websiteSubPath)).toEqual([
            "b",
            "a",
        ]);
    });
});
