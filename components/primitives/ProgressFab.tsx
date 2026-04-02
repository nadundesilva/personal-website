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

import AutoAwesome from "@mui/icons-material/AutoAwesome";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";
import type React from "react";

interface ProgressFabProps {
    progress: number;
    isDone?: boolean;
}

const ProgressFab = ({
    progress,
    isDone = progress >= 100,
}: ProgressFabProps): React.ReactElement => {
    if (progress < 0 || progress > 100) {
        throw new Error(
            `ProgressFab: progress must be between 0 and 100, received ${progress}`,
        );
    }

    const theme = useTheme();
    const motionOk = useMediaQuery(MOTION_OK_QUERY);

    // MUI Fab size="small" is theme.spacing(5) (5 × base spacing unit).
    // Ring radius: inner edge of stroke clears the circle boundary by 1 unit safety margin.
    const strokeWidth = 3;
    const badgeSize = parseInt(theme.spacing(5));
    const ringRadius = badgeSize / 2 - strokeWidth - 1;
    const ringCircumference = 2 * Math.PI * ringRadius;

    const center = badgeSize / 2;
    const strokeOffset = ringCircumference * (1 - progress / 100);
    const transition = motionOk ? "opacity 0.4s ease" : "none";
    const contrastText = theme.palette.primary.contrastText;
    const trackColor = alpha(contrastText, 0.25);

    return (
        <Fab
            size="small"
            color="primary"
            disableRipple
            component="div"
            tabIndex={-1}
            sx={{ position: "relative", overflow: "hidden" }}
        >
            <svg
                width={badgeSize}
                height={badgeSize}
                style={{ transform: "rotate(-90deg)", display: "block" }}
            >
                {/* Background track */}
                <circle
                    cx={center}
                    cy={center}
                    r={ringRadius}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />
                {/* Progress arc */}
                <circle
                    cx={center}
                    cy={center}
                    r={ringRadius}
                    fill="none"
                    stroke={contrastText}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeOffset}
                    style={{
                        transition: motionOk
                            ? "stroke-dashoffset 0.2s ease-out"
                            : "none",
                    }}
                />
            </svg>

            {/* Percentage and done icon crossfade inside the circle */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "0.5rem",
                        fontWeight: 600,
                        lineHeight: 1,
                        color: contrastText,
                        opacity: isDone ? 0 : 1,
                        transition,
                    }}
                >
                    {Math.round(progress)}%
                </Typography>
                <AutoAwesome
                    sx={{
                        position: "absolute",
                        fontSize: "1rem",
                        color: contrastText,
                        opacity: isDone ? 1 : 0,
                        transition,
                    }}
                />
            </Box>
        </Fab>
    );
};

export default ProgressFab;
