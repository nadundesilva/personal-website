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

// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: "https://639f507631857dffcfd70a636765a5c0@o4507214991917056.ingest.us.sentry.io/4507287404544000",
    debug: false,

    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.01,
});

if (process.env.NODE_ENV === "production") {
    // Loaded on demand instead of bundled into the initial chunk, since most page loads
    // never trigger a replay (1% session sample rate) or an error.
    // webpackExports limits the async chunk to replayIntegration; without it webpack
    // emits the whole @sentry/nextjs namespace as a second, largely unused chunk.
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/session-replay/
    import(
        /* webpackExports: ["replayIntegration"] */
        "@sentry/nextjs"
    ).then(({ replayIntegration }) => {
        Sentry.addIntegration(
            replayIntegration({
                maskAllText: true,
                blockAllMedia: true,
            }),
        );
    });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
