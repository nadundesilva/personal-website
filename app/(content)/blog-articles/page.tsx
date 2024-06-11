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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import { glob } from "glob";
import { type Metadata } from "next";
import NextLink from "next/link";
import React from "react";

import { FULL_NAME } from "@/constants/metadata";

interface BlogArticle {
    title: string;
    description: string;
    url: string;
    publishedDate: Date;
    image: string;
}

async function getBlogArticles(): Promise<Array<BlogArticle>> {
    return Promise.all(
        (await glob("app/(content)/blog-articles/(articles)/**/page.mdx")).map(
            async (filePath) => {
                const relativePath = filePath
                    .replace(
                        /^(app\/\(content\)\/blog-articles\/\(articles\)\/)/,
                        "",
                    )
                    .replace(/\/page\.mdx$/, "");
                const { metadata, blogMetadata } = await import(
                    `./(articles)/${relativePath}/page.mdx`
                );

                return {
                    title: metadata.title as string,
                    description: metadata.description as string,
                    url: `/blog-articles/${relativePath}` as string,
                    publishedDate: blogMetadata.publishedDate as Date,
                    image: blogMetadata.image as string,
                };
            },
        ),
    ).then((articles) =>
        articles.sort(
            (a, b) => a.publishedDate.getTime() - b.publishedDate.getTime(),
        ),
    );
}

export const metadata: Metadata = {
    title: `${FULL_NAME} | Blog Articles`,
    description: `Various blog articles written by ${FULL_NAME}`,
};

const BlogArticles = async (): Promise<React.ReactElement> => {
    const blogArticles = await getBlogArticles();

    return (
        <React.Fragment>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
            >
                {blogArticles.map((blogArticle) => (
                    <Grid
                        key={blogArticle.url}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <Card raised sx={{ height: "100%" }}>
                            <CardActionArea
                                LinkComponent={NextLink}
                                href={blogArticle.url}
                            >
                                <CardMedia
                                    component="img"
                                    alt={"Article"}
                                    height="140"
                                    image={blogArticle.image}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        {blogArticle.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {blogArticle.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
};

export default BlogArticles;
