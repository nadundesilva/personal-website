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
import { Building2 } from "lucide-react";
import type React from "react";

import { ScrollReveal } from "@/components/primitives";
import Experiences, { type Experience } from "@/constants/experience";
import { cn } from "@/shadcn/lib/cn";
import { Card, CardContent, CardDescription, CardHeader } from "@/shadcn/ui";
import ExperienceSkills from "./components/ExperienceSkills";
import SkillChip from "./components/SkillChip";

const Experience = (): React.ReactElement => (
    <ol role="list" className="w-full" aria-label="Experience Timeline">
        {Object.entries(Experiences).map(
            (
                [experienceKey, experience]: [string, Experience],
                index: number,
            ) => {
                const isDesktopRight = index % 2 === 0;

                const timePeriodSegments = experience.timePeriod
                    .getRenderSegments()
                    .map((segment, segIndex) =>
                        segment.dateTime ? (
                            <time key={segIndex} dateTime={segment.dateTime}>
                                {segment.text}
                            </time>
                        ) : (
                            <span key={segIndex}>{segment.text}</span>
                        ),
                    );

                const card = (
                    <Card
                        className={cn(
                            "mb-14 motion-safe:transition-colors motion-safe:duration-150",
                            isDesktopRight
                                ? "border-l-primary/33 hover:border-l-primary border-l-[3px]"
                                : "border-l-primary/33 hover:border-l-primary lg:border-r-primary/33 lg:hover:border-r-primary border-l-[3px] lg:border-r-[3px] lg:border-l-0 lg:hover:border-l-0",
                        )}
                    >
                        <CardHeader className="gap-4 p-5 md:p-9">
                            <p
                                className={cn(
                                    "text-[19px] leading-snug font-medium md:text-[20px]",
                                    !isDesktopRight && "lg:text-right",
                                )}
                            >
                                {experience.name}
                            </p>
                            <CardDescription
                                className={cn(
                                    "leading-[1.8]",
                                    !isDesktopRight && "lg:text-right",
                                )}
                            >
                                {experience.description}
                            </CardDescription>
                            {/* Time period — mobile only (desktop shows it in the opposite column) */}
                            <p className="text-muted-foreground text-xs tracking-[0.04em] uppercase lg:hidden">
                                <span className="sr-only">
                                    Employment period:{" "}
                                </span>
                                {timePeriodSegments}
                            </p>
                            <div
                                className={cn(
                                    "flex items-center gap-2.5",
                                    !isDesktopRight && "lg:justify-end",
                                )}
                            >
                                <Building2
                                    size={18}
                                    aria-hidden={true}
                                    className={cn(
                                        "shrink-0 opacity-60",
                                        !isDesktopRight && "lg:order-2",
                                    )}
                                />
                                <p
                                    className={cn(
                                        "text-muted-foreground text-[13px] leading-snug",
                                        !isDesktopRight && "lg:order-1",
                                    )}
                                >
                                    <span className="sr-only">Company: </span>
                                    <span translate="no">
                                        {experience.institute}
                                    </span>
                                </p>
                            </div>
                        </CardHeader>
                        {experience.skills.length > 0 && (
                            <CardContent className="px-5 pb-5 md:px-9 md:pb-9">
                                <ExperienceSkills
                                    contentAlignment={
                                        isDesktopRight ? "start" : "end"
                                    }
                                >
                                    {experience.skills.map((skill) => (
                                        <SkillChip
                                            key={skill.name}
                                            skill={skill}
                                            size="sm"
                                        />
                                    ))}
                                </ExperienceSkills>
                            </CardContent>
                        )}
                    </Card>
                );

                const timePeriod = (
                    <p className="text-muted-foreground text-xs tracking-[0.04em] uppercase md:text-[13px]">
                        <span className="sr-only">Employment period: </span>
                        {timePeriodSegments}
                    </p>
                );

                return (
                    <li key={experienceKey} className="flex items-start">
                        {/* Left slot */}
                        {isDesktopRight ? (
                            /* Even on desktop: time period, hidden on mobile */
                            <div className="hidden flex-1 justify-end pt-1 pr-2 lg:flex">
                                {timePeriod}
                            </div>
                        ) : (
                            /* Odd on desktop: card, hidden on mobile */
                            <div className="hidden flex-1 pr-2 lg:block">
                                <ScrollReveal>{card}</ScrollReveal>
                            </div>
                        )}

                        {/* Separator */}
                        <div
                            aria-hidden={true}
                            className="mx-3 flex shrink-0 flex-col items-center self-stretch lg:mx-6"
                        >
                            <div className="relative mt-1.5 size-3 shrink-0">
                                {/* Pulse ring — starts at scale(0.5) invisible, rises in opacity as it expands past the dot edge */}
                                <div
                                    className="bg-primary absolute inset-0 rounded-full motion-safe:animate-(--animate-home-timeline-dot-pulse)"
                                    style={{
                                        animationDelay: `${index * 0.4}s`,
                                    }}
                                />
                                <div className="bg-primary size-full rounded-full motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:scale-[1.15]" />
                            </div>
                            <div className="from-foreground/20 mt-1.5 min-h-16 w-3 flex-1 bg-linear-to-b to-transparent" />
                        </div>

                        {/* Right slot */}
                        {isDesktopRight ? (
                            /* Even on desktop: card always visible */
                            <div className="flex-1 pl-2">
                                <ScrollReveal>{card}</ScrollReveal>
                            </div>
                        ) : (
                            <div className="flex-1 pl-2">
                                {/* Odd on mobile: card here */}
                                <div className="lg:hidden">
                                    <ScrollReveal>{card}</ScrollReveal>
                                </div>
                                {/* Odd on desktop: time period */}
                                <div className="hidden pt-1 lg:block">
                                    {timePeriod}
                                </div>
                            </div>
                        )}
                    </li>
                );
            },
        )}
    </ol>
);

export default Experience;
