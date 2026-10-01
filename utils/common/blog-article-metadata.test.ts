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
import { beforeAll, describe, expect, it } from "@jest/globals";

import { buildArticleMetadata } from "@/utils/common/blog-article-metadata";

const image = {
    src: "/_next/static/media/article.abc123.webp",
    height: 630,
    width: 1200,
};

beforeAll(() => {
    process.env.nextImageExportOptimizer_exportFolderName = "optimized-images";
});

describe("buildArticleMetadata", () => {
    it("declares each post as an article so crawlers emit article tags", () => {
        const metadata = buildArticleMetadata({
            image,
            mediumUrl: "https://medium.com/@nadun/article",
            publishedDate: new Date("2024-03-15"),
            keywords: ["kubernetes"],
        });

        expect(metadata.openGraph).toMatchObject({ type: "article" });
    });

    it("exposes the publication date in machine-readable form", () => {
        const metadata = buildArticleMetadata({
            image,
            mediumUrl: "https://medium.com/@nadun/article",
            publishedDate: new Date("2024-03-15"),
            keywords: [],
        });

        expect(metadata.openGraph).toMatchObject({
            publishedTime: new Date("2024-03-15").toISOString(),
        });
    });

    it("carries the article's tags into the link preview", () => {
        const metadata = buildArticleMetadata({
            image,
            mediumUrl: "https://medium.com/@nadun/article",
            publishedDate: new Date("2024-03-15"),
            keywords: ["kubernetes", "observability"],
        });

        expect(metadata.keywords).toEqual(["kubernetes", "observability"]);
        expect(metadata.openGraph).toMatchObject({
            tags: ["kubernetes", "observability"],
        });
    });

    it("uses the article's own cover image for both link-preview cards", () => {
        const metadata = buildArticleMetadata({
            image,
            mediumUrl: "https://medium.com/@nadun/article",
            publishedDate: new Date("2024-03-15"),
            keywords: [],
        });

        const optimized = ["/optimized-images/article.abc123-opt-1080.WEBP"];
        expect(metadata.openGraph?.images).toEqual(optimized);
        expect(metadata.twitter?.images).toEqual(optimized);
    });
});
