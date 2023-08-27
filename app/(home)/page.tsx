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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { Box, CircularProgress, Container, styled } from "@mui/material";
import dynamic, { type DynamicOptionsLoadingProps } from "next/dynamic";
import React, { useRef, useState } from "react";

import Heading from "./_content/Heading";

const SectionContainer = styled(Container)(({ theme }) => ({
    margin: 0,
    paddingTop: `${theme.mixins.toolbar.minHeight ?? 0}px`,
}));

const pageLoader = (opt: DynamicOptionsLoadingProps): JSX.Element => (
    <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
    </Box>
);

const AboutMeSection = dynamic(async () => await import("./_content/AboutMe"), {
    loading: pageLoader,
});
const AchievementsSection = dynamic(
    async () => await import("./_content/sections/Achievements"),
    {
        loading: pageLoader,
    },
);
const ContributedProjectsSection = dynamic(
    async () => await import("./_content/sections/ContributedProjects"),
    {
        loading: pageLoader,
    },
);
const CertificationsSection = dynamic(
    async () => await import("./_content/sections/Certifications"),
    {
        loading: pageLoader,
    },
);
const ExperienceSection = dynamic(
    async () => await import("./_content/sections/Experience"),
    {
        loading: pageLoader,
    },
);
const ProfilesSection = dynamic(
    async () => await import("./_content/sections/Profiles"),
    {
        loading: pageLoader,
    },
);
const SkillsSection = dynamic(
    async () => await import("./_content/sections/Skills"),
    {
        loading: pageLoader,
    },
);

interface Section {
    name: string;
    ref: React.RefObject<HTMLDivElement>;
    Component: React.ComponentType;
    sectionId: string;
}

const Home = (): React.ReactElement => {
    const [isWelcomeBannerLoaded, setWelcomeBannerLoaded] =
        useState<boolean>(false);
    const WelcomeBanner = dynamic(
        async () =>
            await import("./_content/WelcomeBanner").then(async (component) => {
                setWelcomeBannerLoaded(true);
                return await Promise.resolve(component);
            }),
        {
            loading: () => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>
            ),
            ssr: false,
        },
    );

    const pageSections: Section[] = [
        {
            name: "Experience",
            ref: useRef<HTMLDivElement>(null),
            Component: ExperienceSection,
            sectionId: "experience",
        },
        {
            name: "Achievements",
            ref: useRef<HTMLDivElement>(null),
            Component: AchievementsSection,
            sectionId: "achievements",
        },
        {
            name: "Skills",
            ref: useRef<HTMLDivElement>(null),
            Component: SkillsSection,
            sectionId: "skills",
        },
        {
            name: "Certifications",
            ref: useRef<HTMLDivElement>(null),
            Component: CertificationsSection,
            sectionId: "certifications",
        },
        {
            name: "Profiles",
            ref: useRef<HTMLDivElement>(null),
            Component: ProfilesSection,
            sectionId: "profiles",
        },
        {
            name: "Contributed Projects",
            ref: useRef<HTMLDivElement>(null),
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
    const layoutContent = (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                marginBottom: 5,
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
    );
    return (
        <Container maxWidth={false} disableGutters data-testid={"home-page"}>
            {isWelcomeBannerLoaded ? (
                <React.Fragment>
                    <WelcomeBanner />
                    {layoutContent}
                </React.Fragment>
            ) : (
                <WelcomeBanner />
            )}
        </Container>
    );
};

export default Home;
