import React from "react";
import { Button, Grid, Theme, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";

const banner = "/assets/banner.jpg";

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
        bannerImageContainer: {
            width: "100%",
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight ?? 0}px)`
        },
        bannerImage: {
            zIndex: -1
        },
        viewCvButton: {
            zIndex: 1
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
        window.open((process.env.PUBLIC_URL ?? "") + "/nadundesilva-cv.pdf");
    };

    return (
        <div className={classes.bannerContainer}>
            <Grid container className={classes.banner}>
                <Grid item xs={12}>
                    <Typography variant="h2" component="p" className={classes.introText}>Hi, I am</Typography>
                    <Typography variant="h2" component="p" className={classes.introText}>Nadun</Typography>
                    <Typography variant="h2" component="p" className={classes.introText}>De Silva</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" className={classes.tagLineText}>
                        Associate Technical Lead &amp; Deep Learning Enthusiast
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size={downloadButtonSize}
                        className={classes.viewCvButton} onClick={downloadCv}
                    >
                        View CV
                    </Button>
                </Grid>
            </Grid>
            <div className={classes.bannerImageContainer}>
                <Image src={banner} alt="Nadun De Silva Website Banner" className={classes.bannerImage}
                    layout="fill" objectFit="cover" priority={true}/>
            </div>
        </div>
    );
};

export default WelcomeBanner;
