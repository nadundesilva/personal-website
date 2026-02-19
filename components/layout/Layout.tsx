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
 * Website: https://nadundesilva.com
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import {
    Close,
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
    ListItemButton,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography,
    useScrollTrigger,
    Zoom,
} from "@mui/material";
import { type Theme, useColorScheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Link } from "@/components/content";
import { FULL_NAME } from "@/constants/metadata";
import { Route } from "@/constants/routes";

interface LayoutProps {
    children: React.ReactNode;
    topLevelRoutes: Record<string, Route>;
}

const Layout = ({
    children,
    topLevelRoutes,
}: LayoutProps): React.ReactElement | null => {
    const pathname = usePathname();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const scrollToTopRef = useRef<HTMLDivElement>(null);

    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const toggleDrawer = (): void => {
        setDrawerOpen(!isDrawerOpen);
    };

    const { colorScheme, setColorScheme } = useColorScheme();
    const nextColorScheme = colorScheme === "light" ? "dark" : "light";

    const isRouteActive = (routePath: string): boolean => {
        if (!pathname) return false;
        // Exact match
        if (pathname === routePath) return true;
        // Check if current path starts with route path (for sub-routes)
        // Only match if it's a sub-route (has additional path segments)
        if (pathname.startsWith(routePath + "/")) return true;
        return false;
    };

    const drawer = (
        <>
            <IconButton
                color="inherit"
                aria-label={isDrawerOpen ? "close drawer" : "open drawer"}
                aria-expanded={isDrawerOpen}
                aria-controls={isDrawerOpen ? "drawer-navigation" : undefined}
                onClick={toggleDrawer}
                edge="start"
                sx={{
                    mr: 2,
                    display: {
                        xs: "block",
                        lg: "none",
                    },
                }}
            >
                {isDrawerOpen ? <Close /> : <MenuIcon />}
            </IconButton>
            <Drawer
                anchor="top"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                slotProps={{
                    backdrop: {
                        sx: {
                            zIndex: 1200,
                        },
                    },
                    paper: {
                        sx: {
                            backgroundColor: (theme) =>
                                theme.palette.primary.main,
                            color: "#ffffff",
                            boxShadow: 2,
                            marginTop: { xs: "56px", sm: "64px" },
                            zIndex: 1200,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        width: "auto",
                        px: { xs: 2, sm: 3, md: 4 },
                        py: 2.5,
                    }}
                >
                    <Box
                        id="drawer-navigation"
                        component="nav"
                        aria-label="Drawer Navigation"
                        sx={{
                            py: 0,
                            gap: 0.25,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {Object.values(topLevelRoutes).map((route) => {
                            const isActive = isRouteActive(route.path);
                            return (
                                <ListItemButton
                                    key={route.path}
                                    component={Link}
                                    href={route.path}
                                    onClick={toggleDrawer}
                                    aria-current={isActive ? "page" : undefined}
                                    sx={{
                                        "px": 2.5,
                                        "py": 1.25,
                                        "minHeight": 56,
                                        "color": "#ffffff",
                                        "borderRadius": 2,
                                        "position": "relative",
                                        "display": "flex",
                                        "justifyContent": "center",
                                        "alignItems": "center",
                                        "transition":
                                            "background-color 0.2s ease-in-out, opacity 0.2s ease-in-out",
                                        "&:hover": {
                                            "backgroundColor":
                                                "rgba(255, 255, 255, 0.08)",
                                            "opacity": 0.9,
                                            "&::after": {
                                                width: "50%",
                                            },
                                        },
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 12,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: isActive
                                                ? { xs: "50%", sm: "25%" }
                                                : 0,
                                            height: 1.5,
                                            backgroundColor: "#ffffff",
                                            opacity: isActive ? 1 : 0.8,
                                            borderRadius: 1,
                                            transition:
                                                "width 0.25s ease-in-out",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={route.name}
                                        slotProps={{
                                            primary: {
                                                variant: "body1",
                                                sx: {
                                                    color: "#ffffff",
                                                    textAlign: "center",
                                                    fontWeight: isActive
                                                        ? 500
                                                        : 400,
                                                },
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </Box>
                </Box>
            </Drawer>
        </>
    );

    const appBar = (
        <AppBar
            component="header"
            sx={{
                px: { xs: 2, sm: 3, md: 4 },
                zIndex: 1201,
            }}
            data-testid="app-bar"
            elevation={trigger ? 1 : 0}
        >
            <Toolbar
                sx={{
                    minHeight: { xs: 56, sm: 64 },
                    px: { xs: 1, sm: 2 },
                }}
            >
                {drawer}
                <Box
                    onClick={() => isDrawerOpen && toggleDrawer()}
                    display="inline-block"
                >
                    <Link href={"/"} sx={{ textDecoration: "none" }}>
                        <Typography
                            component="div"
                            variant="h6"
                            sx={{
                                "fontSize": { xs: 16, sm: 20 },
                                "color": "#ffffff",
                                "transition": "opacity 0.2s ease-in-out",
                                "&:hover": {
                                    opacity: 0.85,
                                },
                            }}
                        >
                            {FULL_NAME}
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    component="nav"
                    aria-label="Primary Navigation"
                    display={{ xs: "none", lg: "flex" }}
                    gap={1}
                    alignItems="center"
                >
                    {Object.values(topLevelRoutes).map((route) => {
                        const isActive = isRouteActive(route.path);
                        return (
                            <Box
                                key={route.path}
                                onClick={() => isDrawerOpen && toggleDrawer()}
                                display="inline-block"
                            >
                                <Button
                                    component={Link}
                                    href={route.path}
                                    variant="text"
                                    color="primary"
                                    disableElevation
                                    aria-current={isActive ? "page" : undefined}
                                    sx={{
                                        "color": "#ffffff",
                                        "px": 2.5,
                                        "py": 1.25,
                                        "minWidth": "auto",
                                        "position": "relative",
                                        "fontWeight": isActive ? 500 : 400,
                                        "&:hover": {
                                            "backgroundColor": "transparent",
                                            "opacity": 0.85,
                                            "&::after": {
                                                width: "70%",
                                            },
                                        },
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 10,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: isActive ? "70%" : 0,
                                            height: 1.5,
                                            backgroundColor: "#ffffff",
                                            opacity: isActive ? 1 : 0.8,
                                            transition:
                                                "width 0.25s ease-in-out",
                                        },
                                    }}
                                >
                                    {route.name}
                                </Button>
                            </Box>
                        );
                    })}
                </Box>
                <Tooltip
                    title={`Change to ${nextColorScheme} theme`}
                    arrow
                    placement="bottom"
                >
                    <IconButton
                        size="medium"
                        aria-label={`Switch to ${nextColorScheme} theme`}
                        onClick={() => setColorScheme(nextColorScheme)}
                        sx={{
                            ml: 3,
                            color: "#ffffff",
                        }}
                    >
                        {nextColorScheme === "light" ? (
                            <LightMode />
                        ) : (
                            <DarkMode />
                        )}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );

    const scrollToTop = (): void => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        scrollToTopRef.current?.scrollIntoView({
            behavior: prefersReducedMotion ? "instant" : "smooth",
            block: "start",
        });
        document.getElementById("main-content")?.focus();
    };

    return colorScheme ? (
        <>
            <Button
                href="#main-content"
                variant="contained"
                sx={{
                    "position": "fixed",
                    "top": 16,
                    "left": 16,
                    "zIndex": 1300,
                    "transform": "translateY(-150%)",
                    "transition": "transform 0.3s ease-in-out",
                    "&:focus-visible": {
                        transform: "translateY(0)",
                    },
                }}
            >
                Skip to Content
            </Button>
            {appBar}
            <Toolbar ref={scrollToTopRef} />
            <Container
                id="main-content"
                component="main"
                tabIndex={-1}
                disableGutters
                maxWidth={false}
                sx={{
                    overflowX: "hidden",
                    maxWidth: "100%",
                    background: (theme: Theme) =>
                        theme.palette.background.default,
                    scrollMarginTop: "100px",
                    outline: "none",
                }}
            >
                {children}
            </Container>
            <Container
                maxWidth={false}
                component="footer"
                sx={{
                    "textAlign": "center",
                    "pt": 4,
                    "pb": 10,
                    "bottom": 0,
                    "background": (theme: Theme) =>
                        theme.palette.background.default,
                    "position": "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "80%",
                        height: "1px",
                        background: (theme: Theme) =>
                            `linear-gradient(90deg, transparent, ${theme.palette.text.secondary}, transparent)`,
                        opacity: 0.5,
                    },
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    &copy; 2021-{new Date().getFullYear()} {FULL_NAME}
                </Typography>
            </Container>
            <Zoom in={trigger}>
                <Box
                    role="presentation"
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                    }}
                >
                    <Fab
                        color="primary"
                        size="small"
                        aria-label="scroll back to top"
                        onClick={scrollToTop}
                    >
                        <KeyboardArrowUp />
                    </Fab>
                </Box>
            </Zoom>
        </>
    ) : null;
};

export default Layout;
