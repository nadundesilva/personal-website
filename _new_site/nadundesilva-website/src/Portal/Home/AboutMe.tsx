import React from "react";
import { Avatar, createStyles, Divider, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import profilePicture from "../../components/images/profile-photo.jpg";

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
        },
        contactInfoItemHeader: {
            fontWeight: "bold"
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
                        <Typography className={classes.contactInfoItemHeader}>
                            Phone:
                        </Typography>
                        <Typography>+94 778 222 607</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.contactInfoItemHeader}>
                            Email:
                        </Typography>
                        <Typography>nadunrds@gmail.com</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.contactInfoItemHeader}>
                            Website:
                        </Typography>
                        <Typography>nadundesilva.github.io</Typography>
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
