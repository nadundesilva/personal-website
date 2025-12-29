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

import { Container } from "@mui/material";
import type React from "react";
import type { Route as NextRoute } from "next";

import { RouterBreadcrumbs } from "@/components/layout";
import { Route, WebsiteHome } from "@/constants/routes";
import {
    type BlogArticleGroup,
    getBlogArticleGroups,
} from "@/utils/blog-articles";

function buildBlogArticleRoutes(
    subGroups: BlogArticleGroup[],
): Record<string, Route> {
    const routes: Record<string, Route> = {};

    for (const subGroup of subGroups) {
        const subRoutes: Record<string, Route> = {};
        for (const article of subGroup.articles) {
            subRoutes[`/blog-articles/${article.websiteSubPath}`] = {
                name: article.title,
                path: `/blog-articles/${article.websiteSubPath}` as NextRoute<string>,
            };
        }

        routes[`/blog-articles/${subGroup.websiteSubPath}`] = {
            name: subGroup.title,
            path: `/blog-articles/${subGroup.websiteSubPath}` as NextRoute<string>,
            subRoutes:
                Object.keys(subRoutes).length > 0 ? subRoutes : undefined,
        };
    }

    return routes;
}

interface ContentLayoutProps {
    children: React.ReactNode;
}

const ContentLayout = async ({
    children,
}: ContentLayoutProps): Promise<React.ReactElement> => {
    // Merge blog article routes into topLevelRoutes if provided
    const { subGroups } = await getBlogArticleGroups(".");
    const routes: Record<string, Route> = {
        ...WebsiteHome.subRoutes,
        "/blog-articles": {
            ...WebsiteHome.subRoutes["/blog-articles"],
            subRoutes: buildBlogArticleRoutes(subGroups),
        },
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                mb: 5,
                px: {
                    xs: 0,
                    lg: 20,
                    xl: 40,
                },
            }}
        >
            <RouterBreadcrumbs topLevelRoutes={routes} />
            <Container maxWidth={false}>{children}</Container>
        </Container>
    );
};

export default ContentLayout;
