import { useMemo, useState } from "react";
import { createTheme, Theme, useMediaQuery } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

export type ColorScheme = "dark" | "light";

const useTheme = (): [{ theme: Theme, colorScheme: ColorScheme }, (newColorScheme: ColorScheme) => void] => {
    const preferedColorScheme: ColorScheme = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
    const [colorScheme, setColorScheme] = useState<ColorScheme>(preferedColorScheme);

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
        setColorScheme
    ];
};

export default useTheme;
