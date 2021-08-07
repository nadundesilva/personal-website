import { useMemo } from "react";
import { createTheme, Theme } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

type ThemeType = "light" | "dark";

const useTheme = (themeType: ThemeType): Theme => (
    useMemo(
        () => createTheme({
            palette: {
                type: themeType,
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
        [themeType]
    )
);

export default useTheme;
