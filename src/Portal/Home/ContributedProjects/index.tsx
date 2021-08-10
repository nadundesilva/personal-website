import React from "react";
import { createStyles, Grid, makeStyles, Theme, useTheme } from "@material-ui/core";
import ballerina from "./ballerina.svg";
import ballerinaWhite from "./ballerina-white.svg";
import cellery from "./cellery.svg";
import celleryWhite from "./cellery-white.svg";
import siddhi from "./siddhi.svg";
import siddhiWhite from "./siddhi-white.svg";
import choreo from "./choreo.svg";
import choreoWhite from "./choreo-white.svg";
import { useScrollOffset } from "../../../components";

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
            <img alt={alt} className={classes.projectLogo}
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
