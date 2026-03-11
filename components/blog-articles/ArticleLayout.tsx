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
"use client";

import { OpenInNew } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { LeftAccent } from "@/components/primitives";
import Image from "next-image-export-optimizer";
import type { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";
import type { BlogPosting, Person, WithContext } from "schema-dts";

import profilePhotoImage from "@/assets/profile-photo.webp";
import {
    DateInfo,
    LinkButton,
    ScrollReveal,
    Title,
} from "@/components/content";
import { Date as FormattableDate } from "@/constants/date";
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

            <ScrollReveal delay={100}>
                <LeftAccent sx={{ mb: 4 }}>
                    <DateInfo
                        value={FormattableDate.fromJsDate(
                            blogMetadata.publishedDate,
                        )}
                        sx={{ mt: 0, mb: 2.5 }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 2.5,
                            color: "text.secondary",
                            lineHeight: 1.6,
                        }}
                    >
                        {pageMetadata.description}
                    </Typography>
                    <LinkButton
                        href={blogMetadata.mediumUrl}
                        name="Read on Medium"
                        icon={OpenInNew}
                        target="_blank"
                    />
                    {blogMetadata.keywords.length > 0 && (
                        <Box sx={{ mt: 3.5 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: "block",
                                    color: "text.secondary",
                                    mb: 0.75,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Keywords:
                            </Typography>
                            <Box
                                role="group"
                                aria-label="Article keywords"
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                }}
                            >
                                {blogMetadata.keywords.map((keyword) => (
                                    <Chip
                                        key={keyword}
                                        label={keyword}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        slotProps={{
                                            label: { sx: { px: 0.75 } },
                                        }}
                                        sx={{
                                            "cursor": "default",
                                            "height": "1.25rem",
                                            "fontSize": "0.625rem",
                                            "&:hover": { transform: "none" },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}
                </LeftAccent>
            </ScrollReveal>
            <ScrollReveal delay={200}>
                <Box
                    sx={{
                        "position": "relative",
                        "width": "100%",
                        "aspectRatio": "16/9",
                        "borderRadius": 2,
                        "overflow": "hidden",
                        "mb": 6,
                        "boxShadow": (theme) =>
                            theme.palette.mode === "light"
                                ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}, 0 4px 24px ${alpha(theme.palette.primary.main, 0.15)}`
                                : `0 0 0 3px ${alpha(theme.palette.primary.light, 0.2)}, 0 4px 24px ${alpha(theme.palette.primary.light, 0.12)}`,
                        "& img": {
                            transition: (theme) =>
                                theme.transitions.create("transform", {
                                    duration:
                                        theme.transitions.duration.standard,
                                }),
                        },
                        "&:hover img": {
                            transform: "scale(1.03)",
                        },
                    }}
                >
                    <Image
                        src={blogMetadata.image}
                        alt=""
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                    />
                </Box>
            </ScrollReveal>
            {children}
        </Box>
    );
};

export default ArticleLayout;
