import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Breadcrumbs, Link as BreadcrumbLink, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
