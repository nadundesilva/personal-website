import React from "react";
import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import RouterBreadcrumbs from "./RouterBreadcrumbs";

const useStyles = makeStyles((theme: Theme) => {
    const horizontalMargin = (margin: number): { marginLeft: number, marginRight: number } => ({
        marginLeft: theme.spacing(margin),
        marginRight: theme.spacing(margin)
    });
    return createStyles({
        content: {
            marginBottom: theme.spacing(5),
            [theme.breakpoints.down("md")]: horizontalMargin(0),
            [theme.breakpoints.up("lg")]: horizontalMargin(30),
            [theme.breakpoints.up("xl")]: horizontalMargin(60)
        }
    });
});

interface LayoutContentProps {
    children: React.ReactNode,
};

const LayoutContent = ({ children }: LayoutContentProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <RouterBreadcrumbs/>
            {children}
        </div>
    );
};

export default LayoutContent;
