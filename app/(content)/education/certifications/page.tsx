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
import { Launch } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import type React from "react";

import {
    Link,
    List,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
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

    const CertifiedKubernetesApplicationDeveloper = generateLink(
        "Certified Kubernetes Application Developer",
        "https://www.cncf.io/certification/ckad/",
    );
    const CertifiedKubernetesAdministrator = generateLink(
        "Certified Kubernetes Administrator",
        "https://www.cncf.io/certification/cka/",
    );
    const Kubernetes = generateLink("Kubernetes", "https://kubernetes.io/");
    const Etcd = generateLink("etcd", "https://etcd.io/");

    const generateSectionHeader = (
        certificate: Certificate,
    ): React.ReactElement => (
        <SectionHeading
            date={certificate.completedOn}
            logo={<Logo height="5em" logo={certificate.logo} />}
            actionButton={{
                href: certificate.link,
                name: "View Credential",
                icon: Launch,
            }}
        >
            {certificate.name}
        </SectionHeading>
    );

    return (
        <>
            <Title>Certifications</Title>
            <Section>
                {generateSectionHeader(
                    Certificates.FundamentalsOfReinforcementLearning,
                )}
                <Paragraph>
                    This course is offered by{" "}
                    {AlbertaMachineIntelligenceInstitute} at the{" "}
                    {UniversityOfAlberta} on {Coursera}, taught mainly by{" "}
                    {AdamWhite} &amp; {MarthaWhite}. It covers the basics of
                    Reinforcement Learning.
                </Paragraph>
            </Section>
            <Section>
                {generateSectionHeader(
                    Certificates.BuildBasicGenerativeAdversarialNetworks,
                )}
                <Paragraph>
                    This course is offered by {DeepLearningAi} on {Coursera},
                    taught mainly by {SharonZhou}. It covers how the Generative
                    Adversarial Networks work as well as some of the latest
                    developments in this Neural Network architecture.
                </Paragraph>
            </Section>
            <Section>
                {generateSectionHeader(Certificates.DeepLearningSpecialization)}
                <Paragraph>
                    Deep Learning specialization is offered by {DeepLearningAi}{" "}
                    on {Coursera}, taught mainly by {AndrewNg}. It is an
                    excellent specialization consisting of five courses covering
                    a deep dive into Deep Learning as well as many novel Deep
                    Learning architectures. The specialization included
                    coursework as well as MCQ and Lab-based hands-on
                    evaluations.
                </Paragraph>
                <Box sx={{ m: 0, pt: 2 }}>
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
                            <Typography>
                                Convolutional Neural Networks
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Sequence Models</Typography>
                        </ListItem>
                    </List>
                </Box>
            </Section>
            <Section>
                {generateSectionHeader(
                    Certificates.CertifiedKubernetesAdministrator,
                )}
                <Paragraph>
                    {CertifiedKubernetesAdministrator} is offered and governed
                    by the {LinuxFoundation}. This covers the administrative
                    aspects and in-depth knowledge about {Kubernetes} Clusters
                    including {Etcd} clusters.
                </Paragraph>
            </Section>
            <Section>
                {generateSectionHeader(
                    Certificates.CertifiedKubernetesApplicationDeveloper,
                )}
                <Paragraph>
                    {CertifiedKubernetesApplicationDeveloper} is offered and
                    governed by the {LinuxFoundation}. This covers aspects
                    related to developing applications to be run on {Kubernetes}
                    .
                </Paragraph>
            </Section>
        </>
    );
};

export default Certifications;
