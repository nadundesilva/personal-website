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

import { Button, KeywordChip } from "@/components/primitives";
import { cn } from "@/components/primitives/utils/cn";

const SKILLS_PREVIEW_COUNT = 5;

interface ExperienceSkillsProps {
    skills: string[];
    isContentOnRight: boolean;
}

const ExperienceSkills = ({
    skills,
    isContentOnRight: alignEnd,
}: ExperienceSkillsProps): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div
            role="group"
            aria-label="Skills used"
            className={cn(
                "mt-4 flex flex-wrap items-center gap-1.5",
                alignEnd && "sm:justify-end",
            )}
        >
            {skills
                .slice(0, expanded ? undefined : SKILLS_PREVIEW_COUNT)
                .map((skill) => (
                    <KeywordChip key={skill} label={skill} />
                ))}
            {skills.length > SKILLS_PREVIEW_COUNT && (
                <Button
                    variant="ghost"
                    size="xs"
                    aria-expanded={expanded}
                    onClick={() => setExpanded((p) => !p)}
                    className="text-muted-foreground hover:text-foreground h-6 gap-0.5 px-1 text-[0.625rem] font-normal"
                >
                    {expanded ? (
                        <>
                            Show less
                            <ChevronUp size={12} aria-hidden />
                        </>
                    ) : (
                        <>
                            +{skills.length - SKILLS_PREVIEW_COUNT} more
                            <ChevronDown size={12} aria-hidden />
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};

export default ExperienceSkills;
