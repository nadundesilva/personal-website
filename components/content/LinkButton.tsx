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

import { Button } from "@/components/primitives/Button";

interface LinkButtonProps {
    href: string;
    name: string;
    startIcon?: React.ComponentType;
    endIcon?: React.ComponentType;
    target?: string;
    ariaLabel?: string;
}

const LinkButton = ({
    href,
    name,
    startIcon: StartIcon,
    endIcon: EndIcon,
    target,
    ariaLabel,
}: LinkButtonProps): React.ReactElement => (
    <Button
        variant="outline"
        size="sm"
        nativeButton={false}
        render={
            <NextLink
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
            />
        }
        role="link"
        aria-label={ariaLabel}
        className="text-muted-foreground hover:border-primary hover:text-primary [&_svg]:text-muted-foreground hover:[&_svg]:text-primary border-primary/40 dark:border-primary/35 motion-safe:[&_svg]:transition-colors"
    >
        {StartIcon && <StartIcon />}
        {name}
        {EndIcon && <EndIcon />}
    </Button>
);

export default LinkButton;
export type { LinkButtonProps };
