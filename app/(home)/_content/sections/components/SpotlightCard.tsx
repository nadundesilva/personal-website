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

import { cn } from "@/components/primitives/utils/cn";
import { useReducedMotion } from "motion/react";
import type React from "react";
import { useCallback, useRef } from "react";

const SPOTLIGHT_POSITION_X_CSS_PROPERTY = "--spotlight-position-x";
const SPOTLIGHT_POSITION_Y_CSS_PROPERTY = "--spotlight-position-y";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
}

const SpotlightCard = ({
    children,
    className,
}: SpotlightCardProps): React.ReactElement => {
    const cardRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (reducedMotion) return;
            const noHover = window.matchMedia("(hover: none)").matches;
            if (noHover) return;

            const cardElement = cardRef.current;
            const overlayElement = overlayRef.current;
            if (!cardElement || !overlayElement) return;

            const cardBB = cardElement.getBoundingClientRect();
            cardElement.style.setProperty(
                SPOTLIGHT_POSITION_X_CSS_PROPERTY,
                `${event.clientX - cardBB.left}px`,
            );
            cardElement.style.setProperty(
                SPOTLIGHT_POSITION_Y_CSS_PROPERTY,
                `${event.clientY - cardBB.top}px`,
            );
            overlayElement.style.opacity = "1";
        },
        [reducedMotion],
    );

    const handleMouseLeave = useCallback(() => {
        const overlay = overlayRef.current;
        if (overlay) {
            overlay.style.opacity = "0";
        }
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("relative overflow-hidden", className)}
        >
            {/* Spotlight overlay — follows the cursor via CSS custom properties */}
            <div
                ref={overlayRef}
                aria-hidden={true}
                className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 motion-safe:transition-opacity motion-safe:duration-250"
                style={{
                    background: `radial-gradient(circle 260px at var(${SPOTLIGHT_POSITION_X_CSS_PROPERTY}, -9999px) var(${SPOTLIGHT_POSITION_Y_CSS_PROPERTY}, -9999px), rgba(255,255,255,0.10), transparent 70%)`,
                }}
            />
            {/* Content sits above the spotlight overlay */}
            <div className="relative z-1">{children}</div>
        </div>
    );
};

export default SpotlightCard;
