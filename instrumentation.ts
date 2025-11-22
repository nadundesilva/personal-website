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
 * © 2025 Nadun De Silva. All rights reserved.
 */
import * as Sentry from "@sentry/nextjs";

const defaultSentryInitConfig = {
    dsn: "https://639f507631857dffcfd70a636765a5c0@o4507214991917056.ingest.us.sentry.io/4507287404544000",
    tracesSampleRate: 1,
    debug: false,
};

export const onRequestError = Sentry.captureRequestError;

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        Sentry.init({
            ...defaultSentryInitConfig,
            enabled: process.env.NODE_ENV === "production",
            spotlight: process.env.NODE_ENV === "development",
        });
    }

    if (process.env.NEXT_RUNTIME === "edge") {
        Sentry.init({
            ...defaultSentryInitConfig,
            enabled: process.env.NODE_ENV === "production",
        });
    }
}
