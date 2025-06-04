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
import { indigo } from "@mui/material/colors";
import { Theme, createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const websiteTheme: Theme = createTheme({
    colorSchemes: {
        dark: {
            palette: {
                primary: indigo,
                secondary: indigo,
            },
        },
        light: {
            palette: {
                primary: indigo,
                secondary: indigo,
            },
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
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
                        theme.palette.mode == "light" ? "#000000" : "#ffffff",
                }),
                h1: {
                    fontWeight: "bolder",
                    fontSize: 27,
                },
                h2: {
                    fontWeight: "bolder",
                    fontSize: 25,
                },
                h3: {
                    fontWeight: "bolder",
                    fontSize: 21,
                },
                h4: {
                    fontWeight: "normal",
                    fontSize: 21,
                },
                h5: {
                    fontWeight: "bolder",
                    fontSize: 17,
                },
                h6: {
                    fontWeight: "normal",
                    fontSize: 17,
                },
                body1: {
                    fontWeight: "normal",
                    fontSize: 15,
                },
                body2: {
                    fontWeight: "normal",
                    fontSize: 15,
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
