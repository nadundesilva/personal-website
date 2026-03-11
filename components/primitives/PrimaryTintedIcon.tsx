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

import type { SvgIconProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type React from "react";

interface PrimaryTintedIconProps {
    icon: React.ComponentType<SvgIconProps>;
    fontSize?: string;
}

const PrimaryTintedIcon = ({
    icon: Icon,
    fontSize,
}: PrimaryTintedIconProps): React.ReactElement => (
    <Icon
        aria-hidden="true"
        sx={{
            color: (theme) =>
                theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.7)
                    : alpha(theme.palette.primary.light, 0.7),
            ...(fontSize !== undefined && { fontSize }),
        }}
    />
);

export default PrimaryTintedIcon;
