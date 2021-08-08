import { useMemo, useEffect, useState } from "react";
import { createTheme, Theme, useMediaQuery } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

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

const useTheme = (): [{ theme: Theme, colorScheme: ColorScheme }, (newColorScheme: ColorScheme) => void] => {
    const preferedColorScheme: ColorScheme = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
    const initialStoredColorScheme = getStoredColorScheme();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        initialStoredColorScheme === null ? preferedColorScheme : initialStoredColorScheme
    );

    useEffect(() => {
        const storageListener = (): void => {
            const storedColorScheme = getStoredColorScheme();
            if (storedColorScheme !== null) {
                setColorScheme(storedColorScheme);
            }
        };
        window.addEventListener("storage", storageListener);
        return (): void => window.removeEventListener("storage", storageListener);
    });

    const theme = useMemo(
        () => createTheme({
            palette: {
                type: colorScheme,
                primary: indigo,
                secondary: indigo
            },
            overrides: {
                MuiCssBaseline: {
                    "@global": {
                        "::-webkit-scrollbar": {
                            width: "10px"
                        },
                        "::-webkit-scrollbar-track": {
                            backgroundColor: "darkgrey"
                        },
                        "::-webkit-scrollbar-thumb": {
                            backgroundColor: "#555555",
                            boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)"
                        }
                    }
                }
            }
        }),
        [colorScheme]
    );
    return [
        {
            theme,
            colorScheme
        },
        (newColorScheme: ColorScheme) => {
            try {
                localStorage.setItem(COLOR_SCHEME_KEY, newColorScheme);
            } catch {
            }
            setColorScheme(newColorScheme);
        }
    ];
};

export default useTheme;
