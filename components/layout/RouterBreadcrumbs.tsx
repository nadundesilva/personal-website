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
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Link } from "@/components/content";
import { Routes, type Route } from "@/constants/routes";

const RouterBreadcrumbs = (): React.ReactElement | null => {
    const pathname = usePathname();
    const pathnames =
        pathname == null ? [] : pathname.split("/").filter((x) => x);

    const breadcrumbs: Array<{ name: string; path?: NextRoute<string> }> = [
        {
            name: "Home",
            path: pathnames.length > 0 ? "/" : undefined,
        },
    ];
    if (pathnames.length > 0) {
        const visitRoutes = (
            currentRoutes: Record<string, Route>,
            currentPathnames: string[],
            currentBasePath: string,
        ): void => {
            if (currentPathnames.length > 0) {
                const currentSubPath =
                    currentBasePath + "/" + currentPathnames[0];
                if (currentSubPath in currentRoutes) {
                    const route = currentRoutes[currentSubPath];
                    if (currentPathnames.length > 1) {
                        breadcrumbs.push({
                            name: route.name,
                            path: currentSubPath as NextRoute<string>,
                        });
                        if (route.subRoutes !== undefined) {
                            visitRoutes(
                                route.subRoutes,
                                currentPathnames.slice(1),
                                currentSubPath,
                            );
                        }
                    } else {
                        breadcrumbs.push({
                            name: route.name,
                        });
                    }
                }
            }
        };
        visitRoutes(Routes, pathnames, "");
    }

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ margin: 3 }}
            separator={<KeyboardArrowRight />}
        >
            {breadcrumbs.map((breadcrumb) => {
                return breadcrumb.path === undefined ? (
                    <Typography color="textPrimary" key={breadcrumb.name}>
                        {breadcrumb.name}
                    </Typography>
                ) : (
                    <Link key={breadcrumb.name} href={breadcrumb.path} internal>
                        {breadcrumb.name}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default RouterBreadcrumbs;
