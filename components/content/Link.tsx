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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { Link } from "@mui/material";
import NextLink from "next/link";
import React from "react";

type WebsiteRoute = __next_route_internal_types__.RouteImpl<string>;

interface InternalLink {
    href: WebsiteRoute;
}

interface ExternalLink {
    href: string;
    baseUrl?: string;
}

type CustomLinkProps = (InternalLink | ExternalLink) & {
    children: React.ReactNode;
    target?: string;
    internal?: boolean;
};

const CustomLink = ({
    children,
    target,
    internal,
    ...props
}: CustomLinkProps): React.ReactElement => {
    let url;
    if (internal) {
        const { href } = props as InternalLink;
        url = href;
    } else {
        const { href, baseUrl } = props as ExternalLink;
        url = new URL(href, baseUrl);
    }

    return (
        <NextLink href={url} passHref legacyBehavior>
            <Link target={target}>{children}</Link>
        </NextLink>
    );
};

export default CustomLink;
