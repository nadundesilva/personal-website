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
import { Briefcase, ExternalLink, Quote, Users } from "lucide-react";
import type React from "react";

import { LinkButton, Paragraph } from "@/components/content";
import {
    Card,
    CardContent,
    CardHeader,
    LeftAccent,
    PrimaryTintedIcon,
    Separator,
} from "@/components/primitives";
import { LINKEDIN_PROFILE_URL } from "@/constants/profiles";
import { Relationship, type TestimonialData } from "@/constants/testimonials";

const renderRelationShip = (
    name: string,
    relationship: Relationship,
): string | null => {
    const firstName = name.includes(" ") ? name.split(" ")[0] : name;
    switch (relationship) {
        case Relationship.ManagedDirectly:
            return `${firstName} managed Nadun directly`;
        case Relationship.Mentor:
            return `${firstName} was Nadun's mentor`;
        case Relationship.WorkedOnSameTeam:
            return `${firstName} worked with Nadun on the same team`;
        case Relationship.Senior:
            return `${firstName} was senior to Nadun`;
        case Relationship.Junior:
            return `Nadun was senior to ${firstName}`;
        default:
            return null;
    }
};

interface TestimonialProps {
    testimonial: TestimonialData;
}

const Testimonial = ({ testimonial }: TestimonialProps): React.ReactElement => {
    const { author, relationship, position, content } = testimonial;
    const labelId = `testimonial-label-${author.person.name.toLowerCase().replace(/\s+/g, "-")}`;
    const linkedinUrl = `${LINKEDIN_PROFILE_URL}/details/recommendations/`;

    return (
        <article aria-labelledby={labelId}>
            <Card className="relative">
                <CardHeader className="gap-0 p-7 pb-5">
                    <Quote
                        aria-hidden={true}
                        className="text-primary pointer-events-none absolute top-3 right-4 size-28 rotate-180 opacity-6"
                    />
                    <LeftAccent className="relative z-1 mb-6">
                        <h2
                            id={labelId}
                            className="mb-1.5 text-xl leading-snug tracking-[-0.01em] font-light"
                        >
                            <span className="sr-only">Testimonial from </span>
                            {author.person.name}
                        </h2>
                        <div className="mb-2 flex items-center gap-1.5">
                            <PrimaryTintedIcon icon={Briefcase} size="1rem" />
                            <span className="text-foreground text-sm font-medium tracking-[0.01em]">
                                {author.position} at {author.company.name}
                            </span>
                        </div>
                        <div className="mb-5 flex items-center gap-1.5">
                            <PrimaryTintedIcon icon={Users} size="1rem" />
                            <span className="text-muted-foreground text-sm tracking-[0.01em]">
                                {renderRelationShip(
                                    author.person.name,
                                    relationship,
                                )}{" "}
                                when Nadun was a {position.name} at{" "}
                                {position.company.name}
                            </span>
                        </div>
                    </LeftAccent>
                    <LinkButton
                        endIcon={ExternalLink}
                        name="View on LinkedIn"
                        href={linkedinUrl}
                        ariaLabel={`View on LinkedIn - testimonial by ${author.person.name}`}
                        target="_blank"
                        className="justify-self-start"
                    />
                </CardHeader>
                <Separator />
                <CardContent className="p-7 pt-6">
                    <blockquote>
                        {content.map((paragraph, index) => (
                            <Paragraph key={index}>{paragraph}</Paragraph>
                        ))}
                    </blockquote>
                </CardContent>
            </Card>
        </article>
    );
};

export default Testimonial;
