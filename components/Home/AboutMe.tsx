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
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Image from "next/image";
import React from "react";

const profilePicture = "/assets/profile-photo.jpg";
const profilePictureBlurDataUrl = "data:image/webp;base64,UklGRi4EAABXRUJQVlA4WAoAAAAgAAAAcAAAcAAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCDwAQAA8BEAnQEqcQBxAD7hYqJNuD+uojN5bMvwHAljBwhm/76VBpgqyrv5KYVMBpK14mY98RRxFeDHf1ZIB1x7wzVIgOgcqYPn1n1EYcohduVnDsJeE9oNyfHRQCmW97arNKNNQ7wTtyqALtB7fOMUo9eoaTyLCefv+1B2blUWQMK08YfrC9xECaStlyvVjkDT2TTYA9ob+dTF9oAA/vCl1/ujze0DWacOWt+CuTN4pbUxSJcPevRXz0rWMyzL39gH/OAXb+j6b9zjosJH0LWhitDWCjmNp5bQRBJgPwK61nCcuXTxS4F+Y6IyM2RWokJjQt+j67KKm+JgUNqhqp29bpWm7U1apzXE++fdmpso2RBYVLX7/QN1Y2F1keLe32qIObUA7rG4rShHp6ZQmBEQaVTMgVixQqaOCuaZtAp9KaqYH/YgHFe009us58zaCOVFszj4eyfjc1yB3LF6F31wKN2aTzSbEhhtgUAZA1JRKwVdgZvWJiRdnQcaXHliv+2bP5qGFGYjHLJYTRTxT5JOmd3QEttX+dSq4Gl4TOKYDzgP/i8wPLACJbE13Arra3LBCR8cIUINENQOdw6cbwdDIATfOoSzyJpNSZI6soUJDOsImP+vIfxeDRazExqylRC0Vtmhgz62sHXSlAMWdEyGAAAAAA==";

const ProfilePhoto = styled(Image)({
    width: "100%",
    height: "auto"
});

const InstituteIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    marginRight: theme.spacing(1)
}));

const ItemDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}));

const AboutMe = (): React.ReactElement => {
    const profilePhoto = (gridWidth: 4 | 12, sx: SxProps<Theme>): React.ReactElement => (
        <Grid item xs={gridWidth} sx={sx}>
            <Avatar sx={{ width: "100%", paddingTop: "100%" }}>
                <ProfilePhoto src={profilePicture} alt="Nadun De Silva" layout="fill" objectFit="cover"
                    sizes={`${100 * (gridWidth / 12)}vw`} placeholder="blur"
                    blurDataURL={profilePictureBlurDataUrl}/>
            </Avatar>
        </Grid>
    );

    const contactItem = (name: string, value: string): React.ReactElement => (
        <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: "bold" }}>
                {name}:
            </Typography>
            <Typography>{value}</Typography>
        </Grid>
    );

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {profilePhoto(12, { display: { xs: "block", md: "none" } })}
            <Grid item xs={12} md={8}>
                <Typography align={"justify"}>
                    I am currently leading the Observability area of Choreo at WSO2.
                    I have several years of working experience as a Software Engineer
                    working on multiple Research &amp; Development projects at WSO2.
                    I love learning about new technologies and is particularly
                    interested in Deep Learning.
                </Typography>
                <ItemDivider/>
                <Typography>Bachelor of Science in Engineering</Typography>
                <Typography display="inline" color="textSecondary">
                    <InstituteIcon icon={faMapMarkerAlt}/> University of Moratuwa
                </Typography>
                <ItemDivider/>
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
