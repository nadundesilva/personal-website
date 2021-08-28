import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Breadcrumbs, createStyles, Link as BreadcrumbLink, makeStyles, Theme, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(3)
        }
    })
);

const BREADCRUMBS_MAP: {[key: string]: string} = {
    "/certifications": "Certification"
};

const RouterBreadcrumbs = (): React.ReactElement | null => {
    const router = useRouter();
    const classes = useStyles();
    const pathnames = router.pathname.split("/").filter((x) => x);
    return (
        <Breadcrumbs aria-label="breadcrumb" className={classes.root}
            separator={<FontAwesomeIcon icon={faChevronRight} transform={"shrink-4"}/>}>
            <BreadcrumbLink color="inherit" href="/" component={Link}>
                Home
            </BreadcrumbLink>
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
                                <BreadcrumbLink color="inherit" href={to} component={Link} key={to}>
                                    {BREADCRUMBS_MAP[to]}
                                </BreadcrumbLink>
                            )
                    );
                })
            }
        </Breadcrumbs>
    );
};

export default RouterBreadcrumbs;
