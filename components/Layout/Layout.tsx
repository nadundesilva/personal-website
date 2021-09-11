import { AppBar, Box, Container, Fab, IconButton, Theme, Toolbar, Tooltip, Typography, useScrollTrigger, Zoom } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import { useWebsiteTheme } from "./theme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        themeToggle: {
            marginLeft: theme.spacing(5)
        },
        grow: {
            flexGrow: 1
        },
        fab: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
        children: {
            overflowX: "hidden"
        },
        footerContainer: {
            textAlign: "center",
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(5),
            color: "#888888"
        }
    })
);

interface LayoutProps {
    children: NonNullable<React.ReactNode>,
    appBarItems?: React.ReactElement | React.ReactElement[],
    window?: () => Window,
}

const Layout = ({ children, appBarItems, window }: LayoutProps): React.ReactElement => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window !== undefined ? window() : undefined
    });

    const classes = useStyles();
    const scrollToTopRef = useRef<HTMLDivElement>(null);

    const { colorScheme, setColorScheme } = useWebsiteTheme();
    const nextColorScheme = colorScheme === "dark" ? "light" : "dark";
    const onThemeToggleChange = (): void => setColorScheme(nextColorScheme);

    const appBar = React.cloneElement((
        <AppBar>
            <Toolbar>
                <Typography variant="h5" component="h1">Nadun De Silva</Typography>
                <div className={classes.grow} />
                {appBarItems}
                <Tooltip title={`Change to ${nextColorScheme} theme`}>
                    <IconButton className={classes.themeToggle} size="small" onClick={onThemeToggleChange}>
                        <FontAwesomeIcon icon={nextColorScheme === "dark" ? faMoon : faSun} transform={"grow-4"}/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    ), {
        elevation: trigger ? 4 : 0
    });

    const handleClick = (): void => {
        scrollToTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <React.Fragment>
            {appBar}
            <Toolbar ref={scrollToTopRef}/>
            <Container maxWidth={false} disableGutters={true} className={classes.children}>
                {children}
            </Container>
            <Container maxWidth={false} className={classes.footerContainer}>
                &copy; 2021 Nadun De Silva
            </Container>
            <Zoom in={trigger}>
                <Box onClick={handleClick} role="presentation" className={classes.fab}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <FontAwesomeIcon icon={faChevronUp}/>
                    </Fab>
                </Box>
            </Zoom>
        </React.Fragment>
    );
};

export default Layout;
