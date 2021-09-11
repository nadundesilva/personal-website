import React from "react";
import { Container, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import RouterBreadcrumbs from "./RouterBreadcrumbs";

const useStyles = makeStyles((theme: Theme) => {
    const horizontalPadding = (padding: number): { paddingLeft: string, paddingRight: string } => ({
        paddingLeft: theme.spacing(padding),
        paddingRight: theme.spacing(padding)
    });
    return createStyles({
        content: {
            marginBottom: theme.spacing(5),
            [theme.breakpoints.down("lg")]: horizontalPadding(0),
            [theme.breakpoints.up("lg")]: horizontalPadding(30),
            [theme.breakpoints.up("xl")]: horizontalPadding(60)
        }
    });
});

interface LayoutContentProps {
    children: React.ReactNode,
}

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
