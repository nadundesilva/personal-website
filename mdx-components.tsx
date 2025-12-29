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
import { OpenInNew } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Script from "next/script";
import React from "react";
import type { BlogPosting, Person, WithContext } from "schema-dts";

import {
    Link,
    List,
    ListItem,
    Paragraph,
    SectionHeading,
    SubsectionHeading,
    Title,
} from "@/components/content";
import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";

interface BlogMetadata {
    image: string;
    mediumUrl: string;
    publishedDate: Date;
    keywords: string[];
}

interface PageMetadata {
    title: string;
    description: string;
}

interface CreatorPlatform {
    name: string;
    href: string;
}

interface Creator {
    name: string;
    href: string;
    platform: CreatorPlatform;
}

interface BlogArticleLayoutProps {
    children: React.ReactNode;
    blogMetadata: BlogMetadata;
    pageMetadata: PageMetadata;
}

interface ImageProps {
    src: string;
    alt: string;
    creator?: Creator;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        a: ({ href, children }) =>
            href ? (
                <Link
                    href={new URL(
                        href,
                        `${WEBSITE_PUBLIC_URL}/blog-articles/`,
                    ).toString()}
                    target="_blank"
                >
                    {children}
                </Link>
            ) : null,
        h1: ({ children }) => <SectionHeading>{children}</SectionHeading>,
        h2: ({ children }) => <SubsectionHeading>{children}</SubsectionHeading>,
        hr: () => (
            <Divider
                sx={{
                    "border": 0,
                    "textAlign": "center",
                    "pt": 4,
                    "&::before": {
                        content: "'\\2022\\2800\\2022\\2800\\2022'",
                        fontSize: { xs: "1.5rem", sm: "2rem" },
                        color: "text.secondary",
                        opacity: 0.4,
                    },
                }}
            />
        ),
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
        ul: ({ children }) => <List component="ul">{children}</List>,
        ol: ({ children }) => <List component="ol">{children}</List>,
        li: ({ children }) => (
            <ListItem>
                <Typography component="div">{children}</Typography>
            </ListItem>
        ),
        BlogArticleLayout({
            children,
            blogMetadata,
            pageMetadata,
        }: BlogArticleLayoutProps): React.ReactElement {
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "short",
                day: "numeric",
            };
            const author: Person = {
                "@type": "Person",
                "name": "Nadun De Silva",
                "url": WEBSITE_PUBLIC_URL,
            };
            const jsonLd: WithContext<BlogPosting> = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": pageMetadata.title,
                "image": blogMetadata.image,
                "inLanguage": "en-US",
                "datePublished": blogMetadata.publishedDate.toISOString(),
                "accountablePerson": author,
                "author": author,
                "creator": author,
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
        },
        Image: ({ src, alt, creator }: ImageProps) => (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ py: { xs: 3, sm: 4 } }}
            >
                <Grid
                    sx={{
                        textAlign: "center",
                        width: { xs: "100%", sm: "90%", md: "75%" },
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: 1,
                            overflow: "hidden",
                            display: "inline-block",
                            width: "100%",
                        }}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            unoptimized
                            sizes="(min-width: 600px) 90vw, (min-width: 900px) 75vw, 100vw"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                            }}
                        />
                    </Box>
                </Grid>
                {creator && (
                    <Grid sx={{ mt: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                fontWeight: 300,
                            }}
                        >
                            Photo by{" "}
                            <Link href={creator.href} target="_blank">
                                {creator.name}
                            </Link>{" "}
                            on{" "}
                            <Link href={creator.platform.href} target="_blank">
                                {creator.platform.name}
                            </Link>
                        </Typography>
                    </Grid>
                )}
            </Grid>
        ),
    };
}
