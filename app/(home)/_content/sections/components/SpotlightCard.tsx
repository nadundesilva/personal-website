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
import type React from "react";
import { useCallback, useRef } from "react";

import {
    MOTION_OK_QUERY,
    NO_HOVER_QUERY,
} from "@/components/theme/media-queries";

const SPOTLIGHT_POSITION_X_CSS_PROPERTY = "--spotlight-position-x";
const SPOTLIGHT_POSITION_Y_CSS_PROPERTY = "--spotlight-position-y";

interface SpotlightCardProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const SpotlightCard = ({
    children,
    sx,
}: SpotlightCardProps): React.ReactElement => {
    const cardRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const motionOk = useMediaQuery(MOTION_OK_QUERY);
    const noHover = useMediaQuery(NO_HOVER_QUERY);

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (!motionOk || noHover) return;

            const cardElement = cardRef.current;
            const overlayElement = overlayRef.current;

            if (!cardElement || !overlayElement) return;

            const cardBB = cardElement.getBoundingClientRect();
            const spotlightPositionX = event.clientX - cardBB.left;
            const spotlightPositionY = event.clientY - cardBB.top;

            cardElement.style.setProperty(
                SPOTLIGHT_POSITION_X_CSS_PROPERTY,
                `${spotlightPositionX}px`,
            );
            cardElement.style.setProperty(
                SPOTLIGHT_POSITION_Y_CSS_PROPERTY,
                `${spotlightPositionY}px`,
            );
            overlayElement.style.opacity = "1";
        },
        [motionOk, noHover],
    );

    const handleMouseLeave = useCallback(() => {
        const overlay = overlayRef.current;
        if (overlay) {
            overlay.style.opacity = "0";
        }
    }, []);

    return (
        <Box
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            sx={[
                { position: "relative", overflow: "hidden" },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {/* Spotlight overlay — follows the cursor via CSS custom properties */}
            <Box
                ref={overlayRef}
                aria-hidden={true}
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: 0,
                    borderRadius: "inherit",
                    background: `radial-gradient(circle 260px at var(${SPOTLIGHT_POSITION_X_CSS_PROPERTY}, -9999px) var(${SPOTLIGHT_POSITION_Y_CSS_PROPERTY}, -9999px), rgba(255,255,255,0.10), transparent 70%)`,
                    transition: "opacity 0.25s ease",
                }}
            />
            {/* Content sits above the spotlight overlay */}
            <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
        </Box>
    );
};

export default SpotlightCard;
