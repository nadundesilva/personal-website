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
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    type CardMediaProps,
    Chip,
    Container,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import Image from "next-image-export-optimizer";
import type React from "react";

import { Link } from "@/components/content";
import { type Certificate, Certificates } from "@/constants/certificates";

const Certifications = (): React.ReactElement => {
    const theme = useTheme();

    const certifications: Certificate[] = [
        Certificates.CertifiedKubernetesAdministrator,
        Certificates.CertifiedKubernetesApplicationDeveloper,
        Certificates.FundamentalsOfReinforcementLearning,
        Certificates.DeepLearningSpecialization,
        Certificates.BuildBasicGenerativeAdversarialNetworks,
    ];

    const xsWidth = theme.breakpoints.values.xs;
    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const xlWidth = theme.breakpoints.values.xl;
    const imageSizes = `(min-width: ${xsWidth}px) 100vw, (min-width: ${smWidth}px) 50vw, (min-width: ${mdWidth}px) 34vw, (min-width: ${xlWidth}px) 25vw`;

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
        >
            {certifications.map((certification) => (
                <Grid key={certification.name} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card sx={{ height: "100%" }}>
                        <Link href={certification.link} target="_blank">
                            <CardActionArea
                                sx={{
                                    height: "100%",
                                    p: { xs: 2.5, md: 3.5 },
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardMedia
                                    component={(props: CardMediaProps) => (
                                        <Container
                                            {...props}
                                            maxWidth={false}
                                            disableGutters
                                            sx={{
                                                position: "relative",
                                                width: "100%",
                                                height: "auto",
                                                pt: "70%",
                                                margin: "auto",
                                                mb: 3.5,
                                                opacity: 0.95,
                                                transition:
                                                    "opacity 0.3s ease-in-out",
                                            }}
                                        >
                                            <Image
                                                alt={certification.logo.alt}
                                                src={
                                                    certification.logo.src[
                                                        theme.palette.mode
                                                    ]
                                                }
                                                fill
                                                sizes={imageSizes}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </Container>
                                    )}
                                />
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        flexGrow: 1,
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            fontSize: { xs: 16, md: 17 },
                                            letterSpacing: "-0.02em",
                                            lineHeight: 1.4,
                                            mb: 2,
                                        }}
                                    >
                                        {certification.name}
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Chip
                                        label={certification.type}
                                        color="secondary"
                                        size="small"
                                        sx={{
                                            mb: 3,
                                            fontSize: { xs: 10, md: 11 },
                                            height: { xs: 22, md: 24 },
                                            opacity: 0.8,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mt: 1,
                                            fontSize: { xs: 11, md: 12 },
                                            letterSpacing: "0em",
                                            opacity: 0.7,
                                        }}
                                    >
                                        Issued by
                                        <br />
                                        {certification.issuer.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Certifications;
