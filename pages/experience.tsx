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
import { Container, Link } from "@mui/material";
import Head from "next/head";
import React from "react";

import { Logo, Paragraph, Section, SectionHeading, Timespan } from "@/components/content";
import Layout, { LayoutContent } from "@/components/Layout";
import { Logos } from "@/constants";

const Experience = (): React.ReactElement => {
    const Siddhi = <Link target={"_blank"} href={"https://siddhi.io/"}>Siddhi</Link>;
    const mkDocs = <Link target={"_blank"} href={"https://www.mkdocs.org/"}>MkDocs</Link>;
    const wso2IdentityServer = (
        <Link target={"_blank"} href={"https://wso2.com/identity-server/"}>
            WSO2 Identity Server
        </Link>
    );
    const React = <Link target={"_blank"} href={"https://reactjs.org/"}>React</Link>;
    const apacheOpenWhisk = (
        <Link target={"_blank"} href={"https://openwhisk.apache.org/"}>
            Apache OpenWhisk
        </Link>
    );
    const knative = <Link target={"_blank"} href={"https://knative.dev/docs/"}>Knative</Link>;
    const Cellery = <Link target={"_blank"} href={"https://cellery.io/"}>Cellery</Link>;
    const Ballerina = <Link target={"_blank"} href={"https://ballerina.io/"}>Ballerina</Link>;
    const Choreo = <Link target={"_blank"} href={"https://wso2.com/choreo/"}>Choreo</Link>;

    const Wso2Logo = <Logo logo={Logos.WSO2} height={"2.5em"}/>;
    const GsocLogo = <Logo logo={Logos.GoogleSummerOfCode}/>;

    return (
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Experience of Nadun De Silva</title>
                <meta name="robots" content="noindex, nofollow"/>
            </Head>
            <Layout>
                <LayoutContent>
                    <Section>
                        <SectionHeading>Associate Technical Lead</SectionHeading>
                        <Timespan>June 2021 to Now</Timespan>
                        {Wso2Logo}
                        <Paragraph>
                            Even before being promoted to an Associate Technical Lead, I was performing way above my level
                            and I continued to improve and grow within my new role as an Associate Technical Lead. I continued
                            to lead the Observability team and it was considered one of the most stable areas in the platform
                            during that time. Moreover, I guided multiple engineers and helped them improve for the better as well.
                            Apart from that I also contributed to other areas such as growth hacking, UX, SRE and other aspects
                            of the {Choreo} platform.
                        </Paragraph>
                        <Paragraph>
                            Apart from the Observability Area, I also led the effort on the Choreo Online VS Code Editor as well
                            as implemented a significant portion of it. This feature also was finished on time and in good quality
                            as well. This involved implementing a secure environment for users to edit their code.
                        </Paragraph>
                        <Paragraph>
                            Throughout all this work, I always made myself available for other team members who approached me
                            seeking for technical guidance or any clarifications about the platform. I also contributed to many
                            other technical and architectural decisions of the platform as well. Through all these, I still worked
                            at the level of other engineers and kept up with the technical aspects as well. I always thought out
                            of the box and helped improve many aspects of the platform as well.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>Senior Software Engineer</SectionHeading>
                        <Timespan>July 2019 to June 2021</Timespan>
                        {Wso2Logo}
                        <Paragraph>
                            Later, I completely owned the Observability area and mentored a few interns as well
                            as other junior engineers. I have also implemented parts of the CLI, VS Code Extension
                            and other tools of {Cellery} which involved different new concepts and technologies
                            which I learnt within short periods of time. Later when project {Choreo} was
                            started, {Cellery} was adopted by the initial version of it as well, until later
                            the project {Choreo} was rebooted and project {Cellery} was discontinued.
                        </Paragraph>
                        <Paragraph>
                            When the {Choreo} project initially started (rebooted from the very first implementation),
                            I was again selected to the small team of engineers who were tasked to make it a reality.
                            Two more engineers were also added to the {Choreo} Observability subteam and I was tasked
                            with leading the implementation of {Choreo} Observability. I designed the core architecture
                            of {Choreo} Observability and also worked on improving {Ballerina} Observability to
                            support {Choreo} Observability better as well. While generally this level of responsibilities
                            are not given to a Senior Software Engineer, I was trusted with it and I handled these
                            responsibilities quite well and the Observability area later became one of the most stable
                            areas and one of the main features of {Choreo} as well.
                        </Paragraph>
                        <Paragraph>
                            The source code of {Ballerina} Observability was not actively maintained when I took over
                            as the lead of the {Choreo} Observability Team. Therefore, I took over the responsibility of
                            going through the code base and revamping the Observability instrumentation as well.
                            The {Ballerina} compiler level instrumentation was previously performed at the lowest level
                            of the compiler while writing the Java bytecode into the Java class files. However, this
                            approach had its limitations as these instructions were not aware of scheduler level
                            operations at this level. This resulted in some of the instructions getting executed twice
                            due to the way Ballerina scheduler handled IO bound operations. To solve this issue, I
                            worked on completely rewriting the Observability instrumentation at {Ballerina} compiler
                            backend level by transforming the Ballerina Intermediate Representation (BIR) during the
                            compilation. While this task was quite challenging due to the technologies it involved,
                            the fact that almost no-one knew the source code well and the strict deadlines, I managed
                            to complete this on time and with good quality.
                        </Paragraph>
                        <Paragraph>
                            After the initial PoC was complete, the {Choreo} product also evolved and the Observability
                            Team also gained new members and evolved as well. I was entrusted with continuing to lead
                            the Observability Team while some of the product management aspects were handed over to others.
                            I guided the team into implementing most of the core features of {Choreo} Observability and
                            I helped and encouraged the engineers in my team to grow and improve themselves as well.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>Software Engineer</SectionHeading>
                        <Timespan>Jan 2018 to July 2019</Timespan>
                        {Wso2Logo}
                        <Paragraph>
                            I was head hunted by WSO2 before the end of my degree and I was offered to start
                            working as a Software Engineer at WSO2. At the start of my employment, I worked in
                            multiple teams as part of the probation period. During one of these assignments,
                            I implemented a password policy authenticator which is an authentication extension for
                            the {wso2IdentityServer} which would validate and enforce password policies.
                        </Paragraph>
                        <Paragraph>
                            After completing this feature, I worked on a Customer Success Enablement project
                            by analyzing customer data to provide insights for the support teams to better work
                            towards improving the customer experience and ensure that proper support is provided
                            to them. While I cannot disclose a lot of information on this task, I worked on
                            generating several reports on demand by querying data from multiple sources and
                            analyzing them. I also revamped the portal which was built to request a report and
                            rewrote the portal using {React} which was quite new for me at that time as well.
                        </Paragraph>
                        <Paragraph>
                            After getting instated as a permanent employee, I joined the Cloud Team at WSO2 and
                            worked on the WSO2 Serverless Platform which was a new product being developed at that
                            time. I worked on the Observability aspects of the platform and while this was a new area
                            for me at that time, I managed to learn the observability space in a short time and
                            implement a considerable amount of it along with another engineer. I also contributed
                            ideas for the platform as a whole as well. The WSO2 Serverless Platform was based
                            on {apacheOpenWhisk} and it allowed running any docker image in serverless mode which
                            was a new concept at that time. However, almost near the time when we completed a basic
                            but complete version of the platform, {knative} which offered a similar experience was
                            announced. As a result, the serverless platform was not offered as part of the product
                            line of WSO2 and it was discontinued.
                        </Paragraph>
                        <Paragraph>
                            Afterwards, I spent a few more weeks within the Cloud team including a month of
                            customer support rotation, which helped me gain valuable experience in handling customer
                            requests and also gain insights into other aspects of the business apart from the
                            technical side of it.
                        </Paragraph>
                        <Paragraph>
                            After Serverless Platform was discontinued, WSO2 started another project named
                            VICK (later named as {Cellery}) which was aimed towards making deployments in
                            Kubernetes easier. I was selected to be part of the initial research team to
                            implement the product. I worked on this project for some time and it evolved
                            and along with the Cell based architecture later became project {Cellery}.
                            I mainly worked on the Observability aspects of the platform, but I contributed
                            to almost all the other areas of the product with thoughts and ideas as well.
                            While working on project {Cellery}, I was able to gain in depth knowledge on
                            Kubernetes as well and this helped me immensely in my role as a software
                            engineer later in my career.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>Google Summer of Code Intern</SectionHeading>
                        <Timespan>May 2017 to Sep 2017</Timespan>
                        {GsocLogo}
                        <Paragraph>
                            During my last year at the University, in my spare time, I worked as a Google Summer
                            of Code intern. I worked for WSO2 during this period as well and developed a maven plugin
                            for automatically generating documentation for the {Siddhi} extensions. The information
                            for the documentation was scraped from the data annotated into the extensions using a
                            maven plugin and the collected data was converted into html pages using {mkDocs}. This was
                            used by {Siddhi} for generating their documentation till it was decommissioned several years
                            later.
                        </Paragraph>
                    </Section>
                    <Section>
                        <SectionHeading>Software Engineering Trainee</SectionHeading>
                        <Timespan>July 2016 to December 2016</Timespan>
                        {Wso2Logo}
                        <Paragraph>
                            I worked as a Software Engineering intern at WSO2 as a required part of my
                            B.Sc. (Hons.) in Engineering (Computer Science and Engineering) degree. I started
                            working as a member of the Data Analytics Server (DAS) product team building a
                            prototype Notebook for analyzing data collected by the DAS. However,
                            the project was aborted and was not added to the DAS product when the company
                            decided to discontinue the DAS product.
                        </Paragraph>
                        <Paragraph>
                            Afterwards, as part of the Complex Event Processor product team, I implemented
                            several stream processing extensions under the extrema namespace for calculating
                            maximum and minimum values in data streams. Afterwards, I worked on a prototype
                            for generating suggestions in the editor component of the {Siddhi} IDE using data
                            annotated into the {Siddhi} extensions through Java custom annotations. Moreover,
                            I designed some of the initial wireframes of the {Siddhi} IDE as well before the
                            end of my internship.
                        </Paragraph>
                    </Section>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default Experience;
