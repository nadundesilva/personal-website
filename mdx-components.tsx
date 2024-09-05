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
import { OpenInNew } from "@mui/icons-material";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

interface ImageProps {
    src: string;
    alt: string;
    creator?: Creator;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        a: (props) => <a {...props} target="_blank" />,
        h1: ({ children }) => (
            <Typography variant="h2" gutterBottom>
                {children}
            </Typography>
        ),
        h2: ({ children }) => (
            <Typography variant="h3" gutterBottom>
                {children}
            </Typography>
        ),
        BlogArticleLayout({
            children,
            blogMetadata,
            pageMetadata,
        }: {
            children: React.ReactNode;
            blogMetadata: BlogMetadata;
            pageMetadata: PageMetadata;
        }): React.ReactElement {
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "short",
                day: "numeric",
            };
            return (
                <Box>
                    <Typography variant="h1" gutterBottom>
                        {pageMetadata.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ mb: 2, color: "#888888" }}
                    >
                        Published on{" "}
                        {blogMetadata.publishedDate.toLocaleDateString(
                            undefined,
                            options,
                        )}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ mb: 2, color: "#555555" }}
                    >
                        {pageMetadata.description}
                    </Typography>
                    <Box sx={{ mb: 5 }}>
                        <Button
                            size="small"
                            variant="outlined"
                            LinkComponent={Link}
                            href={blogMetadata.mediumUrl}
                            target="_blank"
                            endIcon={<OpenInNew />}
                        >
                            Medium
                        </Button>
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
                paddingY={3}
            >
                <Grid sx={{ textAlign: "center" }}>
                    <Image
                        src={src}
                        alt={alt}
                        unoptimized
                        sizes="100vw"
                        style={{
                            width: "75%",
                            height: "auto",
                        }}
                    />
                </Grid>
                {creator && (
                    <Grid>
                        <Typography sx={{ fontSize: "0.8em" }}>
                            Photo by Clint{" "}
                            <Link href={new URL(creator.href)}>
                                {creator.name}
                            </Link>{" "}
                            on{" "}
                            <Link href={new URL(creator.platform.href)}>
                                {creator.platform.name}
                            </Link>
                        </Typography>
                    </Grid>
                )}
            </Grid>
        ),
    };
}
