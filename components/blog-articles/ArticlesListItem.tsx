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
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    type CardMediaProps,
    Container,
    Typography,
    useTheme,
} from "@mui/material";
import { useId } from "react";
import Image from "next-image-export-optimizer";
import type React from "react";

import { Link } from "@/components/content";
import Datespan from "@/components/content/Datespan";
import { Date as FormattableDate } from "@/constants/date";
import { type BlogArticle } from "@/utils/blog-articles";

interface ArticleListItemProps {
    blogArticle: BlogArticle;
}

const ArticleListItem = ({
    blogArticle,
}: ArticleListItemProps): React.ReactElement => {
    const theme = useTheme();

    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const lgWidth = theme.breakpoints.values.lg;
    const imageSizes = `(min-width: ${lgWidth}px) 25vw, (min-width: ${mdWidth}px) 33vw, (min-width: ${smWidth}px) 50vw, 100vw`;

    const titleId = useId();

    return (
        <Card sx={{ height: "100%" }}>
            <CardActionArea
                component={Link}
                href={`/blog-articles/${blogArticle.websiteSubPath}`}
                aria-labelledby={titleId}
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
                                alt=""
                                fill
                                sizes={imageSizes}
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </Container>
                    )}
                />
                <CardContent
                    sx={{
                        flex: "auto",
                        p: 2.5,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        id={titleId}
                        gutterBottom
                        component="h3"
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
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                        }}
                    >
                        <Datespan
                            value={FormattableDate.fromJsDate(
                                blogArticle.publishedDate,
                            )}
                            sx={{ mt: 0, mb: 0 }}
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ArticleListItem;
