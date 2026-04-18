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

import { m } from "motion/react";
import type React from "react";

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
    <m.div
        className={className}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -20px 0px", amount: 0.05 }}
        transition={{
            duration: 0.375,
            ease: [0, 0, 0.2, 1],
            delay: delay / 1000,
        }}
    >
        {children}
    </m.div>
);

export default ScrollReveal;
