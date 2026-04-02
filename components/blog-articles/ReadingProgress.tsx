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

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import type React from "react";
import { useEffect, useState } from "react";

import { ProgressFab } from "@/components/primitives";
import { estimateReadingTimeMinutesFromText } from "@/utils/common/blog-articles";

interface PillProps {
    in: boolean;
    children: React.ReactNode;
}

const Pill = ({ in: inProp, children }: PillProps): React.ReactElement => (
    <Fade in={inProp}>
        <Box
            sx={{
                position: "absolute",
                right: (theme) => `calc(100% + ${theme.spacing(1)})`,
                top: "50%",
                transform: "translateY(-50%)",
                whiteSpace: "nowrap",
                px: 1.25,
                py: 0.625,
                borderRadius: 50,
                backgroundColor: (theme) =>
                    alpha(theme.palette.background.paper, 0.9),
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    lineHeight: 1,
                }}
            >
                {children}
            </Typography>
        </Box>
    </Fade>
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

    return (
        <Fade in={totalReadingMinutes !== null}>
            {/*
             * Outer Box is sized to the MUI small FAB (theme.spacing(5)) so
             * absolutely-positioned children (the pill chips) never cause layout shift.
             */}
            <Box
                aria-hidden="true"
                sx={{
                    position: "fixed",
                    // Sit above the scroll-to-top FAB: spacing(3) bottom + spacing(5) height + spacing(2) gap
                    bottom: (theme) =>
                        `calc(${theme.spacing(3)} + ${theme.spacing(5)} + ${theme.spacing(2)})`,
                    right: (theme) => theme.spacing(3),
                    zIndex: (theme) => theme.zIndex.appBar,
                    width: (theme) => theme.spacing(5),
                    height: (theme) => theme.spacing(5),
                    pointerEvents: "none",
                }}
            >
                {/* Three independent pills anchored to the left of the circle — each sized
                    naturally to its own content, crossfaded via opacity so neither pill's
                    width ever affects the other or the badge layout. */}
                <Pill in={showInitialRead}>{totalReadingMinutes} min read</Pill>
                <Pill in={showMinutesLeft}>
                    {minutesLeft} min{minutesLeft === 1 ? "" : "s"} left
                </Pill>
                <Pill in={isDone}>Thanks for reading!</Pill>

                <ProgressFab progress={progress} isDone={isDone} />
            </Box>
        </Fade>
    );
};

export default ReadingProgress;
