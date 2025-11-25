/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.com
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import {
    Box,
    Container,
    Grid,
    ImageList,
    ImageListItem,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import type React from "react";

import { Photos, type ImageAsset } from "@/constants/images";

const PREFIX = "Home-Achievements";
const classes = {
    imageListItemImageOverlay: `${PREFIX}-imageListItemImageOverlay`,
};

const FullSizeImageListItem = styled(ImageListItem)({
    width: "100%",
    height: "auto",
});

const ImageListItemImageOverlay = styled(Grid)(({ theme }) => ({
    color: theme.palette.mode === "light" ? "#000000" : "#ffffff",
    backgroundColor:
        theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    textAlign: "center",
}));

interface AchievementSection {
    title: string;
    photo: ImageAsset;
    animationTimeoutFactor: number;
}

const ROW_HEIGHT = 300;

const Achievements = (): React.ReactElement => {
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
                            zIndex: 1,
                        },
                    },
                }}
            >
                <Box sx={{ height: "100%", position: "relative" }}>
                    <ImageListItemImageOverlay
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={classes.imageListItemImageOverlay}
                    >
                        <Grid size={6}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                {achievementSection.title}
                            </Typography>
                        </Grid>
                    </ImageListItemImageOverlay>
                    <Image
                        src={achievementSection.photo.src}
                        alt={achievementSection.photo.alt}
                        placeholder="blur"
                        blurDataURL={achievementSection.photo.blurDataURL}
                        fill
                        sizes={`${Math.ceil(100 / totalColumns)}vw`}
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </FullSizeImageListItem>
        );
    };

    const theme = useTheme();
    const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));

    const LARGE_SCREEN_COLUMN_COUNT = 3;
    const SMALL_SCREEN_COLUMN_COUNT = 1;
    return (
        <Container maxWidth={false} disableGutters>
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
