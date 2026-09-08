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
"use client";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";

/**
 * The current route path as Next.js resolved it from the matched route tree,
 * rather than from the live browser URL.
 *
 * Under `output: "export"` the host serves the same prebuilt `404.html` for every
 * unmatched URL. `usePathname()` reads the live URL, so on a nested unknown route
 * (`/experience/does-not-exist`) it reports `/experience/...` on the client while
 * the static shell was built for a different path — a hydration mismatch for any
 * layout-level component that renders based on the path (nav highlighting,
 * breadcrumbs). `useSelectedLayoutSegments()` reflects the matched route tree,
 * which is baked into the flight payload identically on server and client, so it
 * stays hydration-stable.
 *
 * Returns `null` only when there is no App Router context (e.g. isolated Cypress
 * component mounts), matching `usePathname()`'s own behaviour in that case.
 */
export const useRoutePathname = (): string | null => {
    const segments = useSelectedLayoutSegments();
    const pathname = usePathname();

    if (segments === null) return pathname;

    const path = segments
        .filter(
            (segment) => !(segment.startsWith("(") && segment.endsWith(")")),
        )
        .join("/");

    return `/${path}`.replace(/\/{2,}/g, "/");
};
