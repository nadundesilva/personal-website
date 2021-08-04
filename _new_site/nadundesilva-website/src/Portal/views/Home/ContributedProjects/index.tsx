import React from "react";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import ballerina from "./ballerina.svg";
import cellery from "./cellery.svg";
import siddhi from "./siddhi.svg";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        carouselItem: {
            display: "block",
            margin: "auto",
            height: theme.spacing(10)
        }
    })
);

const ContributedProjects = (): React.ReactElement => {
    const classes = useStyles();
    const renderCarouselItem = (imageLink: string, alt: string): React.ReactElement => (
        <Grid item xs={4}>
            <img src={imageLink} alt={alt} className={classes.carouselItem}/>
        </Grid>
    );
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            {renderCarouselItem(ballerina, "Ballerina")}
            {renderCarouselItem(cellery, "Cellery")}
            {renderCarouselItem(siddhi, "Siddhi")}
        </Grid>
    );
};

export default ContributedProjects;
