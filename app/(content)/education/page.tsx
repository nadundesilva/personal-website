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
import type { Graph, IdReference } from "schema-dts";

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
import CollectionPageJsonLd from "@/components/layout/CollectionPageJsonLd";
import { ScrollReveal } from "@/components/primitives";
import Educations, { type Education } from "@/constants/education";
import Institutes, { type Institute } from "@/constants/institutes";
import { FULL_NAME, SCHEMA_PERSON_ID } from "@/constants/metadata";
import Publications from "@/constants/publications";
import { resolveRoute } from "@/utils/common/routes";

export const metadata: Metadata = {
    title: resolveRoute("/education").name,
    description: `${FULL_NAME}'s academic background and educational qualifications.`,
};

const scholarlyArticlesJsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": Object.values(Publications).map((pub) => ({
        "@type": "ScholarlyArticle" as const,
        "@id": pub.url,
        "headline": pub.title,
        "url": pub.url,
        "datePublished": pub.publishedDate.toISOString(),
        "keywords": pub.keywords,
        "author": { "@id": SCHEMA_PERSON_ID } as IdReference,
        "publisher": {
            "@type": "Organization" as const,
            "name": pub.venue,
        },
    })),
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

    return (
        <>
            <Title>Education</Title>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(scholarlyArticlesJsonLd),
                }}
            />
            <CollectionPageJsonLd metadata={metadata} pathname="/education" />
            <ScrollReveal>
                <div className="py-4">
                    <LinkButton
                        href={resolveRoute("/education/certifications").path}
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
                            {Object.values(Publications).map((pub) => (
                                <ListItem key={pub.url}>
                                    <Link href={pub.url} target="_blank">
                                        &quot;{pub.title}&quot; published in{" "}
                                        {pub.publishedDate.year} at {pub.venue}
                                    </Link>
                                </ListItem>
                            ))}
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
