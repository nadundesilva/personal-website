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
import { Box, type SxProps, type Theme, useTheme } from "@mui/material";
import Image from "next-image-export-optimizer";
import type React from "react";

import { type StaticImageData } from "next/image";

interface LogoProps {
    srcLight: StaticImageData;
    srcDark: StaticImageData;
    alt: string;
    recommendedSx?: SxProps<Theme>;
}

const Logo = ({
    srcLight,
    srcDark,
    alt,
    recommendedSx,
}: LogoProps): React.ReactElement => {
    const theme = useTheme();
    const src = theme.palette.mode == "light" ? srcLight : srcDark;
    return (
        <Box
            sx={{
                ...recommendedSx,
                "position": "relative",
                "width": "100%",
                "py": 1,
                "& img": {
                    objectFit: "scale-down",
                    objectPosition: { xs: "left center", sm: "right center" },
                },
            }}
        >
            <Image
                alt={alt}
                src={src}
                fill
                style={{
                    objectFit: "scale-down",
                }}
            />
        </Box>
    );
};

export default Logo;
