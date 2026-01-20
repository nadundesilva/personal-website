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
import type { Metadata } from "next";
import type React from "react";

import { FULL_NAME, WEBSITE_PUBLIC_URL } from "@/constants/metadata";

export const metadata: Metadata = {
    authors: [{ name: FULL_NAME, url: WEBSITE_PUBLIC_URL }],
    category: "Computer Science and Software Engineering",
    robots: {
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
    },
    openGraph: {
        type: "article",
        siteName: `${FULL_NAME} Blog`,
        authors: [FULL_NAME],
        section: "Computer Science and Software Engineering",
    },
    twitter: {
        card: "summary_large_image",
        site: "@nadunrds",
        creator: "@nadunrds",
    },
    alternates: {
        types: {
            "application/rss+xml": `${WEBSITE_PUBLIC_URL}/blog-articles/feed.xml`,
        },
    },
};

interface BlogArticlesLayoutProps {
    children: React.ReactNode;
}

const BlogArticlesLayout = ({
    children,
}: BlogArticlesLayoutProps): React.ReactElement => <>{children}</>;

export default BlogArticlesLayout;
