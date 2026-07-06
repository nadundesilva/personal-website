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

import { cn } from "@/shadcn/lib/cn";

const leftAccentVariants = cva("border-l-primary/40 border-solid pl-4", {
    variants: {
        thickness: {
            default: "border-l-[3px]",
            thin: "border-l-[2px]",
        },
    },
    defaultVariants: {
        thickness: "default",
    },
});

interface LeftAccentProps extends VariantProps<typeof leftAccentVariants> {
    children: React.ReactNode;
    className?: string;
}

const LeftAccent = ({
    children,
    thickness,
    className,
}: LeftAccentProps): React.ReactElement => (
    <div className={cn(leftAccentVariants({ thickness }), className)}>
        {children}
    </div>
);

export default LeftAccent;
