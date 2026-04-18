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
import NextLink from "next/link";
import type React from "react";

import { Button } from "@/components/primitives";
import { cn } from "@/components/primitives/utils/cn";

interface LinkButtonProps {
    href: string;
    name: string;
    startIcon?: React.ComponentType;
    endIcon?: React.ComponentType;
    target?: string;
    ariaLabel?: string;
    className?: string;
}

const LinkButton = ({
    href,
    name,
    startIcon: StartIcon,
    endIcon: EndIcon,
    target,
    ariaLabel,
    className,
}: LinkButtonProps): React.ReactElement => {
    const isNewTab = target === "_blank";
    const resolvedAriaLabel =
        ariaLabel && isNewTab ? `${ariaLabel} (opens in a new tab)` : ariaLabel;

    return (
        <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={
                <NextLink
                    href={href}
                    target={target}
                    rel={isNewTab ? "noopener noreferrer" : undefined}
                />
            }
            aria-label={resolvedAriaLabel}
            className={cn(
                "text-muted-foreground hover:border-primary hover:text-primary [&_svg]:text-muted-foreground hover:[&_svg]:text-primary border-primary/40 dark:border-primary/35 motion-safe:[&_svg]:transition-colors",
                className,
            )}
        >
            {StartIcon && <StartIcon />}
            {name}
            {EndIcon && <EndIcon />}
            {isNewTab && !ariaLabel && (
                <span className="sr-only"> (opens in a new tab)</span>
            )}
        </Button>
    );
};

export default LinkButton;
export type { LinkButtonProps };
