import React from "react";
import classNames from "classnames";
import { createStyles, Grid, ImageList, ImageListItem, makeStyles, Typography } from "@material-ui/core";
import wso2OutstandingContributorImage from "./wso2-outstanding-contributor.jpg";
import nasaSpaceApps2017 from "./nasa-space-apps-2017.jpg";
import hsbcYouthEnterpriseAwards2015 from "./hsbc-youth-enterprise-awards-2015.jpg";
import deansList2017 from "./deans-list-2017.jpg";
import angelHack2016 from "./angel-hack-2016.jpg";

const useStyles = makeStyles(() =>
    createStyles({
        imageListItem: {
            height: "auto"
        },
        imageListItemImageContainer: {
            position: "relative",
            "&:hover": {
                "& $imageListItemImageOverlay": {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.8,
                    zIndex: 999

                }
            }
        },
        imageListItemImageOverlay: {
            color: "#ffffff",
            backgroundColor: "#000000",
            position: "absolute",
            textAlign: "center",
            opacity: 0
        }
    })
);

const NASA_SPACE_APPS_2017_TITLE = "Global Finalist - Galactic Impact - NASA Space Apps Challenge 2017";
const PLACEMENTS_IN_DEANS_LIST_TITLE = "Placements in Dean’s List";
const WSO2_OUTSTANDING_CONTRIBUTOR_TITLE = "WSO2 Sustained Outstanding Contribution Award";
const HSBC_YOUTH_ENTERPRISE_AWARDS_2015_TITLE = "Finalist - British Council HSBC Youth Enterprise Awards 2015";
const ANGEL_HACK_2016_TITLE = "Finalist - Angel Hack 2016";

const Achievements = (): React.ReactElement => {
    const classes = useStyles();
    const imageListItem = (title: string, imageLink: string, rowCount: number): React.ReactElement => (
        <ImageListItem rows={rowCount} cols={1}
            className={classNames(classes.imageListItem, classes.imageListItemImageContainer)}>
            <Grid container justifyContent="center" alignItems="center" className={classes.imageListItemImageOverlay}>
                <Grid item xs={6}>
                    <Typography>{title}</Typography>
                </Grid>
            </Grid>
            <img src={imageLink} alt={title}/>
        </ImageListItem>
    );
    return (
        <ImageList rowHeight={160} cols={3}>
            <ImageListItem rows={2} cols={1} className={classes.imageListItem}>
                <ImageList rowHeight={160} cols={1}>
                    {imageListItem(NASA_SPACE_APPS_2017_TITLE, nasaSpaceApps2017, 1)}
                    {imageListItem(PLACEMENTS_IN_DEANS_LIST_TITLE, deansList2017, 1)}
                </ImageList>
            </ImageListItem>
            {imageListItem(WSO2_OUTSTANDING_CONTRIBUTOR_TITLE, wso2OutstandingContributorImage, 2)}
            <ImageListItem rows={2} cols={1} className={classes.imageListItem}>
                <ImageList rowHeight={160} cols={1}>
                    {imageListItem(HSBC_YOUTH_ENTERPRISE_AWARDS_2015_TITLE, hsbcYouthEnterpriseAwards2015, 1)}
                    {imageListItem(ANGEL_HACK_2016_TITLE, angelHack2016, 1)}
                </ImageList>
            </ImageListItem>
        </ImageList>
    );
};

export default Achievements;
