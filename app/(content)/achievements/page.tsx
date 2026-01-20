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
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import type React from "react";

import {
    Link,
    Logo,
    List,
    ListItem,
    Paragraph,
    Photo,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import { Date, DateRange } from "@/constants/date";
import { type Institute, Institutes } from "@/constants/institutes";
import { FULL_NAME } from "@/constants/metadata";

import wso2OutstandingContributorImage from "@/assets/achievements/wso2-outstanding-contributor.jpg";
import uomDeansList2017Image from "@/assets/achievements/deans-list-2017.jpg";
import nasaSpaceAppsChallenge2017NewspaperImage from "@/assets/achievements/nasa-space-apps-2017-newspaper.jpg";
import nasaSpaceAppsChallenge2017Image from "@/assets/achievements/nasa-space-apps-2017.jpg";
import angelHack2016Image from "@/assets/achievements/angel-hack-2016.jpg";
import angelHack2016BikeImage from "@/assets/achievements/angel-hack-2016-bike.jpg";
import hsbcYouthEnterpriseAwards2015Image from "@/assets/achievements/hsbc-youth-enterprise-awards-2015.jpg";
import hsbcYouthEnterpriseAwards2015DiscussionImage from "@/assets/achievements/hsbc-youth-enterprise-awards-2015-discussion.jpg";

import wso2LogoImage from "@/assets/experience/wso2-logo.svg";
import wso2LogoWhiteImage from "@/assets/experience/wso2-logo-white.svg";
import uomLogoImage from "@/assets/education/university-of-moratuwa-logo.png";
import nasaSpaceAppsChallengeLogoImage from "@/assets/achievements/nasa-space-apps-logo.png";
import nasaSpaceAppsChallengeLogoWhiteImage from "@/assets/achievements/nasa-space-apps-logo-white.png";
import angelHackLogoImage from "@/assets/achievements/angel-hack-logo.png";
import angelHackLogoWhiteImage from "@/assets/achievements/angel-hack-logo-white.png";
import hackaDevLogoImage from "@/assets/achievements/hackadev-logo.png";
import hackaDevLogoWhiteImage from "@/assets/achievements/hackadev-logo-white.png";
import britishCouncilLogoImage from "@/assets/achievements/british-council-logo.png";

export const metadata: Metadata = {
    title: "Achievements",
    description: `Various notable achievements of ${FULL_NAME}.`,
};

const Achievements = (): React.ReactElement => {
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
    const Unity = generateLink("Unity", "https://unity.com/");

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

    const wso2Logo = (
        <Logo
            srcLight={wso2LogoImage}
            srcDark={wso2LogoWhiteImage}
            alt="WSO2"
            recommendedSx={{ height: "2.5em" }}
        />
    );
    const uomLogo = (
        <Logo
            srcLight={uomLogoImage}
            srcDark={uomLogoImage}
            alt="University of Moratuwa"
            recommendedSx={{ height: "4em" }}
        />
    );
    const nasaSpaceAppsChallengeLogo = (
        <Logo
            srcLight={nasaSpaceAppsChallengeLogoImage}
            srcDark={nasaSpaceAppsChallengeLogoWhiteImage}
            alt="NASA Space Apps Challenge"
            recommendedSx={{ height: "2.5em" }}
        />
    );
    const angelHackLogo = (
        <Logo
            srcLight={angelHackLogoImage}
            srcDark={angelHackLogoWhiteImage}
            alt="Angel Hack"
            recommendedSx={{ height: "2.5em" }}
        />
    );
    const hackaDevLogo = (
        <Logo
            srcLight={hackaDevLogoImage}
            srcDark={hackaDevLogoWhiteImage}
            alt="HackaDev"
            recommendedSx={{ height: "4.5em" }}
        />
    );
    const britishCouncilLogo = (
        <Logo
            srcLight={britishCouncilLogoImage}
            srcDark={britishCouncilLogoImage}
            alt="British Council"
            recommendedSx={{ height: "2.5em" }}
        />
    );

    return (
        <>
            <Title>Achievements</Title>
            <Section>
                <SectionHeading
                    date={new DateRange(new Date(2019), new Date(2021))}
                    logo={wso2Logo}
                >
                    WSO2 Sustained Outstanding Contribution Award
                </SectionHeading>
                <Photo
                    src={wso2OutstandingContributorImage}
                    alt="WSO2 Sustained Outstanding Contribution Award"
                    float="right"
                />
                <Paragraph>
                    Each year for employees who have performed exceptionally
                    throughout the year, the Sustained Outstanding Contribution
                    Award is awarded. I was presented with this award for
                    several consecutive years at {WSO2}. Along with the award I
                    had been commended many times for performing well above the
                    expected level for many years.
                </Paragraph>
                <Paragraph>
                    In 2021, this award was changed to be only awarded for the
                    top 5% employees at {WSO2} making it extremely hard to
                    achieve. In the year 2021, I was awarded this with only 18
                    other people in the whole company gaining the same award.
                    This is the best award offered for an employee for
                    exceptional performance at {WSO2}.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading
                    date={new DateRange(new Date(2014), new Date(2018))}
                    logo={uomLogo}
                >
                    Placements on the Dean&lsquo;s List at the University of
                    Moratuwa
                </SectionHeading>
                <Photo
                    src={uomDeansList2017Image}
                    alt="University of Moratuwa Deans List 2017"
                    float="right"
                />
                <Paragraph>
                    During my B.Sc. (Hons.) in Engineering (Computer Science and
                    Engineering) degree at the University of Moratuwa, I was
                    placed on the Dean&lsquo;s List for scoring a GPA above 3.8
                    (out of 4.2) for 6 out of the 8 semesters I studied at the{" "}
                    {UniversityOfMoratuwa}.
                </Paragraph>
                <Paragraph>
                    The semesters in which placements on the Dean&lsquo;s List
                    were awarded (4.20 GPA Scale):
                </Paragraph>
                <Box sx={{ m: 0, pt: 2 }}>
                    <List>
                        <ListItem>
                            <Typography>Semester 02 (GPA - 3.82)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Semester 03 (GPA - 3.84)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Semester 05 (GPA - 3.82)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Semester 06 (GPA - 4.03)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Semester 07 (GPA - 4.04)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Semester 08 (GPA - 4.01)</Typography>
                        </ListItem>
                    </List>
                </Box>
            </Section>
            <Section>
                <SectionHeading
                    date={new Date(2017)}
                    logo={nasaSpaceAppsChallengeLogo}
                >
                    NASA Space Apps Challenge - Galactic Impact - Global
                    Finalist
                </SectionHeading>
                <Photo
                    src={nasaSpaceAppsChallenge2017NewspaperImage}
                    alt="NASA Space Apps Challenge 2017 Newspaper"
                    float="right"
                />
                <Paragraph>
                    The {NasaSpaceAppsChallenge} is a competition hosted by{" "}
                    {NASA} with teams from around the world competing under
                    different categories. In the 2017 challenge, I along with
                    five other team members ({TeamCodon}), competed under the{" "}
                    {OurEcologicalNeighborhood} category to solve the{" "}
                    {WhereTheGenesFlow} challenge.
                </Paragraph>
                <Photo
                    src={nasaSpaceAppsChallenge2017Image}
                    alt="NASA Space Apps Challenge 2017"
                    float="left"
                />
                <Paragraph>
                    We came up with a platform to map and compare population
                    genetics of a species with landscape features, climate
                    conditions, and human activities in a region to identify
                    potential barriers or facilitators to gene migration and
                    local adaptation. The platform at its core utilizes a
                    clustering algorithm to identify patterns that indicate any
                    such barriers.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading date={new Date(2017)} logo={wso2Logo}>
                    WSO2 Internal Hackathon - Honorable Mention
                </SectionHeading>
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
                <SectionHeading date={new Date(2016)} logo={angelHackLogo}>
                    Angel Hack - Finalist
                </SectionHeading>
                <Photo
                    src={angelHack2016Image}
                    alt="Angel Hack 2016"
                    float="right"
                />
                <Paragraph>
                    In {AngelHack} 2016, our team developed a smart workout
                    system which combined a virtual reality game with an
                    exercise bicycle fitted with a sensor to encourage people to
                    workout more.
                </Paragraph>
                <Photo
                    src={angelHack2016BikeImage}
                    alt="Angel Hack 2016 Bike"
                    float="left"
                />
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
                    The game was built using {Unity} which received the signal
                    from the sensor attached to the exercise bicycle. The speed
                    at which the user pedaled the bicycle forward was mapped
                    into the speed at which the user moved within the game and
                    the slight movements of the head were mapped into the
                    bicycle making small turns. The path forward was designed to
                    avoid too much strain on the neck, but to simply provide an
                    enjoyable game for the user to enjoy while they exercised
                    using the bicycle.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading date={new Date(2015)} logo={hackaDevLogo}>
                    HackaDev - Finalist
                </SectionHeading>
                <Paragraph>
                    {HackaDev} is a competition which provides a platform for
                    teams from within Sri Lanka to provide solutions for
                    problems within Sri Lanka. In 2015, the teams were tasked
                    with addressing problems which were faced by people in Uva
                    province in Sri Lanka. Our team presented a platform which
                    provided entrepreneurs a place to showcase their skills and
                    products. The platform focused on connecting entrepreneurs
                    with customers and investors to help bootstrap businesses in
                    the area.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading date={new Date(2015)} logo={britishCouncilLogo}>
                    British Council HSBC Youth Enterprise Awards - Finalist
                </SectionHeading>
                <Photo
                    src={hsbcYouthEnterpriseAwards2015Image}
                    alt="British Council HSBC Youth Enterprise Awards 2015"
                    float="right"
                />
                <Paragraph>
                    {BritishCouncilHSBCYouthEnterpriseAwards} is a hackathon in
                    which many teams presented ideas to help solve problems in
                    different domains. In the hackathon held in 2015, our team
                    presented an idea, along with a prototype, in the hope of
                    revolutionizing education.
                </Paragraph>
                <Photo
                    src={hsbcYouthEnterpriseAwards2015DiscussionImage}
                    alt="British Council HSBC Youth Enterprise Awards 2015 Discussion"
                    float="left"
                />
                <Paragraph>
                    Although there is so much online content, many people still
                    prefer to use books. However, there are many occasions where
                    the written word and diagrams are not enough to understand
                    complex concepts. The proposed system visualized drawings
                    using augmented reality to help students study them easily.
                </Paragraph>
            </Section>
        </>
    );
};

export default Achievements;
