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
import type React from "react";

interface ScrollIndicatorProps {
    scrollToTargetId: string;
}

const ScrollIndicator = ({
    scrollToTargetId: targetId,
}: ScrollIndicatorProps): React.ReactElement => (
    <a
        href={`#${targetId}`}
        aria-label="Scroll to Who Am I section"
        className="group rounded-xl p-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/90"
    >
        <div className="relative flex h-9.5 w-6 justify-center rounded-xl border-2 border-white/50 motion-safe:transition-colors motion-safe:duration-200 group-hover:border-white/90">
            <div className="absolute top-1.25 h-1.75 w-1 rounded-sm bg-white/85 motion-safe:animate-home-scroll-dot" />
        </div>
    </a>
);

export default ScrollIndicator;
