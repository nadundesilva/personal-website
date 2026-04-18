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
"use client";

import NextLink from "next/link";
import type React from "react";
import { forwardRef } from "react";

import { cn } from "@/components/primitives/utils/cn";

type CustomLinkProps = React.ComponentPropsWithoutRef<typeof NextLink>;

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
    (
        { href, children, target, className, ...otherProps },
        ref,
    ): React.ReactElement => {
        let ariaLabel = otherProps["aria-label"];
        if (ariaLabel && target === "_blank") {
            ariaLabel = `${ariaLabel} (opens in a new tab)`;
        }

        return (
            <NextLink
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                ref={ref}
                className={cn(
                    "font-semibold text-link no-underline motion-safe:transition-opacity motion-safe:duration-250 hover:underline hover:decoration-2 hover:underline-offset-4 hover:opacity-85 focus-visible:outline-ring focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2",
                    className,
                )}
                {...otherProps}
                aria-label={ariaLabel}
            >
                {children}
                {target === "_blank" && !ariaLabel && (
                    <span className="sr-only"> (opens in a new tab)</span>
                )}
            </NextLink>
        );
    },
);

CustomLink.displayName = "CustomLink";

export default CustomLink;
