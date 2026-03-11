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
import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type { Metadata } from "next";
import type React from "react";

import {
    AccentedList,
    Link,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import Companies, { type Company } from "@/constants/companies";
import Experiences, { type Experience } from "@/constants/experience";
import { FULL_NAME } from "@/constants/metadata";
import Projects, { type Project } from "@/constants/projects";

export const metadata: Metadata = {
    title: "Experience",
    description: `Professional experience of ${FULL_NAME} throughout his career.`,
};

interface ExperienceSectionHeadingProps {
    id: string;
    experience: Experience;
    logoSx?: SxProps<Theme>;
}

const ExperienceSectionHeading = ({
    id,
    experience,
    logoSx,
}: ExperienceSectionHeadingProps): React.ReactElement => (
    <SectionHeading
        id={id}
        date={experience.timePeriod}
        logo={
            <Logo
                srcLight={experience.company.logo.srcLight}
                srcDark={experience.company.logo.srcDark}
                alt=""
                recommendedSx={logoSx}
            />
        }
    >
        {experience.name}
        <Box component="span" sx={visuallyHidden}>
            {" "}
            at {experience.company.name}
        </Box>
    </SectionHeading>
);

const Experience = (): React.ReactElement => {
    const generateLink = (
        text: React.ReactNode,
        href: string,
    ): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );
    const generateCompanyLink = (company: Company): React.ReactElement =>
        generateLink(company.name, company.link);
    const generateProjectLink = (project: Project): React.ReactElement =>
        generateLink(project.name, project.link);

    // Employers
    const GoogleSummerOfCode = generateCompanyLink(
        Companies.WSO2ViaGoogleSummerOfCode,
    );
    const WSO2 = generateCompanyLink(Companies.WSO2);
    const McCraeTech = generateCompanyLink(Companies.McCraeTech);
    const OrionHealth = generateCompanyLink(Companies.OrionHealth);

    // Projects
    const Siddhi = generateProjectLink(Projects.Siddhi);
    const Cellery = generateProjectLink(Projects.Cellery);
    const Ballerina = generateProjectLink(Projects.Ballerina);
    const Choreo = generateProjectLink(Projects.Choreo);
    const Indexity = generateProjectLink(Projects.Indexity);
    const Wso2IdentityServer = generateLink(
        "WSO2 Identity Server",
        "https://wso2.com/identity-server/",
    );

    // Third party
    const MkDocs = generateLink("MkDocs", "https://www.mkdocs.org/");
    const ReactJs = generateLink("React", "https://reactjs.org/");
    const ApacheOpenWhisk = generateLink(
        "Apache OpenWhisk",
        "https://openwhisk.apache.org/",
    );
    const KNative = generateLink("Knative", "https://knative.dev/docs/");
    const AWS = generateLink(
        <abbr title="Amazon Web Services">AWS</abbr>,
        "https://aws.amazon.com/",
    );
    const GitLab = generateLink("GitLab", "https://gitlab.com/");
    const ApacheLucene = generateLink(
        "Apache Lucene",
        "https://lucene.apache.org/",
    );
    const Terraform = generateLink("Terraform", "https://www.terraform.io/");
    const GoogleCloud = generateLink(
        "Google Cloud",
        "https://cloud.google.com/",
    );
    const Kubernetes = generateLink("Kubernetes", "https://kubernetes.io/");
    const GoLang = generateLink("Go", "https://go.dev/");
    const MSSQL = generateLink(
        <abbr title="Microsoft SQL Server">MSSQL</abbr>,
        "https://www.microsoft.com/en-us/sql-server",
    );
    const Redis = generateLink("Redis", "https://redis.io/");
    const Istio = generateLink("Istio", "https://istio.io/");
    const OpenTracing = generateLink("OpenTracing", "https://opentracing.io/");
    const Envoy = generateLink("Envoy", "https://www.envoyproxy.io/");
    const VSCode = generateLink(
        <>
            <abbr title="Visual Studio">VS</abbr> Code
        </>,
        "https://code.visualstudio.com/",
    );
    const D3js = generateLink("D3.js", "https://d3js.org/");
    const OIDC = generateLink(
        <abbr title="OpenID Connect">OIDC</abbr>,
        "https://openid.net/connect/",
    );
    const Prometheus = generateLink("Prometheus", "https://prometheus.io/");
    const Jaeger = generateLink("Jaeger", "https://www.jaegertracing.io/");
    const Docker = generateLink("Docker", "https://www.docker.com/");
    const Maven = generateLink("Maven", "https://maven.apache.org/");

    return (
        <>
            <Title>Experience</Title>
            <Section labelledById="section-lead-mccrae">
                <ExperienceSectionHeading
                    id="section-lead-mccrae"
                    experience={Experiences.McCraeTechLeadSoftwareEngineer}
                    logoSx={{ height: "1.5em" }}
                />
                <Paragraph>
                    After the divestment of {McCraeTech} from {OrionHealth}, I
                    was offered the role of Lead Software Engineer at{" "}
                    {Companies.McCraeTech.name} based on my previous work at{" "}
                    {Companies.OrionHealth.name}. I was tasked with leading the
                    Site Reliability Engineering (
                    <abbr title="Site Reliability Engineering">SRE</abbr>) and
                    deployment aspects of {Indexity} data-planes, ensuring high
                    availability, scalability, and reliability of the platform.
                    Additionally, I worked on various development tasks across
                    other areas of {Projects.Indexity.name}, contributing to the
                    overall platform architecture and functionality.
                </Paragraph>
                <AccentedList heading="Highlights" headingVariant="h3">
                    <ListItem>
                        <Typography>
                            Orchestrated the migration of{" "}
                            {Projects.Indexity.name}&apos;s{" "}
                            <abbr title="Site Reliability Engineering">
                                SRE
                            </abbr>{" "}
                            frameworks and infrastructure from{" "}
                            {Companies.OrionHealth.name} into{" "}
                            {Companies.McCraeTech.name}, achieving a smooth
                            transition without affecting end users.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Automated the customer request handling, incident
                            handling, and on-call rotations for the{" "}
                            {Projects.Indexity.name} data-planes, with
                            comprehensive monitoring and alerting, reducing the
                            response times for many incidents.
                        </Typography>
                    </ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-senior-se-orion">
                <ExperienceSectionHeading
                    id="section-senior-se-orion"
                    experience={Experiences.OrionHealthSeniorSoftwareEngineer}
                    logoSx={{ height: "3em" }}
                />
                <Paragraph>
                    At {OrionHealth}, I spearheaded the deployment of {Indexity}{" "}
                    data-planes on {AWS}, along with other development tasks.
                    This involved designing and implementing cloud
                    infrastructure solutions on AWS, ensuring scalability and
                    reliability of the data platform. I handled all the design
                    work as well as critical security and operational aspects
                    such as Threat Modeling and Disaster Recovery Planning.
                </Paragraph>
                <Paragraph>
                    My Threat Modeling work involved identifying potential
                    security vulnerabilities, analyzing attack vectors, and
                    designing mitigation strategies to protect the platform and
                    customer data. For Disaster Recovery Planning, I designed
                    comprehensive recovery procedures, backup strategies, and
                    failover mechanisms to ensure business continuity and
                    minimal data loss in case of system failures or disasters.
                </Paragraph>
                <AccentedList heading="Highlights" headingVariant="h3">
                    <ListItem>
                        <Typography>
                            Directed the successful deployment of{" "}
                            {Projects.Indexity.name} data-planes using AWS{" "}
                            infrastructure; conducted thorough disaster recovery
                            planning, which reduced potential downtime risks
                            from unforeseen incidents by at least 40%.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Championed an end-to-end deployment strategy for{" "}
                            {Projects.Indexity.name} within a deployment
                            framework on {GitLab} and AWS, resulting in a faster
                            rollout time that decreased development cycles by
                            one day per development cycle.
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
                    <ListItem>
                        <Typography>
                            Developed the {Terraform} code for deploying
                            self-hosted GitLab runners on {GoogleCloud},
                            reducing the development costs by more than 50%.
                        </Typography>
                    </ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-atl-wso2">
                <ExperienceSectionHeading
                    id="section-atl-wso2"
                    experience={Experiences.WSO2AssociateTechnicalLead}
                    logoSx={{ height: "2.5em" }}
                />
                <Paragraph>
                    I led the technical aspects of the Observability area and it
                    was considered one of the most stable areas in the {Choreo}{" "}
                    platform during that time. Moreover, I guided multiple
                    engineers and helped them improve. I also contributed to
                    other areas such as growth hacking,{" "}
                    <abbr title="User Experience">UX</abbr>,{" "}
                    <abbr title="Site Reliability Engineering">SRE</abbr> and
                    other aspects of the {Projects.Choreo.name} platform.
                </Paragraph>
                <Paragraph>
                    Apart from the Observability Area, I also led the effort on
                    the Choreo Online {VSCode} Editor and implemented a
                    significant portion of it. This feature was also finished on
                    time while adhering to code quality, architectural and
                    security standards. This involved implementing a secure
                    environment for users to edit their code.
                </Paragraph>
                <Paragraph>
                    I always thought out of the box and contributed to many
                    other technical and architectural decisions of the platform
                    as well. Through all these, I still worked at the level of
                    other engineers and kept up with the technical aspects of
                    the platform.
                </Paragraph>
                <AccentedList heading="Highlights" headingVariant="h3">
                    <ListItem>
                        <Typography>
                            Secured the Sustained Outstanding Contribution Award
                            thrice in a row, an honor given exclusively to only
                            the top 5% of all company staff members who
                            demonstrated exceptional technical leadership and
                            innovative contributions throughout tenure.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Led a senior software engineer in developing the
                            minimum viable features for the resource scheduling
                            of the {Projects.Choreo.name} online editor within
                            1.5 months, using {Kubernetes} and {GoLang}.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Eliminated bottlenecks, reducing the startup time of
                            the Kubernetes resources of the{" "}
                            {Projects.Choreo.name} Editors by 80% and increasing
                            the overall user experience.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Reduced the {MSSQL} database utilization by 60%
                            using a {Redis} cache and randomization of cache
                            expiry times, increasing the number of users the
                            system can handle.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Led the product team, completing 95% of the team
                            targets and sprint milestones on time by
                            prioritizing tasks and fostering a good working
                            environment.
                        </Typography>
                    </ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-senior-se-wso2">
                <ExperienceSectionHeading
                    id="section-senior-se-wso2"
                    experience={Experiences.WSO2SeniorSoftwareEngineer}
                    logoSx={{ height: "2.5em" }}
                />
                <Paragraph>
                    I completely owned the Observability area of Cellery and
                    mentored a few interns as well as other junior engineers. I
                    have also implemented parts of the{" "}
                    <abbr title="Command Line Interface">CLI</abbr>, {VSCode}{" "}
                    extension and other tools of {Cellery} which involved
                    different new concepts and technologies which I learned
                    within short periods of time. Later when project {Choreo}{" "}
                    was started, {Projects.Cellery.name} was adopted by the
                    initial version of it as well, until later the project{" "}
                    {Projects.Choreo.name} was rebooted and project{" "}
                    {Projects.Cellery.name} was discontinued.
                </Paragraph>
                <Paragraph>
                    When the {Projects.Choreo.name} project initially started
                    (rebooted from the very first implementation), I was again
                    selected for the small team of engineers who were tasked to
                    make it a reality. Two more engineers were also added to the{" "}
                    {Projects.Choreo.name} Observability subteam and I was
                    tasked with leading the implementation of{" "}
                    {Projects.Choreo.name} Observability. I designed the core
                    architecture of {Projects.Choreo.name} Observability and
                    also worked on improving {Ballerina} Observability to
                    support {Projects.Choreo.name} Observability better. While
                    generally this level of responsibility is not given to a
                    Senior Software Engineer, I was trusted with it and I
                    handled these responsibilities quite well, earning the top
                    performance award for each year.
                </Paragraph>
                <Paragraph>
                    The source code of {Projects.Ballerina.name} Observability
                    was not actively maintained when I took over as the lead of
                    the {Projects.Choreo.name} Observability Team. Therefore, I
                    took over the responsibility of going through the code base
                    and revamping the Observability instrumentation as well. The{" "}
                    {Projects.Ballerina.name} compiler level instrumentation was
                    previously performed at the lowest level of the compiler
                    while writing the Java bytecode into the Java class files.
                    However, this approach had its limitations as these
                    instructions were not aware of scheduler level operations at
                    this level. This resulted in some of the instructions
                    getting executed twice due to the way Ballerina scheduler
                    handled I/O-bound operations. To solve this issue, I worked
                    on completely rewriting the Observability instrumentation at{" "}
                    {Projects.Ballerina.name} compiler backend level by
                    transforming the Ballerina Intermediate Representation (BIR)
                    during the compilation. While this task was quite
                    challenging due to the technologies it involved, the fact
                    that almost no one knew the source code well and the strict
                    deadlines, I managed to complete this on time and with good
                    quality.
                </Paragraph>
                <Paragraph>
                    After the initial <abbr title="Proof of Concept">PoC</abbr>{" "}
                    was completed, the {Projects.Choreo.name} product also
                    evolved and the Observability Team also gained new members.
                    I was entrusted with continuing to lead the Observability
                    Team while some of the product management aspects were
                    handed over to others. I guided the team into implementing
                    most of the core features of {Projects.Choreo.name}{" "}
                    Observability and I helped and encouraged the engineers in
                    my team to grow and improve themselves as well.
                </Paragraph>
                <AccentedList heading="Highlights" headingVariant="h3">
                    <ListItem>
                        <Typography>
                            Spearheaded the implementation of the foundation for
                            Choreo observability within 3 months with a team of
                            2 other engineers, creating the backbone of Choreo
                            observability.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Decreased the cost by 90% for the company by
                            architecting the Choreo observability storages,
                            including data archival into a Data Lake for Machine
                            Learning (<abbr title="Machine Learning">ML</abbr>)
                            use cases.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Improved debugging experience for users by revamping
                            the observability instrumentation at the Ballerina
                            compiler level, within 1 month, to map the
                            observability data to the source code.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Minimized the number of bugs in the Choreo
                            Observability area by implementing proper code
                            reviewing, testing, and deployment practices in a
                            team of 6 engineers.
                        </Typography>
                    </ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-se-wso2">
                <ExperienceSectionHeading
                    id="section-se-wso2"
                    experience={Experiences.WSO2SoftwareEngineer}
                    logoSx={{ height: "2.5em" }}
                />
                <Paragraph>
                    At the start of my employment, I worked in multiple teams as
                    part of the probation period. During one of these
                    assignments, I implemented a password policy authenticator
                    which is an authentication extension for the{" "}
                    {Wso2IdentityServer}. It would validate a user login and
                    enforce password policies.
                </Paragraph>
                <Paragraph>
                    After completing this feature, I worked on a Customer
                    Success Enablement project by analyzing customer data to
                    provide insights for the support teams to better work
                    towards improving the customer experience and ensure that
                    proper support is provided to them. While I cannot disclose
                    a lot of information on this task, I worked on generating
                    several reports on demand by querying data from multiple
                    sources and analyzing them. I also revamped the portal which
                    was built to request a report and rewrote the portal using{" "}
                    {ReactJs} which was quite new for me at that time as well.
                </Paragraph>
                <Paragraph>
                    After being instated as a permanent employee, I joined the
                    Cloud Team at {WSO2} and worked on the {Companies.WSO2.name}
                    Serverless Platform which was a new product being developed
                    at that time. I worked on the Observability aspects of the
                    platform and while this was a new area for me at that time,
                    I managed to learn the observability space in a short time
                    and implement a considerable amount of it along with another
                    engineer. I also contributed ideas for the platform as a
                    whole as well. The {Companies.WSO2.name} Serverless Platform
                    was based on {ApacheOpenWhisk} and it allowed running any{" "}
                    {Docker} image in serverless mode which was a new concept at
                    that time. However, almost near the time when we completed a
                    basic but complete version of the platform, {KNative} which
                    offered a similar experience was announced. As a result, the
                    serverless platform was not offered as part of the product
                    line of {Companies.WSO2.name} and it was discontinued.
                </Paragraph>
                <Paragraph>
                    Afterwards, I spent a few more weeks within the Cloud team
                    including a month of customer support rotation, which helped
                    me gain valuable experience in handling customer requests
                    and also gain insights into other aspects of the business
                    apart from the technical side of it.
                </Paragraph>
                <Paragraph>
                    After Serverless Platform was discontinued,{" "}
                    {Companies.WSO2.name}
                    started another project named VICK (later named as {Cellery}
                    ) which was aimed towards making deployments in {Kubernetes}{" "}
                    easier. I was selected to be part of the initial research
                    team to implement the product. I worked on this project for
                    some time and it evolved and along with the Cell-based
                    architecture, later became project {Projects.Cellery.name}.
                    I mainly worked on the Observability aspects of the
                    platform, but I contributed to almost all the other areas of
                    the product with thoughts and ideas as well. While working
                    on project {Projects.Cellery.name}, I was able to gain
                    in-depth knowledge on {Kubernetes} as well and this helped
                    me immensely in my role as a software engineer later in my
                    career.
                </Paragraph>
                <AccentedList heading="Highlights" headingVariant="h3">
                    <ListItem>
                        <Typography>
                            Delivered the Cellery observability basic features
                            within 2 months for observing microservice
                            composites using Kubernetes, {Istio}, {OpenTracing},
                            and {Envoy}.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Headed the implementation of Cellery developer tools
                            using {VSCode} Language Server Extensions and
                            visualizations of Cells using {D3js}.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Developed {Projects.Cellery.name} Hub backed by a{" "}
                            Docker Registry as the storage and implemented the
                            authentication of the{" "}
                            <abbr title="Command Line Interface">CLI</abbr> and
                            portal using {OIDC} within 1 month.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented the observability aspects of the{" "}
                            {Companies.WSO2.name}
                            Serverless Platform using {Prometheus} and {Jaeger}{" "}
                            on top of Kubernetes and Apache OpenWhisk.
                        </Typography>
                    </ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-gsoc">
                <ExperienceSectionHeading
                    id="section-gsoc"
                    experience={Experiences.WSO2GoogleSummerOfCodeIntern}
                    logoSx={{ height: "2.5em" }}
                />
                <Paragraph>
                    During my last year at the University, in my spare time, I
                    worked as a {GoogleSummerOfCode} intern. I worked for {WSO2}{" "}
                    during this period as well and developed a {Maven} plugin
                    for automatically generating documentation for the {Siddhi}{" "}
                    extensions. The information for the documentation was
                    scraped from data annotated into the extensions using a
                    Maven plugin and the collected data was converted into HTML
                    pages using {MkDocs}. This was used by{" "}
                    {Projects.Siddhi.name} for generating their documentation
                    till it was decommissioned several years later.
                </Paragraph>
            </Section>
            <Section labelledById="section-trainee-wso2">
                <ExperienceSectionHeading
                    id="section-trainee-wso2"
                    experience={Experiences.WSO2SoftwareEngineeringTrainee}
                    logoSx={{ height: "2.5em" }}
                />
                <Paragraph>
                    I worked as a Software Engineering intern at {WSO2} as a
                    required part of my B.Sc. (Hons.) in Engineering (Computer
                    Science and Engineering) degree. I started working as a
                    member of the Data Analytics Server (DAS) product team
                    building a prototype Notebook for analyzing data collected
                    by the DAS. However, the project was aborted and was not
                    added to the DAS product as the company decided to
                    discontinue the DAS product.
                </Paragraph>
                <Paragraph>
                    Afterwards, as part of the Complex Event Processor product
                    team, I implemented several stream processing extensions
                    under the extrema namespace for calculating maximum and
                    minimum values in data streams. Afterwards, I worked on a
                    prototype for generating suggestions in the editor component
                    of the {Siddhi} IDE using data annotated into the{" "}
                    {Projects.Siddhi.name} extensions through Java custom
                    annotations. Moreover, I designed some of the initial
                    wireframes of the {Projects.Siddhi.name} IDE as well before
                    the end of my internship.
                </Paragraph>
            </Section>
        </>
    );
};

export default Experience;
