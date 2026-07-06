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
import type React from "react";

import ContentContainer from "@/components/layout/ContentContainer";
import { ScrollReveal } from "@/components/primitives";
import { Separator } from "@/shadcn/ui";
import Heading from "./common/Heading";
import Achievements from "./sections/Achievements";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import ContributedProjects from "./sections/ContributedProjects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import WelcomeBanner from "./sections/WelcomeBanner";
import WhoAmI from "./sections/WhoAmI";

interface PageSectionProps {
    title: string;
    section: React.ReactElement;
    testId: string;
    index?: number;
    showDivider?: boolean;
}

const PageSection = ({
    title,
    section,
    testId,
    index,
    showDivider = true,
}: PageSectionProps): React.ReactElement => {
    const titleId = title.toLowerCase().replace(/\s+/g, "-");
    return (
        <section
            aria-labelledby={titleId}
            data-testid={testId}
            className="mt-12 mb-6 md:mt-20 md:mb-10"
        >
            <ScrollReveal>
                <Heading id={titleId} number={index}>
                    {title}
                </Heading>
            </ScrollReveal>
            <div className="py-4">{section}</div>
            {showDivider && (
                <Separator aria-hidden={true} className="mt-6 md:mt-10" />
            )}
        </section>
    );
};

const PageContent = (): React.ReactElement => (
    <>
        <WelcomeBanner />
        <ContentContainer className="pt-6 md:pt-8">
            <div
                aria-hidden={true}
                className="pointer-events-none absolute top-0 right-0 left-0 h-70 [background:var(--home-hero-fade)]"
            />
            <div className="relative z-10">
                <PageSection
                    title="Who Am I"
                    section={<WhoAmI />}
                    testId="who-am-i-section"
                    index={1}
                />
                <PageSection
                    title="Experience"
                    section={<Experience />}
                    testId="experience-section"
                    index={2}
                />
                <PageSection
                    title="Contributed Projects"
                    section={<ContributedProjects />}
                    testId="contributed-projects-section"
                    index={3}
                />
                <PageSection
                    title="Achievements"
                    section={<Achievements />}
                    testId="achievements-section"
                    index={4}
                />
                <PageSection
                    title="Skills"
                    section={<Skills />}
                    testId="skills-section"
                    index={5}
                />
                <PageSection
                    title="Certifications"
                    section={<Certifications />}
                    testId="certifications-section"
                    index={6}
                />
                <PageSection
                    title="Contact"
                    section={<Contact />}
                    testId="contact-section"
                    index={7}
                    showDivider={false}
                />
            </div>
        </ContentContainer>
    </>
);

export default PageContent;
