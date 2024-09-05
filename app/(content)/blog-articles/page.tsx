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
 * © 2024 Nadun De Silva. All rights reserved.
 */
import { type Metadata } from "next";
import React from "react";

import ArticlesList from "@/components/blog-articles/ArticlesList";
import { Title } from "@/components/content";
import { FULL_NAME } from "@/constants/metadata";

export const metadata: Metadata = {
    title: `${FULL_NAME} | Blog Articles`,
    description: `Blog Articles written by ${FULL_NAME}.`,
};

const BlogArticles = async (): Promise<React.ReactElement> => (
    <React.Fragment>
        <Title>Blog Articles</Title>
        <ArticlesList pathPattern="app/(content)/blog-articles/(articles)/**/page.mdx" />
    </React.Fragment>
);

export default BlogArticles;
