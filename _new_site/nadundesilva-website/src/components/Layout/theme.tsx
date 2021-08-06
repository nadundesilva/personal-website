import React from "react";
import { createTheme, Theme } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

type ThemeType = "light" | "dark";

const useTheme = (themeType: ThemeType): Theme => (
    React.useMemo(
        () => createTheme({
            palette: {
                type: themeType,
                primary: indigo,
                secondary: indigo
            }
        }),
        [themeType]
    )
);

export default useTheme;
