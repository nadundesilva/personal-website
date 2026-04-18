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
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

import { cn } from "@/components/primitives/utils/cn";

const horizontalGradientLineVariants = cva(
    "mt-1.5 h-0.5 w-8 rounded bg-linear-to-r opacity-65 md:w-11",
    {
        variants: {
            variant: {
                "left-anchored": "from-primary to-transparent",
                "centered": "from-transparent via-primary to-transparent",
            },
        },
        defaultVariants: {
            variant: "left-anchored",
        },
    },
);

interface HorizontalGradientLineProps extends VariantProps<
    typeof horizontalGradientLineVariants
> {
    className?: string;
}

const HorizontalGradientLine = ({
    className,
    variant,
}: HorizontalGradientLineProps): React.ReactElement => (
    <div
        aria-hidden={true}
        className={cn(horizontalGradientLineVariants({ variant }), className)}
    />
);

export default HorizontalGradientLine;
