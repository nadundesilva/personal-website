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
"use client";
import { Box, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Image from "next-image-export-optimizer";
import type React from "react";

import { MOTION_OK_QUERY } from "@/components/theme/media-queries";
import { JOB_TITLE } from "@/constants/metadata";
import { calculateYearsOfExperienceForDisplay } from "@/utils/common/experience";

import profilePhotoImage from "@/assets/profile-photo.webp";

const WhoAmI = (): React.ReactElement => {
    const {
        value,
        prefix = "",
        suffix = "",
    } = calculateYearsOfExperienceForDisplay();
    const yearsDisplay = `${prefix}${value}${suffix}`;
    return (
        <Box sx={{ maxWidth: 860, mx: "auto" }}>
            <Grid container spacing={{ xs: 5, sm: 7 }} alignItems="center">
                <Grid size={{ xs: 12, sm: 5 }}>
                    <Box
                        sx={{
                            "position": "relative",
                            "width": "100%",
                            "pt": "100%",
                            "overflow": "hidden",
                            "borderRadius": 2,
                            "boxShadow": (theme) =>
                                theme.palette.mode === "dark"
                                    ? `0 0 0 1px ${alpha(theme.palette.primary.light, 0.18)}, 0 0 56px ${alpha(theme.palette.primary.light, 0.12)}`
                                    : `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.1)}`,
                            "transition": (theme) =>
                                theme.transitions.create("box-shadow", {
                                    duration:
                                        theme.transitions.duration.standard,
                                }),
                            "&:hover": {
                                boxShadow: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? `0 0 0 1px ${alpha(theme.palette.primary.light, 0.35)}, 0 0 72px ${alpha(theme.palette.primary.light, 0.22)}`
                                        : `0 0 0 1px ${alpha(theme.palette.primary.main, 0.4)}, 0 0 56px ${alpha(theme.palette.primary.main, 0.18)}`,
                            },
                            [MOTION_OK_QUERY]: {
                                "transition": (theme) =>
                                    theme.transitions.create(
                                        ["box-shadow", "transform"],
                                        {
                                            duration:
                                                theme.transitions.duration
                                                    .standard,
                                        },
                                    ),
                                "&:hover": { transform: "scale(1.015)" },
                            },
                        }}
                    >
                        <Image
                            src={profilePhotoImage}
                            alt="Profile photo of Nadun De Silva"
                            fill
                            sizes="(max-width: 600px) 100vw, 400px"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center top",
                            }}
                        />
                    </Box>
                </Grid>

                {/* Text content */}
                <Grid size={{ xs: 12, sm: 7 }}>
                    {/* Overline */}
                    <Typography
                        component="p"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#88BDF2"
                                    : theme.palette.primary.main,
                            fontSize: 11,
                            fontWeight: 400,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            mb: 1.5,
                        }}
                    >
                        {yearsDisplay} years of experience
                    </Typography>

                    {/* Job title */}
                    <Typography
                        component="p"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#BDDDFC"
                                    : theme.palette.primary.main,
                            fontSize: { xs: 22, sm: 24, md: 26 },
                            fontWeight: 300,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.3,
                            mb: 2,
                        }}
                    >
                        {JOB_TITLE}
                    </Typography>

                    {/* Gradient accent rule */}
                    <Box
                        aria-hidden="true"
                        sx={{
                            width: 36,
                            height: "1px",
                            background: (theme) =>
                                `linear-gradient(90deg, ${
                                    theme.palette.mode === "dark"
                                        ? "#88BDF2"
                                        : theme.palette.primary.main
                                }, transparent)`,
                            mb: 2.5,
                        }}
                    />

                    {/* Bio */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: 15, md: 16 },
                            fontWeight: 300,
                            lineHeight: 1.85,
                            color: (theme) =>
                                theme.palette.mode === "dark"
                                    ? alpha(theme.palette.common.white, 0.72)
                                    : theme.palette.text.primary,
                        }}
                    >
                        Background in cloud-native application development for
                        Kubernetes and cloud platforms. Proven track record in
                        architecting, developing, and deploying scalable
                        applications, while ensuring site reliability in
                        production environments. Skilled in defining technical
                        direction and leading engineering teams to deliver
                        high-impact solutions.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WhoAmI;
