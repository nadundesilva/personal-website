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
import { Typography } from "@mui/material";
import { type Metadata } from "next";
import React from "react";

import {
    HighlightsSection,
    Link,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Timespan,
    Title,
} from "@/components/content";
import { Time, TimeRange } from "@/constants/commons";
import { Logos } from "@/constants/logos";
import { FULL_NAME } from "@/constants/metadata";

export const metadata: Metadata = {
    title: `${FULL_NAME} | Experience`,
    description: `Professional experience of ${FULL_NAME} throughout his career.`,
};

const Experience = (): React.ReactElement => {
    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );
    const Siddhi = generateLink("Siddhi", "https://siddhi.io/");
    const MkDocs = generateLink("MkDocs", "https://www.mkdocs.org/");
    const Wso2IdentityServer = generateLink(
        "WSO2 Identity Server",
        "https://wso2.com/identity-server/",
    );
    const ReactJs = generateLink("React", "https://reactjs.org/");
    const ApacheOpenWhisk = generateLink(
        "Apache OpenWhisk",
        "https://openwhisk.apache.org/",
    );
    const KNative = generateLink("Knative", "https://knative.dev/docs/");
    const Cellery = generateLink("Cellery", "https://cellery.io/");
    const Ballerina = generateLink("Ballerina", "https://ballerina.io/");
    const Choreo = generateLink("Choreo", "https://wso2.com/choreo/");
    const WSO2 = generateLink("WSO2", "https://wso2.com/");
    const GoogleSummerOfCode = generateLink(
        "Google Summer of Code",
        "https://summerofcode.withgoogle.com/",
    );

    const wso2Logo = <Logo logo={Logos.WSO2} height="2.5em" />;
    const gsocLogo = <Logo logo={Logos.GoogleSummerOfCode} />;

    return (
        <React.Fragment>
            <Title>Experience</Title>
            <Section>
                <SectionHeading>Associate Technical Lead</SectionHeading>
                <Timespan
                    value={
                        new TimeRange(
                            new Time(2021, "June"),
                            new Time(2022, "November"),
                        )
                    }
                />
                {wso2Logo}
                <Paragraph>
                    I led the Observability team in technical aspects and it was
                    considered one of the most stable areas in the {Choreo}{" "}
                    platform during that time. Moreover, I guided multiple
                    engineers and helped them improve for the better. I also
                    contributed to other areas such as growth hacking, UX, SRE
                    and other aspects of the {Choreo} platform.
                </Paragraph>
                <Paragraph>
                    Apart from the Observability Area, I also led the effort on
                    the Choreo Online VS Code Editor and implemented a
                    significant portion of it. This feature also was finished on
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
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Achieved the Sustained Outstanding Contribution
                            Award for the third consecutive year — currently
                            awarded only for the top 5% of the employees in the
                            company.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Engineered the minimum viable features for Choreo
                            online editor&apos;s resource scheduling, within 1.5
                            months, leading another engineer, using Kubernetes
                            and GoLang.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Analyzed the startup time of the Kubernetes
                            resources of the Choreo Editors and reduced the time
                            by 80%, increasing the overall user experience.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Reduced the MsSQL DB utilization by 60%, by
                            introducing a Redis cache and randomization of cache
                            expiry times, increasing the number of users the
                            system can handle.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Completed 95% of the targets and sprint milestones
                            on time, by prioritization of tasks and fostering a
                            good working environment.
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section>
                <SectionHeading>Senior Software Engineer</SectionHeading>
                <Timespan
                    value={
                        new TimeRange(
                            new Time(2019, "July"),
                            new Time(2021, "June"),
                        )
                    }
                />
                {wso2Logo}
                <Paragraph>
                    I completely owned the Observability area of Cellery and
                    mentored a few interns as well as other junior engineers. I
                    have also implemented parts of the CLI, VS Code Extension
                    and other tools of {Cellery} which involved different new
                    concepts and technologies which I learnt within short
                    periods of time. Later when project {Choreo} was started,{" "}
                    {Cellery} was adopted by the initial version of it as well,
                    until later the project {Choreo} was rebooted and project{" "}
                    {Cellery} was discontinued.
                </Paragraph>
                <Paragraph>
                    When the {Choreo} project initially started (rebooted from
                    the very first implementation), I was again selected to the
                    small team of engineers who were tasked to make it a
                    reality. Two more engineers were also added to the {Choreo}{" "}
                    Observability subteam and I was tasked with leading the
                    implementation of {Choreo} Observability. I designed the
                    core architecture of {Choreo} Observability and also worked
                    on improving {Ballerina} Observability to support {Choreo}{" "}
                    Observability better. While generally this level of
                    responsibilities are not given to a Senior Software
                    Engineer, I was trusted with it and I handled these
                    responsibilities quite well, earning the top performance
                    award for each year.
                </Paragraph>
                <Paragraph>
                    The source code of {Ballerina} Observability was not
                    actively maintained when I took over as the lead of the{" "}
                    {Choreo} Observability Team. Therefore, I took over the
                    responsibility of going through the code base and revamping
                    the Observability instrumentation as well. The {Ballerina}{" "}
                    compiler level instrumentation was previously performed at
                    the lowest level of the compiler while writing the Java
                    bytecode into the Java class files. However, this approach
                    had its limitations as these instructions were not aware of
                    scheduler level operations at this level. This resulted in
                    some of the instructions getting executed twice due to the
                    way Ballerina scheduler handled IO bound operations. To
                    solve this issue, I worked on completely rewriting the
                    Observability instrumentation at {Ballerina} compiler
                    backend level by transforming the Ballerina Intermediate
                    Representation (BIR) during the compilation. While this task
                    was quite challenging due to the technologies it involved,
                    the fact that almost no-one knew the source code well and
                    the strict deadlines, I managed to complete this on time and
                    with good quality.
                </Paragraph>
                <Paragraph>
                    After the initial PoC was complete, the {Choreo} product
                    also evolved and the Observability Team also gained new
                    members. I was entrusted with continuing to lead the
                    Observability Team while some of the product management
                    aspects were handed over to others. I guided the team into
                    implementing most of the core features of {Choreo}{" "}
                    Observability and I helped and encouraged the engineers in
                    my team to grow and improve themselves as well.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Spearheaded and implemented the foundation for
                            Choreo observability within 3 months, with a team of
                            2 other engineers, creating the backbone of Choreo
                            observability.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Architected the Choreo observability storages with
                            data archival into a Data Lake, decreasing the cost
                            by 90% for the company while storing the data for
                            Machine Learning (ML) use cases.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Revamped the observability instrumentation at
                            Ballerina compiler level, within 1 month, to map the
                            observability data to the source code, providing a
                            better debugging experience for users.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Minimized and maintained the lowest number of bugs
                            across all areas within Choreo by implementing
                            proper code reviewing, testing and deployment
                            practices in a team of 6 engineers.
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section>
                <SectionHeading>Software Engineer</SectionHeading>
                <Timespan
                    value={
                        new TimeRange(
                            new Time(2018, "January"),
                            new Time(2019, "July"),
                        )
                    }
                />
                {wso2Logo}
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
                    After getting instated as a permanent employee, I joined the
                    Cloud Team at {WSO2} and worked on the {WSO2}
                    Serverless Platform which was a new product being developed
                    at that time. I worked on the Observability aspects of the
                    platform and while this was a new area for me at that time,
                    I managed to learn the observability space in a short time
                    and implement a considerable amount of it along with another
                    engineer. I also contributed ideas for the platform as a
                    whole as well. The {WSO2} Serverless Platform was based on{" "}
                    {ApacheOpenWhisk} and it allowed running any docker image in
                    serverless mode which was a new concept at that time.
                    However, almost near the time when we completed a basic but
                    complete version of the platform, {KNative} which offered a
                    similar experience was announced. As a result, the
                    serverless platform was not offered as part of the product
                    line of {WSO2} and it was discontinued.
                </Paragraph>
                <Paragraph>
                    Afterwards, I spent a few more weeks within the Cloud team
                    including a month of customer support rotation, which helped
                    me gain valuable experience in handling customer requests
                    and also gain insights into other aspects of the business
                    apart from the technical side of it.
                </Paragraph>
                <Paragraph>
                    After Serverless Platform was discontinued, {WSO2}
                    started another project named VICK (later named as {Cellery}
                    ) which was aimed towards making deployments in Kubernetes
                    easier. I was selected to be part of the initial research
                    team to implement the product. I worked on this project for
                    some time and it evolved and along with the Cell based
                    architecture, later became project {Cellery}. I mainly
                    worked on the Observability aspects of the platform, but I
                    contributed to almost all the other areas of the product
                    with thoughts and ideas as well. While working on project{" "}
                    {Cellery}, I was able to gain in depth knowledge on
                    Kubernetes as well and this helped me immensely in my role
                    as a software engineer later in my career.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>
                            Delivered the Cellery observability basic features
                            within 2 months for observing microservice
                            composites, using Kubernetes, Istio, OpenTracing and
                            Envoy.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Headed the implementation of Cellery developer tools
                            using Language Server Extensions and visualizations
                            of Cells using D3.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Developed Cellery Hub backed by a Docker Registry as
                            storage and authentication of the CLI and portal
                            using OpenID Connect (OIDC), collaborating with a
                            team, within 1 month.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Implemented the observability aspects of the WSO2
                            Serverless Platform using Prometheus and Jaeger on
                            top of Kubernetes and OpenWhisk.
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section>
                <SectionHeading>Google Summer of Code Intern</SectionHeading>
                <Timespan
                    value={
                        new TimeRange(
                            new Time(2017, "May"),
                            new Time(2017, "September"),
                        )
                    }
                />
                {gsocLogo}
                <Paragraph>
                    During my last year at the University, in my spare time, I
                    worked as a {GoogleSummerOfCode} intern. I worked for {WSO2}{" "}
                    during this period as well and developed a maven plugin for
                    automatically generating documentation for the {Siddhi}{" "}
                    extensions. The information for the documentation was
                    scraped from the data annotated into the extensions using a
                    maven plugin and the collected data was converted into html
                    pages using {MkDocs}. This was used by {Siddhi} for
                    generating their documentation till it was decommissioned
                    several years later.
                </Paragraph>
            </Section>
            <Section>
                <SectionHeading>Software Engineering Trainee</SectionHeading>
                <Timespan
                    value={
                        new TimeRange(
                            new Time(2016, "July"),
                            new Time(2016, "December"),
                        )
                    }
                />
                {wso2Logo}
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
                    of the {Siddhi} IDE using data annotated into the {Siddhi}{" "}
                    extensions through Java custom annotations. Moreover, I
                    designed some of the initial wireframes of the {Siddhi} IDE
                    as well before the end of my internship.
                </Paragraph>
            </Section>
        </React.Fragment>
    );
};

export default Experience;
