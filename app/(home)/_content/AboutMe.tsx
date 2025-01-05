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
import { LocationCity } from "@mui/icons-material";
import {
    Avatar,
    Divider,
    Grid2 as Grid,
    styled,
    type Theme,
    Typography,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import Image from "next/image";
import React from "react";

import { Photos } from "@/constants/images";
import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";

const ProfilePhoto = styled(Image)({
    width: "100%",
    height: "auto",
});

const InstituteIcon = styled(LocationCity)(({ theme }) => ({
    mr: theme.spacing(1),
}));

const ItemDivider = styled(Divider)(({ theme }) => ({
    my: theme.spacing(2),
}));

const AboutMe = (): React.ReactElement => {
    const profilePhoto = (
        gridWidth: 4 | 12,
        sx: SxProps<Theme>,
    ): React.ReactElement => (
        <Grid size={gridWidth} sx={sx}>
            <Avatar sx={{ width: "100%", pt: "100%" }}>
                <ProfilePhoto
                    src={Photos.ProfilePhoto.src}
                    alt={Photos.ProfilePhoto.alt}
                    sizes={`${100 * (gridWidth / 12)}vw`}
                    placeholder="blur"
                    fill
                    style={{ objectFit: "cover" }}
                    blurDataURL={Photos.ProfilePhoto.blurDataURL}
                />
            </Avatar>
        </Grid>
    );

    const contactItem = (
        name: string,
        value: string,
        gridColumns: number,
    ): React.ReactElement => (
        <Grid size={{ xs: 12, md: gridColumns }}>
            <Typography sx={{ fontWeight: "bold" }}>{name}:</Typography>
            <Typography>{value}</Typography>
        </Grid>
    );

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {profilePhoto(12, { display: { xs: "block", md: "none" } })}
            <Grid size={{ xs: 12, md: 8 }}>
                <Typography align="justify">
                    I am currently working as a Senior Software Engineer at
                    Orion Health. I have several years of working experience as
                    a Software Engineer working on multiple Research &amp;
                    Development projects as well as leading few of them. I love
                    learning about new technologies and is particularly
                    interested in Cloud Technologoes &amp; Deep Learning.
                </Typography>
                <ItemDivider />
                <Typography>Bachelor of Science in Engineering</Typography>
                <Typography display="inline" color="textSecondary">
                    <InstituteIcon /> University of Moratuwa
                </Typography>
                <ItemDivider />
                <Grid container justifyContent="space-between">
                    {contactItem("Email", "nadunrds@gmail.com", 6)}
                    {contactItem("Website", WEBSITE_PUBLIC_URL, 6)}
                </Grid>
            </Grid>
            {profilePhoto(4, { display: { xs: "none", md: "block" } })}
        </Grid>
    );
};

export default AboutMe;
