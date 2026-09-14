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

import { cn } from "@/shadcn/lib/cn";

type CustomLinkProps = React.ComponentPropsWithoutRef<typeof NextLink>;

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
    (
        {
            href,
            children,
            target,
            className,
            rel: callerRel,
            onClick: callerOnClick,
            ...restProps
        },
        ref,
    ): React.ReactElement => {
        const computedRel =
            target === "_blank"
                ? `noopener noreferrer${callerRel ? ` ${callerRel}` : ""}`
                : (callerRel ?? undefined);

        let ariaLabel = restProps["aria-label"];
        if (ariaLabel && target === "_blank") {
            ariaLabel = `${ariaLabel} (opens in a new tab)`;
        }

        const handleClick = (
            event: React.MouseEvent<HTMLAnchorElement>,
        ): void => {
            callerOnClick?.(event);
            if (event.defaultPrevented) return;

            // Next.js 16.3's app-router scroll handler (`appNewScrollHandler`,
            // enabled by default since 16.3.0) scrolls a same-page hash target
            // into view but no longer focuses it - a behaviour change made for
            // segment focus after a route change, not for hash targets. Restore
            // it here so skip links keep moving keyboard/screen-reader focus.
            // preventScroll: true avoids fighting the scroll Next.js already
            // started (see app/app.css `scroll-behavior: smooth`).
            if (typeof href === "string" && href.startsWith("#")) {
                document
                    .getElementById(href.slice(1))
                    ?.focus({ preventScroll: true });
            }
        };

        return (
            <NextLink
                href={href}
                target={target}
                rel={computedRel}
                ref={ref}
                className={cn(
                    "font-semibold text-link motion-safe:transition-opacity motion-safe:duration-250 hover:underline hover:decoration-2 hover:underline-offset-4 hover:opacity-85 focus-visible:outline-ring focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2",
                    className,
                )}
                {...restProps}
                onClick={handleClick}
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
