import React from "react";
import { createStyles, Grid, makeStyles, Theme, useTheme } from "@material-ui/core";
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

    const renderCarouselItem = (imageLink: string, blackThemeImageLink: string, alt: string): React.ReactElement => (
        <Grid item xs={12} sm={4} md={3}
            style={{
                transform: `scale(${offset}, ${offset})`,
                opacity: offset
            }}
        >
            <Image alt={alt} className={classes.projectLogo} layout="fill" objectFit="contain"
                src={theme?.palette?.type === "light" ? imageLink : blackThemeImageLink}/>
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
