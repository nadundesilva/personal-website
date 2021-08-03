import React from "react";
import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import banner from "./banner.jpg";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bannerContainer: {
            position: "relative",
            width: "100%"
        },
        banner: {
            color: "#ffffff",
            backgroundColor: "#000000",
            opacity: 0.8,
            position: "absolute",
            textAlign: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            padding: "40vh"
        },
        bannerImage: {
            width: "100%",
            height: `calc(100vh - ${theme.mixins.toolbar.height ?? 0}px)`,
            objectFit: "cover"
        }
    })
);

const WelcomeBanner = (): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.bannerContainer}>
            <Grid container justifyContent="center" alignItems="center" className={classes.banner}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        Hi, I am Nadun De Silva
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Software Engineer &amp; Deep Learning Enthusiast
                    </Typography>
                </Grid>
            </Grid>
            <img src={banner} alt="Nadun De Silva Website Banner" className={classes.bannerImage}/>
        </div>
    );
};

export default WelcomeBanner;
