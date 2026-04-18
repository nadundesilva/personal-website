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

import { cn } from "@/components/primitives/utils/cn";
import Experiences, { type Experience } from "@/constants/experience";
import ExperienceSkills from "./components/ExperienceSkills";

const Experience = (): React.ReactElement => (
    <ol className="w-full" aria-label="Experience Timeline" role="list">
        {Object.values(Experiences).map((item: Experience, index: number) => {
            const isDesktopRight = index % 2 === 0;

            const card = (
                <div
                    className={cn(
                        "bg-card border-border mb-14 rounded-lg border p-5 shadow-sm motion-safe:transition-colors motion-safe:duration-150 md:p-9",
                        isDesktopRight
                            ? "border-l-primary/33 hover:border-l-primary border-l-[3px]"
                            : "border-l-primary/33 hover:border-l-primary sm:border-r-primary/33 sm:hover:border-r-primary border-l-[3px] sm:border-r-[3px] sm:border-l-0 sm:hover:border-l-0",
                    )}
                >
                    <h3
                        className={cn(
                            "mb-5 text-[19px] leading-snug md:text-[20px]",
                            !isDesktopRight && "sm:text-right",
                        )}
                    >
                        {item.name}
                    </h3>
                    {/* Time period — mobile only (desktop shows it in the opposite column) */}
                    <p className="text-muted-foreground mb-4 text-xs font-bold tracking-[0.04em] uppercase sm:hidden">
                        {item.timePeriod.format()}
                    </p>
                    <p
                        className={cn(
                            "text-muted-foreground mb-6 text-sm leading-[1.8] font-normal",
                            !isDesktopRight && "sm:text-right",
                        )}
                    >
                        {item.description}
                    </p>
                    <div
                        className={cn(
                            "flex items-center gap-2.5 pt-1",
                            !isDesktopRight && "sm:justify-end",
                        )}
                    >
                        <Building2
                            size={18}
                            aria-hidden
                            className={cn(
                                "shrink-0 opacity-60",
                                !isDesktopRight && "sm:order-2",
                            )}
                        />
                        <p
                            className={cn(
                                "text-muted-foreground text-[13px] leading-snug",
                                !isDesktopRight && "sm:order-1",
                            )}
                        >
                            <span className="sr-only">Company: </span>
                            {item.institute}
                        </p>
                    </div>
                    {item.skills.length > 0 && (
                        <ExperienceSkills
                            skills={item.skills}
                            isContentOnRight={!isDesktopRight}
                        />
                    )}
                </div>
            );

            const timePeriod = (
                <p className="text-muted-foreground text-xs tracking-[0.04em] uppercase md:text-[13px]">
                    {item.timePeriod.format()}
                </p>
            );

            return (
                <li
                    key={item.timePeriod.format()}
                    role="listitem"
                    className="flex items-start"
                >
                    {/* Left slot */}
                    {isDesktopRight ? (
                        /* Even on desktop: time period, hidden on mobile */
                        <div className="hidden flex-1 justify-end pt-3 pr-2 sm:flex">
                            {timePeriod}
                        </div>
                    ) : (
                        /* Odd on desktop: card, hidden on mobile */
                        <div className="hidden flex-1 pr-2 sm:block">
                            {card}
                        </div>
                    )}

                    {/* Separator */}
                    <div className="mx-3 flex shrink-0 flex-col items-center self-stretch sm:mx-6">
                        <div
                            className="bg-primary mt-1.5 size-3 shrink-0 rounded-full motion-safe:animate-home-timeline-dot-pulse motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:scale-[1.15]"
                            style={{ animationDelay: `${index * 0.4}s` }}
                        />
                        <div className="from-foreground/20 mt-1.5 min-h-16 w-3 flex-1 bg-linear-to-b to-transparent" />
                    </div>

                    {/* Right slot */}
                    {isDesktopRight ? (
                        /* Even on desktop: card always visible */
                        <div className="flex-1 pl-2 sm:pl-2">{card}</div>
                    ) : (
                        <div className="flex-1 pl-2 sm:pl-2">
                            {/* Odd on mobile: card here */}
                            <div className="sm:hidden">{card}</div>
                            {/* Odd on desktop: time period */}
                            <div className="hidden pt-3 sm:block">
                                {timePeriod}
                            </div>
                        </div>
                    )}
                </li>
            );
        })}
    </ol>
);

export default Experience;
