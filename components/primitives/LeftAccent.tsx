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
 * © 2026 Nadun De Silva. All rights reserved.
 */
"use client";

import { Box, type SxProps, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type React from "react";

interface LeftAccentProps {
    children: React.ReactNode;
    thickness?: number;
    opacity?: number;
    sx?: SxProps<Theme>;
}

const LeftAccent = ({
    children,
    thickness = 3,
    opacity = 0.4,
    sx,
}: LeftAccentProps): React.ReactElement => (
    <Box
        sx={{
            pl: 2,
            borderLeft: `${thickness}px solid`,
            borderColor: (theme) =>
                theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, opacity)
                    : alpha(theme.palette.primary.light, opacity),
            ...sx,
        }}
    >
        {children}
    </Box>
);

export default LeftAccent;
