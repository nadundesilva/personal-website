/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Article } from "@mui/icons-material";
import { Typography, Container, Box, Link, Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

import Layout, { LayoutContent } from "@/components/layout";
import type { ImageAssertFromSource } from "@/constants/images";

interface BlogPostTitleProps {
    children: React.ReactNode;
}

const BlogPostTitle = ({
    children,
}: BlogPostTitleProps): React.ReactElement => (
    <Typography
        variant="h3"
        component="h1"
        sx={{ pt: 2, fontWeight: "bold", fontSize: 35 }}
    >
        {children}
    </Typography>
);

interface ViewOnMediumButtonProps {
    postId: string;
}

const ViewOnMediumButton = ({
    postId,
}: ViewOnMediumButtonProps): React.ReactElement => (
    <Box sx={{ pt: 1 }}>
        <Link
            target={"_blank"}
            href={`https://nadundesilva.medium.com/${postId}`}
        >
            <Button
                sx={{ color: "#000000" }}
                size="small"
                variant="outlined"
                endIcon={<Article />}
            >
                View on Medium
            </Button>
        </Link>
    </Box>
);

export interface CrossBloggingData {
    mediumPostId?: string;
}

export interface BlogPostMetadata {
    title: string;
    description: string;
    publishedDate: string;
    mainImage: ImageAssertFromSource;
    crossBlogging: CrossBloggingData;
}

interface BlogPostLayoutProps {
    metadata: BlogPostMetadata;
    children: React.ReactNode;
}

const BlogPostLayout = ({
    children,
    metadata,
}: BlogPostLayoutProps): React.ReactElement => (
    <Container maxWidth={false} disableGutters>
        <Head>
            <title>Nadun De Silva | Blog - {metadata.title}</title>
        </Head>

        <Layout>
            <LayoutContent>
                <BlogPostTitle>{metadata.title}</BlogPostTitle>
                {metadata.crossBlogging.mediumPostId !== undefined ? (
                    <ViewOnMediumButton
                        postId={metadata.crossBlogging.mediumPostId}
                    />
                ) : null}
                <Container
                    sx={{ position: "relative", height: 500, my: 2 }}
                    disableGutters
                >
                    <Image
                        src={metadata.mainImage.src}
                        alt={metadata.mainImage.alt}
                        placeholder="blur"
                        blurDataURL={metadata.mainImage.blurDataURL}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </Container>
                {children}
            </LayoutContent>
        </Layout>
    </Container>
);

export default BlogPostLayout;
