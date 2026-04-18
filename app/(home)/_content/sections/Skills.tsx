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

import { Link } from "@/components/content";
import { ScrollReveal } from "@/components/primitives";
import SkillCategories, {
    SkillProficiency,
} from "@/constants/skill-categories";
import SubHeading from "../common/SubHeading";
import SkillChip from "./components/SkillChip";
import SkillProficiencyIndicator, {
    skillProficiencyLevels,
} from "./components/SkillProficiencyIndicator";

const ProficiencyLegend = (): React.ReactElement => (
    <div
        role="group"
        aria-label="Proficiency legend"
        className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
    >
        {(
            Object.entries(skillProficiencyLevels) as [
                SkillProficiency,
                { bars: number; className: string },
            ][]
        )
            .sort(([, a], [, b]) => a.bars - b.bars)
            .map(([level]) => (
                <div key={level} className="flex items-center gap-1.5">
                    <SkillProficiencyIndicator proficiencyLevel={level} />
                    <span className="text-muted-foreground text-[11px]">
                        {level}
                    </span>
                </div>
            ))}
        <div className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Info
                size={13}
                className="align-middle opacity-60"
                aria-hidden={true}
            />
            hover, tap, or focus a skill for details
        </div>
    </div>
);

const Skills = (): React.ReactElement => (
    <div className="mx-auto flex w-full max-w-full flex-col gap-6 md:max-w-180 md:gap-8">
        <Link
            href="#skip-skills-target"
            className="focus-visible:bg-popover focus-visible:text-primary focus-visible:outline-ring sr-only focus-visible:not-sr-only focus-visible:z-50 focus-visible:m-2 focus-visible:block focus-visible:rounded focus-visible:p-2 focus-visible:text-center focus-visible:outline-2 focus-visible:outline-offset-2"
        >
            Skip Skills
        </Link>
        <ScrollReveal>
            <ProficiencyLegend />
        </ScrollReveal>
        {Object.entries(SkillCategories).map(
            ([skillCategoryKey, skillCategory]) => {
                const headingId = `skills-category-${skillCategory.category.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                    <ScrollReveal key={skillCategoryKey}>
                        <div>
                            <SubHeading id={headingId}>
                                {skillCategory.category}
                            </SubHeading>
                            {/* VoiceOver in Safari strips list semantics when list-style: none is applied by Tailwind preflight — role="list" restores them. */}
                            <ul
                                role="list"
                                aria-labelledby={headingId}
                                className="flex flex-wrap justify-center gap-3 pt-2"
                            >
                                {skillCategory.skills.map((skill) => (
                                    <li key={skill.name}>
                                        <SkillChip skill={skill} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                );
            },
        )}
        <div id="skip-skills-target" tabIndex={-1} className="outline-none" />
    </div>
);

export default Skills;
