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
"use client";

import type { Route as NextRoute } from "next";
import { usePathname } from "next/navigation";
import React from "react";
import type {
    BreadcrumbList as JsonLdBreadcrumbList,
    WithContext,
} from "schema-dts";

import { Link } from "@/components/content";
import { ContentContainer } from "@/components/layout";
import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";
import { type Route } from "@/constants/routes";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shadcn/ui";

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

    const breadcrumbJsonLd: WithContext<JsonLdBreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${WEBSITE_PUBLIC_URL}${item.path}`,
        })),
    };

    if (breadcrumbs.length <= 1) return null;

    return (
        <>
            <script
                key={pathname}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />
            <ContentContainer className="my-2 pt-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <React.Fragment key={breadcrumb.name}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage
                                                data-testid="breadcrumb-item"
                                                className="font-semibold"
                                            >
                                                {breadcrumb.name}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                render={
                                                    <Link
                                                        href={
                                                            breadcrumb.path as NextRoute<string>
                                                        }
                                                        className="font-normal text-muted-foreground hover:no-underline"
                                                    />
                                                }
                                                data-testid="breadcrumb-item"
                                            >
                                                {breadcrumb.name}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </ContentContainer>
        </>
    );
};

export default RouterBreadcrumbs;
