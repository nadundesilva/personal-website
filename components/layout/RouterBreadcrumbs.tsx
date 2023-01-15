/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
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
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Routes, Route, ANY_ROUTE } from "@/constants/routes";

const RouterBreadcrumbs = (): React.ReactElement | null => {
    const router = useRouter();
    const pathnames = router.pathname.split("/").filter((x) => x);

    const breadcrumbs: Array<{ name: string; path?: string }> = [
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
                const currentSubPath = "/" + currentPathnames[0];
                if (currentSubPath in currentRoutes) {
                    const route = currentRoutes[currentSubPath];
                    if (currentPathnames.length > 1) {
                        const currentPath = currentBasePath + currentSubPath;
                        breadcrumbs.push({
                            name: route.name,
                            path: currentPath,
                        });
                        if (route.subRoutes !== undefined) {
                            visitRoutes(
                                route.subRoutes,
                                currentPathnames.slice(1),
                                currentPath,
                            );
                        }
                    } else {
                        breadcrumbs.push({
                            name: route.name,
                        });
                    }
                } else if (ANY_ROUTE in currentRoutes) {
                    const route = currentRoutes[ANY_ROUTE];
                    breadcrumbs.push({
                        name: route.name,
                    });
                }
            }
        };
        visitRoutes(Routes, pathnames, "");
    }

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ margin: 3 }}
            separator={
                <FontAwesomeIcon icon={faChevronRight} transform={"shrink-4"} />
            }
        >
            {breadcrumbs.map((breadcrumb) => {
                return breadcrumb.path === undefined ? (
                    <Typography color="textPrimary" key={breadcrumb.name}>
                        {breadcrumb.name}
                    </Typography>
                ) : (
                    <Link passHref href={breadcrumb.path} key={breadcrumb.name}>
                        {breadcrumb.name}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default RouterBreadcrumbs;
