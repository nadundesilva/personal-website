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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { Box, Grid, Slide, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";

import { useScrollOffset } from "@/components/layout";
import { Logos, type LogoAsset } from "@/constants/logos";

const ContributedProjects = (): React.ReactElement => {
    const theme = useTheme();
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 34vw, 
        (min-width: ${mdWidth}px) 25vw`;
    const renderCarouselItem = (logo: LogoAsset): React.ReactElement => (
        <Grid item xs={12} sm={4} md={3}>
            <Slide direction={"up"} in={offset > 0.5} timeout={2000}>
                <Box
                    sx={{
                        position: "relative",
                        height: 200,
                        marginLeft: 5,
                        marginRight: 5,
                    }}
                >
                    <Image
                        alt={logo.alt}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes={imageSizes}
                        src={logo.src(theme.palette.mode)}
                    />
                </Box>
            </Slide>
        </Grid>
    );

    return (
        <Grid
            ref={rootRef}
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
        >
            {renderCarouselItem(Logos.Choreo)}
            {renderCarouselItem(Logos.Ballerina)}
            {renderCarouselItem(Logos.Cellery)}
            {renderCarouselItem(Logos.Siddhi)}
        </Grid>
    );
};

export default ContributedProjects;
