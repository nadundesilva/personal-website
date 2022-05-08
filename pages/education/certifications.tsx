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
import { Box, Container, Link } from "@mui/material";
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
import { Certificates } from "@/constants/certificates";
import { Logos } from "@/constants/logos";

const Certifications = (): React.ReactElement => {
    const universityOfAlberta = (
        <Logo height={"5em"} logo={Logos.UniversityOfAlberta} />
    );
    const deepLearningAi = <Logo height={"4em"} logo={Logos.DeepLearningAI} />;
    const cka = <Logo height={"5em"} logo={Logos.CKA} />;
    const ckad = <Logo height={"5em"} logo={Logos.CKAD} />;

    const AlbertaMachineIntelligenceInstitute = (
        <Link target={"_blank"} href={"https://www.amii.ca/"}>
            Alberta Machine Intelligence Institute (Amii)
        </Link>
    );
    const UniversityOfAlberta = (
        <Link target={"_blank"} href={"https://www.ualberta.ca/"}>
            University of Alberta
        </Link>
    );
    const DeepLearningAi = (
        <Link target={"_blank"} href={"https://www.deeplearning.ai/"}>
            DeepLearning.AI
        </Link>
    );
    const Coursera = (
        <Link target={"_blank"} href={"https://www.coursera.org/"}>
            Coursera
        </Link>
    );
    const LinuxFoundation = (
        <Link target={"_blank"} href={"https://www.linuxfoundation.org/"}>
            Linux Foundation
        </Link>
    );

    const AndrewNg = (
        <Link
            target={"_blank"}
            href={"https://en.wikipedia.org/wiki/Andrew_Ng"}
        >
            Andrew Ng
        </Link>
    );
    const SharonZhou = (
        <Link
            target={"_blank"}
            href={"https://www.coursera.org/instructor/sharon-zhou"}
        >
            Sharon Zhou
        </Link>
    );
    const AdamWhite = (
        <Link
            target={"_blank"}
            href={"https://www.coursera.org/instructor/adam-white"}
        >
            Adam White
        </Link>
    );
    const MarthaWhite = (
        <Link
            target={"_blank"}
            href={"https://www.coursera.org/instructor/martha-white"}
        >
            Martha White
        </Link>
    );

    return (
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Certifications of Nadun De Silva</title>
            </Head>
            <Layout>
                <LayoutContent>
                    <Section>
                        <SectionHeading>
                            {
                                Certificates.FundamentalsOfReinforcementLearning
                                    .name
                            }
                        </SectionHeading>
                        <Timespan>September 2021</Timespan>
                        {universityOfAlberta}
                        <Paragraph>
                            This course is offered by{" "}
                            {AlbertaMachineIntelligenceInstitute}
                            at the {UniversityOfAlberta} on {Coursera}, taught
                            mainly by {AdamWhite} &amp; {MarthaWhite}. It covers
                            the basics of Reinforcement Learning.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>
                            {
                                Certificates
                                    .BuildBasicGenerativeAdversarialNetworks
                                    .name
                            }
                        </SectionHeading>
                        <Timespan>July 2021</Timespan>
                        {deepLearningAi}
                        <Paragraph>
                            This course is offered by {DeepLearningAi} on{" "}
                            {Coursera}, taught mainly by {SharonZhou}. It covers
                            the how the Generative Adversarial Networks work as
                            well as some of the latest developments in this
                            Neural Network architecture.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>
                            {Certificates.DeepLearning.name}
                        </SectionHeading>
                        <Timespan>June 2021</Timespan>
                        {deepLearningAi}
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
                        <SectionHeading>
                            {Certificates.CertifiedKubernetesAdministrator.name}
                        </SectionHeading>
                        <Timespan>December 2020</Timespan>
                        {cka}
                        <Paragraph>
                            Certified Kubernetes Administrator is offered and
                            governed by the {LinuxFoundation}. This covers the
                            administrative aspects and in depth knowledge about
                            Kubernetes Clusters includign ETCD clusters.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>
                            {
                                Certificates
                                    .CertifiedKubernetesApplicationDeveloper
                                    .name
                            }
                        </SectionHeading>
                        <Timespan>January 2020</Timespan>
                        {ckad}
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
