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

import { stagger, useAnimate, useReducedMotion } from "motion/react";
import type React from "react";
import { useEffect } from "react";

const STAGGER_STEP_S = 0.08;

interface StaggerRevealProps {
    children: React.ReactElement[];
}

const StaggerReveal = ({
    children,
}: StaggerRevealProps): React.ReactElement => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !scope.current) return;

        const firstChild = scope.current.firstElementChild;
        if (!firstChild) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || !scope.current) return;
                observer.disconnect();
                void animate(
                    Array.from(scope.current.children) as Element[],
                    { y: [24, 0] },
                    {
                        delay: stagger(STAGGER_STEP_S),
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                    },
                );
            },
            { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
        );
        observer.observe(firstChild);
        return () => observer.disconnect();
    }, [prefersReducedMotion, animate, scope]);

    return (
        <div ref={scope} className="contents">
            {children}
        </div>
    );
};

export default StaggerReveal;
