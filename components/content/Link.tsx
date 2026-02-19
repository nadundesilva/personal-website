"use client";
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
import { Box, Link, type LinkProps } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import NextLink from "next/link";
import type React from "react";
import { forwardRef } from "react";

type CustomLinkProps = LinkProps & {
    href: string | URL;
    children: React.ReactNode;
};

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
    ({ href, children, target, ...otherProps }, ref): React.ReactElement => {
        let ariaLabel = otherProps["aria-label"];
        if (ariaLabel && target === "_blank") {
            ariaLabel = `${ariaLabel} (opens in a new tab)`;
        }

        return (
            <Link
                component={NextLink}
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                ref={ref}
                {...otherProps}
                aria-label={ariaLabel}
            >
                {children}
                {target === "_blank" && !ariaLabel && (
                    <Box component="span" sx={visuallyHidden}>
                        {" "}
                        (opens in a new tab)
                    </Box>
                )}
            </Link>
        );
    },
);

CustomLink.displayName = "CustomLink";

export default CustomLink;
