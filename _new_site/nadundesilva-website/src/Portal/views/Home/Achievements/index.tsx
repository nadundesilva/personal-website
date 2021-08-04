import React from "react";
import classNames from "classnames";
import { createStyles, Grid, ImageList, ImageListItem, makeStyles, Theme, Typography } from "@material-ui/core";
import wso2OutstandingContributorImage from "./wso2-outstanding-contributor.jpg";
import nasaSpaceApps2017 from "./nasa-space-apps-2017.jpg";
import hsbcYouthEnterpriseAwards2015 from "./hsbc-youth-enterprise-awards-2015.jpg";
import deansList2017 from "./deans-list-2017.jpg";
import angelHack2016 from "./angel-hack-2016.jpg";

const useStyles = makeStyles((theme: Theme) =>
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
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 9999

                }
            }
        },
        imageListItemImageOverlay: {
            color: "#ffffff",
            position: "absolute",
            textAlign: "center"
        },
        imageListItemText: {
            fontWeight: "bold"
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
    const renderImageListItem = (title: string, imageLink: string, rowCount: number): React.ReactElement => (
        <ImageListItem rows={rowCount} cols={1}
            className={classNames(classes.imageListItem, classes.imageListItemImageContainer)}>
            <Grid container justifyContent="center" alignItems="center" className={classes.imageListItemImageOverlay}>
                <Grid item xs={6}>
                    <Typography className={classes.imageListItemText}>{title}</Typography>
                </Grid>
            </Grid>
            <img src={imageLink} alt={title}/>
        </ImageListItem>
    );
    return (
        <ImageList rowHeight={160} cols={3}>
            <ImageListItem rows={2} cols={1} className={classes.imageListItem}>
                <ImageList rowHeight={160} cols={1}>
                    {renderImageListItem(NASA_SPACE_APPS_2017_TITLE, nasaSpaceApps2017, 1)}
                    {renderImageListItem(PLACEMENTS_IN_DEANS_LIST_TITLE, deansList2017, 1)}
                </ImageList>
            </ImageListItem>
            {renderImageListItem(WSO2_OUTSTANDING_CONTRIBUTOR_TITLE, wso2OutstandingContributorImage, 2)}
            <ImageListItem rows={2} cols={1} className={classes.imageListItem}>
                <ImageList rowHeight={160} cols={1}>
                    {renderImageListItem(HSBC_YOUTH_ENTERPRISE_AWARDS_2015_TITLE, hsbcYouthEnterpriseAwards2015, 1)}
                    {renderImageListItem(ANGEL_HACK_2016_TITLE, angelHack2016, 1)}
                </ImageList>
            </ImageListItem>
        </ImageList>
    );
};

export default Achievements;
