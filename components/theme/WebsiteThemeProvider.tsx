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
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import type React from "react";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

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

const websiteTheme: Theme = createTheme({
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
        fontFamily: roboto.style.fontFamily,
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    marginTop: 10,
                    marginBottom: 20,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    color:
                        theme.palette.mode === "light" ? "#1a1a1a" : "#f5f5f5",
                }),
                h1: {
                    fontWeight: 400,
                    fontSize: 32,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                },
                h2: {
                    fontWeight: 400,
                    fontSize: 28,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                },
                h3: {
                    fontWeight: 400,
                    fontSize: 24,
                    letterSpacing: "0em",
                    lineHeight: 1.4,
                },
                h4: {
                    fontWeight: 400,
                    fontSize: 20,
                    letterSpacing: "0.01em",
                    lineHeight: 1.4,
                },
                h5: {
                    fontWeight: 400,
                    fontSize: 18,
                    letterSpacing: "0.01em",
                    lineHeight: 1.5,
                },
                h6: {
                    fontWeight: 400,
                    fontSize: 16,
                    letterSpacing: "0.01em",
                    lineHeight: 1.5,
                },
                body1: {
                    fontWeight: 400,
                    fontSize: 15,
                    letterSpacing: "0.01em",
                    lineHeight: 1.6,
                },
                body2: {
                    fontWeight: 400,
                    fontSize: 14,
                    letterSpacing: "0.01em",
                    lineHeight: 1.6,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "textTransform": "none",
                    "fontWeight": 400,
                    "borderRadius": 4,
                    "boxShadow": "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
                text: {
                    fontSize: "0.9375rem",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    padding: "6px 12px",
                    transition:
                        "color 0.2s ease-in-out, opacity 0.2s ease-in-out",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "transition":
                        "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                    "&:hover": {
                        opacity: 0.85,
                        transform: "scale(1.05)",
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
                    "borderRadius": 4,
                    "transition":
                        "background-color 0.2s ease-in-out, opacity 0.2s ease-in-out",
                    "&:hover": {
                        backgroundColor: "action.hover",
                        opacity: 0.9,
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
    },
});

interface WebsiteThemeProviderProps {
    children: React.ReactNode;
}

const WebsiteThemeProvider = ({
    children,
}: WebsiteThemeProviderProps): React.ReactElement => {
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
