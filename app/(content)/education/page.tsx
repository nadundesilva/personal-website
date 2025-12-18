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
import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import type React from "react";

import {
    HighlightsSection,
    Link,
    LinkButton,
    List,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import { Date, DateRange } from "@/constants/date";
import { type Institute, Institutes } from "@/constants/institutes";
import { Logos } from "@/constants/logos";
import { FULL_NAME } from "@/constants/metadata";

export const metadata: Metadata = {
    title: `${FULL_NAME} | Education`,
    description: `Educational qualifications of ${FULL_NAME}.`,
};

const Education = (): React.ReactElement => {
    const generateInstituteLink = (
        institute: Institute,
    ): React.ReactElement => (
        <Link href={institute.link} target="_blank">
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
            href="https://ieeexplore.ieee.org/document/8818750"
            target="_blank"
        >
            &quot;Generative Adversarial Networks (GAN) based Anomaly Detection
            in Industrial Software Systems&quot; published in 2019 at Moratuwa
            Engineering Research Conference (MERCon)
        </Link>
    );
    const AnomalyDetectionInIndustialSoftwareSystemsUsingVae = (
        <Link
            href="https://www.scitepress.org/Papers/2018/66003/pdf/index.html"
            target="_blank"
        >
            &quot;Anomaly Detection in Industrial Software Systems — Using
            Variational Autoencoders&quot; published in 2017 at the Proceedings
            of the 7th International Conference on Pattern Recognition
            Applications and Methods (ICPRAM)
        </Link>
    );

    const uomLogo = <Logo height="4em" logo={Logos.UniversityOfMoratuwa} />;
    const sjcLogo = (
        <Logo height="4em" logo={Logos.StJosephsCollegeColombo10} />
    );

    return (
        <>
            <Title>Education</Title>
            <Box sx={{ pt: 2 }}>
                <LinkButton
                    href="/education/certifications"
                    name="View Certifications"
                    icon={KeyboardArrowRight}
                />
            </Box>
            <Section>
                <SectionHeading
                    date={
                        new DateRange(
                            new Date(2014, "March"),
                            new Date(2017, "June"),
                        )
                    }
                    logo={uomLogo}
                >
                    B.Sc. (Hons.) in Engineering (Computer Science and
                    Engineering)
                </SectionHeading>
                <Paragraph>
                    I studied for my four-year bachelor&apos;s degree at the{" "}
                    {UniversityOfMoratuwa}. The degree covered many in-depth
                    areas (e.g.:- Computer Architecture, Operating Systems,
                    Compiler Theory, Database Internals) as well as novel
                    technical areas (e.g.:- Machine Learning, Deep Learning,
                    Data Mining &amp; Information Retrieval). The degree covered
                    many other aspects such as general engineering knowledge,
                    ethics and professional conduct.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>Academic Standing: First Class</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Overall CGPA - 3.85 / 4.20</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Dean&apos;s List Placements on 6 out of 8 semesters
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography component="div">
                            Publications:
                            <Box
                                component="span"
                                sx={{ display: "block", mt: 1 }}
                            >
                                <List>
                                    <ListItem>
                                        <Typography>
                                            {
                                                GanBasedAnomalyDetectionInIndustrialSoftwareSystems
                                            }
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>
                                            {
                                                AnomalyDetectionInIndustialSoftwareSystemsUsingVae
                                            }
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Box>
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section>
                <SectionHeading date={new Date(2012)} logo={sjcLogo}>
                    G.C.E. Advanced Level
                </SectionHeading>
                <Paragraph>
                    I attended school at {StJosephsCollegeColombo10} where I
                    studied many subjects. At the end of my studies, I passed
                    the G.C.E. Advanced Level examination with distinctions in
                    all the subjects granting me entrance into the{" "}
                    {UniversityOfMoratuwa} as well.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>Z - Score: 2.2441</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography component="div">
                            Main Subjects:
                            <Box
                                component="span"
                                sx={{ display: "block", mt: 1 }}
                            >
                                <List>
                                    <ListItem>
                                        <Typography>
                                            Combined Mathematics - A
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>Physics - A</Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>Chemistry - A</Typography>
                                    </ListItem>
                                </List>
                            </Box>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography component="div">
                            Other Subjects:
                            <Box
                                component="span"
                                sx={{ display: "block", mt: 1 }}
                            >
                                <List>
                                    <ListItem>
                                        <Typography>General IT - A</Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>
                                            General English - A
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>
                                            General Knowledge - A
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Box>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Editor of the Science Union 2011 / 2012
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
        </>
    );
};

export default Education;
