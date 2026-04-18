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

import { cn } from "@/components/primitives/utils/cn";
import { SkillProficiency } from "@/constants/skill-categories";

// Exported so the Skills legend can reference the same values without
// duplicating them. Colors do not belong in the global theme palette or
// in colors.ts — they are visual-only bar-chart indicators.
export const skillProficiencyLevels: Record<
    SkillProficiency,
    { bars: number; className: string }
> = {
    [SkillProficiency.Novice]: {
        bars: 1,
        className: "bg-(--home-skill-novice-color)",
    },
    [SkillProficiency.Intermediate]: {
        bars: 2,
        className: "bg-(--home-skill-intermediate-color)",
    },
    [SkillProficiency.Expert]: {
        bars: 3,
        className: "bg-(--home-skill-expert-color)",
    },
};

interface SkillChipProficiencyIndicatorProps {
    level: SkillProficiency;
    sectionEntranceDelay?: number;
    animate?: boolean;
}

const SkillChipProficiencyIndicator = ({
    level,
    sectionEntranceDelay = 0,
    animate = false,
}: SkillChipProficiencyIndicatorProps): React.ReactElement => {
    const { bars, className: barsClassName } = skillProficiencyLevels[level];

    return (
        <div aria-hidden={true} className="ml-1.5 flex h-3 items-end gap-0.5">
            {([1, 2, 3] as const).map((i) => (
                <div
                    key={i}
                    className={cn(
                        ["h-1", "h-2", "h-3"][i - 1],
                        "w-0.75 rounded-[0.5px]",
                        i <= bars ? barsClassName : "bg-foreground/15",
                        animate &&
                            "motion-safe:origin-bottom motion-safe:animate-home-skill-bar-rise",
                    )}
                    style={
                        animate
                            ? {
                                  animationDelay: `${(sectionEntranceDelay + (i - 1) * 100) / 1000}s`,
                              }
                            : undefined
                    }
                />
            ))}
        </div>
    );
};

export default SkillChipProficiencyIndicator;
