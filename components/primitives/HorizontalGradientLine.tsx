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

interface HorizontalGradientLineProps {
    className?: string;
}

const HorizontalGradientLine = ({
    className,
}: HorizontalGradientLineProps): React.ReactElement => (
    <div
        aria-hidden="true"
        className={cn(
            "from-primary mt-1.5 h-0.5 w-8 rounded bg-linear-to-r to-transparent opacity-65 md:w-11",
            className,
        )}
    />
);

export default HorizontalGradientLine;
