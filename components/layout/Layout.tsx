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
"use client";

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
    useMediaQuery,
    useScrollTrigger,
    Zoom,
} from "@mui/material";
import { alpha, type Theme, useColorScheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";

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
    const scrollTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const scrollToTopRef = useRef<HTMLDivElement>(null);

    // On route change, Next.js triggers a smooth scroll to y=0 via the global
    // `scroll-behavior: smooth` set on <html>. React's re-render of the new
    // page interrupts that animation mid-flight, leaving the scroll position
    // at a non-zero value. Scrolling instantly here — before any animation
    // can start — ensures the page always resets to the true top on navigation.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

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

    const isLargeScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up("lg"),
    );

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
                    display: isLargeScreen ? "none" : "block",
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
                            zIndex: (theme) => theme.zIndex.drawer,
                        },
                    },
                    paper: {
                        sx: {
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.95),
                            backdropFilter: "blur(12px)",
                            color: (theme) =>
                                theme.palette.primary.contrastText,
                            boxShadow: 2,
                            marginTop: { xs: "56px", sm: "64px" },
                            zIndex: (theme) => theme.zIndex.drawer,
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
                                        "color": (theme) =>
                                            theme.palette.primary.contrastText,
                                        "borderRadius": 2,
                                        "position": "relative",
                                        "display": "flex",
                                        "justifyContent": "center",
                                        "alignItems": "center",
                                        "transition": (theme) =>
                                            theme.transitions.create(
                                                ["background-color", "opacity"],
                                                {
                                                    duration:
                                                        theme.transitions
                                                            .duration.shortest,
                                                },
                                            ),
                                        "&:hover": {
                                            "backgroundColor": (theme) =>
                                                alpha(
                                                    theme.palette.primary
                                                        .contrastText,
                                                    0.08,
                                                ),
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
                                            backgroundColor: (theme) =>
                                                theme.palette.primary
                                                    .contrastText,
                                            opacity: isActive ? 1 : 0.8,
                                            borderRadius: 1,
                                            transition: (theme) =>
                                                theme.transitions.create(
                                                    "width",
                                                    {
                                                        duration:
                                                            theme.transitions
                                                                .duration
                                                                .shorter,
                                                    },
                                                ),
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={route.name}
                                        slotProps={{
                                            primary: {
                                                variant: "body1",
                                                sx: {
                                                    color: (theme) =>
                                                        theme.palette.primary
                                                            .contrastText,
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

    const isAtTopOfHomePage = pathname === "/" && !scrollTrigger;

    const appBar = (
        <AppBar
            component="header"
            sx={{
                px: { xs: 2, sm: 3, md: 4 },
                zIndex: (theme) => theme.zIndex.drawer + 1,
                // On the home page before any scroll: transparent AppBar with dark gradient scrim so nav
                // text remains readable over the hero image. Once scrolled: frosted glass with blur.
                // Do not do this on small screens where we show the drawer, as it does not match the drawer.
                ...(isAtTopOfHomePage && isLargeScreen
                    ? {
                          backgroundColor: "transparent",
                          backgroundImage: (theme: Theme) =>
                              `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0.85)} 0%, transparent 100%)`,
                          boxShadow: "none",
                          backdropFilter: "none",
                      }
                    : {
                          backgroundColor: (theme: Theme) =>
                              alpha(theme.palette.primary.main, 0.85),
                          backdropFilter: "blur(12px)",
                      }),
            }}
            data-testid="app-bar"
            elevation={scrollTrigger ? 1 : 0}
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
                    <Link
                        href={"/"}
                        sx={{
                            "textDecoration": "none",
                            "&:hover": { textDecoration: "none" },
                        }}
                    >
                        <Typography
                            component="div"
                            variant="h6"
                            sx={{
                                "fontSize": { xs: 16, sm: 20 },
                                "color": (theme) =>
                                    theme.palette.primary.contrastText,
                                "transition": (theme) =>
                                    theme.transitions.create("opacity", {
                                        duration:
                                            theme.transitions.duration.shortest,
                                    }),
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
                    display={isLargeScreen ? "flex" : "none"}
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
                                        "color": (theme) =>
                                            theme.palette.primary.contrastText,
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
                                            backgroundColor: (theme) =>
                                                theme.palette.primary
                                                    .contrastText,
                                            opacity: isActive ? 1 : 0.8,
                                            transition: (theme) =>
                                                theme.transitions.create(
                                                    "width",
                                                    {
                                                        duration:
                                                            theme.transitions
                                                                .duration
                                                                .shorter,
                                                    },
                                                ),
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
                            color: (theme) =>
                                theme.palette.primary.contrastText,
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
                    "zIndex": (theme) => theme.zIndex.modal,
                    "transform": "translateY(-150%)",
                    "transition": (theme) =>
                        theme.transitions.create("transform", {
                            duration: theme.transitions.duration.short,
                        }),
                    "&:focus-visible": {
                        transform: "translateY(0)",
                    },
                }}
            >
                Skip to Content
            </Button>
            {appBar}
            <Box ref={scrollToTopRef} sx={{ height: 0 }} />
            {pathname !== "/" && <Toolbar />}
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
                    // Subtle dot grid background — visible on all pages.
                    // On the home page the WelcomeBanner's full-height backgrounds cover it;
                    // the AppBar covers it at the top via its solid fixed background.
                    backgroundImage: (theme: Theme) =>
                        theme.palette.mode === "light"
                            ? `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.19)} 1px, transparent 1px)`
                            : `radial-gradient(circle, ${alpha(theme.palette.common.white, 0.12)} 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
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
            <Zoom in={scrollTrigger}>
                <Box
                    role="presentation"
                    sx={{
                        position: "fixed",
                        bottom: (theme) => theme.spacing(3),
                        right: (theme) => theme.spacing(3),
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
