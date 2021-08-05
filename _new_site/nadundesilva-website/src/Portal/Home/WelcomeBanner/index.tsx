import React from "react";
import { Button, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import banner from "./banner.jpg";
import cvPdf from "./nadundesilva-cv.pdf";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            padding: "20vh"
        },
        bannerImage: {
            width: "100%",
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight ?? 0}px)`,
            objectFit: "cover"
        }
    })
);

const WelcomeBanner = (): React.ReactElement => {
    const classes = useStyles();
    const downloadCv = (): void => {
        const a = document.createElement("a");
        a.href = cvPdf;
        a.setAttribute("download", "nadundesilva-cv.pdf");
        a.click();
        a.remove();
    };
    return (
        <div className={classes.bannerContainer}>
            <Grid container className={classes.banner}>
                <Grid item xs={12}>
                    <Typography variant="h2">Hi, I am</Typography>
                    <Typography variant="h2">Nadun</Typography>
                    <Typography variant="h2">De Silva</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Software Engineer &amp; Deep Learning Enthusiast
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={downloadCv}>
                        Download CV
                    </Button>
                </Grid>
            </Grid>
            <img src={banner} alt="Nadun De Silva Website Banner" className={classes.bannerImage}/>
        </div>
    );
};

export default WelcomeBanner;
