import React from "react";
import { createTheme, Theme } from "@material-ui/core";
import { blue, indigo } from "@material-ui/core/colors";

type ThemeType = "light" | "dark";

const useTheme = (themeType: ThemeType): Theme => (
    React.useMemo(
        () => createTheme({
            palette: {
                type: themeType,
                primary: indigo,
                secondary: blue
            }
        }),
        [themeType]
    )
);

export default useTheme;
