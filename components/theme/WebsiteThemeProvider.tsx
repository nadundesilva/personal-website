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
import {
    CssVarsTheme,
    experimental_extendTheme as extendTheme,
    Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const websiteTheme: CssVarsTheme = extendTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 17,
    },
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
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: grey[700],
                    textDecoration: "none",
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
                <CssVarsProvider theme={websiteTheme}>
                    <CssBaseline />
                    {children}
                </CssVarsProvider>
            </StyledEngineProvider>
        </AppRouterCacheProvider>
    );
};

export default WebsiteThemeProvider;
