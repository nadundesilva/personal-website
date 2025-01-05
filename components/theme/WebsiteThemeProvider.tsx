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
import {
    Theme,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const websiteTheme: Theme = responsiveFontSizes(
    createTheme({
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
                            theme.palette.mode == "light"
                                ? "#000000"
                                : "#ffffff",
                    }),
                    h1: {
                        fontSize: 36,
                    },
                    h2: {
                        fontSize: 33,
                    },
                    h3: {
                        fontSize: 30,
                    },
                    h4: {
                        fontSize: 27,
                    },
                    h5: {
                        fontSize: 24,
                    },
                    h6: {
                        fontSize: 21,
                    },
                    body1: {
                        fontSize: 18,
                    },
                    body2: {
                        fontSize: 18,
                    },
                },
            },
        },
    }),
);

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
