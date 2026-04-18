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
import React from "react";

const STAGGER_STEP_S = 0.08;

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER_STEP_S } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0, 0, 0.2, 1] as [number, number, number, number],
        },
    },
};

const motionContainers = { ul: m.ul, ol: m.ol } as const;
const motionItems = { ul: m.li, ol: m.li } as const;

interface StaggerRevealProps extends Omit<
    React.HTMLAttributes<HTMLElement>,
    | "children"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
> {
    children: React.ReactElement | React.ReactElement[];
    element: "ol" | "ul";
    itemClassName?: string;
}

const StaggerReveal = ({
    children,
    element,
    className = "contents",
    itemClassName,
    ...rest
}: StaggerRevealProps): React.ReactElement => {
    const MotionContainer = motionContainers[element];
    const MotionItem = motionItems[element];

    return (
        <MotionContainer
            {...rest}
            // VoiceOver in Safari strips list semantics when list-style: none is applied by Tailwind preflight — role="list" restores them.
            role={element === "ul" ? "list" : undefined}
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -20px 0px", amount: 0.05 }}
        >
            {React.Children.map(
                children as React.ReactElement[],
                (child, index) => (
                    <MotionItem
                        key={child.key ?? index}
                        className={itemClassName}
                        variants={itemVariants}
                    >
                        {child}
                    </MotionItem>
                ),
            )}
        </MotionContainer>
    );
};

export default StaggerReveal;
