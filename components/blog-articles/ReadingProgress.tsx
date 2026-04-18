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

import type React from "react";
import { useEffect, useState } from "react";

import { ProgressFab } from "@/components/primitives";
import { cn } from "@/components/primitives/utils/cn";
import { estimateReadingTimeMinutesFromText } from "@/utils/common/blog-articles";

interface PillProps {
    visible: boolean;
    children: React.ReactNode;
}

const Pill = ({ visible, children }: PillProps): React.ReactElement => (
    <div
        role="status"
        className="absolute top-1/2 right-[calc(100%+0.5rem)] -translate-y-1/2"
    >
        <div
            aria-hidden="true"
            className={cn(
                "rounded-full px-2.5 py-1.25 whitespace-nowrap",
                "border-border border shadow-sm",
                "bg-card/90 backdrop-blur",
                "text-muted-foreground text-[0.6875rem] leading-none font-medium",
                "motion-safe:transition-opacity motion-safe:duration-300",
                visible ? "opacity-100" : "opacity-0",
            )}
        >
            {children}
        </div>
        <span className="sr-only">{visible ? children : ""}</span>
    </div>
);

const ReadingProgress = (): React.ReactElement => {
    const [progress, setProgress] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState<number | null>(null);
    const [totalReadingMinutes, setTotalReadingMinutes] = useState<
        number | null
    >(null);

    // Effect 1: Estimate total reading time from the rendered article text content.
    // setState is deferred to a rAF callback to satisfy the react-hooks/set-state-in-effect rule.
    useEffect(() => {
        const articleEl = document.querySelector("article");
        if (!articleEl) return;

        const text = articleEl.textContent ?? "";
        const total = estimateReadingTimeMinutesFromText(text);

        const id = requestAnimationFrame(() => setTotalReadingMinutes(total));
        return () => cancelAnimationFrame(id);
    }, []);

    // Effect 2: Track scroll progress. Depends on totalReadingMinutes so the
    // handler can compute minutesLeft without capturing a stale ref value.
    useEffect(() => {
        if (totalReadingMinutes === null) return;

        const handleScroll = (): void => {
            const scrolled = window.scrollY;
            const total =
                document.documentElement.scrollHeight - window.innerHeight;
            const newProgress =
                total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
            setProgress(newProgress);
            setMinutesLeft(
                Math.max(
                    0,
                    Math.ceil(totalReadingMinutes * (1 - newProgress / 100)),
                ),
            );
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [totalReadingMinutes]);

    const isDone = progress >= 98;
    const showInitialRead =
        totalReadingMinutes !== null && progress <= 1 && !isDone;
    const showMinutesLeft =
        minutesLeft !== null && minutesLeft > 0 && progress > 1 && !isDone;

    // Outer div is sized to match the FAB (40px) so pill children never cause layout shift.
    // bottom: spacing(3)=24px + spacing(5)=40px + spacing(2)=16px = 80px
    return (
        <div
            className={cn(
                "fixed right-6 bottom-20 z-30",
                "pointer-events-none size-10",
                "motion-safe:transition-opacity motion-safe:duration-300",
                totalReadingMinutes !== null ? "opacity-100" : "opacity-0",
            )}
        >
            <Pill visible={showInitialRead}>
                {totalReadingMinutes} min read
            </Pill>
            <Pill visible={showMinutesLeft}>
                {minutesLeft} min{minutesLeft === 1 ? "" : "s"} left
            </Pill>
            <Pill visible={isDone}>Thanks for reading!</Pill>

            <ProgressFab progress={progress} isDone={isDone} />
        </div>
    );
};

export default ReadingProgress;
