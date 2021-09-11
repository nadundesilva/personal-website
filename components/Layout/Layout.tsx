import { AppBar, Box, Container, Fab, IconButton, Toolbar, Tooltip, Typography, useScrollTrigger, Zoom } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import { useWebsiteTheme } from "./theme";

const useStyles = makeStyles(() =>
    createStyles({
        grow: {
            flexGrow: 1
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
                    <IconButton sx={{ marginLeft: 5 }} size="small" onClick={onThemeToggleChange}>
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
            <Container maxWidth={false} disableGutters={true} sx={{ overflowX: "hidden" }}>
                {children}
            </Container>
            <Container maxWidth={false}
                sx={{
                    textAlign: "center",
                    paddingTop: 10,
                    paddingBottom: 5,
                    color: "#888888"
                }}
            >
                &copy; 2021 Nadun De Silva
            </Container>
            <Zoom in={trigger}>
                <Box onClick={handleClick} role="presentation"
                    sx={{
                        position: "fixed",
                        bottom: 2,
                        right: 2
                    }}
                >
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <FontAwesomeIcon icon={faChevronUp}/>
                    </Fab>
                </Box>
            </Zoom>
        </React.Fragment>
    );
};

export default Layout;
