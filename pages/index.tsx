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
import Head from "next/head";
import React, { useRef, useState } from "react";

import { Heading } from "@/components/home";
import Layout, { LayoutContent } from "@/components/layout";

const SectionContainer = styled(Container)(({ theme }) => ({
    margin: 0,
    paddingTop: `${theme.mixins.toolbar.minHeight ?? 0}px`,
}));

const pageLoader = (opt: DynamicOptionsLoadingProps): JSX.Element => (
    <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
    </Box>
);

const AboutMe = dynamic(async () => await import("@/components/home/AboutMe"), {
    loading: pageLoader,
    ssr: false,
});
const Achievements = dynamic(
    async () => await import("@/components/home/sections/Achievements"),
    {
        loading: pageLoader,
        ssr: false,
    },
);
const ContributedProjects = dynamic(
    async () => await import("@/components/home/sections/ContributedProjects"),
    {
        loading: pageLoader,
        ssr: false,
    },
);
const Certifications = dynamic(
    async () => await import("@/components/home/sections/Certifications"),
    {
        loading: pageLoader,
        ssr: false,
    },
);
const Experience = dynamic(
    async () => await import("@/components/home/sections/Experience"),
    {
        loading: pageLoader,
        ssr: false,
    },
);
const Profiles = dynamic(
    async () => await import("@/components/home/sections/Profiles"),
    {
        loading: pageLoader,
        ssr: false,
    },
);
const Skills = dynamic(
    async () => await import("@/components/home/sections/Skills"),
    {
        loading: pageLoader,
        ssr: false,
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
            await import("@/components/home/WelcomeBanner").then(
                async (component) => {
                    setWelcomeBannerLoaded(true);
                    return await Promise.resolve(component);
                },
            ),
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
            Component: Experience,
            sectionId: "experience",
        },
        {
            name: "Achievements",
            ref: useRef<HTMLDivElement>(null),
            Component: Achievements,
            sectionId: "achievements",
        },
        {
            name: "Skills",
            ref: useRef<HTMLDivElement>(null),
            Component: Skills,
            sectionId: "skills",
        },
        {
            name: "Certifications",
            ref: useRef<HTMLDivElement>(null),
            Component: Certifications,
            sectionId: "certifications",
        },
        {
            name: "Profiles",
            ref: useRef<HTMLDivElement>(null),
            Component: Profiles,
            sectionId: "profiles",
        },
        {
            name: "Contributed Projects",
            ref: useRef<HTMLDivElement>(null),
            Component: ContributedProjects,
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
        <LayoutContent>
            <SectionContainer maxWidth={false} disableGutters>
                {generateSection("About Me", <AboutMe />, "about-me-section")}
            </SectionContainer>
            <React.Fragment>
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
            </React.Fragment>
        </LayoutContent>
    );
    return (
        <Container maxWidth={false} disableGutters data-testid={"home-page"}>
            <Head>
                <title>
                    Nadun De Silva | An aspiring Software Engineer and ML
                    Enthusiast
                </title>
            </Head>
            {isWelcomeBannerLoaded ? (
                <Layout>
                    <WelcomeBanner />
                    {layoutContent}
                </Layout>
            ) : (
                <WelcomeBanner />
            )}
        </Container>
    );
};

export default Home;
