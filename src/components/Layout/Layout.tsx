import { AppBar, createStyles, CssBaseline, Fab, IconButton, makeStyles, Theme, ThemeProvider, Toolbar, Tooltip, Typography, useScrollTrigger, Zoom } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import useTheme from "./theme";

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
        }
    })
);

interface LayoutProps {
    children: React.ReactNode,
    appBarItems?: React.ReactElement | React.ReactElement[],
    window?: () => Window,
};

const Layout = ({ children, appBarItems, window }: LayoutProps): React.ReactElement => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window !== undefined ? window() : undefined
    });

    const classes = useStyles();
    const scrollToTopRef = useRef<HTMLDivElement>(null);

    const [{ theme, colorScheme }, setColorScheme] = useTheme();
    const nextColorScheme = colorScheme === "dark" ? "light" : "dark";
    const onThemeToggleChange = (): void => setColorScheme(nextColorScheme);

    const appBar = React.cloneElement((
        <AppBar>
            <Toolbar>
                <Typography variant="h5">Nadun De Silva</Typography>
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {appBar}
            <Toolbar ref={scrollToTopRef}/>
            {children}
            <Zoom in={trigger}>
                <div onClick={handleClick} role="presentation" className={classes.fab}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <FontAwesomeIcon icon={faChevronUp}/>
                    </Fab>
                </div>
            </Zoom>
        </ThemeProvider>
    );
};

export default Layout;
