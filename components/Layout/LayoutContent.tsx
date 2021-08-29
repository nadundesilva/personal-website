import React from "react";
import { Container, Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import RouterBreadcrumbs from "./RouterBreadcrumbs";

const useStyles = makeStyles((theme: Theme) => {
    const horizontalPadding = (padding: number): { paddingLeft: number, paddingRight: number } => ({
        paddingLeft: theme.spacing(padding),
        paddingRight: theme.spacing(padding)
    });
    return createStyles({
        content: {
            marginBottom: theme.spacing(5),
            [theme.breakpoints.down("md")]: horizontalPadding(0),
            [theme.breakpoints.up("lg")]: horizontalPadding(30),
            [theme.breakpoints.up("xl")]: horizontalPadding(60)
        }
    });
});

interface LayoutContentProps {
    children: React.ReactNode,
};

const LayoutContent = ({ children }: LayoutContentProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <Container maxWidth={false} disableGutters={true} className={classes.content}>
            <RouterBreadcrumbs/>
            {children}
        </Container>
    );
};

export default LayoutContent;
