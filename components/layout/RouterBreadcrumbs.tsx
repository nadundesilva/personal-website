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
import { KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import type { Route as NextRoute } from "next";
import Script from "next/script";
import { usePathname } from "next/navigation";
import type React from "react";
import { BreadcrumbList, WithContext } from "schema-dts";

import { Link } from "@/components/content";
import { ContentContainer } from "@/components/layout";
import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";
import { type Route } from "@/constants/routes";

interface RouterBreadcrumbsProps {
    topLevelRoutes: Record<string, Route>;
}

const RouterBreadcrumbs = ({
    topLevelRoutes,
}: RouterBreadcrumbsProps): React.ReactElement | null => {
    const pathname = usePathname();
    const pathnames =
        pathname === null ? [] : pathname.split("/").filter((x) => x);

    const breadcrumbs: { name: string; path: string }[] = [
        {
            name: "Home",
            path: "/",
        },
    ];
    if (pathnames.length > 0) {
        const visitRoutes = (
            currentRoutes: Record<string, Route> | undefined,
            currentPathnames: string[],
            currentBasePath: string,
        ): void => {
            if (currentRoutes && currentPathnames.length > 0) {
                const currentSubPath =
                    currentBasePath + "/" + currentPathnames[0];
                if (currentSubPath in currentRoutes) {
                    const route = currentRoutes[currentSubPath];
                    breadcrumbs.push({
                        name: route.name,
                        path: currentSubPath,
                    });

                    if (currentPathnames.length > 1) {
                        visitRoutes(
                            route.subRoutes,
                            currentPathnames.slice(1),
                            currentSubPath,
                        );
                    }
                }
            }
        };
        visitRoutes(topLevelRoutes, pathnames, "");
    }

    const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${WEBSITE_PUBLIC_URL}${item.path}`,
        })),
    };

    return (
        <>
            <Script
                id="json-ld-breadcrumb"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />
            {pathname !== "/" && (
                <ContentContainer
                    sx={{
                        pt: 2,
                    }}
                >
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        sx={{ margin: 3 }}
                        separator={<KeyboardArrowRight />}
                    >
                        {breadcrumbs.map((breadcrumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return isLast ? (
                                <Typography
                                    color="textPrimary"
                                    key={breadcrumb.name}
                                    data-testid="breadcrumb-item"
                                >
                                    {breadcrumb.name}
                                </Typography>
                            ) : (
                                <Link
                                    key={breadcrumb.name}
                                    href={breadcrumb.path as NextRoute<string>}
                                    data-testid="breadcrumb-item"
                                >
                                    {breadcrumb.name}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                </ContentContainer>
            )}
        </>
    );
};

export default RouterBreadcrumbs;
