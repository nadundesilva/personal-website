/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
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
import { Box, CircularProgress, Container, styled } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useRef, useState } from "react";

import { Heading } from "@/components/home";
import Layout, { LayoutContent } from "@/components/layout";

const SectionContainer = styled(Container)(({ theme }) => ({
    margin: 0,
    paddingTop: `${theme.mixins.toolbar.minHeight ?? 0}px`,
}));

const dynamicOptions = {
    loading: () => (
        <Box
            sx={{ display: "flex", justifyContent: "center", py: 5 }}
            data-testid="section-loader"
        >
            <CircularProgress />
        </Box>
    ),
    ssr: false,
};

const AboutMe = dynamic<{}>(
    async () => await import("@/components/home/AboutMe"),
    dynamicOptions,
);
const Achievements = dynamic<{}>(
    async () => await import("@/components/home/sections/Achievements"),
    dynamicOptions,
);
const ContributedProjects = dynamic<{}>(
    async () => await import("@/components/home/sections/ContributedProjects"),
    dynamicOptions,
);
const Certifications = dynamic<{}>(
    async () => await import("@/components/home/sections/Certifications"),
    dynamicOptions,
);
const Experience = dynamic<{}>(
    async () => await import("@/components/home/sections/Experience"),
    dynamicOptions,
);
const Profiles = dynamic<{}>(
    async () => await import("@/components/home/sections/Profiles"),
    dynamicOptions,
);
const Skills = dynamic<{}>(
    async () => await import("@/components/home/sections/Skills"),
    dynamicOptions,
);

interface Section {
    name: string;
    ref: React.RefObject<HTMLDivElement>;
    Component: React.ComponentType<{}>;
    sectionId: string;
}

const Home = (): React.ReactElement => {
    const [isWelcomeBannerLoaded, setWelcomeBannerLoaded] =
        useState<boolean>(false);
    const WelcomeBanner = dynamic<{}>(
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
                    data-testid="section-loader"
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
