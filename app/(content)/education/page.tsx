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
import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";
import { type Metadata } from "next";
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
import { Time, TimeRange } from "@/constants/commons";
import { type Institute, Institutes } from "@/constants/institutes";
import { Logos } from "@/constants/logos";

export const metadata: Metadata = {
    title: "Nadun De Silva | Education",
};

const Education = (): React.ReactElement => {
    const generateInstituteLink = (
        institute: Institute,
    ): React.ReactElement => (
        <Link target={"_blank"} href={institute.link}>
            {institute.name}
        </Link>
    );
    const UniversityOfMoratuwa = generateInstituteLink(
        Institutes.UniversityOfMoratuwa,
    );
    const StJosephsCollegeColombo10 = generateInstituteLink(
        Institutes.StJosephsCollegeColombo10,
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
        <React.Fragment>
            <NextLink passHref href={"/education/certifications"}>
                <Button
                    size="small"
                    variant="outlined"
                    endIcon={<KeyboardArrowRight />}
                >
                    View Certifications
                </Button>
            </NextLink>
            <Section>
                <SectionHeading>
                    B.Sc. (Hons.) in Engineering (Computer Science and
                    Engineering)
                </SectionHeading>
                <Timespan
                    value={
                        new TimeRange(
                            new Time(2014, "March"),
                            new Time(2017, "June"),
                        )
                    }
                />
                {uomLogo}
                <Paragraph>
                    I studied for my four year bachelor&apos;s degree at the{" "}
                    {UniversityOfMoratuwa}. The degree covered many in depth
                    areas (e.g.:- Computer Architecture, Operating Systems,
                    Compiler Theory, Database Internals) as well as noval
                    technical areas (e.g.:- Machine Learning, Deep Learning,
                    Data Mining &amp; Information Retrieval). The degree covered
                    many other aspects such as general engineering knowledge,
                    ethics and professional conduct.
                </Paragraph>
                <HighlightsSection>
                    <li>Academic Standing: First Class</li>
                    <li>Overall CGPA - 3.85 / 4.20</li>
                    <li>Final Academic Year CGPA: 4.02 / 4.20</li>
                    <li>Dean&apos;s List Placements in 6 out of 8 semesters</li>
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
                            {AnomalyDetectionInIndustialSoftwareSystemsUsingVae}
                        </li>
                    </ul>
                </Box>
            </Section>
            <SectionHeading>G.C.E. Advanced Level</SectionHeading>
            <Timespan value={new Time(2012)} />
            {sjcLogo}
            <Paragraph>
                I attended school at {StJosephsCollegeColombo10} where I studied
                many subjects. At the end of my studies I passed the G.C.E.
                Advanced Level examination at the end of it with distinctions in
                all the subjects granting me entrance into the{" "}
                {UniversityOfMoratuwa} as well.
            </Paragraph>
            <HighlightsSection>
                <li>Z - Score: 2.2441</li>
                <li>Main Subjects: Combined Mathematics, Physics, Chemistry</li>
                <li>
                    Other Subjects: General IT, General English, General
                    Knowledge
                </li>
                <li>Editor of the Science Union 2011/2012</li>
            </HighlightsSection>
        </React.Fragment>
    );
};

export default Education;
