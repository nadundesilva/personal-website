"use client";
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

import { Box, CircularProgress, Container, styled } from "@mui/material";
import dynamic from "next/dynamic";
import type React from "react";
import type { JSX } from "react";

import Heading from "./Heading";
import WelcomeBanner from "./WelcomeBanner";

const SectionContainer = styled(Container)(({ theme }) => ({
    margin: 0,
    pt: `${theme.mixins.toolbar.minHeight ?? 0}px`,
}));

const pageLoader = (): JSX.Element => (
    <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
    </Box>
);

const AboutMeSection = dynamic(async () => await import("./AboutMe"), {
    loading: pageLoader,
});
const AchievementsSection = dynamic(
    async () => await import("./sections/Achievements"),
    {
        loading: pageLoader,
    },
);
const ContributedProjectsSection = dynamic(
    async () => await import("./sections/ContributedProjects"),
    {
        loading: pageLoader,
    },
);
const CertificationsSection = dynamic(
    async () => await import("./sections/Certifications"),
    {
        loading: pageLoader,
    },
);
const ExperienceSection = dynamic(
    async () => await import("./sections/Experience"),
    {
        loading: pageLoader,
    },
);
const ProfilesSection = dynamic(
    async () => await import("./sections/Profiles"),
    {
        loading: pageLoader,
    },
);
const SkillsSection = dynamic(async () => await import("./sections/Skills"), {
    loading: pageLoader,
});

interface Section {
    name: string;
    Component: React.ComponentType;
    sectionId: string;
}

const PageContent = (): React.ReactElement => {
    const pageSections: Section[] = [
        {
            name: "Experience",
            Component: ExperienceSection,
            sectionId: "experience",
        },
        {
            name: "Achievements",
            Component: AchievementsSection,
            sectionId: "achievements",
        },
        {
            name: "Skills",
            Component: SkillsSection,
            sectionId: "skills",
        },
        {
            name: "Certifications",
            Component: CertificationsSection,
            sectionId: "certifications",
        },
        {
            name: "Profiles",
            Component: ProfilesSection,
            sectionId: "profiles",
        },
        {
            name: "Contributed Projects",
            Component: ContributedProjectsSection,
            sectionId: "contributed-projects",
        },
    ];

    const generateSection = (
        title: string,
        section: React.ReactElement,
        testId: string,
    ): React.ReactElement => (
        <Container maxWidth={false} disableGutters data-testid={testId}>
            <Heading>{title}</Heading>
            <Container maxWidth={false} disableGutters sx={{ py: 3 }}>
                {section}
            </Container>
        </Container>
    );

    return (
        <>
            <WelcomeBanner />
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    mb: 5,
                    px: {
                        xs: 0,
                        lg: 20,
                        xl: 40,
                    },
                }}
            >
                <Container maxWidth={false}>
                    <SectionContainer maxWidth={false} disableGutters>
                        {generateSection(
                            "About Me",
                            <AboutMeSection />,
                            "about-me-section",
                        )}
                    </SectionContainer>
                    {pageSections.map((section: Section) => (
                        <SectionContainer
                            maxWidth={false}
                            disableGutters
                            key={section.name}
                            id={section.sectionId}
                        >
                            {generateSection(
                                section.name,
                                <section.Component />,
                                `${section.sectionId}-section`,
                            )}
                        </SectionContainer>
                    ))}
                </Container>
            </Container>
        </>
    );
};

export default PageContent;
