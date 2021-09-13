import { CssBaseline, Theme, useMediaQuery } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
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
    return storedColorScheme !== null && colorSchemes.includes(storedColorScheme)
        ? storedColorScheme as ColorScheme
        : null;
};

const createWebsiteTheme = (colorScheme: ColorScheme): Theme => {
    return createTheme({
        palette: {
            mode: colorScheme,
            primary: indigo,
            secondary: indigo
        }
    });
};

interface WebsiteThemeContext {
    theme: Theme,
    colorScheme: ColorScheme,
    setColorScheme: (newColorScheme: ColorScheme) => void,
}

const defaultColorScheme = getStoredColorScheme() ?? "light";

const WebsiteTheme = React.createContext<WebsiteThemeContext>({
    theme: createWebsiteTheme(defaultColorScheme),
    colorScheme: defaultColorScheme,
    setColorScheme: () => { throw Error("Setting color theme not implemented"); }
});

interface WebsiteThemeProviderProps {
    children: React.ReactNode,
}

const WebsiteThemeProvider = ({ children }: WebsiteThemeProviderProps): React.ReactElement => {
    const preferedColorScheme: ColorScheme = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
    const initialStoredColorScheme = getStoredColorScheme();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        initialStoredColorScheme === null ? preferedColorScheme : initialStoredColorScheme
    );

    const storageListener = (): void => {
        const storedColorScheme = getStoredColorScheme();
        if (storedColorScheme !== null) {
            setColorScheme(storedColorScheme);
        }
    };
    useEffect(() => {
        window.addEventListener("storage", storageListener);
        return (): void => window.removeEventListener("storage", storageListener);
    });

    const theme = useMemo(() => createWebsiteTheme(colorScheme), [colorScheme]);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <WebsiteTheme.Provider value={{
                    theme,
                    colorScheme,
                    setColorScheme: (newColorScheme: ColorScheme): void => {
                        try {
                            localStorage.setItem(COLOR_SCHEME_KEY, newColorScheme);
                        } catch {
                        }
                        setColorScheme(newColorScheme);
                    }
                }}>
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
