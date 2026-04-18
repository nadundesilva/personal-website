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
 * © 2026 Nadun De Silva. All rights reserved.
 */
import { Award, Briefcase, Code2 } from "lucide-react";
import type React from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/primitives/Tooltip";
import { type Skill } from "@/constants/skill-categories";
import SkillChipProficiencyIndicator from "./SkillProficiencyIndicator";

interface SkillChipTooltipSkillSectionProps {
    title: string;
    items: string[];
    icon: React.ReactElement;
}

const SkillChipTooltipSkillSection = ({
    title,
    items,
    icon,
}: SkillChipTooltipSkillSectionProps) => {
    const titleId = `skill-tooltip-${title.toLowerCase().replace(/\s+/g, "-")}`;
    return (
        <div>
            <div className="text-muted-foreground mb-1 flex items-center gap-2">
                {icon}
                <span id={titleId} className="text-xs font-semibold">
                    {title}
                </span>
            </div>
            <ul aria-labelledby={titleId} className="m-0 list-none p-0">
                {items.map((item) => (
                    <li
                        key={item}
                        className="before:bg-muted-foreground/50 relative mb-1 pl-5 text-xs before:absolute before:top-2 before:left-2 before:size-0.75 before:rounded-full before:content-[''] last:mb-0"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface SkillChipProps {
    skill: Skill;
    sectionEntranceDelay?: number;
}

const SkillChip = ({
    skill,
    sectionEntranceDelay = 0,
}: SkillChipProps): React.ReactElement => {
    const hasContent =
        skill.usage.experiences.length > 0 ||
        skill.usage.projects.length > 0 ||
        skill.usage.certifications.length > 0;

    const chip = (
        <span
            aria-label={`${skill.name} - ${skill.level} level.`}
            className="border-border bg-background hover:bg-accent/50 focus-visible:outline-ring inline-flex cursor-default items-center rounded border px-3 py-1 text-sm select-none focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors motion-safe:duration-150"
        >
            {skill.name}
            <SkillChipProficiencyIndicator
                level={skill.level}
                animate
                sectionEntranceDelay={sectionEntranceDelay}
            />
        </span>
    );

    if (!hasContent) {
        return chip;
    }

    return (
        <TooltipProvider delay={300} closeDelay={100}>
            <Tooltip>
                <TooltipTrigger render={chip} />
                <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="border-border bg-popover text-popover-foreground flex max-w-xs flex-col items-stretch gap-3 rounded-lg border p-3.5 shadow-md"
                    arrowClassName="bg-popover fill-popover border border-border"
                >
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-bold">{skill.name}</span>
                        <div className="bg-foreground/6 flex items-center gap-2 rounded px-2 py-0.5">
                            <span className="text-xs font-medium">
                                {skill.level}
                            </span>
                            <SkillChipProficiencyIndicator
                                level={skill.level}
                            />
                        </div>
                    </div>

                    {skill.usage.experiences.length > 0 && (
                        <SkillChipTooltipSkillSection
                            title="Used as"
                            icon={<Briefcase size={14} aria-hidden />}
                            items={skill.usage.experiences.map(
                                (e) => `${e.name} at ${e.institute}`,
                            )}
                        />
                    )}

                    {skill.usage.experiences.length > 0 &&
                        (skill.usage.projects.length > 0 ||
                            skill.usage.certifications.length > 0) && (
                            <hr className="border-border" />
                        )}

                    {skill.usage.projects.length > 0 && (
                        <SkillChipTooltipSkillSection
                            title="Applied in"
                            icon={<Code2 size={14} aria-hidden />}
                            items={skill.usage.projects.map((p) => p.name)}
                        />
                    )}

                    {skill.usage.projects.length > 0 &&
                        skill.usage.certifications.length > 0 && (
                            <hr className="border-border" />
                        )}

                    {skill.usage.certifications.length > 0 && (
                        <SkillChipTooltipSkillSection
                            title="Proven via"
                            icon={<Award size={14} aria-hidden />}
                            items={skill.usage.certifications.map(
                                (c) => c.name,
                            )}
                        />
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SkillChip;
