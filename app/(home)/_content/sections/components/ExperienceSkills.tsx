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
"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { cn } from "@/shadcn/lib/cn";
import { Button } from "@/shadcn/ui";
import type { SkillChipProps } from "./SkillChip";

const SKILLS_PREVIEW_COUNT = 5;

interface ExperienceSkillsProps {
    children:
        | React.ReactElement<SkillChipProps>
        | React.ReactElement<SkillChipProps>[];
    contentAlignment: "start" | "end";
}

const ExperienceSkills = ({
    children,
    contentAlignment,
}: ExperienceSkillsProps): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);

    const chips = Array.isArray(children) ? children : [children];

    return (
        <div
            className={cn(
                "mt-4 flex flex-wrap items-center gap-1.5",
                contentAlignment === "end" && "lg:justify-end",
            )}
        >
            {/* All chips are always rendered so screen readers see the full list.
                Chips beyond the preview threshold are sr-only when collapsed —
                visually hidden but present in the accessibility tree.
                VoiceOver in Safari strips list semantics when list-style: none is applied by Tailwind preflight — role="list" restores them. */}
            <ul role="list" aria-label="Skills used" className="contents">
                {chips.map((chip, index) => (
                    <li
                        key={chip.key ?? index}
                        className={
                            !expanded && index >= SKILLS_PREVIEW_COUNT
                                ? "sr-only"
                                : undefined
                        }
                    >
                        {chip}
                    </li>
                ))}
            </ul>
            {chips.length > SKILLS_PREVIEW_COUNT && (
                <Button
                    variant="ghost"
                    size="xs"
                    aria-expanded={expanded}
                    onClick={() => setExpanded((p) => !p)}
                    className="text-muted-foreground hover:text-foreground aria-expanded:bg-transparent h-6 gap-0.5 px-1 text-[0.625rem] font-normal"
                >
                    {expanded ? (
                        <>
                            Show Less
                            <ChevronUp size={12} aria-hidden={true} />
                        </>
                    ) : (
                        <>
                            +{chips.length - SKILLS_PREVIEW_COUNT} More
                            <ChevronDown size={12} aria-hidden={true} />
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};

export default ExperienceSkills;
