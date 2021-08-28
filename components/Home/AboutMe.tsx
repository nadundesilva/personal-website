import React from "react";
import { Avatar, createStyles, Divider, Grid, GridSize, Hidden, makeStyles, Theme, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const profilePicture = "/profile-photo.jpg";

const useStyles = makeStyles((theme: Theme) => {
    const descriptionSeparatorMargin = 2;
    return createStyles({
        descriptionSeparator: {
            marginTop: theme.spacing(descriptionSeparatorMargin),
            marginBottom: theme.spacing(descriptionSeparatorMargin)
        },
        profilePhoto: {
            width: "100%",
            height: "auto"
        },
        profilePhotoPadding: {
            padding: theme.spacing(2)
        },
        textIcon: {
            marginRight: theme.spacing(1)
        },
        contactInfoItemHeader: {
            fontWeight: "bold"
        }
    });
});

const AboutMe = (): React.ReactElement => {
    const classes = useStyles();

    const profilePhoto = (gridWidth: GridSize): React.ReactElement => (
        <Grid item xs={gridWidth}>
            <Avatar alt="Nadun De Silva" src={profilePicture} className={classes.profilePhoto}/>
        </Grid>
    );

    const contactItem = (name: string, value: string): React.ReactElement => (
        <Grid item xs={12} md={4}>
            <Typography className={classes.contactInfoItemHeader}>
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
                <Divider className={classes.descriptionSeparator} />
                <Typography>Bachelor of Science in Engineering</Typography>
                <Typography display="inline" color="textSecondary">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={classes.textIcon}/>
                    University of Moratuwa
                </Typography>
                <Divider className={classes.descriptionSeparator} />
                <Grid container spacing={3} justifyContent="center">
                    {contactItem("Phone", "+94 778 222 607")}
                    {contactItem("Email", "nadunrds@gmail.com")}
                    {contactItem("Website", "nadundesilva.github.io")}
                </Grid>
            </Grid>
            <Hidden smDown>{profilePhoto(4)}</Hidden>
        </Grid>
    );
};

export default AboutMe;
