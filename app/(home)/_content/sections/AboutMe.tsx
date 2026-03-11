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
import { Avatar, Box, Grid, type Theme, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import Image from "next-image-export-optimizer";
import type React from "react";

import Profiles from "@/constants/profiles";
import { Link } from "@/components/content";
import Experiences from "@/constants/experience";
import { JOB_TITLE } from "@/constants/metadata";

import profilePhotoImage from "@/assets/profile-photo.webp";

const AboutMe = (): React.ReactElement => {
    const profilePhoto = (
        gridWidth: 4 | 12,
        sx: SxProps<Theme>,
    ): React.ReactElement => (
        <Grid size={gridWidth} sx={sx}>
            <Avatar
                sx={{
                    "width": "100%",
                    "pt": "100%",
                    "position": "relative",
                    "overflow": "hidden",
                    "transition": (theme) =>
                        theme.transitions.create(["box-shadow", "transform"], {
                            duration: theme.transitions.duration.standard,
                        }),
                    "boxShadow": (theme) =>
                        theme.palette.mode === "light"
                            ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.35)}, 0 0 48px ${alpha(theme.palette.primary.main, 0.27)}`
                            : `0 0 0 3px ${alpha(theme.palette.primary.light, 0.25)}, 0 0 48px ${alpha(theme.palette.primary.light, 0.2)}`,
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: (theme) =>
                            theme.palette.mode === "light"
                                ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.6)}, 0 0 64px ${alpha(theme.palette.primary.main, 0.4)}`
                                : `0 0 0 3px ${alpha(theme.palette.primary.light, 0.4)}, 0 0 64px ${alpha(theme.palette.primary.light, 0.33)}`,
                    },
                }}
            >
                <Image
                    src={profilePhotoImage}
                    alt="Profile photo of Nadun De Silva"
                    fill
                    sizes="(max-width: 600px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                />
            </Avatar>
        </Grid>
    );

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const careerStart = Experiences.WSO2SoftwareEngineer.timePeriod.from;
    const millisecondsOfExperience =
        new Date().getTime() - careerStart.toJsDate().getTime();
    const yearsOfExperience = millisecondsOfExperience / millisecondsPerYear;
    // Round to the nearest half-year so the displayed value stays accurate
    // without updating it every month (e.g. "7.5 years" rather than "7.3")
    const yearsOfExperienceRounded = Math.round(yearsOfExperience * 2) / 2;
    // Prefix "nearly" when rounding up, to avoid overclaiming experience
    const yearsOfExperienceDisplayValue =
        (yearsOfExperience < yearsOfExperienceRounded ? "nearly " : "") +
        yearsOfExperienceRounded;

    return (
        <Grid
            container
            spacing={{ xs: 5, sm: 8 }}
            alignItems={{ xs: "flex-start", sm: "center" }}
        >
            {profilePhoto(12, {
                display: { xs: "block", sm: "none" },
                mb: { xs: 4, sm: 0 },
            })}
            <Grid size={{ xs: 12, sm: 8 }}>
                <Typography
                    variant="body1"
                    sx={{
                        lineHeight: 1.75,
                        fontSize: { sm: 16 },
                        textAlign: "justify",
                    }}
                >
                    {JOB_TITLE} with {yearsOfExperienceDisplayValue} years of
                    experience in cloud-native application development for
                    Kubernetes and cloud platforms. Background in architecture,
                    user experience (UX), development, deployment, and ensuring
                    site reliability of cloud-native applications in production
                    environments. Experience in owning the technical direction
                    of product areas and leading a team of engineers.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1.5,
                        mt: { xs: 3, sm: 6 },
                        justifyContent: { xs: "center", sm: "flex-start" },
                    }}
                >
                    {[
                        Profiles.LinkedIn,
                        Profiles.GitHub,
                        Profiles.Medium,
                        Profiles.Instagram,
                    ].map(({ name, Icon, link }) => (
                        <Link
                            key={name}
                            href={link}
                            target="_blank"
                            aria-label={name}
                        >
                            <Icon
                                aria-hidden={true}
                                sx={{
                                    "fontSize": 40,
                                    "color": (theme) =>
                                        theme.palette.text.secondary,
                                    "border": "2px solid",
                                    "borderColor": (theme) =>
                                        theme.palette.mode === "light"
                                            ? alpha(
                                                  theme.palette.primary.main,
                                                  0.33,
                                              )
                                            : alpha(
                                                  theme.palette.primary.light,
                                                  0.27,
                                              ),
                                    "borderRadius": "50%",
                                    "padding": 0.625,
                                    "transition": (theme) =>
                                        theme.transitions.create("all", {
                                            duration:
                                                theme.transitions.duration
                                                    .short,
                                        }),
                                    "&:hover": {
                                        transform: (theme) =>
                                            `translateY(-${theme.motion.hoverLift})`,
                                        borderColor: (theme) =>
                                            theme.palette.primary.main,
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light"
                                                ? alpha(
                                                      theme.palette.primary
                                                          .main,
                                                      0.03,
                                                  )
                                                : alpha(
                                                      theme.palette.primary
                                                          .light,
                                                      0.03,
                                                  ),
                                    },
                                }}
                            />
                        </Link>
                    ))}
                </Box>
            </Grid>
            {profilePhoto(4, { display: { xs: "none", sm: "block" } })}
        </Grid>
    );
};

export default AboutMe;
