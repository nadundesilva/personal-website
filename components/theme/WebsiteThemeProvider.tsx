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
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { type Theme, createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type React from "react";

const customPrimary = {
    main: "#384959",
    light: "#BDDDFC",
    dark: "#6A89A7",
    contrastText: "#ffffff",
};

const customSecondary = {
    main: "#6A89A7",
    light: "#88BDF2",
    dark: "#384959",
    contrastText: "#ffffff",
};

const createWebsiteTheme = (fontFamily: string): Theme =>
    createTheme({
        colorSchemes: {
            dark: {
                palette: {
                    primary: customPrimary,
                    secondary: customSecondary,
                    background: {
                        default: "#1a1f2e",
                        paper: "#232938",
                    },
                },
            },
            light: {
                palette: {
                    primary: customPrimary,
                    secondary: customSecondary,
                    background: {
                        default: "#ffffff",
                        paper: "#fafafa",
                    },
                },
            },
        },
        typography: {
            fontFamily,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
        },
        spacing: 8,
        shape: {
            borderRadius: 8,
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
            MuiDivider: {
                styleOverrides: {
                    root: {
                        marginTop: 10,
                        marginBottom: 20,
                        opacity: 0.18,
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "color":
                            theme.palette.mode === "dark"
                                ? theme.palette.primary.light
                                : theme.palette.primary.dark,
                        "textDecoration": "none",
                        "fontWeight": 500,
                        "transition": "opacity 0.25s ease-in-out",
                        "&:hover": {
                            opacity: 0.8,
                        },
                    }),
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        color:
                            theme.palette.mode === "light"
                                ? "#1a1a1a"
                                : "#f5f5f5",
                    }),
                    h1: {
                        fontWeight: 500,
                        fontSize: 32,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.25,
                    },
                    h2: {
                        fontWeight: 500,
                        fontSize: 28,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                    },
                    h3: {
                        fontWeight: 500,
                        fontSize: 24,
                        letterSpacing: "0em",
                        lineHeight: 1.35,
                    },
                    h4: {
                        fontWeight: 400,
                        fontSize: 20,
                        letterSpacing: "0em",
                        lineHeight: 1.4,
                    },
                    h5: {
                        fontWeight: 400,
                        fontSize: 18,
                        letterSpacing: "0em",
                        lineHeight: 1.45,
                    },
                    h6: {
                        fontWeight: 400,
                        fontSize: 16,
                        letterSpacing: "0em",
                        lineHeight: 1.5,
                    },
                    body1: {
                        fontWeight: 400,
                        fontSize: 15,
                        letterSpacing: "0em",
                        lineHeight: 1.75,
                    },
                    body2: {
                        fontWeight: 300,
                        fontSize: 14,
                        letterSpacing: "0em",
                        lineHeight: 1.7,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        "textTransform": "none",
                        "fontWeight": 400,
                        "borderRadius": 8,
                        "boxShadow": "none",
                        "transition": "all 0.25s ease-in-out",
                        "&:hover": {
                            boxShadow: "none",
                            opacity: 0.9,
                        },
                    },
                    text: {
                        fontSize: "0.9375rem",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        padding: "6px 12px",
                    },
                    outlined: ({ theme }: { theme: Theme }) => ({
                        "borderWidth": 1,
                        "borderColor":
                            theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.3)"
                                : "rgba(0, 0, 0, 0.23)",
                        "color":
                            theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.87)"
                                : "rgba(0, 0, 0, 0.87)",
                        "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                            color:
                                theme.palette.mode === "dark"
                                    ? "rgba(255, 255, 255, 0.87)"
                                    : "rgba(0, 0, 0, 0.87)",
                        },
                        "&:hover": {
                            borderWidth: 1,
                            borderColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "rgba(0, 0, 0, 0.4)",
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(255, 255, 255, 0.05)"
                                    : "rgba(0, 0, 0, 0.02)",
                        },
                    }),
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        "transition": "opacity 0.2s ease-in-out",
                        "&:hover": {
                            opacity: 0.75,
                        },
                    },
                },
            },
            MuiAppBar: {
                defaultProps: {
                    enableColorOnDark: true,
                },
                styleOverrides: {
                    root: {
                        "boxShadow": "none",
                        "transition":
                            "box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out",
                        "&.MuiAppBar-root": {
                            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                        },
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        "borderRadius": 8,
                        "transition": "background-color 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "action.hover",
                        },
                    },
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
                        "borderRadius": 12,
                        "border": "1px solid",
                        "borderColor":
                            theme.palette.mode === "light"
                                ? "rgba(0, 0, 0, 0.08)"
                                : "rgba(255, 255, 255, 0.08)",
                        "boxShadow": "none",
                        "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                        },
                    }),
                },
            },
            MuiCardActionArea: {
                styleOverrides: {
                    root: {
                        "borderRadius": 12,
                        "transition": "none",
                        "&:hover .MuiCardActionArea-focusHighlight": {
                            opacity: 0,
                        },
                    },
                },
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        "padding": 10,
                        "&:last-child": {
                            paddingBottom: 10,
                        },
                    },
                },
            },
            MuiCardMedia: {
                styleOverrides: {
                    root: {
                        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontWeight: 400,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        borderRadius: 4,
                        fontSize: "0.75rem",
                    },
                    sizeSmall: {
                        fontSize: "0.6875rem",
                        height: 22,
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        "boxShadow": "0 2px 12px rgba(0, 0, 0, 0.06)",
                        "transition":
                            "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                        },
                    },
                },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: "divider",
                        opacity: 0.3,
                    },
                    bar: {
                        borderRadius: 2,
                        transition:
                            "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                },
            },
            MuiImageList: {
                styleOverrides: {
                    root: {
                        gap: "8px",
                    },
                },
            },
            MuiImageListItem: {
                styleOverrides: {
                    root: {
                        "borderRadius": 8,
                        "overflow": "hidden",
                        "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                        },
                    },
                },
            },
            MuiFab: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        "boxShadow": "0 2px 8px rgba(0, 0, 0, 0.15)",
                        "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
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
}

const WebsiteThemeProvider = ({
    children,
    fontFamily,
}: WebsiteThemeProviderProps): React.ReactElement => {
    const websiteTheme = createWebsiteTheme(fontFamily);
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
