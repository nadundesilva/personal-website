import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import RouterBreadcrumbs from "./RouterBreadcrumbs";

const useStyles = makeStyles((theme: Theme) => {
    const sidesPadding = 30;
    const verticalPadding = 5;
    return createStyles({
        sectionsContainer: {
            marginBottom: theme.spacing(verticalPadding),
            marginLeft: theme.spacing(sidesPadding),
            marginRight: theme.spacing(sidesPadding)
        }
    });
});

interface LayoutContentProps {
    children: React.ReactNode,
};

const LayoutContent = ({ children }: LayoutContentProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.sectionsContainer}>
            <RouterBreadcrumbs/>
            {children}
        </div>
    );
};

export default LayoutContent;
