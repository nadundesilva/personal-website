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
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    Link,
    Slide,
    Typography,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";

import { useScrollOffset } from "@/components/layout";
import { Certificate, Certificates } from "@/constants/certificates";

const Certifications = (): React.ReactElement => {
    const theme = useTheme();
    const {
        ref: rootRef,
        direction,
        offset,
    } = useScrollOffset<HTMLDivElement>();

    const certifications: Certificate[] = [
        Certificates.DeepLearningSpecialization,
        Certificates.FundamentalsOfReinforcementLearning,
        Certificates.BuildBasicGenerativeAdversarialNetworks,
        Certificates.CertifiedKubernetesAdministrator,
        Certificates.CertifiedKubernetesApplicationDeveloper,
    ];

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const xlWidth = theme.breakpoints.values.xl;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 50vw, 
        (min-width: ${mdWidth}px) 34vw, (min-width: ${xlWidth}px) 25vw`;

    return (
        <Grid
            ref={rootRef}
            container
            justifyContent="center"
            alignItems="stretch"
        >
            {certifications.map((certification, index) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{ padding: 2 }}
                >
                    <Slide
                        direction={direction === -1 ? "down" : "up"}
                        in={offset > 0.5}
                        timeout={1000}
                    >
                        <Link target={"_blank"} href={certification.link}>
                            <Card sx={{ height: "100%" }}>
                                <CardActionArea
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        padding: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardMedia
                                        component={(props) => (
                                            <Container
                                                {...props}
                                                maxWidth={false}
                                                disableGutters
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "auto",
                                                    pt: "80%",
                                                    margin: "auto",
                                                }}
                                            >
                                                <Image
                                                    alt={certification.logo.alt}
                                                    layout="fill"
                                                    src={certification.logo.src(
                                                        theme.palette.mode,
                                                    )}
                                                    sizes={imageSizes}
                                                    objectFit="contain"
                                                />
                                            </Container>
                                        )}
                                        title={certification.name}
                                    />
                                    <CardContent
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="h2"
                                            align="center"
                                            sx={{ width: "100%" }}
                                        >
                                            {certification.name}
                                        </Typography>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Chip
                                            label={certification.type}
                                            color="secondary"
                                            size="small"
                                            sx={{
                                                marginTop: 2,
                                                marginBottom: 2,
                                            }}
                                        />
                                        <Typography
                                            color="textSecondary"
                                            sx={{ marginTop: 2 }}
                                        >
                                            Issued by
                                            <br />
                                            {certification.issuer}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Slide>
                </Grid>
            ))}
        </Grid>
    );
};

export default Certifications;
