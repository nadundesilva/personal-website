import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Chip, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import ckadLogo from "./ckad.png";
import ckaLogo from "./cka.png";
import deepLearningAiLogo from "./deep-learning-ai.png";
import { useScrollOffset } from "../../components";

const useStyles = makeStyles((theme: Theme) => {
    const certificationTypeMargin = theme.spacing(2);
    return createStyles({
        certificationCardContainer: {
            padding: theme.spacing(2)
        },
        certificationCard: {
            height: "100%"
        },
        certificationImage: {
            width: "50%",
            height: "auto",
            margin: "auto",
            padding: theme.spacing(2)
        },
        certificationIssuer: {
            marginTop: theme.spacing(2)
        },
        certificationType: {
            marginTop: certificationTypeMargin,
            marginBottom: certificationTypeMargin
        }
    });
});

const DEEP_LEARNING_ISSUER = "Deeplearning.AI";
const LINUX_FOUNDATION = "Linux Foundation";

interface Certificate {
    name: string,
    type: "Course" | "Certification" | "Specialization",
    link: string,
    image: string,
    issuer: string,
};

const Certifications = (): React.ReactElement => {
    const classes = useStyles();
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

    const translation = (1 - offset) * 20;
    return (
        <Grid ref={rootRef} container justifyContent="center" alignItems="stretch">
            {
                certifications.map((certification, index) => (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index} className={classes.certificationCardContainer}>
                        <Card onClick={generateViewCertificateHandler(certification.link)}
                            className={classes.certificationCard}
                            style={{
                                transform: `translateY(${direction === 1 ? translation : -translation}vw) scale(${offset})`,
                                opacity: offset
                            }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={certification.name}
                                    height="140"
                                    image={certification.image}
                                    title={certification.name}
                                    classes={{
                                        root: classes.certificationImage
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h2" align="center">
                                        {certification.name}
                                    </Typography>
                                    <Chip label={certification.type} color="secondary" size="small"
                                        className={classes.certificationType}/>
                                    <Typography color="textSecondary" className={classes.certificationIssuer}>
                                        Issued by {certification.issuer}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default Certifications;
