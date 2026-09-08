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

import { type Metadata } from "next";
import { type StaticImageData } from "next/image";

export interface BlogArticleMetadata {
    image: StaticImageData;
    mediumUrl: string;
    publishedDate: Date;
    keywords: string[];
}

export const buildArticleMetadata = (
    blogMetadata: BlogArticleMetadata,
): Pick<Metadata, "keywords" | "openGraph" | "twitter"> => ({
    keywords: blogMetadata.keywords,
    openGraph: {
        // `type: "article"` must live here, not in the blog layout: Next.js replaces
        // (not deep-merges) the `openGraph` object per segment, so each page.mdx's own
        // `openGraph` would drop a layout-level type. Without type, article:* tags
        // (published_time, tags) are also omitted.
        // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging
        type: "article",
        images: [blogMetadata.image.src],
        publishedTime: blogMetadata.publishedDate.toISOString(),
        tags: blogMetadata.keywords,
    },
    twitter: {
        images: [blogMetadata.image.src],
    },
});
