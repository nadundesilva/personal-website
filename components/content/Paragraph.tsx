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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

import { cn } from "@/components/primitives/utils/cn";

const paragraphVariants = cva(
    "mb-5 text-[0.9375rem] leading-[1.75] font-normal",
    {
        variants: {
            textAlign: {
                justified: "sm:text-justify",
                start: "sm:text-start",
            },
        },
        defaultVariants: { textAlign: "justified" },
    },
);

interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
    children: React.ReactNode;
    id?: string;
    className?: string;
}

const Paragraph = ({
    children,
    id,
    textAlign,
    className,
}: ParagraphProps): React.ReactElement => (
    <p id={id} className={cn(paragraphVariants({ textAlign }), className)}>
        {children}
    </p>
);

export default Paragraph;
