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
import { Box, Button, CircularProgress, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useRef } from "react";

import Heading from "@/components/Heading";
import { WelcomeBanner } from "@/components/Home";
import Layout, { LayoutContent } from "@/components/Layout";

const SectionContainer = styled(Container)(({ theme }) => ({
    margin: 0,
    paddingTop: `${theme.mixins.toolbar.minHeight ?? 0}px`
}));

const dynamicOptions = {
    loading: () => (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }} data-testid="section-loader">
            <CircularProgress/>
        </Box>
    ),
    ssr: false
};

const AboutMe = dynamic<{}>(async() => await import("@/components/Home/AboutMe"), dynamicOptions);
const Achievements = dynamic<{}>(async() => await import("@/components/Home/Achievements"), dynamicOptions);
const ContributedProjects = dynamic<{}>(async() => await import("@/components/Home/ContributedProjects"), dynamicOptions);
const Certifications = dynamic<{}>(async() => await import("@/components/Home/Certifications"), dynamicOptions);
const Experience = dynamic<{}>(async() => await import("@/components/Home/Experience"), dynamicOptions);
const Profiles = dynamic<{}>(async() => await import("@/components/Home/Profiles"), dynamicOptions);
const Skills = dynamic<{}>(async() => await import("@/components/Home/Skills"), dynamicOptions);

interface Section {
    name: string,
    ref: React.RefObject<HTMLDivElement>,
    Component: React.ComponentType<{}>,
    sectionId: string,
}

const Home = (): React.ReactElement => {
    const pageSections: Section[] = [
        {
            name: "Experience",
            ref: useRef<HTMLDivElement>(null),
            Component: Experience,
            sectionId: "experience"
        },
        {
            name: "Achievements",
            ref: useRef<HTMLDivElement>(null),
            Component: Achievements,
            sectionId: "achievements"
        },
        {
            name: "Skills",
            ref: useRef<HTMLDivElement>(null),
            Component: Skills,
            sectionId: "skills"
        },
        {
            name: "Certifications",
            ref: useRef<HTMLDivElement>(null),
            Component: Certifications,
            sectionId: "certifications"
        },
        {
            name: "Profiles",
            ref: useRef<HTMLDivElement>(null),
            Component: Profiles,
            sectionId: "profiles"
        },
        {
            name: "Contributed Projects",
            ref: useRef<HTMLDivElement>(null),
            Component: ContributedProjects,
            sectionId: "contributed-projects"
        }
    ];

    const generateSection = (title: string, section: React.ReactElement, testId: string): React.ReactElement => (
        <Container maxWidth={false} disableGutters={true} data-testid={testId}>
            <Heading>{title}</Heading>
            <Container maxWidth={false} disableGutters={true} sx={{ padding: 3 }}>
                {section}
            </Container>
        </Container>
    );
    return (
        <Container maxWidth={false} disableGutters={true} data-testid={"home-page"}>
            <Head>
                <title>Nadun De Silva | An aspiring Software Engineer and ML Enthusiast</title>
            </Head>
            <Layout appBarItems={
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    {
                        pageSections.map((section: Section) => (
                            <Button key={section.name} variant="text" color="primary" disableElevation
                                href={`#${section.sectionId}`}
                                data-testid={`${section.sectionId}-nav-button`}
                                sx={{ color: "#ffffff" }}>
                                {section.name}
                            </Button>
                        ))
                    }
                </Box>
            }>
                <WelcomeBanner/>
                <LayoutContent>
                    <SectionContainer maxWidth={false} disableGutters={true}>
                        {generateSection("About Me", <AboutMe/>, "about-me-section")}
                    </SectionContainer>
                    <React.Fragment>
                        {
                            pageSections.map((section: Section) => (
                                <SectionContainer maxWidth={false} disableGutters={true} key={section.name}
                                    id={section.sectionId}
                                >
                                    {generateSection(section.name, <section.Component/>, `${section.sectionId}-section`)}
                                </SectionContainer>
                            ))
                        }
                    </React.Fragment>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default Home;
