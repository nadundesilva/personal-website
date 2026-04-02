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
"use client";

import {
    Box,
    CircularProgress,
    Container,
    Divider,
    styled,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import dynamic from "next/dynamic";
import type React from "react";
import type { JSX } from "react";

import Heading from "./common/Heading";
import ScrollReveal from "@/components/content/ScrollReveal";
import WelcomeBanner from "./sections/WelcomeBanner";

const SectionContainer = styled(Container)(({ theme }) => ({
    m: 0,
    pt: `${theme.mixins.toolbar.minHeight as number}px`,
}));

const pageLoader = (): JSX.Element => (
    <Box
        sx={{ display: "flex", justifyContent: "center", py: 5 }}
        aria-live="polite"
        aria-busy="true"
    >
        <CircularProgress aria-label="Loading section" />
    </Box>
);

const AboutMeSection = dynamic(async () => await import("./sections/AboutMe"), {
    loading: pageLoader,
});

const ExperienceSection = dynamic(
    async () => await import("./sections/Experience"),
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

const AchievementsSection = dynamic(
    async () => await import("./sections/Achievements"),
    {
        loading: pageLoader,
    },
);

const SkillsSection = dynamic(async () => await import("./sections/Skills"), {
    loading: pageLoader,
});

const CertificationsSection = dynamic(
    async () => await import("./sections/Certifications"),
    {
        loading: pageLoader,
    },
);

const ContactSection = dynamic(async () => await import("./sections/Contact"), {
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
            name: "Contributed Projects",
            Component: ContributedProjectsSection,
            sectionId: "contributed-projects",
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
            name: "Contact",
            Component: ContactSection,
            sectionId: "contact",
        },
    ];

    const generateSection = (
        title: string,
        section: React.ReactElement,
        testId: string,
        number?: number,
        showDivider = true,
    ): React.ReactElement => {
        const titleId = title.toLowerCase().replace(/\s+/g, "-");
        return (
            <Container
                component="section"
                aria-labelledby={titleId}
                maxWidth={false}
                disableGutters
                data-testid={testId}
                sx={{ mt: { xs: 6, md: 10 }, mb: { xs: 3, md: 6 } }}
            >
                <Heading id={titleId} number={number}>
                    {title}
                </Heading>
                <Container maxWidth={false} disableGutters sx={{ py: 4 }}>
                    {section}
                </Container>
                {showDivider && (
                    <Divider aria-hidden="true" sx={{ mt: { xs: 3, md: 6 } }} />
                )}
            </Container>
        );
    };

    return (
        <>
            <WelcomeBanner />
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    position: "relative",
                    isolation: "isolate",
                    pt: { xs: 6, md: 8 },
                    px: {
                        xs: 1,
                        md: 4,
                        lg: 20,
                        xl: 40,
                    },
                }}
            >
                {/* Gradient overlay that blends the hero banner into the content area below */}
                <Box
                    aria-hidden="true"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 280,
                        background: (theme) =>
                            theme.palette.mode === "light"
                                ? `radial-gradient(ellipse 100% 100% at 50% 0%, ${alpha(theme.palette.primary.main, 0.6)} 0%, ${alpha(theme.palette.primary.main, 0.25)} 40%, ${alpha(theme.palette.primary.main, 0.08)} 70%, transparent 100%)`
                                : `radial-gradient(ellipse 100% 100% at 50% 0%, ${alpha(theme.palette.common.black, 0.6)} 0%, ${alpha(theme.palette.common.black, 0.25)} 40%, ${alpha(theme.palette.common.black, 0.08)} 70%, transparent 100%)`,
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />
                <Container
                    maxWidth={false}
                    sx={{ position: "relative", zIndex: 1 }}
                >
                    <SectionContainer maxWidth={false} disableGutters>
                        <ScrollReveal delay={0}>
                            {generateSection(
                                "About Me",
                                <AboutMeSection />,
                                "about-me-section",
                                1,
                            )}
                        </ScrollReveal>
                    </SectionContainer>
                    {pageSections.map((section: Section, index: number) => (
                        <SectionContainer
                            maxWidth={false}
                            disableGutters
                            key={section.name}
                        >
                            <ScrollReveal delay={index * 50}>
                                {generateSection(
                                    section.name,
                                    <section.Component />,
                                    `${section.sectionId}-section`,
                                    index + 2,
                                    index < pageSections.length - 1,
                                )}
                            </ScrollReveal>
                        </SectionContainer>
                    ))}
                </Container>
            </Container>
        </>
    );
};

export default PageContent;
