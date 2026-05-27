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
 * © 2024 Nadun De Silva. All rights reserved.
 */
import type { Metadata } from "next";
import type React from "react";

import ArticlesList from "@/components/blog-articles/ArticlesList";
import CollectionPageJsonLd from "@/components/layout/CollectionPageJsonLd";
import {
    BLOG_CATEGORY,
    FULL_NAME,
    MAIN_DESCRIPTION,
} from "@/constants/metadata";
import { resolveRoute } from "@/utils/common/routes";

export const metadata: Metadata = {
    title: resolveRoute("/blog-articles").name,
    description: `${BLOG_CATEGORY} blog by ${FULL_NAME}. ${MAIN_DESCRIPTION}`,
};

const BlogArticles = async (): Promise<React.ReactElement> => (
    <>
        <CollectionPageJsonLd metadata={metadata} pathname="/blog-articles" />
        <ArticlesList subPath="." />
    </>
);

export default BlogArticles;
