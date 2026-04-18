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

import { cn } from "@/components/primitives/utils/cn";

const InlineCodeSegment = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>): React.ReactElement => (
    <code
        className={cn(
            // Base inline-code styles
            "rounded px-[0.4rem] py-[0.15rem] align-middle font-mono text-[0.82rem] leading-none whitespace-nowrap",
            "bg-primary/10",
            "border border-primary/20",
            // When inside a <pre> (fenced code block), reset all inline-code styling
            "[pre_&]:p-0 [pre_&]:[font-family:inherit] [pre_&]:[line-height:inherit] [pre_&]:text-inherit",
            "[pre_&]:rounded-none [pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:align-baseline [pre_&]:[white-space:inherit]",
            className,
        )}
        {...props}
    >
        {children}
    </code>
);

export default InlineCodeSegment;
