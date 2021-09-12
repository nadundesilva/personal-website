import React from "react";
import { Avatar, Divider, Grid, Hidden, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const profilePicture = "/assets/profile-photo.jpg";

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
    const profilePhoto = (gridWidth: 4 | 12): React.ReactElement => (
        <Grid item xs={gridWidth}>
            <Avatar sx={{ width: "100%", paddingTop: "100%" }}>
                <ProfilePhoto src={profilePicture} alt="Nadun De Silva" layout="fill" objectFit="cover"
                    sizes={`${100 * (gridWidth / 12)}vw`}/>
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
            <Hidden mdUp>{profilePhoto(12)}</Hidden>
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
            <Hidden mdDown>{profilePhoto(4)}</Hidden>
        </Grid>
    );
};

export default AboutMe;
