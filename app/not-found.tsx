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
import type { Metadata } from "next";
import type React from "react";

import NotFound from "./404/NotFound";

export const metadata: Metadata = {
    title: "Page Not Found",
    // Without this override, the root layout's index/follow directive
    // (app/layout.tsx) would apply here too, contradicting the noindex
    // Next.js itself injects while statically rendering the reserved /404
    // route (see out/404.html; the mechanism is in
    // http-access-fallback/error-boundary.js, not this file).
    robots: {
        index: false,
        follow: false,
    },
};

const NotFoundPage = (): React.ReactElement => <NotFound />;

export default NotFoundPage;
