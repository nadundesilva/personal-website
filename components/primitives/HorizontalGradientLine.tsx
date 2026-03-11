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
import type React from "react";

interface HorizontalGradientLineProps {
    sx?: SxProps<Theme>;
}

const HorizontalGradientLine = ({
    sx,
}: HorizontalGradientLineProps): React.ReactElement => (
    <Box
        aria-hidden="true"
        sx={{
            mt: 0.75,
            width: { xs: 32, md: 44 },
            height: 2,
            background: (theme) =>
                `linear-gradient(90deg, ${
                    theme.palette.mode === "light"
                        ? theme.palette.primary.main
                        : theme.palette.primary.light
                }, transparent)`,
            borderRadius: 1,
            opacity: 0.65,
            ...sx,
        }}
    />
);

export default HorizontalGradientLine;
