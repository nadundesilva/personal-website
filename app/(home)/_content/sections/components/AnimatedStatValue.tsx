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

import { animate, useReducedMotion } from "motion/react";
import React, { useEffect, useState } from "react";

interface AnimatedStatValueProps {
    value: number;
    prefix?: string;
    suffix?: string;
    step?: number;
}

function formatNumber(current: number, target: number): string {
    const dot = String(target).indexOf(".");
    const places = dot === -1 ? 0 : String(target).length - dot - 1;
    const integerDigits = String(Math.floor(Math.abs(target))).length;
    return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: places,
        maximumFractionDigits: places,
        minimumIntegerDigits: integerDigits,
    }).format(places === 0 ? Math.round(current) : current);
}

const AnimatedStatValue = ({
    value,
    prefix = "",
    suffix = "",
    step = 1,
}: AnimatedStatValueProps): React.ReactElement => {
    const [current, setCurrent] = useState(0);

    // animate() ignores MotionConfig reducedMotion="user" — must check manually.
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        // null means the hook hasn't resolved yet — wait for an explicit false before
        // starting so reduced-motion users never see even a brief counter animation.
        if (reducedMotion !== false) {
            return;
        }

        const controls = animate(0, value, {
            duration: 1,
            ease: "easeOut",
            onUpdate(latest) {
                const stepped = Math.round(latest / step) * step;
                setCurrent(Math.min(stepped, value));
            },
        });
        return () => controls.stop();
    }, [value, step, reducedMotion]);

    // When reduced motion is preferred, skip the count-up and show the final value directly.
    const displayCurrent = reducedMotion ? value : current;

    const displayPrefix = prefix
        ? prefix.charAt(0).toUpperCase() + prefix.slice(1)
        : prefix;

    return (
        <>
            <span
                aria-hidden={true}
                className="[font-variant-numeric:tabular-nums]"
            >
                {displayPrefix}
                {formatNumber(displayCurrent, value)}
                {suffix}
            </span>
            <span className="sr-only">
                {`${displayPrefix}${formatNumber(value, value)}${suffix}`}
            </span>
        </>
    );
};

export default AnimatedStatValue;
