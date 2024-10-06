"use client";
/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import {
    DarkMode,
    KeyboardArrowUp,
    LightMode,
    Menu as MenuIcon,
} from "@mui/icons-material";
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    Fab,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography,
    useScrollTrigger,
    Zoom,
} from "@mui/material";
import { Theme, useColorScheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";

import { Link } from "@/components/content";
import { FULL_NAME } from "@/constants/metadata";
import { Routes } from "@/constants/routes";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): React.ReactElement | null => {
    const [windowObject, setWindowObject] = useState<Window | undefined>(
        undefined,
    );
    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowObject(window);
        }
    }, []);
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: windowObject,
    });

    const scrollToTopRef = useRef<HTMLDivElement>(null);

    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const toggleDrawer = (): void => {
        setDrawerOpen(!isDrawerOpen);
    };

    const { colorScheme, setColorScheme } = useColorScheme();
    const nextColorScheme = colorScheme === "light" ? "dark" : "light";

    const drawer = (
        <React.Fragment>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                sx={{
                    mr: 2,
                    display: {
                        xs: "block",
                        md: "none",
                    },
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer}>
                <Box
                    sx={{ width: "auto" }}
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <List>
                        {Object.values(Routes).map((route) => (
                            <Link key={route.path} href={route.path} internal>
                                <ListItemButton sx={{ pl: { xs: 2, md: 5 } }}>
                                    <ListItemText primary={route.name} />
                                </ListItemButton>
                            </Link>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </React.Fragment>
    );

    const appBar = React.cloneElement(
        <AppBar component="header" sx={{ px: 2 }} data-testid="app-bar">
            <Toolbar>
                {drawer}
                <Typography
                    component="h1"
                    sx={{ fontSize: 23, color: "#ffffff" }}
                >
                    {FULL_NAME}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    {Object.values(Routes).map((route) => (
                        <Link key={route.path} href={route.path} internal>
                            <Button
                                variant="text"
                                color="primary"
                                disableElevation
                                sx={{ color: "#ffffff", pl: 2 }}
                            >
                                {route.name}
                            </Button>
                        </Link>
                    ))}
                </Box>
                <Tooltip title={`Change to ${nextColorScheme} theme`}>
                    <IconButton
                        sx={{ ml: 5 }}
                        size="small"
                        onClick={() => setColorScheme(nextColorScheme)}
                    >
                        {nextColorScheme === "light" ? (
                            <LightMode />
                        ) : (
                            <DarkMode />
                        )}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>,
        {
            elevation: trigger ? 4 : 0,
        },
    );

    const handleClick = (): void => {
        scrollToTopRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return colorScheme ? (
        <React.Fragment>
            {appBar}
            <Toolbar ref={scrollToTopRef} />
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    overflow: "hidden",
                    background: (theme: Theme) =>
                        theme.palette.background.default,
                }}
            >
                {children}
            </Container>
            <Container
                maxWidth={false}
                component="footer"
                sx={{
                    textAlign: "center",
                    pt: 3,
                    pb: 6,
                    bottom: 0,
                    background: (theme: Theme) =>
                        theme.palette.background.default,
                }}
            >
                <Typography fontSize={15}>&copy; 2021 {FULL_NAME}</Typography>
            </Container>
            <Zoom in={trigger}>
                <Box
                    onClick={handleClick}
                    role="presentation"
                    sx={{
                        position: "fixed",
                        bottom: 40,
                        right: 10,
                    }}
                >
                    <Fab
                        color="primary"
                        size="small"
                        aria-label="scroll back to top"
                    >
                        <KeyboardArrowUp />
                    </Fab>
                </Box>
            </Zoom>
        </React.Fragment>
    ) : null;
};

export default Layout;
