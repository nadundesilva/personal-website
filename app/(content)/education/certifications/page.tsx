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
import { OpenInNew } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { type Metadata } from "next";
import React from "react";

import {
    Link,
    List,
    ListItem,
    Logo,
    Paragraph,
    SectionHeading,
    Timespan,
    Title,
} from "@/components/content";
import { type Certificate, Certificates } from "@/constants/certificates";
import { type Institute, Institutes } from "@/constants/institutes";
import { FULL_NAME } from "@/constants/metadata";
import { People, type Person } from "@/constants/people";

export const metadata: Metadata = {
    title: `${FULL_NAME} | Certifications`,
    description: `Various certifications obtained by ${FULL_NAME}.`,
};

const Certifications = (): React.ReactElement => {
    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );

    const generateInstituteLink = (institute: Institute): React.ReactElement =>
        generateLink(institute.name, institute.link);
    const AlbertaMachineIntelligenceInstitute = generateInstituteLink(
        Institutes.AlbertaMachineIntelligenceInstitute,
    );
    const UniversityOfAlberta = generateInstituteLink(
        Institutes.UniversityOfAlberta,
    );
    const DeepLearningAi = generateInstituteLink(Institutes.DeepLearningAi);
    const Coursera = generateInstituteLink(Institutes.Coursera);
    const LinuxFoundation = generateInstituteLink(Institutes.LinuxFoundation);

    const generatePersonLink = (person: Person): React.ReactElement =>
        generateLink(person.name, person.profile);
    const AndrewNg = generatePersonLink(People.AndrewNg);
    const SharonZhou = generatePersonLink(People.SharonZhou);
    const AdamWhite = generatePersonLink(People.AdamWhite);
    const MarthaWhite = generatePersonLink(People.MarthaWhite);

    const generateSectionHeader = (
        certificate: Certificate,
    ): React.ReactNode => (
        <React.Fragment>
            <Title>Certifications</Title>
            <SectionHeading>{certificate.name}</SectionHeading>
            <Timespan value={certificate.completedOn} />
            <Logo height="5em" logo={certificate.logo} />
            <Box sx={{ m: 0, pt: 2 }}>
                <Link href={certificate.link} target="_blank">
                    <Button
                        size="small"
                        variant="outlined"
                        endIcon={<OpenInNew />}
                    >
                        View Credential
                    </Button>
                </Link>
            </Box>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {generateSectionHeader(
                Certificates.FundamentalsOfReinforcementLearning,
            )}
            <Paragraph>
                This course is offered by {AlbertaMachineIntelligenceInstitute}{" "}
                at the {UniversityOfAlberta} on {Coursera}, taught mainly by{" "}
                {AdamWhite} &amp; {MarthaWhite}. It covers the basics of
                Reinforcement Learning.
            </Paragraph>
            {generateSectionHeader(
                Certificates.BuildBasicGenerativeAdversarialNetworks,
            )}
            <Paragraph>
                This course is offered by {DeepLearningAi} on {Coursera}, taught
                mainly by {SharonZhou}. It covers the how the Generative
                Adversarial Networks work as well as some of the latest
                developments in this Neural Network architecture.
            </Paragraph>
            {generateSectionHeader(Certificates.DeepLearningSpecialization)}
            <Paragraph>
                Deep Learning specialization is offered by {DeepLearningAi} on{" "}
                {Coursera}, taught mainly by {AndrewNg}. It is an excellent
                specialization consisting of five courses covering a deep dive
                into Deep Learning as well as many novel Deep Learning
                architectures. The specialization included coursework as well as
                MCQ and Lab based hands-on evaluations.
            </Paragraph>
            <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
                <List>
                    <ListItem>
                        <Typography>
                            Neural Networks and Deep Learning
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Improving Deep Neural Networks: Hyperparameter
                            Tuning, Regularization and Optimization
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Structuring Machine Learning Projects
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Convolutional Neural Networks</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Sequence Models</Typography>
                    </ListItem>
                </List>
            </Box>
            {generateSectionHeader(
                Certificates.CertifiedKubernetesAdministrator,
            )}
            <Paragraph>
                Certified Kubernetes Administrator is offered and governed by
                the {LinuxFoundation}. This covers the administrative aspects
                and in depth knowledge about Kubernetes Clusters includign ETCD
                clusters.
            </Paragraph>
            {generateSectionHeader(
                Certificates.CertifiedKubernetesApplicationDeveloper,
            )}
            <Paragraph>
                Certified Kubernetes Application Developer is offered and
                governed by the {LinuxFoundation}. This covers aspects related
                to developing applications to be run on Kubernetes.
            </Paragraph>
        </React.Fragment>
    );
};

export default Certifications;
