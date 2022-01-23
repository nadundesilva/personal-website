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
        <Container maxWidth={false} disableGutters={true} sx={{ position: "relative" }}>
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
            <Container maxWidth={false} disableGutters={true}
                sx={{
                    position: "relative",
                    height: (theme: Theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight ?? 0}px)`
                }}
            >
                <BannerImage src={banner} alt="Nadun De Silva Website Banner" layout="fill"
                    objectFit="cover" priority={true}/>
            </Container>
        </Container>
    );
};

export default WelcomeBanner;
