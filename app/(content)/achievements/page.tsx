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
import { Box, Link } from "@mui/material";
import { type Metadata } from "next";
import NextLink from "next/link";
import React from "react";

import {
    Logo,
    Paragraph,
    Photo,
    Section,
    SectionHeading,
    Timespan,
    Title,
} from "@/components/content";
import { Time, TimeRange } from "@/constants/commons";
import { Photos } from "@/constants/images";
import { type Institute, Institutes } from "@/constants/institutes";
import { Logos } from "@/constants/logos";
import { FULL_NAME } from "@/constants/metadata";

export const metadata: Metadata = {
    title: `${FULL_NAME} | Achievements`,
    description: `Various notable achievements of ${FULL_NAME}.`,
};

const Achievements = (): React.ReactNode => {
    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );
    const NasaSpaceAppsChallenge = generateLink(
        "NASA Space Apps Challenge",
        "https://www.spaceappschallenge.org/",
    );
    const OurEcologicalNeighborhood = generateLink(
        "Our Ecological Neighborhood",
        "https://2017.spaceappschallenge.org/challenges/our-ecological-neighborhood/",
    );
    const WhereTheGenesFlow = generateLink(
        "Where the Genes Flow",
        "https://2017.spaceappschallenge.org/challenges/our-ecological-neighborhood/where-genes-flow",
    );
    const TeamCodon = generateLink(
        "Team Codon",
        "https://2017.spaceappschallenge.org/challenges/our-ecological-neighborhood/where-genes-flow/teams/codon",
    );
    const HackaDev = generateLink("HackaDev", "https://www.hackadev.lk/");
    const AngelHack = generateLink("Angel Hack", "https://angelhack.com/");

    const generateInstituteLink = (institute: Institute): React.ReactElement =>
        generateLink(institute.name, institute.link);
    const UniversityOfMoratuwa = generateInstituteLink(
        Institutes.UniversityOfMoratuwa,
    );
    const NASA = generateInstituteLink(Institutes.NASA);
    const BritishCouncilHSBCYouthEnterpriseAwards = generateInstituteLink(
        Institutes.BritishCouncilHSBCYouthEnterpriseAwards,
    );
    const WSO2 = generateInstituteLink(Institutes.WSO2);

    const wso2Logo = <Logo height="2.5em" logo={Logos.WSO2} />;
    const uomLogo = <Logo height="4em" logo={Logos.UniversityOfMoratuwa} />;
    const nasaSpaceAppsChallengeLogo = (
        <Logo logo={Logos.NASASpaceAppsChallenge} />
    );
    const angelHackLogo = <Logo height="2.5em" logo={Logos.AngelHack} />;
    const hackaDevLogo = <Logo height="4.5em" logo={Logos.HackaDev} />;
    const britishCouncilLogo = (
        <Logo height="2.5em" logo={Logos.BritishCouncil} />
    );

    return (
        <React.Fragment>
            <Title>Achievements</Title>
            <Section>
                <SectionHeading>
                    WSO2 Sustained Outstanding Contribution Award
                </SectionHeading>
                <Timespan
                    value={new TimeRange(new Time(2019), new Time(2021))}
                />
                {wso2Logo}
                <Photo
                    float="right"
                    photo={Photos.WSO2OutstandingContributor2019}
                />
                <Paragraph>
                    Each year for employees who have performed exceptionally
                    throughout the year, the Sustained Outstanding Contribution
                    Award is awarded. I was presented this award for several
                    consecutive years at {WSO2}. Along with the award I had been
                    commended many times for performing well above the expected
                    level for many years.
                </Paragraph>
                <Paragraph>
                    In 2021, this award was changed to be only awarded for the
                    top 5% employees at {WSO2} making it extremely hard to
                    achieve. In the year 2021, I was offered this award with
                    only 18 other people in the whole company gaining the same
                    award. This is the best award offered for an employee for
                    exceptional performance at {WSO2}.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading>
                    Placements in the Dean&lsquo;s List at the University of
                    Moratuwa
                </SectionHeading>
                <Timespan
                    value={new TimeRange(new Time(2014), new Time(2018))}
                />
                {uomLogo}
                <Photo float="right" photo={Photos.UOMDeansList2017} />
                <Paragraph>
                    During my B.Sc. (Hons.) in Engineering (Computer Science and
                    Engineering) degree at the University of Moratuwa, I was
                    offered placements in the Dean&lsquo;s List for scoring a
                    GPA above 3.8 (out of 4.2) for 6 out of the 8 semesters I
                    studied at the {UniversityOfMoratuwa}.
                </Paragraph>
                <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
                    <Paragraph>
                        The semester in which placements in the Dean&lsquo;s
                        List was awarded (4.20 GPA Scale):
                    </Paragraph>
                    <ul>
                        <li>Semester 02 (GPA - 3.82)</li>
                        <li>Semester 03 (GPA - 3.84)</li>
                        <li>Semester 05 (GPA - 3.82)</li>
                        <li>Semester 06 (GPA - 4.03)</li>
                        <li>Semester 07 (GPA - 4.04)</li>
                        <li>Semester 08 (GPA - 4.01)</li>
                    </ul>
                </Box>
            </Section>
            <Section>
                <SectionHeading>
                    NASA Space Apps Challenge - Galactic Impact - Global
                    Finalist
                </SectionHeading>
                <Timespan value={new Time(2017)} />
                {nasaSpaceAppsChallengeLogo}
                <Photo
                    float="right"
                    photo={Photos.NASASpaceAppsChallenge2017Newspaper}
                />
                <Paragraph>
                    The {NasaSpaceAppsChallenge} is a competition hosted by{" "}
                    {NASA} with teams from around the world competing under
                    different categories. In the 2017 challenge, I along with
                    five other team members ({TeamCodon}), competed under the{" "}
                    {OurEcologicalNeighborhood} category to solve the{" "}
                    {WhereTheGenesFlow} challenge.
                </Paragraph>
                <Photo float="left" photo={Photos.NASASpaceAppsChallenge2017} />
                <Paragraph>
                    We came up with a platform to map and compare population
                    genetics of a species with landscape features, climate
                    conditions, and human activities in a region to identify
                    potential barriers or facilitators to gene migration and
                    local adaptation. The platform at its core utilizes a
                    clustering algorithm for identifying patterns for
                    identifying any such barriers.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading>
                    WSO2 Internal Hackathon - Honorable Mention
                </SectionHeading>
                <Timespan value={new Time(2017)} />
                {wso2Logo}
                <Paragraph>
                    {WSO2} Internal Hackathon (WHack) was held for the first
                    time in 2017 which was open to all employees including
                    interns who worked there at that time. I was an intern at
                    that time at {WSO2} and I along with a few other interns
                    participated in the {WSO2}
                    internal hackathon. We proposed a system to track users
                    across multiple platforms for improving customer analytics
                    and thereby improve the customer experience as well. We were
                    presented with an honorable mention for this solution.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading>Angel Hack - Finalist</SectionHeading>
                <Timespan value={new Time(2016)} />
                {angelHackLogo}
                <Photo float="right" photo={Photos.AngelHack2016} />
                <Paragraph>
                    In {AngelHack} 2016, our team developed a smart workout
                    system which combined a virtual reality game with an
                    exercise bicycle fitted with a sensor to encourage people to
                    workout more.
                </Paragraph>
                <Photo float="left" photo={Photos.AngelHack2016Bike} />
                <Paragraph>
                    The game maps the user&lsquo;s movement on the bicycle to
                    movements on the game. The user is presented with targets
                    which they can achieve by collecting coins in their path. In
                    the final round where the finalists were tasked with
                    developing their concepts within a limited time frame, we
                    developed a working prototype which the judges were able to
                    try out as well.
                </Paragraph>
                <Paragraph>
                    The game was built using Unity which received the signal
                    from the sensor attached to the exercise bicycle. The speed
                    at which the user pedaled the bicycle forward was mapped
                    into the speed at which the user moved within the game and
                    the slight movements of the head was mapped into the bicycle
                    making small turns. The path forward was designed to avoid
                    too much strain on the neck, but to simply provide an
                    enjoyable game for the user to enjoy while they exercised
                    using the bicycle.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading>HackaDev - Finalist</SectionHeading>
                <Timespan value={new Time(2015)} />
                {hackaDevLogo}
                <Paragraph>
                    {HackaDev} is a competition which provides a platform for
                    teams from within Sri Lanka to provide solutions for
                    problems within Sri Lanka. In 2015, the teams were tasked
                    with addressing problems which were faced by people in Uva
                    province in Sri Lanka. Our team presented a platform which
                    provided entrepreneurs a place to showcase their skills and
                    products. The platform focussed on connecting entrepreneurs
                    with customers and investors to help bootstrap businesses in
                    the area.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading>
                    British Council HSBC Youth Enterprise Awards - Finalist
                </SectionHeading>
                <Timespan value={new Time(2015)} />
                {britishCouncilLogo}
                <Photo
                    float="right"
                    photo={Photos.HSBCYouthEnterpriseAwards2015}
                />
                <Paragraph>
                    {BritishCouncilHSBCYouthEnterpriseAwards} is a hackathon in
                    which many teams presented ideas to help solve problems in
                    different domains. In the hackathon held in 2015, our team
                    presented an idea, along with a prototype, in the hope of
                    revolutionizing education.
                </Paragraph>
                <Photo
                    float="left"
                    photo={Photos.HSBCYouthEnterpriseAwards2015Discussion}
                />
                <Paragraph>
                    Although there is so much online content, many people still
                    prefer to use books. However, there are many occasions where
                    the written word and diagrams are not enough to understand
                    complex concepts. The proposed system visualized drawings
                    using augmented reality to help students study them easily.
                </Paragraph>
            </Section>
        </React.Fragment>
    );
};

export default Achievements;
