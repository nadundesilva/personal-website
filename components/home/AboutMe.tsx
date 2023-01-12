/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Avatar,
    Divider,
    Grid,
    styled,
    Theme,
    Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import Image from "next/image";
import React from "react";

import { Photos } from "@/constants/images";

const ProfilePhoto = styled(Image)({
    width: "100%",
    height: "auto",
});

const InstituteIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const ItemDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const AboutMe = (): React.ReactElement => {
    const profilePhoto = (
        gridWidth: 4 | 12,
        sx: SxProps<Theme>,
    ): React.ReactElement => (
        <Grid item xs={gridWidth} sx={sx}>
            <Avatar sx={{ width: "100%", paddingTop: "100%" }}>
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

    const contactItem = (name: string, value: string): React.ReactElement => (
        <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: "bold" }}>{name}:</Typography>
            <Typography>{value}</Typography>
        </Grid>
    );

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {profilePhoto(12, { display: { xs: "block", md: "none" } })}
            <Grid item xs={12} md={8}>
                <Typography align={"justify"}>
                    I am currently leading the Observability area of Choreo at
                    WSO2. I have several years of working experience as a
                    Software Engineer working on multiple Research &amp;
                    Development projects at WSO2. I love learning about new
                    technologies and is particularly interested in Cloud
                    Technologoes &amp; Deep Learning.
                </Typography>
                <ItemDivider />
                <Typography>Bachelor of Science in Engineering</Typography>
                <Typography display="inline" color="textSecondary">
                    <InstituteIcon icon={faMapMarkerAlt} /> University of
                    Moratuwa
                </Typography>
                <ItemDivider />
                <Grid container spacing={3} justifyContent="center">
                    {contactItem("Phone", "+94 778 222 607")}
                    {contactItem("Email", "nadunrds@gmail.com")}
                    {contactItem("Website", "nadundesilva.github.io")}
                </Grid>
            </Grid>
            {profilePhoto(4, { display: { xs: "none", md: "block" } })}
        </Grid>
    );
};

export default AboutMe;
