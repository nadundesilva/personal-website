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
import {
    Box,
    Container,
    Grid,
    Grow,
    ImageList,
    ImageListItem,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";

import { useScrollOffset } from "@/components/layout";
import { Photos, ImageAsset } from "@/constants";

const PREFIX = "Home-Achievements";
const classes = {
    imageListItemImageOverlay: `${PREFIX}-imageListItemImageOverlay`,
};

const FullSizeImageListItem = styled(ImageListItem)({
    width: "100%",
    height: "auto",
});

const ImageListItemImageOverlay = styled(Grid)({
    color: "#ffffff",
    position: "absolute",
    textAlign: "center",
});

interface AchievementSection {
    title: string;
    photo: ImageAsset;
    animationTimeoutFactor: number;
}

const ROW_HEIGHT = 300;

const Achievements = (): React.ReactElement => {
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const achievementSections: AchievementSection[] = [
        {
            title: "Global Finalist - Galactic Impact - NASA Space Apps Challenge 2017",
            photo: Photos.NASASpaceAppsChallenge2017,
            animationTimeoutFactor: 1.75,
        },
        {
            title: "Placements in Dean's List",
            photo: Photos.UOMDeansList2017,
            animationTimeoutFactor: 1,
        },
        {
            title: "WSO2 Sustained Outstanding Contribution Award - Consecutive years from 2019 to 2021",
            photo: Photos.WSO2OutstandingContributor2019,
            animationTimeoutFactor: 2,
        },
        {
            title: "Finalist - British Council HSBC Youth Enterprise Awards 2015",
            photo: Photos.HSBCYouthEnterpriseAwards2015,
            animationTimeoutFactor: 1.5,
        },
        {
            title: "Finalist - Angel Hack 2016",
            photo: Photos.AngelHack2016,
            animationTimeoutFactor: 1.25,
        },
    ];

    const renderImageListItem = (
        achievementIndex: number,
        rowCount: number,
        totalColumns: number,
    ): React.ReactElement => {
        const achievementSection: AchievementSection =
            achievementSections[achievementIndex];
        return (
            <FullSizeImageListItem
                rows={rowCount}
                cols={1}
                sx={{
                    "position": "relative",
                    "&:hover": {
                        [`& .${classes.imageListItemImageOverlay}`]: {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            zIndex: 1,
                        },
                    },
                }}
            >
                <Grow
                    in={offset > 0.3}
                    timeout={1000 * achievementSection.animationTimeoutFactor}
                >
                    <Box sx={{ height: "100%", position: "relative" }}>
                        <ImageListItemImageOverlay
                            container
                            justifyContent="center"
                            alignItems="center"
                            className={classes.imageListItemImageOverlay}
                        >
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {achievementSection.title}
                                </Typography>
                            </Grid>
                        </ImageListItemImageOverlay>
                        <Image
                            src={achievementSection.photo.src}
                            alt={achievementSection.photo.alt}
                            layout="fill"
                            objectFit="cover"
                            sizes={`${Math.ceil(100 / totalColumns)}vw`}
                            placeholder="blur"
                            blurDataURL={achievementSection.photo.blurDataURL}
                        />
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
            {isAboveMd ? (
                <ImageList
                    rowHeight={ROW_HEIGHT}
                    cols={LARGE_SCREEN_COLUMN_COUNT}
                >
                    <FullSizeImageListItem rows={2} cols={1}>
                        <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                            {renderImageListItem(
                                0,
                                1,
                                LARGE_SCREEN_COLUMN_COUNT,
                            )}
                            {renderImageListItem(
                                1,
                                1,
                                LARGE_SCREEN_COLUMN_COUNT,
                            )}
                        </ImageList>
                    </FullSizeImageListItem>
                    {renderImageListItem(2, 2, LARGE_SCREEN_COLUMN_COUNT)}
                    <FullSizeImageListItem rows={2} cols={1}>
                        <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                            {renderImageListItem(
                                3,
                                1,
                                LARGE_SCREEN_COLUMN_COUNT,
                            )}
                            {renderImageListItem(
                                4,
                                1,
                                LARGE_SCREEN_COLUMN_COUNT,
                            )}
                        </ImageList>
                    </FullSizeImageListItem>
                </ImageList>
            ) : (
                <ImageList
                    rowHeight={ROW_HEIGHT}
                    cols={SMALL_SCREEN_COLUMN_COUNT}
                >
                    {renderImageListItem(0, 1, SMALL_SCREEN_COLUMN_COUNT)}
                    {renderImageListItem(1, 1, SMALL_SCREEN_COLUMN_COUNT)}
                    {renderImageListItem(2, 1, SMALL_SCREEN_COLUMN_COUNT)}
                    {renderImageListItem(3, 1, SMALL_SCREEN_COLUMN_COUNT)}
                    {renderImageListItem(4, 1, SMALL_SCREEN_COLUMN_COUNT)}
                </ImageList>
            )}
        </Container>
    );
};

export default Achievements;
