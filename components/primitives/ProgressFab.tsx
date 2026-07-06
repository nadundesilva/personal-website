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

import { Progress } from "@base-ui/react/progress";
import { Sparkles } from "lucide-react";
import type React from "react";

import { cn } from "@/shadcn/lib/cn";

// BADGE_SIZE drives both the SVG geometry and the outer div size (= size-10 in Tailwind, 10 × 4px).
const BADGE_SIZE = 40;
const STROKE_WIDTH = 3;

interface ProgressFabProps {
    progress: number;
    isDone?: boolean;
}

const ProgressFab = ({
    progress,
    isDone = progress >= 100,
}: ProgressFabProps): React.ReactElement => {
    if (progress < 0 || progress > 100) {
        throw new Error(
            `ProgressFab: progress must be between 0 and 100, received ${progress}`,
        );
    }

    const ringRadius = BADGE_SIZE / 2 - STROKE_WIDTH - 1;
    const ringCircumference = 2 * Math.PI * ringRadius;
    const ringCentre = BADGE_SIZE / 2;
    const strokeOffset = ringCircumference * (1 - progress / 100);

    return (
        <Progress.Root
            value={Math.round(progress)}
            max={100}
            aria-label="Article reading progress"
            className="bg-primary relative size-10 overflow-hidden rounded-full shadow-md"
        >
            <svg
                width={BADGE_SIZE}
                height={BADGE_SIZE}
                className="-rotate-90"
                aria-hidden="true"
            >
                <circle
                    cx={ringCentre}
                    cy={ringCentre}
                    r={ringRadius}
                    fill="none"
                    strokeWidth={STROKE_WIDTH}
                    className="stroke-primary-foreground/25"
                />
                <circle
                    cx={ringCentre}
                    cy={ringCentre}
                    r={ringRadius}
                    fill="none"
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeOffset}
                    className="stroke-primary-foreground motion-safe:transition-[stroke-dashoffset] motion-safe:duration-200 motion-safe:ease-out"
                />
            </svg>

            <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
            >
                <span
                    className={cn(
                        "text-primary-foreground text-[0.5rem] leading-none font-semibold motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-in-out",
                        isDone ? "opacity-0" : "opacity-100",
                    )}
                >
                    {Math.round(progress)}%
                </span>
                <Sparkles
                    className={cn(
                        "text-primary-foreground absolute size-4 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-in-out",
                        isDone ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                />
            </div>
        </Progress.Root>
    );
};

export default ProgressFab;
