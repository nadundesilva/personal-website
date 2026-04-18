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

const indicatorVariants = cva("flex items-end", {
    variants: {
        size: {
            md: "ml-1.5 h-3 gap-0.5",
            sm: "ml-1 h-2 gap-[1.5px]",
        },
    },
    defaultVariants: { size: "md" },
});

const barVariants = cva("rounded-[0.5px]", {
    variants: {
        size: {
            md: "w-0.75",
            sm: "w-0.5",
        },
    },
    defaultVariants: { size: "md" },
});

const BAR_HEIGHTS: Record<"md" | "sm", [string, string, string]> = {
    md: ["h-1", "h-2", "h-3"],
    sm: ["h-0.5", "h-1", "h-2"],
};

interface SkillChipProficiencyIndicatorProps extends VariantProps<
    typeof indicatorVariants
> {
    proficiencyLevel: SkillProficiency;
    animate?: boolean;
}

const SkillChipProficiencyIndicator = ({
    proficiencyLevel,
    animate = false,
    size = "md",
}: SkillChipProficiencyIndicatorProps): React.ReactElement => {
    const { bars, className: barsClassName } =
        skillProficiencyLevels[proficiencyLevel];
    const resolvedSize = size ?? "md";
    const heights = BAR_HEIGHTS[resolvedSize];

    return (
        <div aria-hidden={true} className={indicatorVariants({ size })}>
            {([1, 2, 3] as const).map((i) => (
                <div
                    key={i}
                    className={cn(
                        heights[i - 1],
                        barVariants({ size }),
                        i <= bars ? barsClassName : "bg-foreground/15",
                        animate &&
                            "motion-safe:origin-bottom motion-safe:animate-(--animate-home-skill-bar-rise)",
                    )}
                    style={
                        animate
                            ? { animationDelay: `${((i - 1) * 100) / 1000}s` }
                            : undefined
                    }
                />
            ))}
        </div>
    );
};

export default SkillChipProficiencyIndicator;
