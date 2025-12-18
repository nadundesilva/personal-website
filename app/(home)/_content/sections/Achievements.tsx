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
    Grid,
    ImageList,
    ImageListItem,
    styled,
    Typography,
    useMediaQuery,
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
            : "rgba(0, 0, 0, 0.85)",
    position: "absolute",
    textAlign: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    backdropFilter: "blur(6px)",
    transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
}));

interface AchievementSection {
    title: string;
    photo: ImageAsset;
}

const ROW_HEIGHT = 320;

const Achievements = (): React.ReactElement => {
    const achievementSections: AchievementSection[] = [
        {
            title: "Global Finalist - Galactic Impact - NASA Space Apps Challenge 2017",
            photo: Photos.NASASpaceAppsChallenge2017,
        },
        {
            title: "Placements on the Dean's List",
            photo: Photos.UOMDeansList2017,
        },
        {
            title: "WSO2 Sustained Outstanding Contribution Award - Consecutive years from 2019 to 2021",
            photo: Photos.WSO2OutstandingContributor2019,
        },
        {
            title: "Finalist - British Council HSBC Youth Enterprise Awards 2015",
            photo: Photos.HSBCYouthEnterpriseAwards2015,
        },
        {
            title: "Finalist - Angel Hack 2016",
            photo: Photos.AngelHack2016,
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
                    "overflow": "hidden",
                    "&:hover": {
                        [`& .${classes.imageListItemImageOverlay}`]: {
                            opacity: 1,
                            zIndex: 1,
                        },
                        "& img": {
                            transform: "scale(1.03)",
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
                        <Grid size={{ xs: 10, md: 8 }}>
                            <Typography
                                variant="h6"
                                component="h3"
                                fontWeight={500}
                                sx={{
                                    fontSize: { xs: 16, md: 18 },
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.4,
                                    textShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",
                                }}
                            >
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
                            transition:
                                "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    />
                </Box>
            </FullSizeImageListItem>
        );
    };

    const isAboveMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
    return (
        <>
            {isAboveMd ? (
                <ImageList rowHeight={ROW_HEIGHT} cols={3}>
                    <FullSizeImageListItem rows={2} cols={1}>
                        <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                            {renderImageListItem(0, 1, 3)}
                            {renderImageListItem(1, 1, 3)}
                        </ImageList>
                    </FullSizeImageListItem>
                    {renderImageListItem(2, 2, 3)}
                    <FullSizeImageListItem rows={2} cols={1}>
                        <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                            {renderImageListItem(3, 1, 3)}
                            {renderImageListItem(4, 1, 3)}
                        </ImageList>
                    </FullSizeImageListItem>
                </ImageList>
            ) : (
                <ImageList rowHeight={ROW_HEIGHT} cols={1}>
                    {renderImageListItem(0, 1, 1)}
                    {renderImageListItem(1, 1, 1)}
                    {renderImageListItem(2, 1, 1)}
                    {renderImageListItem(3, 1, 1)}
                    {renderImageListItem(4, 1, 1)}
                </ImageList>
            )}
        </>
    );
};

export default Achievements;
