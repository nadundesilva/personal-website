import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Breadcrumbs, createStyles, Link, makeStyles, Theme, Typography } from "@material-ui/core";
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
    const location = useLocation();
    const classes = useStyles();
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (pathnames.length > 0
        ? (
            <Breadcrumbs aria-label="breadcrumb" className={classes.root}
                separator={<FontAwesomeIcon icon={faChevronRight} transform={"shrink-4"}/>}>
                <Link color="inherit" href="/" to="/" component={RouterLink}>
                    Home
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
                                    <Link color="inherit" href={to} to={to} component={RouterLink} key={to}>
                                        {BREADCRUMBS_MAP[to]}
                                    </Link>
                                )
                        );
                    })
                }
            </Breadcrumbs>
        )
        : null
    );
};

export default RouterBreadcrumbs;
