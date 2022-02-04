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
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import React from "react";

import Layout, { LayoutContent } from "@/components/Layout";

const Section = styled(Box)(() => ({
    margin: 0,
    paddingTop: 5
}));

interface TypographyRestyledProps {
    children: React.ReactNode,
}

const SectionHeading = ({ children }: TypographyRestyledProps): React.ReactElement => (
    <Typography variant="h6" component="h2" sx={{ pt: 2 }}>
        {children}
    </Typography>
);

const Year = ({ children }: TypographyRestyledProps): React.ReactElement => (
    <Typography variant={"body1"} sx={{ pt: 1, pb: 1, color: grey[700] }}>
        <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;{children}
    </Typography>
);

const Paragraph = ({ children }: TypographyRestyledProps): React.ReactElement => (
    <Typography
        variant="body1"
        gutterBottom
        sx={{ m: 0, pt: 2, textAlign: "justify" }}
    >
        {children}
    </Typography>
);

const Achievements = (): React.ReactElement => {
    const nasaSpaceAppsChallenge = (
        <Link target={"_blank"} href={"https://www.spaceappschallenge.org/"}>NASA Space Apps Challenge</Link>
    );
    const ourEcologicalNeighborhood = (
        <Link href={"https://2017.spaceappschallenge.org/challenges/our-ecological-neighborhood/"} target={"_blank"}>
            Our Ecological Neighborhood
        </Link>
    );
    const whereTheGenesFlow = (
        <Link target={"_blank"}
            href={"https://2017.spaceappschallenge.org/challenges/our-ecological-neighborhood/where-genes-flow"}
        >
            Where the Genes Flow
        </Link>
    );
    const teamCodon = (
        <Link target={"_blank"}
            href={"https://2017.spaceappschallenge.org/challenges/our-ecological-neighborhood/where-genes-flow/teams/codon"}
        >
            Team Codon
        </Link>
    );
    return (
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Achievements of Nadun De Silva</title>
            </Head>
            <Layout>
                <LayoutContent>
                    <Section>
                        <SectionHeading>NASA Space Apps Challenge - Galactic Impact - Global Finalist</SectionHeading>
                        <Year>2017</Year>
                        <Paragraph>
                            The {nasaSpaceAppsChallenge} is a competition hosted by NASA with teams from around the
                            world competing under different categories. In the 2017 challenge, I along with five other
                            team members ({teamCodon}), competed under the {ourEcologicalNeighborhood} category to
                            solve the {whereTheGenesFlow} challenge. We came up with a platform to map and compare
                            population genetics of a species with landscape features, climate conditions, and human
                            activities in a region to identify potential barriers or facilitators to gene migration
                            and local adaptation. The platform at its core utilizes a clustering algorithm for identifying
                            patterns for identifying any such barriers.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>British Council HSBC Youth Enterprise Awards - Finalist</SectionHeading>
                        <Year>2015</Year>
                        <Paragraph>
                            British Council HSBC Youth Enterprise Awards is a hackathon in which many teams
                            presented ideas to help solve problems in different domains. In the hackathon held in 2015,
                            our team presented an idea, along with a prototype, to revolutionize education. Although
                            there are so many online content, many people still prefer to use books. However, there
                            are many occasions where the written word and diagrams are not enough to understand
                            complex concepts. The proposed system visualized drawings using augmented reality to
                            help students study them easily.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>Angel Hack - Finalist</SectionHeading>
                        <Year>2016</Year>
                        <Paragraph>
                            In Angel Hack 2016, our team developed a smart workout system which combied
                            a virtual reality game with an exercise bicycle fitted with a sensor to encourage
                            people to workout more. The game maps the user&lsquo;ss movement on the bicycle to
                            movements on the game. The user is presented with targets which they can achieve by
                            collecting coins in their path. In the final round where the finalists were tasked
                            with developing their concepts within a limited time frame, we developed a working
                            prototype which the judges were able to try out as well.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>Placements in Dean&lsquo;s List</SectionHeading>
                        <Year>2014 to 2018</Year>
                        <Paragraph>
                            During my B.Sc. (Hons.) in Engineering (Computer Science and Engineering) degree, I was
                            offered placements in the Dean&lsquo;s List for scoring a GPA above 3.8 (out of 4.2) for
                            6 out of the 8 semesters I studied at the University of Moratuwa.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>WSO2 Sustained Outstanding Contribution Award</SectionHeading>
                        <Year>2019 to 2021</Year>
                        <Paragraph>
                            Each year for employees who have performed exceptionally throughout the year,
                            the &quote;Sustained Outstanding Contribution Award&quote; is awarded. I was
                            presented this award for several consecutive years at WSO2. This award was changed
                            at year 2021 to be only awarded for the top 5% employees at WSO2 making it
                            extremely hard to achieve. In year 2021, I was offered this award with only 18
                            other people in the whole company gaining the same award. This is the
                            best awards offered for an employee for exceptional performance.
                        </Paragraph>
                    </Section>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default Achievements;
