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
    type Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Image from "next-image-export-optimizer";
import { type StaticImageData } from "next/image";
import type React from "react";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";

import nasaSpaceAppsChallenge2017Image from "@/assets/achievements/nasa-space-apps-2017.jpg";
import uomDeansList2017Image from "@/assets/achievements/deans-list-2017.jpg";
import wso2OutstandingContributor2019Image from "@/assets/achievements/wso2-outstanding-contributor.jpg";
import hsbcYouthEnterpriseAwards2015Image from "@/assets/achievements/hsbc-youth-enterprise-awards-2015.jpg";
import angelHack2016Image from "@/assets/achievements/angel-hack-2016.jpg";

const PREFIX = "Home-Achievements";
const classes = {
    imageListItemImageOverlay: `${PREFIX}-imageListItemImageOverlay`,
};

const FullSizeImageListItem = styled(ImageListItem)({
    width: "100%",
    height: "auto",
});

const ImageListItemImageOverlay = styled(Grid)(({ theme }) => ({
    color: theme.palette.common.white,
    background:
        theme.palette.mode === "light"
            ? `linear-gradient(to top, ${alpha(theme.palette.primary.main, 0.95)} 0px, ${alpha(theme.palette.primary.main, 0.7)} 300px, ${alpha(theme.palette.primary.main, 0.2)} 380px, transparent 460px)`
            : `linear-gradient(to top, ${alpha(theme.palette.background.default, 0.98)} 0px, ${alpha(theme.palette.background.default, 0.75)} 300px, ${alpha(theme.palette.background.default, 0.25)} 380px, transparent 460px)`,
    position: "absolute",
    textAlign: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.standard,
    }),
}));

interface AchievementSection {
    title: string;
    photo: {
        src: StaticImageData;
    };
}

const ROW_HEIGHT = 320;

const Achievements = (): React.ReactElement => {
    const theme = useTheme();
    const achievementSections: AchievementSection[] = [
        {
            title: "Global Finalist - Galactic Impact - NASA Space Apps Challenge 2017",
            photo: {
                src: nasaSpaceAppsChallenge2017Image,
            },
        },
        {
            title: "Placements on the Dean's List",
            photo: {
                src: uomDeansList2017Image,
            },
        },
        {
            title: "WSO2 Sustained Outstanding Contribution Award - Consecutive years from 2019 to 2021",
            photo: {
                src: wso2OutstandingContributor2019Image,
            },
        },
        {
            title: "Finalist - British Council HSBC Youth Enterprise Awards 2015",
            photo: {
                src: hsbcYouthEnterpriseAwards2015Image,
            },
        },
        {
            title: "Finalist - Angel Hack 2016",
            photo: {
                src: angelHack2016Image,
            },
        },
    ];

    const renderImageListItem = (
        achievementIndex: number,
        rowCount: number,
    ): React.ReactElement => {
        const achievementSection: AchievementSection =
            achievementSections[achievementIndex];
        return (
            <FullSizeImageListItem
                rows={rowCount}
                cols={1}
                sx={{
                    "position": "relative",
                    // Resting glow intensifies on hover. Dark mode uses primary.light (matching
                    // the pulse color in Experience.tsx) for visual consistency across sections.
                    "boxShadow": (theme) =>
                        theme.palette.mode === "light"
                            ? `0 0 60px ${alpha(theme.palette.primary.main, 0.67)}`
                            : `0 0 60px ${alpha(theme.palette.primary.light, 0.22)}`,
                    "transition": theme.transitions.create("box-shadow", {
                        duration: theme.transitions.duration.standard,
                    }),
                    "&:hover, &:focus-within": {
                        [`& .${classes.imageListItemImageOverlay}`]: {
                            opacity: 1,
                            zIndex: 1,
                        },
                        boxShadow: (theme) =>
                            theme.palette.mode === "light"
                                ? `0 0 90px ${alpha(theme.palette.primary.main, 0.87)}`
                                : `0 0 90px ${alpha(theme.palette.primary.light, 0.4)}`,
                    },
                    [MOTION_OK_QUERY]: {
                        "&:hover img, &:focus-within img": {
                            transform: "scale(1.03)",
                        },
                    },
                }}
                tabIndex={0}
                aria-labelledby={`achievement-title-${achievementIndex}`}
                aria-roledescription="achievement"
            >
                <Box
                    sx={{
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                        [MOTION_OK_QUERY]: {
                            "& img": {
                                transition: (theme) =>
                                    theme.transitions.create("transform", {
                                        duration:
                                            theme.transitions.duration.standard,
                                    }),
                            },
                        },
                    }}
                >
                    <ImageListItemImageOverlay
                        container
                        justifyContent="center"
                        alignItems="flex-end"
                        className={classes.imageListItemImageOverlay}
                        sx={{ pb: { xs: 3, md: 4 } }}
                    >
                        <Grid size={{ xs: 10, md: 8 }}>
                            <Typography
                                id={`achievement-title-${achievementIndex}`}
                                variant="h6"
                                component="h3"
                                color="inherit"
                                sx={{
                                    fontSize: { xs: 16, md: 18 },
                                    textShadow: (theme) =>
                                        `0 2px 12px ${alpha(theme.palette.common.black, 0.2)}`,
                                }}
                            >
                                {achievementSection.title}
                            </Typography>
                        </Grid>
                    </ImageListItemImageOverlay>
                    <Image
                        src={achievementSection.photo.src}
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </Box>
            </FullSizeImageListItem>
        );
    };

    const isAboveMd = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up("md"),
    );
    return (
        <>
            {isAboveMd ? (
                <ImageList
                    rowHeight={ROW_HEIGHT}
                    cols={3}
                    // overflow: visible so that the box-shadow glow on each item
                    // is not clipped by the ImageList's scroll container boundary
                    sx={{ overflow: "visible" }}
                >
                    <FullSizeImageListItem
                        rows={2}
                        cols={1}
                        role="presentation"
                        sx={{ overflow: "visible" }}
                    >
                        <ImageList
                            rowHeight={ROW_HEIGHT}
                            cols={1}
                            role="presentation"
                            sx={{ overflow: "visible" }}
                        >
                            {renderImageListItem(0, 1)}
                            {renderImageListItem(1, 1)}
                        </ImageList>
                    </FullSizeImageListItem>
                    {renderImageListItem(2, 2)}
                    <FullSizeImageListItem
                        rows={2}
                        cols={1}
                        role="presentation"
                        sx={{ overflow: "visible" }}
                    >
                        <ImageList
                            rowHeight={ROW_HEIGHT}
                            cols={1}
                            role="presentation"
                            sx={{ overflow: "visible" }}
                        >
                            {renderImageListItem(3, 1)}
                            {renderImageListItem(4, 1)}
                        </ImageList>
                    </FullSizeImageListItem>
                </ImageList>
            ) : (
                <ImageList
                    rowHeight={ROW_HEIGHT}
                    cols={1}
                    sx={{ overflow: "visible" }}
                >
                    {renderImageListItem(0, 1)}
                    {renderImageListItem(1, 1)}
                    {renderImageListItem(2, 1)}
                    {renderImageListItem(3, 1)}
                    {renderImageListItem(4, 1)}
                </ImageList>
            )}
        </>
    );
};

export default Achievements;
