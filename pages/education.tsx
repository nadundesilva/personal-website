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
import { Box, Button, Container, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";

import {
    HighlightsSection,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Timespan,
} from "@/components/content";
import Layout, { LayoutContent } from "@/components/layout";
import { Logos } from "@/constants";

const Education = (): React.ReactElement => {
    const UniversityOfMoratuwa = (
        <Link target={"_blank"} href={"https://uom.lk/"}>
            University of Moratuwa
        </Link>
    );
    const StJosephsCollegeColombo10 = (
        <Link target={"_blank"} href={"https://www.stjosephscollege.lk/"}>
            St. Joseph&apos;s College
        </Link>
    );

    const GanBasedAnomalyDetectionInIndustrialSoftwareSystems = (
        <Link
            target={"_blank"}
            href={"https://ieeexplore.ieee.org/document/8818750"}
        >
            &quot;Generative Adversarial Networks (GAN) based Anomaly Detection
            in Industrial Software Systems&quot; published in 2019 at Moratuwa
            Engineering Research Conference (MERCon)
        </Link>
    );
    const AnomalyDetectionInIndustialSoftwareSystemsUsingVae = (
        <Link
            target={"_blank"}
            href={"https://www.scitepress.org/Papers/2018/66003/pdf/index.html"}
        >
            &quot;Anomaly Detection in Industrial Software Systems — Using
            Variational Autoencoders&quot; published in 2017 at the Proceedings
            of the 7th International Conference on Pattern Recognition
            Applications and Methods (ICPRAM)
        </Link>
    );

    const uomLogo = <Logo height={"4em"} logo={Logos.UniversityOfMoratuwa} />;
    const sjcLogo = (
        <Logo height={"4em"} logo={Logos.StJosephsCollegeColombo10} />
    );

    return (
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Education of Nadun De Silva</title>
            </Head>
            <Layout>
                <LayoutContent>
                    <NextLink passHref href={"/education/certifications"}>
                        <Button size="small" variant="outlined">
                            View Certifications
                        </Button>
                    </NextLink>
                    <Section>
                        <SectionHeading>
                            B.Sc. (Hons.) in Engineering (Computer Science and
                            Engineering)
                        </SectionHeading>
                        <Timespan>March 2014 to June 2017</Timespan>
                        {uomLogo}
                        <Paragraph>
                            I studied for my four year bachelor&apos;s degree at
                            the {UniversityOfMoratuwa}. The degree covered many
                            in depth areas (e.g.:- Computer Architecture,
                            Operating Systems, Compiler Theory, Database
                            Internals) as well as noval technical areas (e.g.:-
                            Machine Learning, Deep Learning, Data Mining &amp;
                            Information Retrieval). The degree covered many
                            other aspects such as general engineering knowledge,
                            ethics and professional conduct.
                        </Paragraph>
                        <HighlightsSection>
                            <li>Academic Standing: First Class</li>
                            <li>Overall CGPA - 3.85 / 4.20</li>
                            <li>Final Academic Year CGPA: 4.02 / 4.20</li>
                            <li>
                                Dean&apos;s List Placements in 6 out of 8
                                semesters
                            </li>
                        </HighlightsSection>
                        <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Publications:
                            </Typography>
                            <ul>
                                <li>
                                    {
                                        GanBasedAnomalyDetectionInIndustrialSoftwareSystems
                                    }
                                </li>
                                <li>
                                    {
                                        AnomalyDetectionInIndustialSoftwareSystemsUsingVae
                                    }
                                </li>
                            </ul>
                        </Box>
                    </Section>
                    <SectionHeading>G.C.E. Advanced Level</SectionHeading>
                    <Timespan>2012</Timespan>
                    {sjcLogo}
                    <Paragraph>
                        I attended school at {StJosephsCollegeColombo10} where I
                        studied many subjects. At the end of my studies I passed
                        the G.C.E. Advanced Level examination at the end of it
                        with distinctions in all the subjects granting me
                        entrance into the {UniversityOfMoratuwa} as well.
                    </Paragraph>
                    <HighlightsSection>
                        <li>Z - Score: 2.2441</li>
                        <li>
                            Main Subjects: Combined Mathematics, Physics,
                            Chemistry
                        </li>
                        <li>
                            Other Subjects: General IT, General English, General
                            Knowledge
                        </li>
                        <li>Editor of the Science Union 2011/2012</li>
                    </HighlightsSection>
                    <Section></Section>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default Education;
