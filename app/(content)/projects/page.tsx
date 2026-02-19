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
import type { SxProps, Theme } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
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
import Companies, { type Company } from "@/constants/companies";
import { FULL_NAME } from "@/constants/metadata";
import ProjectDetails, { type Project } from "@/constants/projects";
import { WebsiteHome } from "@/constants/routes";

export const metadata: Metadata = {
    title: "Projects",
    description: `Various projects done by ${FULL_NAME} throughout his career.`,
};

interface ProjectSectionHeadingProps {
    id: string;
    project: Project;
    logoSx: SxProps<Theme>;
}

const ProjectSectionHeading = ({
    id,
    project,
    logoSx,
}: ProjectSectionHeadingProps): React.ReactElement => (
    <SectionHeading
        id={id}
        date={project.timePeriod}
        logo={
            <Logo
                srcLight={project.logo.srcLight}
                srcDark={project.logo.srcDark}
                alt=""
                recommendedSx={logoSx}
            />
        }
    >
        {project.name}
        <Box component="span" sx={visuallyHidden}>
            {" "}
            (project)
        </Box>
    </SectionHeading>
);

const Projects = (): React.ReactElement => {
    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );
    const generateCompanyLink = (company: Company): React.ReactElement =>
        generateLink(company.name, company.link);
    const generateProjectLink = (project: Project): React.ReactElement =>
        generateLink(project.name, project.link);

    // Employers
    const WSO2 = generateCompanyLink(Companies.WSO2);
    const McCraeTech = generateCompanyLink(Companies.McCraeTech);
    const OrionHealth = generateCompanyLink(Companies.OrionHealth);

    // Projects
    const Indexity = generateProjectLink(ProjectDetails.Indexity);
    const Choreo = generateProjectLink(ProjectDetails.Choreo);
    const Ballerina = generateProjectLink(ProjectDetails.Ballerina);
    const Cellery = generateProjectLink(ProjectDetails.Cellery);
    const Siddhi = generateProjectLink(ProjectDetails.Siddhi);

    // Third party
    const OpenTracing = generateLink("OpenTracing", "https://opentracing.io/");
    const OpenTelemetry = generateLink(
        "OpenTelemetry",
        "https://opentelemetry.io/",
    );
    const Kubernetes = generateLink("Kubernetes", "https://kubernetes.io/");
    const Istio = generateLink("Istio", "https://istio.io/");
    const AWS = generateLink("AWS", "https://aws.amazon.com/");
    const ApacheLucene = generateLink(
        "Apache Lucene",
        "https://lucene.apache.org/",
    );
    const GitLab = generateLink("GitLab", "https://gitlab.com/");
    const VSCode = generateLink("VS Code", "https://code.visualstudio.com/");
    const Docker = generateLink("Docker", "https://www.docker.com/");
    const D3js = generateLink("D3.js", "https://d3js.org/");
    const Maven = generateLink("Maven", "https://maven.apache.org/");
    const Medium = generateLink("Medium", "https://medium.com/");
    const CelleryMediumPublication = generateLink(
        "Cellery Medium publication",
        "https://medium.com/wso2-cellery",
    );

    return (
        <>
            <Title>Projects</Title>
            <Box sx={{ pt: 2, pb: 2 }}>
                <LinkButton
                    href={
                        WebsiteHome.subRoutes["/projects"].subRoutes![
                            "/projects/personal"
                        ].path
                    }
                    name="View Personal Projects"
                    icon={KeyboardArrowRight}
                />
            </Box>
            <Section labelledById="section-project-indexity">
                <ProjectSectionHeading
                    id="section-project-indexity"
                    project={ProjectDetails.Indexity}
                    logoSx={{ height: "1.5em" }}
                />
                <Paragraph>
                    {Indexity} is a cloud-native Enterprise Master Patient Index
                    (EMPI) and Master Data Management (MDM) platform designed to
                    enhance data accuracy and interoperability in healthcare
                    systems. It offers rapid data ingestion, sub-second search
                    capabilities within a fully managed, zero-operations
                    environment. This enables organizations to deploy quickly,
                    iterate freely, and maintain up-to-date systems without the
                    operational overhead associated with legacy MDM and EMPI
                    solutions. The platform comprises modular components
                    including Index (a matching and linking engine) and Registry
                    (a persistent, authoritative store). Key features include
                    matching algorithms, stewardship workflows, and
                    comprehensive audit and provenance capabilities.
                </Paragraph>
                <Paragraph>
                    I spearheaded the deployment of{" "}
                    {ProjectDetails.Indexity.name} data-planes on {AWS}, along
                    with other development tasks. This involved designing and
                    implementing cloud infrastructure solutions on AWS, ensuring
                    scalability and reliability of the data platform. I handled
                    all the design work as well as critical security and
                    operational aspects such as Threat Modeling and Disaster
                    Recovery Planning. After the divestment of {McCraeTech} from{" "}
                    {OrionHealth}, I was tasked with leading the Site
                    Reliability Engineering (SRE) and deployment aspects of{" "}
                    {ProjectDetails.Indexity.name} data-planes, ensuring high
                    availability, scalability, and reliability of the platform.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Directed the successful deployment of{" "}
                            {ProjectDetails.Indexity.name} data-planes using AWS
                            infrastructure; conducted thorough disaster recovery
                            planning, which reduced potential downtime risks
                            from unforeseen incidents by at least 40%.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Orchestrated the migration of{" "}
                            {ProjectDetails.Indexity.name}&apos;s SRE frameworks
                            and infrastructure from {Companies.OrionHealth.name}{" "}
                            into {Companies.McCraeTech.name}, achieving a smooth
                            transition without affecting end users.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Automated the customer request handling, incident
                            handling, and on-call rotations for the{" "}
                            {ProjectDetails.Indexity.name} data-planes, with
                            comprehensive monitoring and alerting, reducing the
                            response times for many incidents.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Championed an end-to-end deployment strategy for{" "}
                            {ProjectDetails.Indexity.name} within a deployment
                            framework on {GitLab}
                            and AWS, resulting in a faster rollout time that
                            decreased development cycles by one day per
                            development cycle.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Orchestrated comprehensive threat modeling and
                            privacy assessments, leading to stronger safeguards,
                            resulting in no major vulnerabilities detected by
                            penetration tests initiated by customers.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Enhanced the precision of phone number searches by
                            implementing {ApacheLucene}-based indexing
                            techniques, improving the patient searches across
                            two customers.
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section labelledById="section-project-choreo">
                <ProjectSectionHeading
                    id="section-project-choreo"
                    project={ProjectDetails.Choreo}
                    logoSx={{ height: "2.0em" }}
                />
                <Paragraph>
                    {Choreo} is a Digital Platform as a Service which abstracts
                    away the complexity of cloud-native development and
                    operations infrastructure so that the users can create new
                    APIs, integrations and services in hours or days instead of
                    weeks or months. {ProjectDetails.Choreo.name} has many
                    features which make this possible such as AI-assisted
                    development, automated deployments in a secure and highly
                    available environment, API Management, etc. Observability is
                    one of the main areas in this puzzle which make the
                    operations easier for the users.
                </Paragraph>
                <Paragraph>
                    {ProjectDetails.Choreo.name} has many features without
                    differentiating too much across languages. However, it
                    provides more capabilities for {Ballerina} which was
                    originally built within {WSO2}. From development to
                    deployment and production, there are many features which add
                    value to the users if the users are using{" "}
                    {ProjectDetails.Ballerina.name}. I worked on the Choreo
                    project since it was initially started and was part of the
                    initial team who worked on the foundation of it. During my
                    employment at {Companies.WSO2.name}, the Choreo project was
                    focusing a lot on implementing and improving the features
                    around {ProjectDetails.Ballerina.name} provided in{" "}
                    {ProjectDetails.Choreo.name}. I worked mainly on the
                    Observability aspects of {ProjectDetails.Choreo.name} built
                    around {ProjectDetails.Ballerina.name} designing and
                    architecting the core of {ProjectDetails.Choreo.name}{" "}
                    Observability and many features around it.
                </Paragraph>
                <Paragraph>
                    {ProjectDetails.Choreo.name} provided many capabilities for
                    making the development to deployment and management of
                    cloud-native applications easy. One of these was the Low
                    Code editor provided for {ProjectDetails.Ballerina.name}. To
                    make things easier for development,{" "}
                    {ProjectDetails.Choreo.name} provides an online {VSCode}{" "}
                    editor with the Low Code editor and everything configured to
                    develop the applications faster. I designed the scheduling
                    of the online VS Code editor in {ProjectDetails.Choreo.name}
                    , which involved scheduling the resources and configuring
                    the routing to allow users to access the editor in a secure
                    manner. Security, isolation of resources and the startup
                    time were some of the most important aspects of the resource
                    scheduling.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Worked on the Observability aspects of the initial
                            PoC of {ProjectDetails.Choreo.name} and completed it
                            within 3 months leading 2 more engineers.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Led the Observability team and designed many of the
                            Observability features of{" "}
                            {ProjectDetails.Choreo.name} around{" "}
                            {ProjectDetails.Ballerina.name}.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Designed and architected the core data ingestion,
                            storage and analytics architecture of{" "}
                            {ProjectDetails.Choreo.name} Observability.
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
            <Section labelledById="section-project-ballerina">
                <ProjectSectionHeading
                    id="section-project-ballerina"
                    project={ProjectDetails.Ballerina}
                    logoSx={{ height: "1.5em" }}
                />
                <Paragraph>
                    {Ballerina} is a programming language built within{" "}
                    {Companies.WSO2.name} targeting making the development of
                    cloud-native applications easier. One of the main features
                    of {ProjectDetails.Ballerina.name} was the built-in
                    automated Observability. The automated Observability relies
                    on instructions added by the compiler at the BIR (Ballerina
                    Intermediate Representation) level of the compilation. The
                    instructions are added to the incoming and outgoing
                    functions of {ProjectDetails.Ballerina.name}. This is made
                    easy by the keywords and annotations in{" "}
                    {ProjectDetails.Ballerina.name} which mark them explicitly
                    with constructs such as services, resources and remote
                    functions.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Owned {ProjectDetails.Ballerina.name} Observability
                            and designed many of the improvements around
                            compiler level instrumentation.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Rewrote the {ProjectDetails.Ballerina.name}{" "}
                            Observability compiler level instrumentation (moving
                            from a Java bytecode generation level
                            instrumentation to a Ballerina Intermediate
                            Representation modification level instrumentation in
                            the compilation flow) to allow collecting more
                            contextual information, while keeping the
                            performance impact minimal.
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
            <Section labelledById="section-project-cellery">
                <ProjectSectionHeading
                    id="section-project-cellery"
                    project={ProjectDetails.Cellery}
                    logoSx={{ height: "2.5em" }}
                />
                <Paragraph>
                    {Cellery} is an implementation of the Cell-based
                    Architecture which aims to improve productivity of the
                    development of complex microservices, across multiple teams.{" "}
                    {ProjectDetails.Cellery.name} introduces microservice
                    composites along with controls to reduce complexity and
                    tools to improve productivity, ensuring that the best
                    practices are met. I was part of the initial team who
                    developed the initial implementation of{" "}
                    {ProjectDetails.Cellery.name} and mainly worked on the
                    Observability aspects of the framework.{" "}
                    {ProjectDetails.Cellery.name} was built on top of{" "}
                    {Kubernetes} and {Istio}. The Observability features were
                    also built using them and presented to the users with
                    context about the Cells that they create.
                </Paragraph>
                <Paragraph>
                    {ProjectDetails.Cellery.name} also included a central
                    repository (Cellery Hub) to which the users could push their
                    Cells. This allowed users to reuse Cells and properly
                    wire-up dependencies to manage their deployments
                    efficiently. I worked on the implementation of some parts of
                    Cellery Hub including the {Docker} Registry-based storage,
                    authentication and authorization of the frontend and the CLI
                    used for pushing and pulling cells.
                </Paragraph>
                <Paragraph>
                    Another important part of {ProjectDetails.Cellery.name} was
                    the dependency management which ensured that the deployments
                    are done properly without failures. I worked on the
                    dependency resolution and visualization to improve the
                    experience around deployments.
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
                            calls and wrote {Medium} articles in the{" "}
                            {CelleryMediumPublication}.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented a PoC for the storage of Cells in a{" "}
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
                            Implemented {D3js}-based cell viewer CLI command
                            which allows users to view a cell and all of its
                            dependencies (this was later adopted into the VS
                            Code plugin as well).
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section labelledById="section-project-siddhi">
                <ProjectSectionHeading
                    id="section-project-siddhi"
                    project={ProjectDetails.Siddhi}
                    logoSx={{ height: "1.8em" }}
                />
                <Paragraph>
                    {Siddhi} is a fully open source, cloud-native, scalable,
                    streaming, and complex event processing system capable of
                    building event-driven applications for use cases such as
                    real-time analytics, data integration, notification
                    management, and adaptive decision-making. Siddhi was
                    developed within {Companies.WSO2.name} and maintained for a
                    long time along with other solutions to provide analytics
                    for other {Companies.WSO2.name} products as well.
                </Paragraph>
                <Paragraph>
                    {ProjectDetails.Siddhi.name} has an extensions model which
                    adds many capabilities to the streaming engine. While
                    working as a Software Engineering intern, I worked on the
                    initial implementation of {ProjectDetails.Siddhi.name}{" "}
                    extensions within the extrema namespace, which included
                    extensions for finding the maximum and minimum values in
                    various ways in continuous event streams. Moreover, during
                    the Google Summer of Code project, I worked on an
                    autocomplete solution for the {ProjectDetails.Siddhi.name}{" "}
                    editor for providing completions for siddhi syntax along
                    with the data about the extensions.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Designed and implemented a {Maven} plugin for
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
