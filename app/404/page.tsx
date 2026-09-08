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
import type { Metadata } from "next";
import type React from "react";

import NotFound from "./NotFound";

export const metadata: Metadata = {
    title: "Page Not Found",
    // See app/not-found.tsx for why this page must not inherit the root
    // layout's index/follow robots directive.
    robots: {
        index: false,
        follow: false,
    },
};

const NotFoundPage = (): React.ReactElement => <NotFound />;

export default NotFoundPage;
