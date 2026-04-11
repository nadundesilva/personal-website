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

import { Box, useMediaQuery } from "@mui/material";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { MOTION_OK_QUERY } from "@/components/theme/media-queries";

interface StaggerRevealProps {
    children: React.ReactElement[];
}

const STAGGER_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const STAGGER_STEP_MS = 80;

/**
 * Wraps stagger items directly (as direct children) and applies a cascading
 * slide-up entrance when the container scrolls into view. The layout container
 * (Grid, ImageList, etc.) should be the *parent* of StaggerReveal.
 *
 * Expected structure: <LayoutContainer> > <StaggerReveal> > <items>
 *
 * CSS rules are generated for exactly the number of children passed, so no
 * dead rules are emitted.
 */
const StaggerReveal = ({
    children,
}: StaggerRevealProps): React.ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const motionOk = useMediaQuery(MOTION_OK_QUERY);
    const count = children.length;

    useEffect(() => {
        if (!motionOk) return;
        // ref.current has display:contents and has no layout box of its own,
        // so IntersectionObserver must target the first real child instead.
        const element = ref.current?.firstElementChild ?? null;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [motionOk]);

    const staggerCss = useMemo((): Record<string, unknown> => {
        const css: Record<string, unknown> = {
            // display:contents makes this wrapper invisible to CSS layout so
            // items participate directly in the parent Grid/ImageList layout.
            "display": "contents",
            "& > *": {
                [MOTION_OK_QUERY]: {
                    transform: "translateY(24px)",
                    transition: `transform 0.6s ${STAGGER_EASING}`,
                },
            },
        };
        for (let i = 0; i < count; i++) {
            css[`&[data-stagger='true'] > *:nth-of-type(${i + 1})`] = {
                [MOTION_OK_QUERY]: {
                    transform: "translateY(0)",
                    transitionDelay: `${i * STAGGER_STEP_MS}ms`,
                },
            };
        }
        return css;
    }, [count]);

    return (
        <Box
            ref={ref}
            data-stagger={isVisible ? "true" : "false"}
            sx={staggerCss}
        >
            {children}
        </Box>
    );
};

export default StaggerReveal;
