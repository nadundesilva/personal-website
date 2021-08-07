import React from "react";
import { Button, createStyles, Grid, makeStyles, Theme, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import banner from "./banner.jpg";
import cvPdf from "./nadundesilva-cv.pdf";

const useStyles = makeStyles((theme: Theme) => {
    const horizontalPadding = (padding: number): { paddingTop: number, paddingLeft: number, paddingRight: number } => ({
        paddingTop: theme.spacing(padding),
        paddingLeft: theme.spacing(padding),
        paddingRight: theme.spacing(padding)
    });
    const fontSize = (size: number): { fontSize: string } => ({
        fontSize: `${size}em`
    });
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
            [theme.breakpoints.down("md")]: horizontalPadding(10),
            [theme.breakpoints.up("lg")]: horizontalPadding(20),
            [theme.breakpoints.up("xl")]: horizontalPadding(50)
        },
        bannerImage: {
            width: "100%",
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight ?? 0}px)`,
            objectFit: "cover"
        },
        introText: {
            [theme.breakpoints.down("sm")]: fontSize(2),
            [theme.breakpoints.up("sm")]: fontSize(4),
            [theme.breakpoints.up("xl")]: fontSize(8)
        },
        tagLineText: {
            [theme.breakpoints.down("sm")]: fontSize(1),
            [theme.breakpoints.up("sm")]: fontSize(2),
            [theme.breakpoints.up("xl")]: fontSize(5)
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
                    <Typography variant="h2" className={classes.introText}>Hi, I am</Typography>
                    <Typography variant="h2" className={classes.introText}>Nadun</Typography>
                    <Typography variant="h2" className={classes.introText}>De Silva</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.tagLineText}>
                        Software Engineer &amp; Deep Learning Enthusiast
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size={downloadButtonSize} onClick={downloadCv}>
                        Download CV
                    </Button>
                </Grid>
            </Grid>
            <img src={banner} alt="Nadun De Silva Website Banner" className={classes.bannerImage}/>
        </div>
    );
};

export default WelcomeBanner;
