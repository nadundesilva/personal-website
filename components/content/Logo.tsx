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
import { Box, useTheme } from "@mui/material";
import Image from "next/image";

import type { LogoAsset } from "@/constants/logos";

interface LogoProps {
    logo: LogoAsset;
    height?: string;
}

const Logo = ({ logo, height }: LogoProps): React.ReactElement => {
    const theme = useTheme();
    const src = logo.src[theme.palette.mode];
    return (
        <Box
            sx={{
                ...logo.recommendedSx,
                position: "relative",
                height: height ?? "3em",
                py: 1,
            }}
        >
            <Image
                alt={logo.alt}
                src={src}
                fill
                sizes="100vw"
                style={{
                    objectFit: "scale-down",
                    objectPosition: "left top",
                }}
            />
        </Box>
    );
};

export default Logo;
