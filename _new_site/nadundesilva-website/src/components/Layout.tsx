import { AppBar, createStyles, CssBaseline, Fab, makeStyles, Theme, Toolbar, Typography, useScrollTrigger, Zoom } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        }
    })
);

interface LayoutProps {
    children: React.ReactElement | React.ReactElement[],
    navItems: React.ReactElement | React.ReactElement[],
    window?: () => Window,
};

const Layout = ({ children, navItems, window }: LayoutProps): React.ReactElement => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window !== undefined ? window() : undefined
    });

    const classes = useStyles();
    const scrollToTopRef = useRef<HTMLDivElement>(null);

    const appBar = React.cloneElement((
        <AppBar>
            <Toolbar ref={scrollToTopRef}>
                <Typography variant="h5">Nadun De Silva</Typography>
                {navItems}
            </Toolbar>
        </AppBar>
    ), {
        elevation: trigger ? 4 : 0
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        scrollToTopRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {appBar}
            <Toolbar />
            {children}
            <Zoom in={trigger}>
                <div onClick={handleClick} role="presentation" className={classes.fab}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <FontAwesomeIcon icon={faChevronUp}/>
                    </Fab>
                </div>
            </Zoom>
        </React.Fragment>
    );
};

export default Layout;
