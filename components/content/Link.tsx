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
import { Link, LinkProps } from "@mui/material";
import NextLink from "next/link";
import React, { forwardRef, Ref } from "react";

type CustomLinkProps = {
    href: string | URL;
    children: React.ReactNode;
    target?: string;
};

const CustomLink = ({
    href,
    children,
    target,
}: CustomLinkProps): React.ReactElement => (
    <Link
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        component={forwardRef(function CustomLinkComponent(
            {
                children: customLinkCompChildren,
                ...customLinkCompProps
            }: LinkProps,
            ref: Ref<HTMLAnchorElement>,
        ) {
            return (
                <NextLink {...customLinkCompProps} href={href} ref={ref}>
                    {customLinkCompChildren}
                </NextLink>
            );
        })}
    >
        {children}
    </Link>
);

export default CustomLink;
