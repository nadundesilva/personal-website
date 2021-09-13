import { Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Slide, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

import { useScrollOffset } from "@/components/Layout";

const ckadLogo = "/assets/certifications/ckad.png";
const ckaLogo = "/assets/certifications/cka.png";
const deepLearningAiLogo = "/assets/certifications/deep-learning-ai.png";

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
            name: "Build Basic Generative Adversarial Networks (GANs)",
            type: "Course",
            link: "https://coursera.org/share/fed56feb8ba81177e6467779f22c0851",
            image: deepLearningAiLogo,
            issuer: DEEP_LEARNING_ISSUER
        },
        {
            name: "Deep Learning",
            type: "Specialization",
            link: "https://coursera.org/share/8e5db53bfef4c4b27f79004022edad72",
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
                        <Slide direction={"up"} in={offset > 0.5 || direction !== 1} timeout={1000}>
                            <Card onClick={generateViewCertificateHandler(certification.link)} sx={{ height: "100%" }}>
                                <CardActionArea>
                                    <CardMedia
                                        component={(props) => (
                                            <Container maxWidth={false} disableGutters={true}
                                                sx={{
                                                    position: "relative",
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
                                    <CardContent>
                                        <Typography variant="h6" component="h2" align="center">
                                            {certification.name}
                                        </Typography>
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
