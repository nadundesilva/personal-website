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

import { Box } from "@mui/material";
import { alpha, type Theme } from "@mui/material/styles";
import NextImage from "next-image-export-optimizer";
import { type StaticImageData } from "next/image";
import type React from "react";

interface ImageProps {
    src: StaticImageData | string;
    alt: string;
    float?: "left" | "right";
}

const boxShadow = (theme: Theme) =>
    theme.palette.mode === "light"
        ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}, 0 4px 24px ${alpha(theme.palette.primary.main, 0.15)}`
        : `0 0 0 3px ${alpha(theme.palette.primary.light, 0.2)}, 0 4px 24px ${alpha(theme.palette.primary.light, 0.12)}`;

const boxShadowHover = (theme: Theme) =>
    theme.palette.mode === "light"
        ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.5)}, 0 8px 32px ${alpha(theme.palette.primary.main, 0.27)}`
        : `0 0 0 3px ${alpha(theme.palette.primary.light, 0.35)}, 0 8px 32px ${alpha(theme.palette.primary.light, 0.22)}`;

const Image = ({ src, alt, float }: ImageProps): React.ReactElement => (
    <Box
        sx={{
            "borderRadius": 1,
            "overflow": "hidden",
            "boxShadow": boxShadow,
            "transition": (theme) =>
                theme.transitions.create(["transform", "box-shadow"], {
                    duration: theme.transitions.duration.short,
                }),
            "&:hover": {
                transform: (theme) => `translateY(-${theme.motion.hoverLift})`,
                boxShadow: boxShadowHover,
            },
            ...(float !== undefined && {
                position: "relative",
                float,
                height: "auto",
                width: { xs: "100%", md: "20vw" },
                my: 2.5,
                ml: float === "left" ? 0 : 2.5,
                mr: float === "right" ? 0 : 2.5,
            }),
        }}
    >
        <NextImage
            src={src}
            alt={alt}
            style={{
                height: "auto",
                maxWidth: "100%",
                display: "block",
            }}
        />
    </Box>
);

export default Image;
