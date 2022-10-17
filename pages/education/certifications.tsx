/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
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
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Container, Link } from "@mui/material";
import Head from "next/head";
import React from "react";

import {
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Timespan,
} from "@/components/content";
import Layout, { LayoutContent } from "@/components/layout";
import { Certificate, Certificates } from "@/constants/certificates";
import { Institute, Institutes } from "@/constants/institutes";
import { People, Person } from "@/constants/people";

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
                    endIcon={<FontAwesomeIcon icon={faExternalLink} />}
                    href={certificate.link}
                    target={"_blank"}
                >
                    View Credential
                </Button>
            </Box>
        </React.Fragment>
    );

    return (
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Nadun De Silva | Certifications</title>
            </Head>
            <Layout>
                <LayoutContent>
                    <Section>
                        {generateSectionHeader(
                            Certificates.FundamentalsOfReinforcementLearning,
                        )}
                        <Paragraph>
                            This course is offered by{" "}
                            {AlbertaMachineIntelligenceInstitute} at the{" "}
                            {UniversityOfAlberta} on {Coursera}, taught mainly
                            by {AdamWhite} &amp; {MarthaWhite}. It covers the
                            basics of Reinforcement Learning.
                        </Paragraph>
                    </Section>
                    <Section>
                        {generateSectionHeader(
                            Certificates.BuildBasicGenerativeAdversarialNetworks,
                        )}
                        <Paragraph>
                            This course is offered by {DeepLearningAi} on{" "}
                            {Coursera}, taught mainly by {SharonZhou}. It covers
                            the how the Generative Adversarial Networks work as
                            well as some of the latest developments in this
                            Neural Network architecture.
                        </Paragraph>
                    </Section>
                    <Section>
                        {generateSectionHeader(
                            Certificates.DeepLearningSpecialization,
                        )}
                        <Paragraph>
                            Deep Learning specialization is offered by{" "}
                            {DeepLearningAi} on {Coursera}, taught mainly by{" "}
                            {AndrewNg}. It is an excellent specialization
                            consisting of five courses covering a deep dive into
                            Deep Learning as well as many novel Deep Learning
                            architectures. The specialization included
                            coursework as well as MCQ and Lab based hands-on
                            evaluations.
                        </Paragraph>
                        <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
                            <ul>
                                <li>Neural Networks and Deep Learning</li>
                                <li>
                                    Improving Deep Neural Networks:
                                    Hyperparameter Tuning, Regularization and
                                    Optimization
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
                            Certified Kubernetes Administrator is offered and
                            governed by the {LinuxFoundation}. This covers the
                            administrative aspects and in depth knowledge about
                            Kubernetes Clusters includign ETCD clusters.
                        </Paragraph>
                    </Section>
                    <Section>
                        {generateSectionHeader(
                            Certificates.CertifiedKubernetesApplicationDeveloper,
                        )}
                        <Paragraph>
                            Certified Kubernetes Application Developer is
                            offered and governed by the {LinuxFoundation}. This
                            covers aspects related to developing applications to
                            be run on Kubernetes.
                        </Paragraph>
                    </Section>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default Certifications;
