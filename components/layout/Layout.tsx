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
    useMediaQuery,
    useScrollTrigger,
    Zoom,
} from "@mui/material";
import { SupportedColorScheme, useColorScheme } from "@mui/material/styles";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { FULL_NAME } from "@/constants/metadata";
import { Routes } from "@/constants/routes";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): React.ReactElement => {
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

    const preferedColorScheme: SupportedColorScheme = useMediaQuery(
        "(prefers-color-scheme: dark)",
    )
        ? "dark"
        : "light";
    const currentColorScheme =
        colorScheme == undefined ? preferedColorScheme : colorScheme;
    const nextColorScheme = currentColorScheme === "light" ? "dark" : "light";

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
            <Drawer anchor={"top"} open={isDrawerOpen} onClose={toggleDrawer}>
                <Box
                    sx={{ width: "auto" }}
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <List>
                        {Object.values(Routes).map((route) => (
                            <Link key={route.path} href={route.path} passHref>
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
        <AppBar data-testid={"app-bar"}>
            <Toolbar>
                {drawer}
                <Typography variant="h5" component="h1">
                    {FULL_NAME}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    {Object.values(Routes).map((route) => (
                        <Link
                            key={route.path}
                            href={route.path}
                            passHref={true}
                        >
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
                        sx={{ marginLeft: 5 }}
                        size="small"
                        onClick={() => setColorScheme(nextColorScheme)}
                    >
                        {nextColorScheme === "dark" ? (
                            <DarkMode />
                        ) : (
                            <LightMode />
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

    return (
        <React.Fragment>
            {appBar}
            <Toolbar ref={scrollToTopRef} />
            <Container
                maxWidth={false}
                disableGutters
                sx={{ overflowX: "hidden" }}
            >
                {children}
            </Container>
            <Container
                maxWidth={false}
                sx={{
                    textAlign: "center",
                    paddingTop: 10,
                    paddingBottom: 5,
                    color: "#666666",
                }}
            >
                &copy; 2021 {FULL_NAME}
            </Container>
            <Zoom in={trigger}>
                <Box
                    onClick={handleClick}
                    role="presentation"
                    sx={{
                        position: "fixed",
                        bottom: 10,
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
    );
};

export default Layout;
