import React from "react";
import classNames from "classnames";
import { createStyles, Grid, Hidden, ImageList, ImageListItem, makeStyles, Typography } from "@material-ui/core";
import wso2OutstandingContributorImage from "./wso2-outstanding-contributor.jpg";
import nasaSpaceApps2017 from "./nasa-space-apps-2017.jpg";
import hsbcYouthEnterpriseAwards2015 from "./hsbc-youth-enterprise-awards-2015.jpg";
import deansList2017 from "./deans-list-2017.jpg";
import angelHack2016 from "./angel-hack-2016.jpg";
import { useScrollOffset } from "../../../components";

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
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1
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

interface AchievementSection {
    title: string,
    imageLink: string,
    animationOffset: number,
};

const ROW_HEIGHT = 300;

const Achievements = (): React.ReactElement => {
    const classes = useStyles();
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const achievementSections: AchievementSection[] = [
        {
            title: NASA_SPACE_APPS_2017_TITLE,
            imageLink: nasaSpaceApps2017,
            animationOffset: 0.4
        },
        {
            title: PLACEMENTS_IN_DEANS_LIST_TITLE,
            imageLink: deansList2017,
            animationOffset: 0.1
        },
        {
            title: WSO2_OUTSTANDING_CONTRIBUTOR_TITLE,
            imageLink: wso2OutstandingContributorImage,
            animationOffset: 0.5
        },
        {
            title: HSBC_YOUTH_ENTERPRISE_AWARDS_2015_TITLE,
            imageLink: hsbcYouthEnterpriseAwards2015,
            animationOffset: 0.3
        },
        {
            title: ANGEL_HACK_2016_TITLE,
            imageLink: angelHack2016,
            animationOffset: 0.2
        }
    ];

    const renderImageListItem = (achievementIndex: number, rowCount: number): React.ReactElement => {
        const achievementSection: AchievementSection = achievementSections[achievementIndex];
        const imageOffset = Math.max(offset - achievementSection.animationOffset, 0) / (1 - achievementSection.animationOffset);
        return (
            <ImageListItem rows={rowCount} cols={1}
                className={classNames(classes.imageListItem, classes.imageListItemImageContainer)}
                style={{
                    transform: `scale(${imageOffset}, ${imageOffset})`,
                    opacity: imageOffset
                }}>
                <Grid container justifyContent="center" alignItems="center" className={classes.imageListItemImageOverlay}>
                    <Grid item xs={6}>
                        <Typography className={classes.imageListItemText}>{achievementSection.title}</Typography>
                    </Grid>
                </Grid>
                <img src={achievementSection.imageLink} alt={achievementSection.title}/>
            </ImageListItem>
        );
    };

    return (
        <div ref={rootRef}>
            <Hidden smDown>
                <ImageList rowHeight={ROW_HEIGHT} cols={3}>
                    <ImageListItem rows={2} cols={1} className={classes.imageListItem}>
                        <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                            {renderImageListItem(0, 1)}
                            {renderImageListItem(1, 1)}
                        </ImageList>
                    </ImageListItem>
                    {renderImageListItem(2, 2)}
                    <ImageListItem rows={2} cols={1} className={classes.imageListItem}>
                        <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                            {renderImageListItem(3, 1)}
                            {renderImageListItem(4, 1)}
                        </ImageList>
                    </ImageListItem>
                </ImageList>
            </Hidden>
            <Hidden mdUp>
                <ImageList cols={1}>
                    {renderImageListItem(0, 1)}
                    {renderImageListItem(1, 1)}
                    {renderImageListItem(2, 1)}
                    {renderImageListItem(3, 1)}
                    {renderImageListItem(4, 1)}
                </ImageList>
            </Hidden>
        </div>
    );
};

export default Achievements;
