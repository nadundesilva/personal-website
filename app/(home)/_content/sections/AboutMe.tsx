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
import {
    Avatar,
    Box,
    Divider,
    Grid,
    type Theme,
    Typography,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import Image from "next-image-export-optimizer";
import type React from "react";

import Profiles from "@/constants/profiles";
import { Link } from "@/components/content";
import { FULL_NAME } from "@/constants/metadata";

import profilePhotoImage from "@/assets/profile-photo.jpg";

const AboutMe = (): React.ReactElement => {
    const profilePhoto = (
        gridWidth: 4 | 12,
        sx: SxProps<Theme>,
    ): React.ReactElement => (
        <Grid size={gridWidth} sx={sx}>
            <Avatar
                sx={{
                    width: "100%",
                    pt: "100%",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Image
                    src={profilePhotoImage}
                    alt={FULL_NAME}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </Avatar>
        </Grid>
    );

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const millisecondsOfExperience =
        new Date().getTime() - new Date("2018-01-01").getTime();
    const yearsOfExperience = millisecondsOfExperience / millisecondsPerYear;
    const yearsOfExperienceRounded = Math.round(yearsOfExperience * 2) / 2;
    const yearsOfExperienceDisplayValue =
        (yearsOfExperience < yearsOfExperienceRounded ? "nearly " : "") +
        yearsOfExperienceRounded;

    return (
        <Grid container spacing={{ xs: 5, sm: 8 }} alignItems="flex-start">
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
                    Lead Software Engineer with {yearsOfExperienceDisplayValue}{" "}
                    years of experience in cloud-native application development
                    for Kubernetes and cloud platforms. Background in
                    architecture, user experience (UX), development, deployment,
                    and ensuring site reliability of cloud-native applications
                    in production environments. Experience in owning the
                    technical direction of product areas and leading a team of
                    engineers.
                </Typography>
                <Divider sx={{ my: { xs: 3, sm: 6 }, opacity: 0.3 }} />
                <Box
                    sx={{
                        display: "flex",
                        gap: 1.5,
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
                                sx={{
                                    fontSize: 40,
                                    color: "text.secondary",
                                    border: "2px solid",
                                    borderColor: "divider",
                                    borderRadius: 1,
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
