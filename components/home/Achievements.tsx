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
const wso2OutstandingContributorImageBlurDataUrl = "data:image/webp;base64,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";
const nasaSpaceApps2017 = "/assets/achievements/nasa-space-apps-2017.jpg";
const nasaSpaceApps2017BlurDataUrl = "data:image/webp;base64,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";
const hsbcYouthEnterpriseAwards2015 = "/assets/achievements/hsbc-youth-enterprise-awards-2015.jpg";
const hsbcYouthEnterpriseAwards2015BlurDataUrl = "data:image/webp;base64,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";
const deansList2017 = "/assets/achievements/deans-list-2017.jpg";
const deansList2017BlurDataUrl = "data:image/webp;base64,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";
const angelHack2016 = "/assets/achievements/angel-hack-2016.jpg";
const angelHack2016BlurDataUrl = "data:image/webp;base64,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";

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
    blurDataUrl: string,
    animationTimeoutFactor: number,
}

const ROW_HEIGHT = 300;

const Achievements = (): React.ReactElement => {
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const achievementSections: AchievementSection[] = [
        {
            title: NASA_SPACE_APPS_2017_TITLE,
            imageLink: nasaSpaceApps2017,
            blurDataUrl: nasaSpaceApps2017BlurDataUrl,
            animationTimeoutFactor: 1.75
        },
        {
            title: PLACEMENTS_IN_DEANS_LIST_TITLE,
            imageLink: deansList2017,
            blurDataUrl: deansList2017BlurDataUrl,
            animationTimeoutFactor: 1
        },
        {
            title: WSO2_OUTSTANDING_CONTRIBUTOR_TITLE,
            imageLink: wso2OutstandingContributorImage,
            blurDataUrl: wso2OutstandingContributorImageBlurDataUrl,
            animationTimeoutFactor: 2
        },
        {
            title: HSBC_YOUTH_ENTERPRISE_AWARDS_2015_TITLE,
            imageLink: hsbcYouthEnterpriseAwards2015,
            blurDataUrl: hsbcYouthEnterpriseAwards2015BlurDataUrl,
            animationTimeoutFactor: 1.5
        },
        {
            title: ANGEL_HACK_2016_TITLE,
            imageLink: angelHack2016,
            blurDataUrl: angelHack2016BlurDataUrl,
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
                            sizes={`${Math.ceil(100 / totalColumns)}vw`} placeholder="blur"
                            blurDataURL={achievementSection.blurDataUrl}/>
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
