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
import { FULL_NAME, MAIN_DESCRIPTION } from "@/constants/metadata";

export const metadata: Metadata = {
    title: "Blog Articles",
    description: `Computer Science and Software Engineering blog by ${FULL_NAME}. ${MAIN_DESCRIPTION}`,
};

const BlogArticles = async (): Promise<React.ReactElement> => (
    <ArticlesList subPath="." />
);

export default BlogArticles;
