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

import Layout, { LayoutContent } from "@/components/layout";

interface BlogPostTitleProps {
    children: React.ReactNode;
}

const BlogPostTitle = ({
    children,
}: BlogPostTitleProps): React.ReactElement => (
    <Typography variant="h4" component="h1" sx={{ pt: 2 }}>
        {children}
    </Typography>
);

interface BlogPostMetadata {
    title: string;
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
                {children}
            </LayoutContent>
        </Layout>
    </Container>
);

export default BlogPostLayout;
