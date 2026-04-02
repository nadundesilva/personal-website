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

import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import type React from "react";

import { LinkButton } from "@/components/content";
import { ContentContainer } from "@/components/layout";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";

const NotFound = (): React.ReactElement => {
    const float = keyframes`
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-14px); }
    `;

    const fadeInUp = keyframes`
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    `;

    return (
        <ContentContainer>
            <Box
                sx={{
                    position: "relative",
                    py: { xs: 8, md: 12 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                {/* Background orbs */}
                <Box
                    aria-hidden="true"
                    sx={{
                        position: "absolute",
                        top: -80,
                        left: "-5%",
                        width: 380,
                        height: 380,
                        borderRadius: "50%",
                        background: (theme) =>
                            `radial-gradient(circle, ${alpha(
                                theme.palette.primary.main,
                                theme.palette.mode === "light" ? 0.09 : 0.06,
                            )}, transparent 70%)`,
                        pointerEvents: "none",
                    }}
                />
                <Box
                    aria-hidden="true"
                    sx={{
                        position: "absolute",
                        bottom: -60,
                        right: "-5%",
                        width: 280,
                        height: 280,
                        borderRadius: "50%",
                        background: (theme) =>
                            `radial-gradient(circle, ${alpha(
                                theme.palette.primary.main,
                                theme.palette.mode === "light" ? 0.07 : 0.04,
                            )}, transparent 70%)`,
                        pointerEvents: "none",
                    }}
                />

                {/* Floating 404 */}
                <Typography
                    aria-hidden="true"
                    sx={{
                        fontSize: { xs: "7rem", md: "11rem" },
                        fontWeight: 300,
                        lineHeight: 1,
                        letterSpacing: "-0.05em",
                        color: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.primary.main
                                : theme.palette.primary.light,
                        opacity: { xs: 0.35, md: 0.4 },
                        mb: 3,
                        userSelect: "none",
                        [MOTION_OK_QUERY]: {
                            animation: `${float} 4s ease-in-out infinite`,
                        },
                    }}
                >
                    404
                </Typography>

                {/* Title + accent line */}
                <Box
                    sx={{
                        mb: 2,
                        [MOTION_OK_QUERY]: {
                            animation: `${fadeInUp} 0.7s ease-out 0.05s both`,
                        },
                    }}
                >
                    <Typography variant="h1" sx={{ mb: 1.5 }}>
                        Page Not Found
                    </Typography>
                    <Box
                        aria-hidden="true"
                        sx={{
                            mx: "auto",
                            width: { xs: 80, md: 140 },
                            height: 2,
                            borderRadius: 1,
                            background: (theme) =>
                                `linear-gradient(90deg, transparent, ${
                                    theme.palette.mode === "light"
                                        ? theme.palette.primary.main
                                        : theme.palette.primary.light
                                }, transparent)`,
                            opacity: 0.65,
                        }}
                    />
                </Box>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 5,
                        maxWidth: 420,
                        [MOTION_OK_QUERY]: {
                            animation: `${fadeInUp} 0.7s ease-out 0.15s both`,
                        },
                    }}
                >
                    The page you&apos;re looking for doesn&apos;t exist or may
                    have been moved.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        [MOTION_OK_QUERY]: {
                            animation: `${fadeInUp} 0.7s ease-out 0.25s both`,
                        },
                    }}
                >
                    <LinkButton href="/" name="Go to Homepage" />
                    <LinkButton
                        href="/blog-articles"
                        name="Browse Blog Articles"
                    />
                </Box>
            </Box>
        </ContentContainer>
    );
};

export default NotFound;
