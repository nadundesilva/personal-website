/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
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
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Link } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";

import {
    HighlightsSection,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Timespan,
} from "@/components/content";
import Layout, { LayoutContent } from "@/components/layout";
import { Time, TimeRange } from "@/constants/commons";
import { Logos } from "@/constants/logos";

const Projects = (): React.ReactElement => {
    const Choreo = (
        <Link target={"_blank"} href={"https://wso2.com/choreo/"}>
            Choreo
        </Link>
    );
    const Ballerina = (
        <Link target={"_blank"} href={"https://ballerina.io/"}>
            Ballerina
        </Link>
    );
    const WSO2 = (
        <Link target={"_blank"} href={"https://wso2.com/"}>
            WSO2
        </Link>
    );
    const OpenTracing = (
        <Link target={"_blank"} href={"https://opentracing.io/"}>
            OpenTracing
        </Link>
    );
    const OpenTelemetry = (
        <Link target={"_blank"} href={"https://opentelemetry.io/"}>
            OpenTelemetry
        </Link>
    );
    const Cellery = (
        <Link target={"_blank"} href={"https://cellery.io/"}>
            Cellery
        </Link>
    );
    const Kubernetes = (
        <Link target={"_blank"} href={"https://kubernetes.io/"}>
            Kubernetes
        </Link>
    );
    const Istio = (
        <Link target={"_blank"} href={"https://istio.io/"}>
            Istio
        </Link>
    );
    const Siddhi = (
        <Link target={"_blank"} href={"https://siddhi.io/"}>
            Siddhi
        </Link>
    );

    const choreoLogo = <Logo logo={Logos.Choreo} height={"2em"} />;
    const ballerinaLogo = <Logo logo={Logos.Ballerina} height={"1.5em"} />;
    const celleryLogo = <Logo logo={Logos.Cellery} height={"2.5em"} />;
    const siddhiLogo = <Logo logo={Logos.Siddhi} height={"2.3em"} />;
    return (
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Nadun De Silva | Projects</title>
            </Head>
            <Layout>
                <LayoutContent>
                    <NextLink passHref href={"/projects/personal"}>
                        <Button
                            size="small"
                            variant="outlined"
                            endIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        >
                            View Personal Projects
                        </Button>
                    </NextLink>
                    <Section>
                        <SectionHeading>Choreo</SectionHeading>
                        {choreoLogo}
                        <Timespan
                            value={
                                new TimeRange(
                                    new Time(2020, "January"),
                                    new Time(2022, "November"),
                                )
                            }
                        />
                        <Paragraph>
                            {Choreo} is a Digital Platform as a Service which
                            abstracts away the complexity of cloud native
                            development and operations infrastructure so that
                            the users can create new APIs, integrations and
                            services in hours or days instead of weeks or
                            months. {Choreo} has many features which makes the
                            this possible such as AI assisted development,
                            automated deployments in a secure and highly
                            available environment, API Management, etc.
                            Observability is one of the main areas in this
                            puzzle which makes the operations easier for the
                            users.
                        </Paragraph>
                        <Paragraph>
                            {Choreo} has many features without differentiating
                            too much across languages. However, it provides more
                            capabilities for {Ballerina} which was originally
                            built within {WSO2}. From development to deployment
                            and production, there are many featuers which adds
                            values to the users if the users are using{" "}
                            {Ballerina}. I worked on the Choreo project since it
                            was initially started and was part of the initial
                            team who worked on the foundation of it. During my
                            employment at {WSO2}, the Choreo project was
                            focussing a lot on implementing and improving the
                            features around {Ballerina} provided in {Choreo}. I
                            worked mainly on the Observability aspects of{" "}
                            {Choreo} built around {Ballerina} designing and
                            architecting the core of {Choreo} Observability and
                            many features around it.
                        </Paragraph>
                        <Paragraph>
                            {Choreo} provided many capabilities for making the
                            development to deployment and management of cloud
                            native applications easy. One of these was the Low
                            Code editor provided for {Ballerina}. To make things
                            easier for development, {Choreo} provides an online
                            VSCode editor with the Low Code editor and
                            everything configured to develop the applications
                            faster. I designed the scheduling of the online
                            VSCode editor in {Choreo}, which involved scheduling
                            the resources and configuring the routing to allow
                            users to access the editor in a secure manner.
                            Security, isolation of resources and the startup
                            time were some of the most important aspects of the
                            resource scheduling.
                        </Paragraph>
                        <HighlightsSection>
                            <li>
                                Worked on the Observability aspects of the
                                initial PoC of {Choreo} and completed it within
                                3 months leading 2 more engineers.
                            </li>
                            <li>
                                Led the Observability team and designed many of
                                the Observability features of {Choreo} around{" "}
                                {Ballerina}.
                            </li>
                            <li>
                                Designed and architected the core data
                                ingestion, storage and analytics architecture of{" "}
                                {Choreo} Observability.
                            </li>
                            <li>
                                Guided several interns and new joinees within
                                the Observability team to settle into the
                                company and the team, fostering an environment
                                which allowed them to learn and grow.
                            </li>
                            <li>
                                Handled many high profile war-rooms created to
                                handle various production issues related to
                                Observability as well as in some other areas.{" "}
                            </li>
                            <li>
                                Designed the resource scheduling of the online
                                VSCode editor and implemented some of the core
                                functionality of it.
                            </li>
                            <li>
                                Improved the startup time of the Choreo online
                                VSCode editor by analyzing the time taken for
                                different parts of the resource scheduling.
                            </li>
                            <li>
                                Designed the isolation and security aspects of
                                the editor, ensuring that the users have the
                                best User Experience without affecting other
                                users.
                            </li>
                        </HighlightsSection>
                    </Section>
                    <Section>
                        <SectionHeading>Ballerina Observability</SectionHeading>
                        {ballerinaLogo}
                        <Timespan
                            value={
                                new TimeRange(
                                    new Time(2020, "January"),
                                    new Time(2022, "June"),
                                )
                            }
                        />
                        <Paragraph>
                            {Ballerina} is a programming language built within{" "}
                            {WSO2} targeting the development of cloud native
                            applications easier. One of the main features of{" "}
                            {Ballerina} was the built-in automated
                            Observability. The automated Observability relies on
                            instructions added by the compiler at the BIR
                            (Ballerina Intermediate Representation) level of the
                            compilation. The instructions are added to the
                            incoming and outgoing functions of {Ballerina}. This
                            is made easy by the keywords and annotations in{" "}
                            {Ballerina} which marks them explcitly with
                            constructs such as services, resources and remote
                            functions.
                        </Paragraph>
                        <HighlightsSection>
                            <li>
                                Owned {Ballerina} Observability and designed
                                many of the improvements around compiler level
                                instrumentation.
                            </li>
                            <li>
                                Rewrote the {Ballerina} Observability compiler
                                level instrumentation (moving from a Java
                                bytecode generation level instrumentation to a
                                Ballerina Intermediate Representation
                                modification level instrumentation in the
                                compilation flow) to allow collecting more
                                contextual information, while keeping the
                                performance impact minimal.
                            </li>
                            <li>
                                Initiated the migration of Ballerina distributed
                                tracing, from {OpenTracing} to {OpenTelemetry}.
                            </li>
                        </HighlightsSection>
                    </Section>
                    <Section>
                        <SectionHeading>Cellery</SectionHeading>
                        {celleryLogo}
                        <Timespan
                            value={
                                new TimeRange(
                                    new Time(2018, "September"),
                                    new Time(2019, "December"),
                                )
                            }
                        />
                        <Paragraph>
                            {Cellery} is an implementation of the Cell Based
                            Architecture which aims to improve productivity of
                            the development of a complex microservices, across
                            multiple teams. {Cellery} introduces microservice
                            composites along with controls to reduce complexity
                            and tools to improve productivity, ensuring that the
                            best practices are met. I was part of the initial
                            team who developed the initial implementation of{" "}
                            {Cellery} and mainly worked on the Observability
                            related of the framework. {Cellery} was built on top
                            of {Kubernetes} and {Istio}. The Observability
                            features were also built using them and presented to
                            the users with context about the Cells that they
                            create.
                        </Paragraph>
                        <Paragraph>
                            {Cellery} also included a central repository
                            (Cellery Hub) to which the users could push their
                            Cells. This allowed users to reuse Cells and
                            properly wire-up dependencies to manage their
                            deployments efficiently. I worked on the
                            implementation of some parts of Cellery Hub
                            including the Docker Registry based storage,
                            authentication and authorization of the frontend and
                            the CLI used for pushing and pulling cells.
                        </Paragraph>
                        <Paragraph>
                            Another important part of {Cellery} was the
                            dependency management which ensured that the
                            deployments are done properly without failures. I
                            worked on the dependency resolution and
                            visualisation to improve the experience around
                            deployments.
                        </Paragraph>
                        <HighlightsSection>
                            <li>
                                Implemented the Cellery Observability core
                                implementation including dashboards using
                                metrics, distributed tracing by extracting
                                information from the Istio mesh sidecars.
                            </li>
                            <li>
                                Guided several junior engineers and interns.
                            </li>
                            <li>
                                Presented Cellery Observability in several
                                community calls and wrote medium articles in
                                Cellery medium publication.
                            </li>
                            <li>
                                Implemented a PoC for the storage of Cells in a
                                docker registry based Cell registry and
                                implemented the core of the storage and
                                authentication.
                            </li>
                            <li>
                                Implemented cellery CLI command for logging into
                                Cellery Hub using a browser window based OAuth
                                flow using code grant flow.
                            </li>
                            <li>
                                Implemented transitive dependency resolution,
                                deployment order resolution and parallel
                                deployment of cells (while preserving dependency
                                order) with a single CLI command.
                            </li>
                            <li>
                                Implemented D3.js based cell viewer CLI command
                                which allows users to view a cell and all of its
                                dependencies (this was later adopted into the VS
                                Code plugin as well).
                            </li>
                        </HighlightsSection>
                    </Section>
                    <Section>
                        <SectionHeading>Siddhi</SectionHeading>
                        {siddhiLogo}
                        <Timespan
                            value={
                                new TimeRange(
                                    new Time(2016, "July"),
                                    new Time(2016, "December"),
                                )
                            }
                        />
                        <Paragraph>
                            {Siddhi} is a fully open source, cloud native,
                            scalable, streaming, and complex event processing
                            system capable of building event-driven applications
                            for use cases such as real-time analytics, data
                            integration, notification management, and adaptive
                            decision-making. Siddhi was developed within {WSO2}{" "}
                            and maintained for a long time along with other
                            solutions to provide analytics for otheer {WSO2}{" "}
                            products as well.
                        </Paragraph>
                        <Paragraph>
                            {Siddhi} has extensions model which adds many
                            capabilities to the streaming engine. While working
                            as a Software Engineering intern, I worked on the
                            initial implementation of {Siddhi} extensions within
                            the extrema namespace, which included extensions for
                            finding the maximum and minimum values in various
                            ways in continuous event streams. Moreover, during
                            the Google Summer of Code project, I worked on an
                            autocomplete solution for the {Siddhi} editor for
                            providing completetions for siddhi syntax along with
                            the data about the extensions.
                        </Paragraph>
                        <HighlightsSection>
                            <li>
                                Designed and implemented a maven plugin for
                                automatically generating documentation for
                                Siddhi extensions using annotated data written
                                in the java code.
                            </li>
                            <li>
                                Implemented a Notebook prototype for analytics
                                and visualizations using the WSO2 Data Analytics
                                Server.
                            </li>
                            <li>
                                Implemented six extensions for Siddhi, Stream
                                Processing Engine.
                            </li>
                        </HighlightsSection>
                    </Section>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default Projects;
