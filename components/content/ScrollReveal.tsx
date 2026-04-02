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

import { Box, useMediaQuery, type SxProps, type Theme } from "@mui/material";
import { MOTION_OK_QUERY } from "@/components/theme/media-queries";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const SCROLL_REVEAL_OFFSET = "28px";

interface ScrollRevealProps {
    children: React.ReactNode;
    /**
     * Milliseconds to delay the reveal transition. Default: 0.
     */
    delay?: number;
    sx?: SxProps<Theme>;
}

const ScrollReveal = ({
    children,
    delay = 0,
    sx,
}: ScrollRevealProps): React.ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const motionOk = useMediaQuery(MOTION_OK_QUERY);

    useEffect(() => {
        if (!motionOk) return;
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [motionOk]);

    return (
        <Box
            ref={ref}
            sx={[
                // Base: always fully visible. Reduced-motion users and SSR stay here.
                { opacity: 1, transform: "none" },
                (theme) => ({
                    // Motion-OK users: start hidden, animate in when scrolled into view.
                    [MOTION_OK_QUERY]: {
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                            ? "translateY(0)"
                            : `translateY(${SCROLL_REVEAL_OFFSET})`,
                        transition: theme.transitions.create(
                            ["opacity", "transform"],
                            {
                                duration: theme.transitions.duration.complex,
                                easing: theme.transitions.easing.easeOut,
                                delay,
                            },
                        ),
                    },
                }),
                ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
            ]}
        >
            {children}
        </Box>
    );
};

export default ScrollReveal;
