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

import React, { useEffect, useState } from "react";

interface AnimatedStatValueProps {
    value: number;
    prefix?: string;
    suffix?: string;
    step?: number;
    startDelay?: number;
}

const ANIMATION_DURATION_MS = 1500;

function formatNumber(current: number, target: number): string {
    const dot = String(target).indexOf(".");
    const places = dot === -1 ? 0 : String(target).length - dot - 1;
    return places === 0 ? String(Math.round(current)) : current.toFixed(places);
}

function capitalise(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Ease-out quadratic: fast start, decelerates to end.
function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 2);
}

const AnimatedStatValue = ({
    value,
    prefix = "",
    suffix = "",
    step = 1,
    startDelay = 0,
}: AnimatedStatValueProps): React.ReactElement => {
    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const [current, setCurrent] = useState(prefersReducedMotion ? value : 0);

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        let rafId: number;

        const startAnimation = (): void => {
            const startTime = performance.now();

            const tick = (now: number): void => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);
                const eased = easeOut(progress);
                // Snap to the nearest step so displayed increments are multiples of step
                const raw = eased * value;
                const stepped = Math.round(raw / step) * step;
                const clamped =
                    progress >= 1 ? value : Math.min(stepped, value);
                setCurrent(clamped);

                if (progress < 1) {
                    rafId = requestAnimationFrame(tick);
                }
            };

            rafId = requestAnimationFrame(tick);
        };

        const timerId = setTimeout(startAnimation, startDelay);
        return () => {
            clearTimeout(timerId);
            cancelAnimationFrame(rafId);
        };
    }, [value, step, startDelay, prefersReducedMotion]);

    return (
        <>
            {capitalise(prefix)}
            {formatNumber(current, value)}
            {suffix}
        </>
    );
};

export default AnimatedStatValue;
