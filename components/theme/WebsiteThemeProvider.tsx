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
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
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
        fontSize: 17,
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
                    color: grey[900],
                    textDecoration: "none",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: 30,
                },
                h2: {
                    fontSize: 25,
                },
                h3: {
                    fontSize: 20,
                },
                h4: {
                    fontSize: 15,
                },
                h5: {
                    fontSize: 10,
                    color: grey[700],
                },
                h6: {
                    fontSize: 10,
                    color: grey[700],
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
