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

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type React from "react";

import {
    linkColors,
    themePrimary,
    themeSecondary,
} from "@/components/theme/colors";

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
                letterSpacing: "0em",
                lineHeight: 1.5,
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
                styleOverrides: `
                    /* Enable smooth scrolling and prevent horizontal overflow */
                    html {
                        scroll-behavior: smooth;
                        overflow-x: hidden;
                    }

                    /* Respect user's reduced-motion preference for accessibility */
                    @media (prefers-reduced-motion: reduce) {
                        html {
                            scroll-behavior: auto;
                        }
                        *, *::before, *::after {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                            scroll-behavior: auto !important;
                        }
                    }

                    /* Monospace font stack for inline code and code blocks */
                    code {
                        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
                    }

                    /* Custom scrollbar — Chromium/WebKit */
                    ::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background-color: transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                        background-color: rgb(var(--${CSS_VAR_PREFIX}-palette-primary-mainChannel) / 30%);
                        border-radius: 3px;
                        transition: background-color 0.2s ease;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background-color: rgb(var(--${CSS_VAR_PREFIX}-palette-primary-mainChannel) / 55%);
                    }
                    [data-${CSS_VAR_PREFIX}-color-scheme="dark"] ::-webkit-scrollbar-thumb {
                        background-color: rgb(var(--${CSS_VAR_PREFIX}-palette-primary-lightChannel) / 20%);
                    }
                    [data-${CSS_VAR_PREFIX}-color-scheme="dark"] ::-webkit-scrollbar-thumb:hover {
                        background-color: rgb(var(--${CSS_VAR_PREFIX}-palette-primary-lightChannel) / 40%);
                    }

                    /* Custom scrollbar — Firefox */
                    * {
                        scrollbar-width: thin;
                        scrollbar-color: rgb(var(--${CSS_VAR_PREFIX}-palette-primary-mainChannel) / 30%) transparent;
                    }
                    [data-${CSS_VAR_PREFIX}-color-scheme="dark"] * {
                        scrollbar-color: rgb(var(--${CSS_VAR_PREFIX}-palette-primary-lightChannel) / 20%) transparent;
                    }
                `,
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
                            opacity: 0.8,
                            textDecoration: "underline",
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
                        "transition": theme.transitions.create("all", {
                            duration: theme.transitions.duration.shorter,
                        }),
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
                        "transition": theme.transitions.create("all", {
                            duration: theme.transitions.duration.short,
                        }),
                        "&:hover": {
                            "transform": `translateY(-${theme.motion.hoverLift})`,
                            "boxShadow":
                                theme.palette.mode === "light"
                                    ? `0 4px 16px ${alpha(theme.palette.common.black, 0.06)}, 0 0 24px ${alpha(theme.palette.primary.main, 0.2)}`
                                    : `0 4px 16px ${alpha(theme.palette.common.black, 0.2)}, 0 0 24px ${alpha(theme.palette.primary.light, 0.16)}`,
                            "borderColor":
                                theme.palette.mode === "light"
                                    ? alpha(theme.palette.primary.main, 0.25)
                                    : alpha(theme.palette.primary.light, 0.2),
                            "borderTopColor":
                                theme.palette.mode === "light"
                                    ? theme.palette.primary.main
                                    : theme.palette.primary.light,
                            "& img": {
                                transform: "scale(1.05)",
                            },
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
                        "transition": theme.transitions.create("opacity", {
                            duration: theme.transitions.duration.short,
                        }),
                        "& img": {
                            transition: theme.transitions.create("transform", {
                                duration: theme.transitions.duration.standard,
                            }),
                        },
                    }),
                },
            },
            MuiChip: {
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
                    outlined: ({ theme }: { theme: Theme }) => ({
                        "borderColor":
                            theme.palette.mode === "light"
                                ? alpha(theme.palette.primary.main, 0.27)
                                : alpha(theme.palette.primary.light, 0.2),
                        "transition": theme.transitions.create("all", {
                            duration: theme.transitions.duration.short,
                        }),
                        "&:hover, &:focus-visible": {
                            transform: `translateY(-${theme.motion.hoverLift})`,
                        },
                        "&:hover": {
                            borderColor:
                                theme.palette.mode === "light"
                                    ? theme.palette.primary.main
                                    : theme.palette.primary.light,
                            backgroundColor:
                                theme.palette.mode === "light"
                                    ? alpha(theme.palette.primary.main, 0.03)
                                    : alpha(theme.palette.primary.light, 0.03),
                        },
                    }),
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "boxShadow": `0 2px 12px ${alpha(theme.palette.common.black, 0.06)}`,
                        "transition": theme.transitions.create(
                            ["transform", "box-shadow"],
                            { duration: theme.transitions.duration.short },
                        ),
                        "&:hover": {
                            transform: "scale(1.02)",
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
                        transition: theme.transitions.create("transform", {
                            duration: theme.transitions.duration.complex,
                        }),
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
                        "transition": theme.transitions.create("all", {
                            duration: theme.transitions.duration.short,
                        }),
                        "&:hover": {
                            transform: `translateY(-${theme.motion.hoverLiftSubtle})`,
                            boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.06)}`,
                        },
                    }),
                },
            },
            MuiFab: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "boxShadow": `0 2px 8px ${alpha(theme.palette.common.black, 0.15)}`,
                        "transition": theme.transitions.create("all", {
                            duration: theme.transitions.duration.short,
                        }),
                        "&:hover": {
                            transform: `translateY(-${theme.motion.hoverLift})`,
                            boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
                            backgroundColor: theme.palette.primary.dark,
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
                <ThemeProvider theme={websiteTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        </AppRouterCacheProvider>
    );
};

export default WebsiteThemeProvider;
