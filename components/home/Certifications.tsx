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
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Slide, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

import { useScrollOffset } from "@/components/Layout";

const ckadLogo = "/assets/certifications/ckad.png";
const ckaLogo = "/assets/certifications/cka.png";
const deepLearningAiLogo = "/assets/certifications/deep-learning-ai.png";
const universityOfAlbertaLogo = "/assets/certifications/university-of-alberta.png";

const UNIVERSITY_OF_ALBERTA_ISSUER = "University of Alberta";
const DEEP_LEARNING_ISSUER = "Deeplearning.AI";
const LINUX_FOUNDATION = "Linux Foundation";

interface Certificate {
    name: string,
    type: "Course" | "Certification" | "Specialization",
    link: string,
    image: string,
    issuer: string,
}

const Certifications = (): React.ReactElement => {
    const theme = useTheme();
    const { ref: rootRef, direction, offset } = useScrollOffset<HTMLDivElement>();

    const certifications: Certificate[] = [
        {
            name: "Deep Learning",
            type: "Specialization",
            link: "https://coursera.org/share/8e5db53bfef4c4b27f79004022edad72",
            image: deepLearningAiLogo,
            issuer: DEEP_LEARNING_ISSUER
        },
        {
            name: "Fundamentals of Reinforcement Learning",
            type: "Course",
            link: "https://coursera.org/share/fcbebc1de9e6a9b3ecb186983af7b969",
            image: universityOfAlbertaLogo,
            issuer: UNIVERSITY_OF_ALBERTA_ISSUER
        },
        {
            name: "Build Basic Generative Adversarial Networks (GANs)",
            type: "Course",
            link: "https://coursera.org/share/fed56feb8ba81177e6467779f22c0851",
            image: deepLearningAiLogo,
            issuer: DEEP_LEARNING_ISSUER
        },
        {
            name: "AI For Everyone",
            type: "Course",
            link: "https://coursera.org/share/e8ae9a481ef41f070d6c7b00887e8b66",
            image: deepLearningAiLogo,
            issuer: DEEP_LEARNING_ISSUER
        },
        {
            name: "Certificed Kubernetes Administrator",
            type: "Certification",
            link: "https://www.youracclaim.com/badges/8241114b-7435-460a-a08f-9d33304c1470?source=linked_in_profile",
            image: ckaLogo,
            issuer: LINUX_FOUNDATION
        },
        {
            name: "Certificed Kubernetes Application Developer",
            type: "Certification",
            link: "https://www.youracclaim.com/badges/e9df4128-2017-41c3-9e7d-028e37176243/linked_in_profile",
            image: ckadLogo,
            issuer: LINUX_FOUNDATION
        }
    ];

    const generateViewCertificateHandler = (link: string) => (): void => {
        window.open(link, "_blank");
    };

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const xlWidth = theme.breakpoints.values.xl;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 50vw, 
        (min-width: ${mdWidth}px) 34vw, (min-width: ${xlWidth}px) 25vw`;

    return (
        <Grid ref={rootRef} container justifyContent="center" alignItems="stretch">
            {
                certifications.map((certification, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ padding: 2 }}>
                        <Slide direction={direction === -1 ? "down" : "up"} in={offset > 0.5} timeout={1000}>
                            <Card onClick={generateViewCertificateHandler(certification.link)} sx={{ height: "100%" }}>
                                <CardActionArea
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        padding: 1,
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <CardMedia
                                        component={(props) => (
                                            <Container {...props} maxWidth={false} disableGutters
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "auto",
                                                    pt: "80%",
                                                    margin: "auto"
                                                }}
                                            >
                                                <Image src={certification.image} alt={certification.name} layout="fill"
                                                    sizes={imageSizes} objectFit="contain"/>
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
                                            flexGrow: 1
                                        }}
                                    >
                                        <Typography variant="h6" component="h2" align="center" sx={{ width: "100%" }}>
                                            {certification.name}
                                        </Typography>
                                        <Box sx={{ flexGrow: 1 }}/>
                                        <Chip label={certification.type} color="secondary" size="small"
                                            sx={{ marginTop: 2, marginBottom: 2 }}/>
                                        <Typography color="textSecondary" sx={{ marginTop: 2 }}>
                                            Issued by<br/>{certification.issuer}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Slide>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default Certifications;
