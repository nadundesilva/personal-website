import React from "react";
import { Avatar, createStyles, Divider, Grid, makeStyles, Theme } from "@material-ui/core";
import profilePicture from "./profile-photo.jpg";

const useStyles = makeStyles((theme: Theme) => {
    const descriptionSeparatorMargin = 2;
    return createStyles({
        sectionContent: {
            padding: theme.spacing(3)
        },
        descriptionSeparator: {
            marginTop: theme.spacing(descriptionSeparatorMargin),
            marginBottom: theme.spacing(descriptionSeparatorMargin)
        },
        profilePhoto: {
            width: "100%",
            height: "auto"
        }
    });
});

const AboutMe = (): React.ReactElement => {
    const classes = useStyles();
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center" className={classes.sectionContent}>
            <Grid item xs={8}>
                I currently work at WSO2 on leading the Observability area in an upcoming
                Cloud Platform. I have several years of working experience as a software
                engineer working on multiple Research &amp; Development projects at WSO2.
                I love learning about new technologies and is particularly interested
                in Deep Learning.

                <Divider className={classes.descriptionSeparator} />
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={4}>
                        <div>Phone:</div>
                        <div>+94 778 222 607</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Email:</div>
                        <div>nadunrds@gmail.com</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Website:</div>
                        <div>nadundesilva.github.io</div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Avatar alt="Nadun De Silva" src={profilePicture} className={classes.profilePhoto}/>
            </Grid>
        </Grid>
    );
};

export default AboutMe;
