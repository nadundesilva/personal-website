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
import type React from "react";

import { type Skill } from "@/constants/skill-categories";
import SkillChipPopover from "./SkillChipPopover";
import SkillChipProficiencyIndicator from "./SkillProficiencyIndicator";

const CHIP_CLASS_NAME =
    "border-border bg-background hover:bg-accent/50 focus-visible:outline-ring inline-flex cursor-default items-center rounded border px-3 py-1 text-sm select-none focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors motion-safe:duration-150";

interface SkillChipProps {
    skill: Skill;
    sectionEntranceDelay?: number;
}

const SkillChip = ({
    skill,
    sectionEntranceDelay = 0,
}: SkillChipProps): React.ReactElement => {
    const hasUsages =
        skill.usage.experiences.length > 0 ||
        skill.usage.projects.length > 0 ||
        skill.usage.certifications.length > 0;

    const chipContent = (
        <>
            {skill.name}
            <SkillChipProficiencyIndicator
                level={skill.level}
                animate
                sectionEntranceDelay={sectionEntranceDelay}
            />
        </>
    );

    return hasUsages ? (
        <SkillChipPopover
            name={skill.name}
            level={skill.level}
            experiences={skill.usage.experiences.map(
                (e) => `${e.name} at ${e.institute}`,
            )}
            projects={skill.usage.projects.map((p) => p.name)}
            certifications={skill.usage.certifications.map((c) => c.name)}
            chipClassName={CHIP_CLASS_NAME}
        >
            {chipContent}
        </SkillChipPopover>
    ) : (
        <span
            aria-label={`${skill.name} - ${skill.level} level.`}
            className={CHIP_CLASS_NAME}
        >
            {chipContent}
        </span>
    );
};

export default SkillChip;
