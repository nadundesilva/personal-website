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
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

import { cn } from "@/components/primitives/utils/cn";
import SkillUsages from "@/constants/skill-usages";
import { type SkillDefinition } from "@/constants/skills";
import SkillChipPopover from "./SkillChipPopover";
import SkillChipProficiencyIndicator from "./SkillProficiencyIndicator";

const chipVariants = cva(
    "border-border bg-background inline-flex cursor-default items-center rounded border select-none motion-safe:transition-colors motion-safe:duration-150",
    {
        variants: {
            size: {
                md: "px-3 py-1 text-sm",
                sm: "px-2 py-0.5 text-[0.625rem]",
            },
        },
        defaultVariants: { size: "md" },
    },
);

export interface SkillChipProps extends VariantProps<typeof chipVariants> {
    skill: SkillDefinition;
}

const SkillChip = ({ skill, size }: SkillChipProps): React.ReactElement => {
    const usage = SkillUsages.get(skill);
    const hasUsages =
        usage !== undefined &&
        (usage.experiences.length > 0 ||
            usage.projects.length > 0 ||
            usage.certifications.length > 0);

    return hasUsages ? (
        <SkillChipPopover
            name={skill.name}
            proficiencyLevel={skill.proficiencyLevel}
            experiences={usage.experiences.map(
                (e) => `${e.name} at ${e.institute}`,
            )}
            projects={usage.projects.map((p) => p.name)}
            certifications={usage.certifications.map((c) => c.name)}
            chipClassName={cn(
                chipVariants({ size }),
                "hover:bg-accent/50 focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
            )}
        >
            {skill.name}
            <SkillChipProficiencyIndicator
                proficiencyLevel={skill.proficiencyLevel}
                size={size}
                animate
            />
        </SkillChipPopover>
    ) : (
        <span className={chipVariants({ size })}>
            {skill.name}
            <span className="sr-only"> - {skill.proficiencyLevel} level.</span>
            <SkillChipProficiencyIndicator
                proficiencyLevel={skill.proficiencyLevel}
                size={size}
                animate
            />
        </span>
    );
};

export default SkillChip;
