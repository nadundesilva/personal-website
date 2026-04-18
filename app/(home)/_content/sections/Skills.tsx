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
import { Info } from "lucide-react";
import type React from "react";

import SkillCategories, {
    SkillProficiency,
} from "@/constants/skill-categories";
import type { SectionProps } from "../types";
import SkillChip from "./components/SkillChip";
import SkillProficiencyIndicator, {
    skillProficiencyLevels,
} from "./components/SkillProficiencyIndicator";

const ProficiencyLegend = (): React.ReactElement => (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {(
            Object.entries(skillProficiencyLevels) as [
                SkillProficiency,
                { bars: number; color: string },
            ][]
        )
            .sort(([, a], [, b]) => a.bars - b.bars)
            .map(([level]) => (
                <div key={level} className="flex items-center gap-1.5">
                    <SkillProficiencyIndicator level={level} />
                    <span className="text-foreground/38 text-[11px]">
                        {level}
                    </span>
                </div>
            ))}
        <span className="text-foreground/38 flex items-center gap-1 text-[11px] opacity-70">
            <Info size={13} className="align-middle opacity-60" aria-hidden />
            hover or tap any skill for details
        </span>
    </div>
);

const Skills = ({
    sectionEntranceDelay = 0,
}: SectionProps): React.ReactElement => (
    <div className="mx-auto flex w-full max-w-full flex-col gap-6 md:max-w-180 md:gap-8">
        <a
            href="#skip-skills-target"
            className="focus-visible:bg-popover focus-visible:text-primary focus-visible:outline-ring sr-only focus-visible:not-sr-only focus-visible:z-50 focus-visible:m-2 focus-visible:block focus-visible:rounded focus-visible:p-2 focus-visible:text-center focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
            Skip Skills
        </a>
        <ProficiencyLegend />
        {SkillCategories.map((group) => {
            const headingId = `skills-category-${group.category.toLowerCase().replace(/\s+/g, "-")}`;
            return (
                <div key={group.category}>
                    <h3
                        id={headingId}
                        aria-label={group.category}
                        className="text-muted-foreground before:text-primary after:text-primary mb-4 text-center text-[18px] leading-relaxed font-normal tracking-[-0.01em] before:mr-2 before:inline-block before:align-middle before:font-mono before:text-[1.3em] before:leading-none before:font-light before:opacity-60 before:content-['<'] after:ml-2 after:inline-block after:align-middle after:font-mono after:text-[1.3em] after:leading-none after:font-light after:opacity-60 after:content-['/>'] md:mb-5 md:text-[20px]"
                    >
                        {group.category}
                    </h3>
                    <ul
                        aria-labelledby={headingId}
                        className="m-0 flex list-none flex-wrap justify-center gap-3 p-0 pt-2"
                    >
                        {group.skills.map((skill) => (
                            <li key={skill.name}>
                                <SkillChip
                                    skill={skill}
                                    sectionEntranceDelay={sectionEntranceDelay}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            );
        })}
        <div id="skip-skills-target" tabIndex={-1} className="outline-none" />
    </div>
);

export default Skills;
