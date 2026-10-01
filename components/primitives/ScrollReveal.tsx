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

import { cn } from "@/shadcn/lib/cn";

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const ScrollReveal = ({
    children,
    delay = 0,
    className,
}: ScrollRevealProps): React.ReactElement => (
    <div
        className={cn("scroll-reveal", className)}
        style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
        {children}
    </div>
);

export default ScrollReveal;
