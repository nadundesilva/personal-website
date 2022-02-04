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
import { Button, Container, Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const banner = "/assets/banner.jpg";
const bannerBlurDataUrl = "data:image/webp;base64,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";

const BannerImage = styled(Image)({
    zIndex: 1
});

const WelcomeBanner = (): React.ReactElement => {
    const theme = useTheme();

    const isLarge = useMediaQuery(theme.breakpoints.up("xl"));
    const isMedium = useMediaQuery(theme.breakpoints.up("md"));
    const downloadButtonSize = isLarge
        ? "large"
        : (isMedium ? "medium" : "small");

    const downloadCv = (): void => {
        window.open((process.env.PUBLIC_URL ?? "") + "/nadundesilva-cv.pdf");
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ position: "relative" }}>
            <Grid container
                sx={{
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    position: "absolute",
                    textAlign: "center",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "17vh",
                    zIndex: 2
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h2" component="p"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "6vh"
                        }}
                    >
                        Hi, I am<br/>Nadun<br/>De Silva
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" sx={{ fontSize: "3vh" }}>
                        Associate Technical Lead &amp; Deep Learning Enthusiast
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size={downloadButtonSize} onClick={downloadCv}
                        data-testid="view-cv-button">
                        View CV
                    </Button>
                </Grid>
            </Grid>
            <Container maxWidth={false} disableGutters
                sx={{
                    position: "relative",
                    height: (theme: Theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight ?? 0}px)`
                }}
            >
                <BannerImage src={banner} alt="Nadun De Silva Website Banner" layout="fill"
                    objectFit="cover" priority placeholder="blur" blurDataURL={bannerBlurDataUrl}/>
            </Container>
        </Container>
    );
};

export default WelcomeBanner;
