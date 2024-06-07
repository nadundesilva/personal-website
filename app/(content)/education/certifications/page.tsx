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
import { Box, Button, Link } from "@mui/material";
import { type Metadata } from "next";
import React from "react";

import {
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Timespan,
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
    const generateInstituteLink = (
        institute: Institute,
    ): React.ReactElement => (
        <Link target={"_blank"} href={institute.link}>
            {institute.name}
        </Link>
    );
    const AlbertaMachineIntelligenceInstitute = generateInstituteLink(
        Institutes.AlbertaMachineIntelligenceInstitute,
    );
    const UniversityOfAlberta = generateInstituteLink(
        Institutes.UniversityOfAlberta,
    );
    const DeepLearningAi = generateInstituteLink(Institutes.DeepLearningAi);
    const Coursera = generateInstituteLink(Institutes.Coursera);
    const LinuxFoundation = generateInstituteLink(Institutes.LinuxFoundation);

    const generatePersonLink = (person: Person): React.ReactElement => (
        <Link target={"_blank"} href={person.profile}>
            {person.name}
        </Link>
    );
    const AndrewNg = generatePersonLink(People.AndrewNg);
    const SharonZhou = generatePersonLink(People.SharonZhou);
    const AdamWhite = generatePersonLink(People.AdamWhite);
    const MarthaWhite = generatePersonLink(People.MarthaWhite);

    const generateSectionHeader = (
        certificate: Certificate,
    ): React.ReactNode => (
        <React.Fragment>
            <SectionHeading>{certificate.name}</SectionHeading>
            <Timespan value={certificate.completedOn} />
            <Logo height={"5em"} logo={certificate.logo} />
            <Box sx={{ m: 0, pt: 2 }}>
                <Button
                    size="small"
                    variant="outlined"
                    endIcon={<OpenInNew />}
                    href={certificate.link}
                    target={"_blank"}
                >
                    View Credential
                </Button>
            </Box>
        </React.Fragment>
    );

    return (
        <React.Fragment>
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
                    taught mainly by {SharonZhou}. It covers the how the
                    Generative Adversarial Networks work as well as some of the
                    latest developments in this Neural Network architecture.
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
                    coursework as well as MCQ and Lab based hands-on
                    evaluations.
                </Paragraph>
                <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
                    <ul>
                        <li>Neural Networks and Deep Learning</li>
                        <li>
                            Improving Deep Neural Networks: Hyperparameter
                            Tuning, Regularization and Optimization
                        </li>
                        <li>Structuring Machine Learning Projects</li>
                        <li>Convolutional Neural Networks</li>
                        <li>Sequence Models</li>
                    </ul>
                </Box>
            </Section>
            <Section>
                {generateSectionHeader(
                    Certificates.CertifiedKubernetesAdministrator,
                )}
                <Paragraph>
                    Certified Kubernetes Administrator is offered and governed
                    by the {LinuxFoundation}. This covers the administrative
                    aspects and in depth knowledge about Kubernetes Clusters
                    includign ETCD clusters.
                </Paragraph>
            </Section>
            <Section>
                {generateSectionHeader(
                    Certificates.CertifiedKubernetesApplicationDeveloper,
                )}
                <Paragraph>
                    Certified Kubernetes Application Developer is offered and
                    governed by the {LinuxFoundation}. This covers aspects
                    related to developing applications to be run on Kubernetes.
                </Paragraph>
            </Section>
        </React.Fragment>
    );
};

export default Certifications;
