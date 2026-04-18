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

interface LeftAccentProps {
    children: React.ReactNode;
    thickness?: number;
    opacity?: number;
    className?: string;
}

const LeftAccent = ({
    children,
    thickness = 3,
    opacity = 0.4,
    className,
}: LeftAccentProps): React.ReactElement => (
    <div
        className={cn(
            "[border-left-width:var(--accent-thickness)] border-l-(--accent-color) border-solid pl-4",
            className,
        )}
        style={
            {
                "--accent-thickness": `${thickness}px`,
                "--accent-color": `color-mix(in oklch, var(--primary) ${opacity * 100}%, transparent)`,
            } as React.CSSProperties
        }
    >
        {children}
    </div>
);

export default LeftAccent;
