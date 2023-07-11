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
import {
    createTheme,
    CssBaseline,
    StyledEngineProvider,
    type Theme,
    ThemeProvider,
    useMediaQuery,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import React, { useMemo, useEffect, useState, useContext } from "react";

export type ColorScheme = "dark" | "light";
const colorSchemes = ["dark", "light"];

const COLOR_SCHEME_KEY = "COLOR_SCHEME";

const getStoredColorScheme = (): ColorScheme | null => {
    let storedColorScheme: string | null;
    try {
        storedColorScheme = localStorage.getItem(COLOR_SCHEME_KEY);
    } catch {
        storedColorScheme = null;
    }
    return storedColorScheme !== null &&
        colorSchemes.includes(storedColorScheme)
        ? (storedColorScheme as ColorScheme)
        : null;
};

const createWebsiteTheme = (colorScheme: ColorScheme): Theme => {
    return createTheme({
        palette: {
            mode: colorScheme,
            primary: indigo,
            secondary: indigo,
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
};

interface WebsiteThemeContext {
    theme: Theme;
    colorScheme: ColorScheme;
    setColorScheme: (newColorScheme: ColorScheme) => void;
}

const defaultColorScheme = getStoredColorScheme() ?? "light";

const WebsiteTheme = React.createContext<WebsiteThemeContext>({
    theme: createWebsiteTheme(defaultColorScheme),
    colorScheme: defaultColorScheme,
    setColorScheme: () => {
        throw Error("Setting color theme not implemented");
    },
});

interface WebsiteThemeProviderProps {
    children: React.ReactNode;
}

const WebsiteThemeProvider = ({
    children,
}: WebsiteThemeProviderProps): React.ReactElement => {
    const preferedColorScheme: ColorScheme = useMediaQuery(
        "(prefers-color-scheme: dark)",
    )
        ? "dark"
        : "light";
    const initialStoredColorScheme = getStoredColorScheme();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        initialStoredColorScheme === null
            ? preferedColorScheme
            : initialStoredColorScheme,
    );

    const storageListener = (): void => {
        const storedColorScheme = getStoredColorScheme();
        if (storedColorScheme !== null) {
            setColorScheme(storedColorScheme);
        }
    };
    useEffect(() => {
        window.addEventListener("storage", storageListener);
        return (): void => {
            window.removeEventListener("storage", storageListener);
        };
    });

    const theme = useMemo(() => createWebsiteTheme(colorScheme), [colorScheme]);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <WebsiteTheme.Provider
                    value={{
                        theme,
                        colorScheme,
                        setColorScheme: (newColorScheme: ColorScheme): void => {
                            try {
                                localStorage.setItem(
                                    COLOR_SCHEME_KEY,
                                    newColorScheme,
                                );
                            } catch {}
                            setColorScheme(newColorScheme);
                        },
                    }}
                >
                    {children}
                </WebsiteTheme.Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export const useWebsiteTheme = (): WebsiteThemeContext => {
    return useContext(WebsiteTheme);
};

export default WebsiteThemeProvider;
