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
import { Typography, Container } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

import Layout, { LayoutContent } from "@/components/layout";
import { ImageAssertFromSource } from "@/constants/images";

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

export interface BlogPostMetadata {
    title: string;
    description: string;
    publishedDate: string;
    mainImage: ImageAssertFromSource;
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
            <title>{metadata.title}</title>
        </Head>

        <Layout>
            <LayoutContent>
                <BlogPostTitle>{metadata.title}</BlogPostTitle>
                <Container
                    sx={{ position: "relative", height: 500, my: 2 }}
                    disableGutters
                >
                    <Image
                        layout="fill"
                        objectFit="cover"
                        src={metadata.mainImage.src}
                        alt={metadata.mainImage.alt}
                        placeholder="blur"
                        blurDataURL={metadata.mainImage.blurDataURL}
                    />
                </Container>
                {children}
            </LayoutContent>
        </Layout>
    </Container>
);

export default BlogPostLayout;
