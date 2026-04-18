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
import type { Metadata } from "next";
import type React from "react";

import {
    AccentedList,
    Image,
    Link,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import AchievementDetails, { type Achievement } from "@/constants/achievements";
import Companies, { type Company } from "@/constants/companies";
import Competitions, { type Competition } from "@/constants/competitions";
import Institutes, { type Institute } from "@/constants/institutes";
import { FULL_NAME } from "@/constants/metadata";

import angelHack2016BikeImage from "@/assets/achievements/angel-hack-2016-bike.jpg";
import angelHack2016Image from "@/assets/achievements/angel-hack-2016.jpg";
import uomDeansList2017Image from "@/assets/achievements/deans-list-2017.jpg";
import hsbcYouthEnterpriseAwards2015DiscussionImage from "@/assets/achievements/hsbc-youth-enterprise-awards-2015-discussion.jpg";
import hsbcYouthEnterpriseAwards2015Image from "@/assets/achievements/hsbc-youth-enterprise-awards-2015.jpg";
import nasaSpaceAppsChallenge2017NewspaperImage from "@/assets/achievements/nasa-space-apps-2017-newspaper.jpg";
import nasaSpaceAppsChallenge2017Image from "@/assets/achievements/nasa-space-apps-2017.jpg";
import wso2OutstandingContributorImage from "@/assets/achievements/wso2-outstanding-contributor.jpg";

export const metadata: Metadata = {
    title: "Achievements",
    description: `Various notable achievements of ${FULL_NAME}.`,
};

interface AchievementSectionHeadingProps {
    achievement: Achievement;
    id: string;
}

const AchievementSectionHeading = ({
    achievement,
    id,
}: AchievementSectionHeadingProps): React.ReactElement => (
    <SectionHeading
        id={id}
        date={achievement.date}
        logo={
            <Logo
                srcLight={achievement.logo.srcLight}
                srcDark={achievement.logo.srcDark}
                alt=""
                className={achievement.logoClassName}
            />
        }
    >
        {achievement.title}
    </SectionHeading>
);

const Achievements = (): React.ReactElement => {
    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );
    const generateCompetitionLink = (
        competition: Competition,
    ): React.ReactElement => generateLink(competition.name, competition.link);
    const generateInstituteLink = (institute: Institute): React.ReactElement =>
        generateLink(institute.name, institute.link);
    const generateCompanyLink = (company: Company): React.ReactElement =>
        generateLink(company.name, company.link);

    const NasaSpaceAppsChallenge = generateCompetitionLink(
        Competitions.NasaSpaceAppsChallenge,
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
    const HackaDev = generateCompetitionLink(Competitions.HackaDev);
    const AngelHack = generateCompetitionLink(Competitions.AngelHack);
    const Unity = generateLink("Unity", "https://unity.com/");

    const UniversityOfMoratuwa = generateInstituteLink(
        Institutes.UniversityOfMoratuwa,
    );
    const NASA = generateLink("NASA", "https://www.nasa.gov/");
    const BritishCouncilHSBCYouthEnterpriseAwards = generateCompetitionLink(
        Competitions.BritishCouncilHSBCYouthEnterpriseAwards,
    );
    const WSO2 = generateCompanyLink(Companies.WSO2);

    return (
        <>
            <Title>Achievements</Title>
            <Section labelledById="section-wso2-outstanding-contribution">
                <AchievementSectionHeading
                    id="section-wso2-outstanding-contribution"
                    achievement={
                        AchievementDetails.WSO2SustainedOutstandingContributionAward
                    }
                />
                <Image
                    src={wso2OutstandingContributorImage}
                    alt="Sustained Outstanding Contribution Award presented by WSO2."
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
                    top 5% employees at {Companies.WSO2.name} making it
                    extremely hard to achieve. In the year 2021, I was awarded
                    this with only 18 other people in the whole company gaining
                    the same award. This is the best award offered for an
                    employee for exceptional performance at{" "}
                    {Companies.WSO2.name}.
                </Paragraph>
            </Section>
            <Section labelledById="section-uom-deans-list">
                <AchievementSectionHeading
                    id="section-uom-deans-list"
                    achievement={AchievementDetails.PlacementsOnTheDeansList}
                />
                <Image
                    src={uomDeansList2017Image}
                    alt="Certificate indicating placement on the Dean's List at the University of Moratuwa."
                    float="right"
                />
                <Paragraph>
                    During my B.Sc. (Hons.) in Engineering (Computer Science and
                    Engineering) degree at the {UniversityOfMoratuwa}, I was
                    placed on the Dean&lsquo;s List for scoring a GPA above 3.8
                    (out of 4.2) for 6 out of the 8 semesters I studied there.
                </Paragraph>
                <AccentedList
                    heading="Dean&rsquo;s List Semesters (4.20 GPA Scale):"
                    headingVariant="h3"
                >
                    <ListItem>Semester 02 (GPA: 3.82)</ListItem>
                    <ListItem>Semester 03 (GPA: 3.84)</ListItem>
                    <ListItem>Semester 05 (GPA: 3.82)</ListItem>
                    <ListItem>Semester 06 (GPA: 4.03)</ListItem>
                    <ListItem>Semester 07 (GPA: 4.04)</ListItem>
                    <ListItem>Semester 08 (GPA: 4.01)</ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-nasa-space-apps">
                <AchievementSectionHeading
                    id="section-nasa-space-apps"
                    achievement={
                        AchievementDetails.NasaSpaceAppsChallengeGlobalFinalist
                    }
                />
                <Image
                    src={nasaSpaceAppsChallenge2017NewspaperImage}
                    alt="Newspaper clipping featuring the NASA Space Apps Challenge."
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
                <Image
                    src={nasaSpaceAppsChallenge2017Image}
                    alt="Team Codon members posing together after the NASA Space Apps Challenge."
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
            <Section labelledById="section-wso2-internal-hackathon">
                <AchievementSectionHeading
                    id="section-wso2-internal-hackathon"
                    achievement={
                        AchievementDetails.WSO2InternalHackathonHonorableMention
                    }
                />
                <Paragraph>
                    {WSO2} Internal Hackathon (WHack) was held for the first
                    time in 2017 which was open to all employees including
                    interns who worked there at that time. I was an intern at
                    that time at {Companies.WSO2.name} and I along with a few
                    other interns participated in the {Companies.WSO2.name}{" "}
                    internal hackathon. We proposed a system to track users
                    across multiple platforms for improving customer analytics
                    and thereby improve the customer experience as well. We were
                    presented with an honorable mention for this solution.
                </Paragraph>
            </Section>
            <Section labelledById="section-angel-hack">
                <AchievementSectionHeading
                    id="section-angel-hack"
                    achievement={AchievementDetails.AngelHackFinalist}
                />
                <Image
                    src={angelHack2016Image}
                    alt="Working on the smart workout system prototype."
                    float="right"
                />
                <Paragraph>
                    In {AngelHack} 2016, our team developed a smart workout
                    system which combined a virtual reality game with an
                    exercise bicycle fitted with a sensor to encourage people to
                    workout more.
                </Paragraph>
                <Image
                    src={angelHack2016BikeImage}
                    alt="Detailed view of the exercise bicycle prototype used in the smart workout system."
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
            <Section labelledById="section-hackadev">
                <AchievementSectionHeading
                    id="section-hackadev"
                    achievement={AchievementDetails.HackaDevFinalist}
                />
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
            <Section labelledById="section-british-council-hsbc-awards">
                <AchievementSectionHeading
                    id="section-british-council-hsbc-awards"
                    achievement={
                        AchievementDetails.BritishCouncilHSBCYouthEnterpriseAwardsFinalist
                    }
                />
                <Image
                    src={hsbcYouthEnterpriseAwards2015Image}
                    alt="Team members posing at the hackathon."
                    float="right"
                />
                <Paragraph>
                    {BritishCouncilHSBCYouthEnterpriseAwards} is a hackathon in
                    which many teams presented ideas to help solve problems in
                    different domains. In the hackathon held in 2015, our team
                    presented an idea, along with a prototype, in the hope of
                    revolutionizing education.
                </Paragraph>
                <Image
                    src={hsbcYouthEnterpriseAwards2015DiscussionImage}
                    alt="Team members discussing their project at the hackathon."
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
