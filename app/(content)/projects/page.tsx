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
import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import type React from "react";

import {
    HighlightsSection,
    Link,
    LinkButton,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import { Date, DateRange } from "@/constants/date";
import { Logos } from "@/constants/logos";
import { FULL_NAME } from "@/constants/metadata";
import { Projects as ProjectDetails } from "@/constants/projects";

export const metadata: Metadata = {
    title: `${FULL_NAME} | Projects`,
    description: `Various projects done by ${FULL_NAME} throughout his career.`,
};

const Projects = (): React.ReactElement => {
    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );
    const Choreo = generateLink("Choreo", ProjectDetails.Choreo.link);
    const Ballerina = generateLink("Ballerina", ProjectDetails.Ballerina.link);
    const WSO2 = generateLink("WSO2", "https://wso2.com/");
    const OpenTracing = generateLink("OpenTracing", "https://opentracing.io/");
    const OpenTelemetry = generateLink(
        "OpenTelemetry",
        "https://opentelemetry.io/",
    );
    const Cellery = generateLink("Cellery", ProjectDetails.Cellery.link);
    const Kubernetes = generateLink("Kubernetes", "https://kubernetes.io/");
    const Istio = generateLink("Istio", "https://istio.io/");
    const Siddhi = generateLink("Siddhi", ProjectDetails.Siddhi.link);

    const choreoLogo = <Logo logo={Logos.Choreo} height="2.0em" />;
    const ballerinaLogo = <Logo logo={Logos.Ballerina} height="1.5em" />;
    const celleryLogo = <Logo logo={Logos.Cellery} height="2.5em" />;
    const siddhiLogo = <Logo logo={Logos.Siddhi} height="1.8em" />;
    return (
        <>
            <Title>Projects</Title>
            <Box sx={{ pt: 2 }}>
                <LinkButton
                    href="/projects/personal"
                    name="View Personal Projects"
                    icon={KeyboardArrowRight}
                />
            </Box>
            <Section>
                <SectionHeading
                    date={
                        new DateRange(
                            new Date(2020, "January"),
                            new Date(2022, "November"),
                        )
                    }
                    logo={choreoLogo}
                >
                    Choreo
                </SectionHeading>
                <Paragraph>
                    {Choreo} is a Digital Platform as a Service which abstracts
                    away the complexity of cloud-native development and
                    operations infrastructure so that the users can create new
                    APIs, integrations and services in hours or days instead of
                    weeks or months. {Choreo} has many features which make this
                    possible such as AI-assisted development, automated
                    deployments in a secure and highly available environment,
                    API Management, etc. Observability is one of the main areas
                    in this puzzle which make the operations easier for the
                    users.
                </Paragraph>
                <Paragraph>
                    {Choreo} has many features without differentiating too much
                    across languages. However, it provides more capabilities for{" "}
                    {Ballerina} which was originally built within {WSO2}. From
                    development to deployment and production, there are many
                    features which add value to the users if the users are using{" "}
                    {Ballerina}. I worked on the Choreo project since it was
                    initially started and was part of the initial team who
                    worked on the foundation of it. During my employment at{" "}
                    {WSO2}, the Choreo project was focusing a lot on
                    implementing and improving the features around {Ballerina}{" "}
                    provided in {Choreo}. I worked mainly on the Observability
                    aspects of {Choreo} built around {Ballerina} designing and
                    architecting the core of {Choreo} Observability and many
                    features around it.
                </Paragraph>
                <Paragraph>
                    {Choreo} provided many capabilities for making the
                    development to deployment and management of cloud-native
                    applications easy. One of these was the Low Code editor
                    provided for {Ballerina}. To make things easier for
                    development, {Choreo} provides an online VS Code editor with
                    the Low Code editor and everything configured to develop the
                    applications faster. I designed the scheduling of the online
                    VS Code editor in {Choreo}, which involved scheduling the
                    resources and configuring the routing to allow users to
                    access the editor in a secure manner. Security, isolation of
                    resources and the startup time were some of the most
                    important aspects of the resource scheduling.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Worked on the Observability aspects of the initial
                            PoC of {Choreo} and completed it within 3 months
                            leading 2 more engineers.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Led the Observability team and designed many of the
                            Observability features of {Choreo} around{" "}
                            {Ballerina}.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Designed and architected the core data ingestion,
                            storage and analytics architecture of {Choreo}{" "}
                            Observability.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Guided several interns and new joinees within the
                            Observability team to settle into the company and
                            the team, fostering an environment which allowed
                            them to learn and grow.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Handled many high-profile war-rooms created to
                            handle various production issues related to
                            Observability as well as in some other areas.{" "}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Designed the resource scheduling of the online VS
                            Code editor and implemented some of the core
                            functionality of it.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Improved the startup time of the Choreo online VS
                            Code editor by analyzing the time taken for
                            different parts of the resource scheduling.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Designed the isolation and security aspects of the
                            editor, ensuring that the users have the best User
                            Experience without affecting other users.
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section>
                <SectionHeading
                    date={
                        new DateRange(
                            new Date(2020, "January"),
                            new Date(2022, "June"),
                        )
                    }
                    logo={ballerinaLogo}
                >
                    Ballerina Observability
                </SectionHeading>
                <Paragraph>
                    {Ballerina} is a programming language built within {WSO2}{" "}
                    targeting making the development of cloud-native
                    applications easier. One of the main features of {Ballerina}{" "}
                    was the built-in automated Observability. The automated
                    Observability relies on instructions added by the compiler
                    at the BIR (Ballerina Intermediate Representation) level of
                    the compilation. The instructions are added to the incoming
                    and outgoing functions of {Ballerina}. This is made easy by
                    the keywords and annotations in {Ballerina} which mark them
                    explicitly with constructs such as services, resources and
                    remote functions.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Owned {Ballerina} Observability and designed many of
                            the improvements around compiler level
                            instrumentation.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Rewrote the {Ballerina} Observability compiler level
                            instrumentation (moving from a Java bytecode
                            generation level instrumentation to a Ballerina
                            Intermediate Representation modification level
                            instrumentation in the compilation flow) to allow
                            collecting more contextual information, while
                            keeping the performance impact minimal.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Initiated the migration of Ballerina distributed
                            tracing, from {OpenTracing} to {OpenTelemetry}.
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section>
                <SectionHeading
                    date={
                        new DateRange(
                            new Date(2018, "September"),
                            new Date(2019, "December"),
                        )
                    }
                    logo={celleryLogo}
                >
                    Cellery
                </SectionHeading>
                <Paragraph>
                    {Cellery} is an implementation of the Cell-based
                    Architecture which aims to improve productivity of the
                    development of complex microservices, across multiple teams.{" "}
                    {Cellery} introduces microservice composites along with
                    controls to reduce complexity and tools to improve
                    productivity, ensuring that the best practices are met. I
                    was part of the initial team who developed the initial
                    implementation of {Cellery} and mainly worked on the
                    Observability aspects of the framework. {Cellery} was built
                    on top of {Kubernetes} and {Istio}. The Observability
                    features were also built using them and presented to the
                    users with context about the Cells that they create.
                </Paragraph>
                <Paragraph>
                    {Cellery} also included a central repository (Cellery Hub)
                    to which the users could push their Cells. This allowed
                    users to reuse Cells and properly wire-up dependencies to
                    manage their deployments efficiently. I worked on the
                    implementation of some parts of Cellery Hub including the
                    Docker Registry-based storage, authentication and
                    authorization of the frontend and the CLI used for pushing
                    and pulling cells.
                </Paragraph>
                <Paragraph>
                    Another important part of {Cellery} was the dependency
                    management which ensured that the deployments are done
                    properly without failures. I worked on the dependency
                    resolution and visualization to improve the experience
                    around deployments.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Implemented the Cellery Observability core
                            implementation including dashboards using metrics,
                            distributed tracing by extracting information from
                            the Istio mesh sidecars.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Guided several junior engineers and interns.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Presented Cellery Observability in several community
                            calls and wrote Medium articles in the Cellery
                            Medium publication.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented a PoC for the storage of Cells in a
                            Docker Registry-based Cell registry and implemented
                            the core of the storage and authentication.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented cellery CLI command for logging into
                            Cellery Hub using a browser window-based OAuth flow
                            using code grant flow.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented transitive dependency resolution,
                            deployment order resolution and parallel deployment
                            of cells (while preserving dependency order) with a
                            single CLI command.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented D3.js-based cell viewer CLI command
                            which allows users to view a cell and all of its
                            dependencies (this was later adopted into the VS
                            Code plugin as well).
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section>
                <SectionHeading
                    date={
                        new DateRange(
                            new Date(2016, "July"),
                            new Date(2016, "December"),
                        )
                    }
                    logo={siddhiLogo}
                >
                    Siddhi
                </SectionHeading>
                <Paragraph>
                    {Siddhi} is a fully open source, cloud-native, scalable,
                    streaming, and complex event processing system capable of
                    building event-driven applications for use cases such as
                    real-time analytics, data integration, notification
                    management, and adaptive decision-making. Siddhi was
                    developed within {WSO2} and maintained for a long time along
                    with other solutions to provide analytics for other {WSO2}{" "}
                    products as well.
                </Paragraph>
                <Paragraph>
                    {Siddhi} has an extensions model which adds many
                    capabilities to the streaming engine. While working as a
                    Software Engineering intern, I worked on the initial
                    implementation of {Siddhi} extensions within the extrema
                    namespace, which included extensions for finding the maximum
                    and minimum values in various ways in continuous event
                    streams. Moreover, during the Google Summer of Code project,
                    I worked on an autocomplete solution for the {Siddhi} editor
                    for providing completions for siddhi syntax along with the
                    data about the extensions.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Designed and implemented a Maven plugin for
                            automatically generating documentation for Siddhi
                            extensions using annotated data written in the Java
                            code.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented a Notebook prototype for analytics and
                            visualizations using the WSO2 Data Analytics Server.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented six extensions for Siddhi, Stream
                            Processing Engine.
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
        </>
    );
};

export default Projects;
