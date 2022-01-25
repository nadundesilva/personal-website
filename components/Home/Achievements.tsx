/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Box, Container, Grid, Grow, ImageList, ImageListItem, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import React from "react";

import { useScrollOffset } from "@/components/Layout";

const wso2OutstandingContributorImage = "/assets/achievements/wso2-outstanding-contributor.jpg";
const nasaSpaceApps2017 = "/assets/achievements/nasa-space-apps-2017.jpg";
const hsbcYouthEnterpriseAwards2015 = "/assets/achievements/hsbc-youth-enterprise-awards-2015.jpg";
const deansList2017 = "/assets/achievements/deans-list-2017.jpg";
const angelHack2016 = "/assets/achievements/angel-hack-2016.jpg";

const PREFIX = "Home-Achievements";
const classes = {
    imageListItemImageOverlay: `${PREFIX}-imageListItemImageOverlay`
};

const FullSizeImageListItem = styled(ImageListItem)({
    width: "100%",
    height: "auto"
});

const ImageListItemImageOverlay = styled(Grid)({
    color: "#ffffff",
    position: "absolute",
    textAlign: "center"
});

const NASA_SPACE_APPS_2017_TITLE = "Global Finalist - Galactic Impact - NASA Space Apps Challenge 2017";
const PLACEMENTS_IN_DEANS_LIST_TITLE = "Placements in Dean's List";
const WSO2_OUTSTANDING_CONTRIBUTOR_TITLE = "WSO2 Sustained Outstanding Contribution Award - Consecutive years from 2019 to 2021";
const HSBC_YOUTH_ENTERPRISE_AWARDS_2015_TITLE = "Finalist - British Council HSBC Youth Enterprise Awards 2015";
const ANGEL_HACK_2016_TITLE = "Finalist - Angel Hack 2016";

interface AchievementSection {
    title: string,
    imageLink: string,
    animationTimeoutFactor: number,
}

const ROW_HEIGHT = 300;

const Achievements = (): React.ReactElement => {
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const achievementSections: AchievementSection[] = [
        {
            title: NASA_SPACE_APPS_2017_TITLE,
            imageLink: nasaSpaceApps2017,
            animationTimeoutFactor: 1.75
        },
        {
            title: PLACEMENTS_IN_DEANS_LIST_TITLE,
            imageLink: deansList2017,
            animationTimeoutFactor: 1
        },
        {
            title: WSO2_OUTSTANDING_CONTRIBUTOR_TITLE,
            imageLink: wso2OutstandingContributorImage,
            animationTimeoutFactor: 2
        },
        {
            title: HSBC_YOUTH_ENTERPRISE_AWARDS_2015_TITLE,
            imageLink: hsbcYouthEnterpriseAwards2015,
            animationTimeoutFactor: 1.5
        },
        {
            title: ANGEL_HACK_2016_TITLE,
            imageLink: angelHack2016,
            animationTimeoutFactor: 1.25
        }
    ];

    const renderImageListItem = (achievementIndex: number, rowCount: number, totalColumns: number): React.ReactElement => {
        const achievementSection: AchievementSection = achievementSections[achievementIndex];
        return (
            <FullSizeImageListItem rows={rowCount} cols={1}
                sx={{
                    position: "relative",
                    "&:hover": {
                        [`& .${classes.imageListItemImageOverlay}`]: {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            zIndex: 1
                        }
                    }
                }}
            >
                <Grow in={offset > 0.3} timeout={1000 * achievementSection.animationTimeoutFactor}>
                    <Box sx={{ height: "100%", position: "relative" }}>
                        <ImageListItemImageOverlay container justifyContent="center" alignItems="center"
                            className={classes.imageListItemImageOverlay}
                        >
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>{achievementSection.title}</Typography>
                            </Grid>
                        </ImageListItemImageOverlay>
                        <Image src={achievementSection.imageLink} alt={achievementSection.title} layout="fill" objectFit="cover"
                            sizes={`${Math.ceil(100 / totalColumns)}vw`}/>
                    </Box>
                </Grow>
            </FullSizeImageListItem>
        );
    };

    const theme = useTheme();
    const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));

    const LARGE_SCREEN_COLUMN_COUNT = 3;
    const SMALL_SCREEN_COLUMN_COUNT = 1;
    return (
        <Container maxWidth={false} disableGutters ref={rootRef}>
            {
                isAboveMd
                    ? (
                        <ImageList rowHeight={ROW_HEIGHT} cols={LARGE_SCREEN_COLUMN_COUNT}>
                            <FullSizeImageListItem rows={2} cols={1}>
                                <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                                    {renderImageListItem(0, 1, LARGE_SCREEN_COLUMN_COUNT)}
                                    {renderImageListItem(1, 1, LARGE_SCREEN_COLUMN_COUNT)}
                                </ImageList>
                            </FullSizeImageListItem>
                            {renderImageListItem(2, 2, LARGE_SCREEN_COLUMN_COUNT)}
                            <FullSizeImageListItem rows={2} cols={1}>
                                <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                                    {renderImageListItem(3, 1, LARGE_SCREEN_COLUMN_COUNT)}
                                    {renderImageListItem(4, 1, LARGE_SCREEN_COLUMN_COUNT)}
                                </ImageList>
                            </FullSizeImageListItem>
                        </ImageList>
                    )
                    : (
                        <ImageList rowHeight={ROW_HEIGHT} cols={SMALL_SCREEN_COLUMN_COUNT}>
                            {renderImageListItem(0, 1, SMALL_SCREEN_COLUMN_COUNT)}
                            {renderImageListItem(1, 1, SMALL_SCREEN_COLUMN_COUNT)}
                            {renderImageListItem(2, 1, SMALL_SCREEN_COLUMN_COUNT)}
                            {renderImageListItem(3, 1, SMALL_SCREEN_COLUMN_COUNT)}
                            {renderImageListItem(4, 1, SMALL_SCREEN_COLUMN_COUNT)}
                        </ImageList>
                    )
            }
        </Container>
    );
};

export default Achievements;
