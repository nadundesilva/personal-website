import React from "react";
import { Button, createStyles, Grid, makeStyles, Theme, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import banner from "./banner.jpg";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        bannerContainer: {
            position: "relative",
            width: "100%"
        },
        banner: {
            color: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "absolute",
            textAlign: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            padding: "17vh"
        },
        bannerImage: {
            width: "100%",
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight ?? 0}px)`,
            objectFit: "cover"
        },
        introText: {
            fontWeight: "bold",
            fontSize: "6vh"
        },
        tagLineText: {
            fontSize: "3vh"
        }
    });
});

const WelcomeBanner = (): React.ReactElement => {
    const classes = useStyles();
    const theme = useTheme();

    const isLarge = useMediaQuery(theme.breakpoints.up("xl"));
    const isMedium = useMediaQuery(theme.breakpoints.up("md"));
    const downloadButtonSize = isLarge
        ? "large"
        : (isMedium ? "medium" : "small");

    const downloadCv = (): void => {
        window.open(process.env.PUBLIC_URL + "/nadundesilva-cv.pdf");
    };

    return (
        <div className={classes.bannerContainer}>
            <Grid container className={classes.banner}>
                <Grid item xs={12}>
                    <Typography variant="h2" className={classes.introText}>Hi, I am</Typography>
                    <Typography variant="h2" className={classes.introText}>Nadun</Typography>
                    <Typography variant="h2" className={classes.introText}>De Silva</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.tagLineText}>
                        Associate Technical Lead &amp; Deep Learning Enthusiast
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size={downloadButtonSize} onClick={downloadCv}>
                        View CV
                    </Button>
                </Grid>
            </Grid>
            <img src={banner} alt="Nadun De Silva Website Banner" className={classes.bannerImage}/>
        </div>
    );
};

export default WelcomeBanner;
