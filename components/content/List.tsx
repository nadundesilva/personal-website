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
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface CustomListProps {
    component?: "ul" | "ol";
    children: React.ReactNode;
}

const CustomList = ({
    children,
    component,
}: CustomListProps): React.ReactNode => (
    <Box component={component ?? "ul"} sx={{ my: 0 }}>
        {children}
    </Box>
);

interface CustomListItemProps {
    children: React.ReactNode;
}

export const CustomListItem = ({
    children,
}: CustomListItemProps): React.ReactNode => (
    <Box
        component="li"
        sx={{
            "&::marker": {
                color: (theme: Theme) =>
                    theme.palette.mode == "light" ? "#000000" : "#ffffff",
            },
        }}
    >
        {children}
    </Box>
);

export default CustomList;
