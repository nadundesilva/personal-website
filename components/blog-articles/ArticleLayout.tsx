"use client";
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

import { OpenInNew } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import type { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";
import type { BlogPosting, Person, WithContext } from "schema-dts";

import profilePhotoImage from "@/assets/profile-photo.webp";
import { Link, Title } from "@/components/content";
import { FULL_NAME, WEBSITE_PUBLIC_URL } from "@/constants/metadata";

interface BlogMetadata {
    image: StaticImageData;
    mediumUrl: string;
    publishedDate: Date;
    keywords: string[];
}

interface PageMetadata {
    title: string;
    description: string;
}

export interface ArticleLayoutProps {
    children: React.ReactNode;
    blogMetadata: BlogMetadata;
    pageMetadata: PageMetadata;
}

const ArticleLayout = ({
    children,
    blogMetadata,
    pageMetadata,
}: ArticleLayoutProps): React.ReactElement => {
    const pathname = usePathname();
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const pageUrl = `${WEBSITE_PUBLIC_URL}${pathname}`;

    const author: Person = {
        "@type": "Person",
        "name": FULL_NAME,
        "url": WEBSITE_PUBLIC_URL,
        "image": new URL(profilePhotoImage.src, WEBSITE_PUBLIC_URL).toString(),
    };

    const jsonLd: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": pageMetadata.title,
        "description": pageMetadata.description,
        "image": new URL(blogMetadata.image.src, WEBSITE_PUBLIC_URL).toString(),
        "inLanguage": "en-US",
        "datePublished": blogMetadata.publishedDate.toISOString(),
        "dateModified": blogMetadata.publishedDate.toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl,
        },
        "accountablePerson": author,
        "author": author,
        "creator": author,
        "publisher": author,
        "keywords": blogMetadata.keywords,
        "sameAs": [blogMetadata.mediumUrl],
    };

    const renderingId = React.useId();

    return (
        <Box component="article">
            <Title>{pageMetadata.title}</Title>
            <Script
                id={`json-ld-blog-${renderingId}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <Typography
                variant="body2"
                sx={{
                    mb: 2.5,
                    color: "text.secondary",
                    fontWeight: 300,
                }}
            >
                Published on{" "}
                {blogMetadata.publishedDate.toLocaleDateString(
                    undefined,
                    options,
                )}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    mb: 3,
                    color: "text.secondary",
                    lineHeight: 1.6,
                }}
            >
                {pageMetadata.description}
            </Typography>
            <Box sx={{ mb: 4 }}>
                <Link href={blogMetadata.mediumUrl} target="_blank">
                    <Button
                        size="small"
                        variant="outlined"
                        endIcon={<OpenInNew />}
                    >
                        Medium
                    </Button>
                </Link>
            </Box>
            {children}
        </Box>
    );
};

export default ArticleLayout;
