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
import React from "react";

interface UseHoverDelayResult {
    /**
     * Call when the pointer (or focus) enters the trigger element to
     * cancel any pending close and open the overlay.
     */
    scheduleOpen: (element: HTMLElement) => void;
    /**
     * Call when the pointer (or focus) leaves the trigger or overlay to
     * schedule closing after `delayMs`.
     */
    scheduleClose: () => void;
    /**
     * Cancel a pending scheduled close.  Call when the pointer re-enters
     * either the trigger or the overlay so it stays open.
     */
    cancelClose: () => void;
    /**
     * Immediately close the overlay, cancelling any pending timers.
     * Use this for explicit dismissal actions such as the Escape key.
     */
    close: () => void;
    /** The current anchor element, or null when the overlay is closed. */
    anchorEl: HTMLElement | null;
}

/**
 * Manages the open/close state for a hover-and-focus-triggered overlay
 * (e.g. a Popper used as a tooltip).
 *
 * A configurable close delay allows the pointer to travel from the
 * trigger element into the overlay without the overlay disappearing,
 * satisfying WCAG 1.4.13 "Hoverable".
 *
 * @param delayMs Milliseconds to wait before closing (default: 100).
 */
const useHoverDelay = (delayMs = 100): UseHoverDelayResult => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelClose = React.useCallback(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const scheduleOpen = React.useCallback(
        (element: HTMLElement) => {
            cancelClose();
            setAnchorEl(element);
        },
        [cancelClose],
    );

    const scheduleClose = React.useCallback(() => {
        cancelClose();
        timerRef.current = setTimeout(() => setAnchorEl(null), delayMs);
    }, [cancelClose, delayMs]);

    const close = React.useCallback(() => {
        cancelClose();
        setAnchorEl(null);
    }, [cancelClose]);

    // Clean up any pending timer when the component using the hook unmounts.
    React.useEffect(() => cancelClose, [cancelClose]);

    return { scheduleOpen, scheduleClose, cancelClose, close, anchorEl };
};

export default useHoverDelay;
