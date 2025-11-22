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
import React from "react";

import ArticlesList from "@/components/blog-articles/ArticlesList";
import { Title } from "@/components/content";

export const metadata: Metadata = {
    title: "Kubernetes the Right Way",
    description:
        "Kubernetes the Right Way series is about the best practices and techniques for improving your Kubernetes Clusters.",
};

const BlogArticles = async (): Promise<React.ReactElement> => (
    <>
        <Title>Kubernetes the Right Way</Title>
        <ArticlesList pathPattern="app/(content)/blog-articles/(articles)/kubernetes-the-right-way/**/page.mdx" />
    </>
);

export default BlogArticles;
