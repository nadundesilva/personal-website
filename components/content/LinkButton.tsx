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
import type React from "react";

import { Button } from "@/components/primitives";
import { cn } from "@/components/primitives/utils/cn";
import Link from "./Link";

type LinkButtonBaseProps = {
    name: string;
    startIcon?: React.ComponentType;
    endIcon?: React.ComponentType;
    ariaLabel?: string;
    className?: string;
};

type LinkButtonWithHref = LinkButtonBaseProps & {
    href: string;
    target?: string;
    prefetch?: boolean;

    renderLink?: never;
};

type LinkButtonWithRenderLink = LinkButtonBaseProps & {
    renderLink: React.ReactElement;

    href?: never;
    target?: never;
    prefetch?: never;
};

type LinkButtonProps = LinkButtonWithHref | LinkButtonWithRenderLink;

const LinkButton = (props: LinkButtonProps): React.ReactElement => {
    const {
        name,
        startIcon: StartIcon,
        endIcon: EndIcon,
        ariaLabel,
        className,
    } = props;

    const renderElement =
        props.renderLink !== undefined ? (
            props.renderLink
        ) : (
            <Link
                href={props.href}
                target={props.target}
                prefetch={props.prefetch}
            />
        );

    return (
        <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            // Overrides the role="button" that @base-ui/react/button sets on non-native elements
            role="link"
            aria-label={ariaLabel}
            render={renderElement}
            className={cn(
                "hover:no-underline focus-visible:outline-none text-muted-foreground hover:border-primary hover:text-primary [&_svg]:text-muted-foreground hover:[&_svg]:text-primary border-primary/40 dark:border-primary/35 motion-safe:[&_svg]:transition-colors",
                className,
            )}
        >
            {StartIcon && <StartIcon aria-hidden={true} />}
            {name}
            {EndIcon && <EndIcon aria-hidden={true} />}
        </Button>
    );
};

export default LinkButton;
export type { LinkButtonProps };
