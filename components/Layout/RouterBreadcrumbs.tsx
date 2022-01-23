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
import { Breadcrumbs, Link as BreadcrumbLink, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BREADCRUMBS_MAP: {[key: string]: string} = {
    "/certifications": "Certification"
};

const RouterBreadcrumbs = (): React.ReactElement | null => {
    const router = useRouter();
    const pathnames = router.pathname.split("/").filter((x) => x);
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ margin: 3 }}
            separator={<FontAwesomeIcon icon={faChevronRight} transform={"shrink-4"}/>}>
            <Link passHref href={"/"}>
                <BreadcrumbLink color="inherit">
                    Home
                </BreadcrumbLink>
            </Link>
            {
                pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    return (
                        last
                            ? (
                                <Typography color="textPrimary" key={to}>
                                    {BREADCRUMBS_MAP[to]}
                                </Typography>
                            )
                            : (
                                <Link passHref href={to} key={to}>
                                    <BreadcrumbLink color="inherit">
                                        {BREADCRUMBS_MAP[to]}
                                    </BreadcrumbLink>
                                </Link>
                            )
                    );
                })
            }
        </Breadcrumbs>
    );
};

export default RouterBreadcrumbs;
