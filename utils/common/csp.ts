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
export const createCspValues = (): string[] => {
    const cspValues = {
        "default-src": ["'none'"],
        "manifest-src": ["'self'"],
        "img-src": ["'self'", "data:"],
        "style-src": ["'unsafe-inline'"],
        "style-src-elem": ["'self'", "'unsafe-inline'"],
        "font-src": ["'self'"],
        "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://static.cloudflareinsights.com",
        ],
        "worker-src": ["'self'", "blob:"],
        "child-src": ["'self'", "blob:"],
        "connect-src": [
            "'self'",
            "https://o4507214991917056.ingest.us.sentry.io",
        ],
    };

    if (
        process.env.NODE_ENV === "development" ||
        process.env.BUILD_TYPE === "test"
    ) {
        cspValues["script-src"].push("'unsafe-eval'");
    }

    const csps: string[] = [];
    for (const [cspKey, cspValue] of Object.entries(cspValues)) {
        csps.push(`${cspKey} ${cspValue.join(" ")}`);
    }
    return csps;
};
