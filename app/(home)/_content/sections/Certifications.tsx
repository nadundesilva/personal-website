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
import { alpha } from "@mui/material/styles";
import Image from "next-image-export-optimizer";
import type React from "react";

import { Link } from "@/components/content";
import Certificates, { type Certificate } from "@/constants/certificates";

const Certifications = (): React.ReactElement => {
    const theme = useTheme();

    const certifications: Certificate[] = [
        Certificates.CertifiedKubernetesAdministrator,
        Certificates.CertifiedKubernetesApplicationDeveloper,
        Certificates.FundamentalsOfReinforcementLearning,
        Certificates.DeepLearningSpecialization,
        Certificates.BuildBasicGenerativeAdversarialNetworks,
    ];

    const smWidth = theme.breakpoints.values.sm;
    const mdWidth = theme.breakpoints.values.md;
    const xlWidth = theme.breakpoints.values.xl;
    const imageSizes = `(min-width: ${xlWidth}px) 25vw, (min-width: ${mdWidth}px) 34vw, (min-width: ${smWidth}px) 50vw, 100vw`;

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
                        <CardActionArea
                            component={Link}
                            href={certification.link}
                            target="_blank"
                            style={{ textDecoration: "none", color: "inherit" }}
                            sx={{
                                height: "100%",
                                p: { xs: 2.5, md: 3.5 },
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    mb: 3.5,
                                    p: 2,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    background: (theme) =>
                                        theme.palette.mode === "light"
                                            ? alpha(
                                                  theme.palette.primary.main,
                                                  0.03,
                                              )
                                            : alpha(
                                                  theme.palette.primary.light,
                                                  0.03,
                                              ),
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
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Image
                                                alt=""
                                                src={
                                                    theme.palette.mode ===
                                                    "light"
                                                        ? certification.logo
                                                              .srcLight
                                                        : certification.logo
                                                              .srcDark
                                                }
                                                fill
                                                sizes={imageSizes}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </Container>
                                    )}
                                />
                            </Box>
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
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 1,
                                        fontSize: { xs: 11, md: 12 },
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Issued by
                                    <br />
                                    {certification.issuer.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Certifications;
