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
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import type React from "react";

import {
    AccentedList,
    Link,
    LinkButton,
    List,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import { ScrollReveal } from "@/components/primitives";
import Educations, { type Education } from "@/constants/education";
import Institutes, { type Institute } from "@/constants/institutes";
import { FULL_NAME } from "@/constants/metadata";
import { WebsiteHome } from "@/constants/routes";

export const metadata: Metadata = {
    title: "Education",
    description: `Educational qualifications of ${FULL_NAME}.`,
};

interface EducationSectionHeadingProps {
    id: string;
    education: Education;
    logoClassName?: string;
}

const EducationSectionHeading = ({
    id,
    education,
    logoClassName,
}: EducationSectionHeadingProps): React.ReactElement => (
    <SectionHeading
        id={id}
        date={education.timePeriod}
        logo={
            <Logo
                srcLight={education.institute.logo.srcLight}
                srcDark={education.institute.logo.srcDark}
                alt=""
                className={logoClassName}
            />
        }
    >
        {education.title}
        <span className="sr-only"> at {education.institute.name}</span>
    </SectionHeading>
);

const Education = (): React.ReactElement => {
    const generateInstituteLink = (
        institute: Institute,
    ): React.ReactElement => (
        <Link href={institute.link} target="_blank">
            {institute.name}
        </Link>
    );
    const UniversityOfMoratuwa = generateInstituteLink(
        Institutes.UniversityOfMoratuwa,
    );
    const StJosephsCollegeColombo10 = generateInstituteLink(
        Institutes.StJosephsCollegeColombo10,
    );

    const GanBasedAnomalyDetectionInIndustrialSoftwareSystems = (
        <Link
            href="https://ieeexplore.ieee.org/document/8818750"
            target="_blank"
        >
            &quot;Generative Adversarial Networks (GAN) based Anomaly Detection
            in Industrial Software Systems&quot; published in 2019 at Moratuwa
            Engineering Research Conference (MERCon)
        </Link>
    );
    const AnomalyDetectionInIndustrialSoftwareSystemsUsingVae = (
        <Link
            href="https://www.scitepress.org/Papers/2018/66003/pdf/index.html"
            target="_blank"
        >
            &quot;Anomaly Detection in Industrial Software Systems — Using
            Variational Autoencoders&quot; published in 2017 at the Proceedings
            of the 7th International Conference on Pattern Recognition
            Applications and Methods (ICPRAM)
        </Link>
    );

    return (
        <>
            <Title>Education</Title>
            <ScrollReveal>
                <div className="py-4">
                    <LinkButton
                        href={
                            WebsiteHome.subRoutes["/education"].subRoutes![
                                "/education/certifications"
                            ].path
                        }
                        name="View Certifications"
                        endIcon={ChevronRight}
                    />
                </div>
            </ScrollReveal>
            <Section labelledById="section-bsc-uom">
                <EducationSectionHeading
                    id="section-bsc-uom"
                    education={Educations.BScUniversityOfMoratuwa}
                    logoClassName="h-[4em]"
                />
                <Paragraph>
                    I studied for my four-year bachelor&apos;s degree at the{" "}
                    {UniversityOfMoratuwa}. The degree covered many in-depth
                    areas (e.g.:- Computer Architecture, Operating Systems,
                    Compiler Theory, Database Internals) as well as novel
                    technical areas (e.g.:- Machine Learning, Deep Learning,
                    Data Mining &amp; Information Retrieval). The degree covered
                    many other aspects such as general engineering knowledge,
                    ethics and professional conduct.
                </Paragraph>
                <AccentedList heading="Highlights" headingVariant="h3">
                    <ListItem>Academic Standing: First Class</ListItem>
                    <ListItem>
                        Overall{" "}
                        <abbr title="Cumulative Grade Point Average">CGPA</abbr>{" "}
                        - 3.85 / 4.20
                    </ListItem>
                    <ListItem>
                        Dean&apos;s List Placements on 6 out of 8 semesters
                    </ListItem>
                    <ListItem>
                        <List heading="Publications:" headingVariant="h4">
                            <ListItem>
                                {
                                    GanBasedAnomalyDetectionInIndustrialSoftwareSystems
                                }
                            </ListItem>
                            <ListItem>
                                {
                                    AnomalyDetectionInIndustrialSoftwareSystemsUsingVae
                                }
                            </ListItem>
                        </List>
                    </ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-al-sjc">
                <EducationSectionHeading
                    id="section-al-sjc"
                    education={Educations.ALStJosephsCollegeColombo10}
                    logoClassName="h-[4em]"
                />
                <Paragraph>
                    I attended school at {StJosephsCollegeColombo10} where I
                    studied many subjects. At the end of my studies, I passed
                    the{" "}
                    <abbr title="General Certificate of Education">G.C.E.</abbr>{" "}
                    Advanced Level examination with distinctions in all the
                    subjects granting me entrance into the{" "}
                    {UniversityOfMoratuwa} as well.
                </Paragraph>
                <AccentedList heading="Highlights" headingVariant="h3">
                    <ListItem>Z - Score: 2.2441</ListItem>
                    <ListItem>
                        <List heading="Main Subjects:" headingVariant="h4">
                            <ListItem>Combined Mathematics - A</ListItem>
                            <ListItem>Physics - A</ListItem>
                            <ListItem>Chemistry - A</ListItem>
                        </List>
                    </ListItem>
                    <ListItem>
                        <List heading="Other Subjects:" headingVariant="h4">
                            <ListItem>
                                General{" "}
                                <abbr title="Information Technology">IT</abbr> -
                                A
                            </ListItem>
                            <ListItem>General English - A</ListItem>
                            <ListItem>General Knowledge - A</ListItem>
                        </List>
                    </ListItem>
                    <ListItem>Editor of the Science Union 2011 / 2012</ListItem>
                </AccentedList>
            </Section>
        </>
    );
};

export default Education;
