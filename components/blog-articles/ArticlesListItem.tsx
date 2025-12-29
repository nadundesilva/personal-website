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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    type CardMediaProps,
    Container,
    Typography,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import type React from "react";

import { Link } from "@/components/content";
import { type BlogArticle } from "@/utils/blog-articles";

interface ArticleListItemProps {
    blogArticle: BlogArticle;
}

const ArticleListItem = ({
    blogArticle,
}: ArticleListItemProps): React.ReactElement => {
    const theme = useTheme();

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const lgWidth = theme.breakpoints.values.lg;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 50vw, (min-width: ${mdWidth}px) 33vw, (min-width: ${lgWidth}px) 25vw`;

    return (
        <Card sx={{ height: "100%" }}>
            <Link href={`/blog-articles/${blogArticle.websiteSubPath}`}>
                <CardActionArea
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CardMedia
                        component={(props: CardMediaProps) => (
                            <Container
                                {...props}
                                maxWidth={false}
                                disableGutters
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    aspectRatio: "16/9",
                                    overflow: "hidden",
                                }}
                            >
                                <Image
                                    src={blogArticle.image}
                                    alt={blogArticle.title}
                                    fill
                                    sizes={imageSizes}
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            </Container>
                        )}
                    />
                    <CardContent sx={{ flex: "auto", p: 2.5 }}>
                        <Typography
                            gutterBottom
                            variant="h4"
                            sx={{
                                pb: 1,
                                fontWeight: 500,
                                lineHeight: 1.3,
                            }}
                        >
                            {blogArticle.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.6,
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {blogArticle.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};

export default ArticleListItem;
