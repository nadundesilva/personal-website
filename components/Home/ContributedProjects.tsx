import React from "react";
import { Box, Grid, Slide, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { useScrollOffset } from "@/components/Layout";
import Image from "next/image";

const ballerina = "/assets/projects/ballerina.svg";
const ballerinaWhite = "/assets/projects/ballerina-white.svg";
const cellery = "/assets/projects/cellery.svg";
const celleryWhite = "/assets/projects/cellery-white.svg";
const siddhi = "/assets/projects/siddhi.svg";
const siddhiWhite = "/assets/projects/siddhi-white.svg";
const choreo = "/assets/projects/choreo.svg";
const choreoWhite = "/assets/projects/choreo-white.svg";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        projectLogo: {
            display: "block",
            margin: "auto",
            padding: theme.spacing(5),
            width: "100%"
        }
    })
);

const ContributedProjects = (): React.ReactElement => {
    const classes = useStyles();
    const theme = useTheme();
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 34vw, 
        (min-width: ${mdWidth}px) 25vw`;
    const renderCarouselItem = (imageLink: string, blackThemeImageLink: string, alt: string): React.ReactElement => (
        <Grid item xs={12} sm={4} md={3}>
            <Slide direction={"up"} in={offset > 0.5} timeout={2000}>
                <Box
                    sx={{
                        position: "relative",
                        height: (theme) => theme.spacing(5),
                        marginLeft: 5,
                        marginRight: 5
                    }}
                >
                    <Image alt={alt} className={classes.projectLogo} layout="fill" objectFit="contain" sizes={imageSizes}
                        src={theme?.palette?.mode === "light" ? imageLink : blackThemeImageLink}/>
                </Box>
            </Slide>
        </Grid>
    );

    return (
        <Grid ref={rootRef} container spacing={3} justifyContent="center" alignItems="center">
            {renderCarouselItem(choreo, choreoWhite, "Choreo")}
            {renderCarouselItem(ballerina, ballerinaWhite, "Ballerina")}
            {renderCarouselItem(cellery, celleryWhite, "Cellery")}
            {renderCarouselItem(siddhi, siddhiWhite, "Siddhi")}
        </Grid>
    );
};

export default ContributedProjects;
