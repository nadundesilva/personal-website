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

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import {
    alpha,
    type Theme,
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type React from "react";

import {
    linkColors,
    themePrimary,
    themeSecondary,
} from "@/components/theme/colors";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";

declare module "@mui/material/styles" {
    interface Theme {
        motion: {
            hoverLift: string;
            hoverLiftSubtle: string;
        };
    }
    interface ThemeOptions {
        motion?: {
            hoverLift?: string;
            hoverLiftSubtle?: string;
        };
    }
    interface TypographyVariants {
        codeFontFamily: string;
    }
    interface TypographyVariantsOptions {
        codeFontFamily?: string;
    }
}

declare module "@mui/material/Chip" {
    interface ChipPropsSizeOverrides {
        keyword: true;
    }
}

const CSS_VAR_PREFIX = "mui";

const createWebsiteTheme = (
    fontFamily: string,
    codeFontFamily: string,
): Theme =>
    createTheme({
        colorSchemes: {
            dark: {
                palette: {
                    primary: themePrimary,
                    secondary: themeSecondary,
                    background: {
                        default: "#1a1f2e",
                        paper: "#232938",
                    },
                    text: { primary: "#f5f5f5" },
                },
            },
            light: {
                palette: {
                    primary: themePrimary,
                    secondary: themeSecondary,
                    background: {
                        default: "#ffffff",
                        paper: "#fafafa",
                    },
                    text: { primary: "#1a1a1a" },
                },
            },
        },
        typography: {
            fontFamily,
            codeFontFamily,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,

            h1: {
                fontWeight: 500,
                fontSize: "2.25rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
            },
            h2: {
                fontWeight: 500,
                fontSize: "1.75rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
            },
            h3: {
                fontWeight: 500,
                fontSize: "1.375rem",
                letterSpacing: "0em",
                lineHeight: 1.4,
            },
            h4: {
                fontWeight: 500,
                fontSize: "1.125rem",
                letterSpacing: "0em",
                lineHeight: 1.4,
            },
            h5: {
                fontWeight: 500,
                fontSize: "1rem",
                letterSpacing: "0em",
                lineHeight: 1.45,
            },
            h6: {
                fontWeight: 500,
                fontSize: "0.9375rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.4,
            },
            body1: {
                fontWeight: 400,
                fontSize: "0.9375rem",
                letterSpacing: "0em",
                lineHeight: 1.75,
            },
            body2: {
                fontWeight: 300,
                fontSize: "0.875rem",
                letterSpacing: "0em",
                lineHeight: 1.7,
            },
            overline: {
                fontWeight: 400,
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                lineHeight: 1.6,
                textTransform: "uppercase",
            },
        },
        spacing: 8,
        shape: {
            borderRadius: 8,
        },
        motion: {
            hoverLift: "2px",
            hoverLiftSubtle: "1px",
        },
        transitions: {
            duration: {
                shortest: 200,
                shorter: 250,
                short: 300,
                standard: 350,
                complex: 500,
            },
            easing: {
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
                easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
                easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme: Theme) => ({
                    "::selection": {
                        backgroundColor: theme.palette.primary.main,
                        color: "#ffffff",
                    },
                    [`[data-${CSS_VAR_PREFIX}-color-scheme="dark"] *::selection, [data-${CSS_VAR_PREFIX}-color-scheme="dark"] ::selection`]:
                        {
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.main,
                        },
                    "html": {
                        scrollBehavior: "auto",
                        overflowX: "clip",
                    },
                    "body": {
                        transition:
                            "background-color 0.3s ease, color 0.3s ease",
                    },
                    [MOTION_OK_QUERY]: {
                        html: {
                            scrollBehavior: "smooth",
                        },
                    },
                    /* Monospace font stack for inline code and code blocks */
                    "code": {
                        fontFamily:
                            'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
                    },
                    /* Custom scrollbar — Chromium/WebKit */
                    "::-webkit-scrollbar": {
                        width: "6px",
                        height: "6px",
                    },
                    "::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    "::-webkit-scrollbar-thumb": {
                        backgroundColor: `rgb(var(--${CSS_VAR_PREFIX}-palette-primary-mainChannel) / 30%)`,
                        borderRadius: "3px",
                        transition: "background-color 0.2s ease",
                    },
                    "::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: `rgb(var(--${CSS_VAR_PREFIX}-palette-primary-mainChannel) / 55%)`,
                    },
                    [`[data-${CSS_VAR_PREFIX}-color-scheme="dark"] ::-webkit-scrollbar-thumb`]:
                        {
                            backgroundColor: `rgb(var(--${CSS_VAR_PREFIX}-palette-primary-lightChannel) / 20%)`,
                        },
                    [`[data-${CSS_VAR_PREFIX}-color-scheme="dark"] ::-webkit-scrollbar-thumb:hover`]:
                        {
                            backgroundColor: `rgb(var(--${CSS_VAR_PREFIX}-palette-primary-lightChannel) / 40%)`,
                        },
                    /* Custom scrollbar — Firefox */
                    "*": {
                        scrollbarWidth: "thin",
                        scrollbarColor: `rgb(var(--${CSS_VAR_PREFIX}-palette-primary-mainChannel) / 30%) transparent`,
                    },
                    [`[data-${CSS_VAR_PREFIX}-color-scheme="dark"] *`]: {
                        scrollbarColor: `rgb(var(--${CSS_VAR_PREFIX}-palette-primary-lightChannel) / 20%) transparent`,
                    },
                }),
            },
            MuiDivider: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        border: "none",
                        height: 2,
                        background: `linear-gradient(90deg, transparent, ${
                            theme.palette.mode === "light"
                                ? theme.palette.primary.main
                                : theme.palette.primary.light
                        }, transparent)`,
                        opacity: 0.2,
                        marginTop: 0,
                        marginBottom: 0,
                    }),
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "color":
                            theme.palette.mode === "dark"
                                ? linkColors.dark
                                : linkColors.light,
                        "textDecoration": "none",
                        "fontWeight": 600,
                        "transition": theme.transitions.create("opacity", {
                            duration: theme.transitions.duration.shorter,
                        }),
                        "&:hover": {
                            opacity: 0.85,
                            textDecoration: "underline",
                            textDecorationThickness: "2px",
                            textUnderlineOffset: "4px",
                        },
                        "&:focus-visible": {
                            outline: `2px solid ${
                                theme.palette.mode === "dark"
                                    ? theme.palette.primary.light
                                    : theme.palette.primary.main
                            }`,
                            outlineOffset: 2,
                            borderRadius: 1,
                        },
                    }),
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "textTransform": "none",
                        "fontWeight": 400,
                        "borderRadius": theme.shape.borderRadius,
                        "boxShadow": "none",
                        "transition": theme.transitions.create(
                            [
                                "opacity",
                                "box-shadow",
                                "background-color",
                                "border-color",
                                "color",
                            ],
                            {
                                duration: theme.transitions.duration.shorter,
                            },
                        ),
                        [MOTION_OK_QUERY]: {
                            transition: theme.transitions.create(
                                [
                                    "opacity",
                                    "box-shadow",
                                    "background-color",
                                    "border-color",
                                    "color",
                                    "transform",
                                ],
                                {
                                    duration:
                                        theme.transitions.duration.shorter,
                                },
                            ),
                        },
                        "&:hover": {
                            boxShadow: "none",
                            opacity: 0.9,
                        },
                    }),
                    text: ({ theme }: { theme: Theme }) => ({
                        fontSize: "0.9375rem",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        padding: theme.spacing(0.75, 1.5),
                    }),
                    outlined: ({ theme }: { theme: Theme }) => ({
                        "borderWidth": 1,
                        "borderColor":
                            theme.palette.mode === "dark"
                                ? alpha(theme.palette.common.white, 0.3)
                                : alpha(theme.palette.common.black, 0.23),
                        "color":
                            theme.palette.mode === "dark"
                                ? alpha(theme.palette.common.white, 0.87)
                                : alpha(theme.palette.common.black, 0.87),
                        "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                            color:
                                theme.palette.mode === "dark"
                                    ? alpha(theme.palette.common.white, 0.87)
                                    : alpha(theme.palette.common.black, 0.87),
                        },
                        "&:hover": {
                            borderWidth: 1,
                            borderColor:
                                theme.palette.mode === "dark"
                                    ? alpha(theme.palette.common.white, 0.5)
                                    : alpha(theme.palette.common.black, 0.4),
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? alpha(theme.palette.common.white, 0.05)
                                    : alpha(theme.palette.common.black, 0.02),
                        },
                        [MOTION_OK_QUERY]: {
                            "&:hover": {
                                transform: `translateY(-${theme.motion.hoverLiftSubtle})`,
                            },
                        },
                    }),
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "transition": theme.transitions.create("opacity", {
                            duration: theme.transitions.duration.shortest,
                        }),
                        "&:hover": {
                            opacity: 0.75,
                        },
                    }),
                },
            },
            MuiAppBar: {
                defaultProps: {
                    enableColorOnDark: true,
                },
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "boxShadow": "none",
                        "transition": theme.transitions.create(
                            ["box-shadow", "background-color"],
                            {
                                duration: theme.transitions.duration.shortest,
                            },
                        ),
                        "&.MuiAppBar-root": {
                            boxShadow: `0px 1px 2px ${alpha(theme.palette.common.black, 0.05)}`,
                        },
                    }),
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "borderRadius": theme.shape.borderRadius,
                        "transition": theme.transitions.create(
                            "background-color",
                            {
                                duration: theme.transitions.duration.shortest,
                            },
                        ),
                        "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                        },
                    }),
                },
            },
            MuiListItemText: {
                styleOverrides: {
                    primary: {
                        fontWeight: 400,
                        fontSize: "0.9375rem",
                        letterSpacing: "0.01em",
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRadius: 0,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "borderRadius":
                            (theme.shape.borderRadius as number) * 1.5,
                        "border": "1px solid",
                        "borderColor":
                            theme.palette.mode === "light"
                                ? alpha(theme.palette.common.black, 0.08)
                                : alpha(theme.palette.common.white, 0.08),
                        "borderTop": "2px solid",
                        "borderTopColor":
                            theme.palette.mode === "light"
                                ? alpha(theme.palette.primary.main, 0.33)
                                : alpha(theme.palette.primary.light, 0.27),
                        "boxShadow": "none",
                        [MOTION_OK_QUERY]: {
                            "transition": theme.transitions.create("all", {
                                duration: theme.transitions.duration.short,
                            }),
                            "&:hover": {
                                "transform": `translateY(-${theme.motion.hoverLift}) scale(1.02)`,
                                "& img": { transform: "scale(1.05)" },
                            },
                        },
                        "&:hover": {
                            boxShadow:
                                theme.palette.mode === "light"
                                    ? `0 4px 16px ${alpha(theme.palette.common.black, 0.06)}, 0 0 24px ${alpha(theme.palette.primary.main, 0.2)}`
                                    : `0 4px 16px ${alpha(theme.palette.common.black, 0.2)}, 0 0 24px ${alpha(theme.palette.primary.light, 0.16)}`,
                            borderColor:
                                theme.palette.mode === "light"
                                    ? alpha(theme.palette.primary.main, 0.25)
                                    : alpha(theme.palette.primary.light, 0.2),
                            borderTopColor:
                                theme.palette.mode === "light"
                                    ? theme.palette.primary.main
                                    : theme.palette.primary.light,
                        },
                    }),
                },
            },
            MuiCardActionArea: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "borderRadius":
                            (theme.shape.borderRadius as number) * 1.5,
                        "transition": "none",
                        "color": "inherit",
                        "textDecoration": "none",
                        "&:hover": {
                            textDecoration: "none",
                        },
                        "&:hover .MuiCardActionArea-focusHighlight": {
                            opacity: 0,
                        },
                    }),
                },
            },
            MuiCardContent: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "padding": theme.spacing(1.25),
                        "&:last-child": {
                            paddingBottom: theme.spacing(1.25),
                        },
                    }),
                },
            },
            MuiCardMedia: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        [MOTION_OK_QUERY]: {
                            "transition": theme.transitions.create("opacity", {
                                duration: theme.transitions.duration.short,
                            }),
                            "& img": {
                                transition: theme.transitions.create(
                                    "transform",
                                    {
                                        duration:
                                            theme.transitions.duration.standard,
                                    },
                                ),
                            },
                        },
                    }),
                },
            },
            MuiChip: {
                variants: [
                    {
                        props: { size: "keyword" },
                        style: {
                            "height": "1.25rem",
                            "fontSize": "0.625rem",
                            "& .MuiChip-label": {
                                paddingLeft: "0.375rem",
                                paddingRight: "0.375rem",
                            },
                        },
                    },
                ],
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        fontWeight: 400,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        borderRadius: (theme.shape.borderRadius as number) / 2,
                        fontSize: "0.75rem",
                    }),
                    sizeSmall: {
                        fontSize: "0.6875rem",
                        height: 22,
                    },
                    outlined: ({
                        theme,
                        ownerState,
                    }: {
                        theme: Theme;
                        ownerState: { clickable?: boolean };
                    }) => ({
                        "borderColor":
                            theme.palette.mode === "light"
                                ? alpha(theme.palette.primary.main, 0.35)
                                : alpha(theme.palette.primary.light, 0.5),
                        "color":
                            theme.palette.mode === "light"
                                ? theme.palette.primary.main
                                : theme.palette.primary.light,
                        [MOTION_OK_QUERY]: {
                            transition: theme.transitions.create("all", {
                                duration: theme.transitions.duration.short,
                            }),
                            ...(ownerState.clickable && {
                                "&:hover, &:focus-visible": {
                                    transform: `translateY(-${theme.motion.hoverLift})`,
                                },
                            }),
                        },
                        "&:hover": {
                            borderColor:
                                theme.palette.mode === "light"
                                    ? theme.palette.primary.main
                                    : theme.palette.primary.light,
                            backgroundColor:
                                theme.palette.mode === "light"
                                    ? alpha(theme.palette.primary.main, 0.05)
                                    : alpha(theme.palette.primary.light, 0.08),
                        },
                    }),
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "boxShadow": `0 2px 12px ${alpha(theme.palette.common.black, 0.06)}`,
                        [MOTION_OK_QUERY]: {
                            "transition": theme.transitions.create(
                                ["transform", "box-shadow"],
                                { duration: theme.transitions.duration.short },
                            ),
                            "&:hover": { transform: "scale(1.02)" },
                        },
                        "&:hover": {
                            boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.1)}`,
                        },
                    }),
                },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        height: theme.spacing(0.5),
                        borderRadius: (theme.shape.borderRadius as number) / 4,
                        backgroundColor: theme.palette.divider,
                        opacity: 0.3,
                    }),
                    bar: ({ theme }: { theme: Theme }) => ({
                        borderRadius: (theme.shape.borderRadius as number) / 4,
                        [MOTION_OK_QUERY]: {
                            transition: theme.transitions.create("transform", {
                                duration: theme.transitions.duration.complex,
                            }),
                        },
                    }),
                },
            },
            MuiImageList: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        gap: theme.spacing(1),
                    }),
                },
            },
            MuiImageListItem: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "borderRadius": theme.shape.borderRadius,
                        "overflow": "hidden",
                        [MOTION_OK_QUERY]: {
                            "transition": theme.transitions.create("all", {
                                duration: theme.transitions.duration.short,
                            }),
                            "&:hover": {
                                transform: `translateY(-${theme.motion.hoverLiftSubtle})`,
                            },
                        },
                        "&:hover": {
                            boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.06)}`,
                        },
                    }),
                },
            },
            MuiFab: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "boxShadow": `0 2px 8px ${alpha(theme.palette.common.black, 0.15)}`,
                        [MOTION_OK_QUERY]: {
                            "transition": theme.transitions.create("all", {
                                duration: theme.transitions.duration.short,
                            }),
                            "&:hover": {
                                transform: `translateY(-${theme.motion.hoverLift})`,
                            },
                        },
                        "&:hover": {
                            boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }),
                },
            },
            MuiToolbar: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        [theme.breakpoints.only("xs")]: {
                            paddingLeft: theme.spacing(1),
                            paddingRight: theme.spacing(1),
                        },
                        [theme.breakpoints.up("sm")]: {
                            paddingLeft: theme.spacing(2),
                            paddingRight: theme.spacing(2),
                        },
                    }),
                },
            },
        },
    });

interface WebsiteThemeProviderProps {
    children: React.ReactNode;
    fontFamily: string;
    codeFontFamily: string;
}

const WebsiteThemeProvider = ({
    children,
    fontFamily,
    codeFontFamily,
}: WebsiteThemeProviderProps): React.ReactElement => {
    const websiteTheme = createWebsiteTheme(fontFamily, codeFontFamily);
    return (
        <AppRouterCacheProvider>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={websiteTheme} defaultMode="system">
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        </AppRouterCacheProvider>
    );
};

export default WebsiteThemeProvider;
