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
    Chip,
    Container,
    Grid,
    Slide,
    Typography,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";

import { Link } from "@/components/content";
import { useScrollOffset } from "@/components/layout";
import { type Certificate, Certificates } from "@/constants/certificates";

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
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }} sx={{ p: 2 }}>
                    <Slide
                        direction={direction === -1 ? "down" : "up"}
                        in={offset > 0.5}
                        timeout={1000}
                    >
                        <Card sx={{ height: "100%" }} raised>
                            <Link href={certification.link} target="_blank">
                                <CardActionArea
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        p: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardMedia
                                        component={(props: any) => (
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
                                                    src={
                                                        certification.logo.src[
                                                            theme.palette.mode
                                                        ]
                                                    }
                                                    fill
                                                    sizes={imageSizes}
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
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
                                            variant="h4"
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
                                                my: 2,
                                            }}
                                        />
                                        <Typography
                                            color="textSecondary"
                                            sx={{ mt: 2 }}
                                        >
                                            Issued by
                                            <br />
                                            {certification.issuer.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Slide>
                </Grid>
            ))}
        </Grid>
    );
};

export default Certifications;
