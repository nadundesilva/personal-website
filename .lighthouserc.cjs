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

const PATHS = [
    "/",
    "/experience",
    "/achievements",
    "/projects",
    "/projects/personal",
    "/testimonials",
    "/blog-articles",
    "/blog-articles/engineering/becoming-a-better-software-engineering-team-leader", // Sample article
    "/education",
    "/education/certifications",
];

// Rules that should only be enforced against the production server (Cloudflare CDN).
// They are skipped when auditing the local CI dev server (Caddy) because the local
// setup structurally can't satisfy them, or because Cloudflare injects extra items
// that Caddy doesn't (so the live count is higher than the CI count).
const LIVE_SITE_ASSERTIONS = {
    // Sentry + Cloudflare Analytics (reported as "Cloudflare" and "cloudflareinsights.com")
    "third-parties-insight": ["error", { maxLength: 3 }],

    // CI count + Cloudflare's beacon.min.js
    "legacy-javascript-insight": ["error", { maxLength: 3 }],

    // Only Cloudflare-owned scripts (beacon.min.js, email-decode.min.js) are flagged on the
    // live site; locally Caddy sends no Cache-Control on /optimized-images/*, so CI can't pin this
    "cache-insight": ["error", { maxLength: 3 }],

    // Passes on the live site; only the local CI server reports it as "Not actionable"
    "bf-cache": ["error"],
};

let TARGET_BASE_URL = process.env.TARGET_BASE_URL;
if (TARGET_BASE_URL === undefined) {
    TARGET_BASE_URL = "https://nadundesilva.com";
}

module.exports = {
    ci: {
        collect: {
            url: PATHS.map((path) => TARGET_BASE_URL + path),
            isSinglePageApplication: true,
            numberOfRuns: 5,
            settings: {
                chromeFlags: "--ignore-certificate-errors",
            },
        },
        upload: {
            target: "filesystem",
            outputDir: "./lhci-out",
        },
        assert: {
            preset: "lighthouse:recommended",
            assertions: {
                // Against the local CI server Lighthouse marks BFCache failures on some pages
                // (e.g. /blog-articles) "Not actionable / Internal error"; see LIVE_SITE_ASSERTIONS
                "bf-cache": ["warn"],

                // Pinned to the known third party (Sentry). The audit is informational (always
                // scores 1), so the entity count is the only thing that can catch a new one
                "third-parties-insight": ["error", { maxLength: 1 }],

                // SPA complexity — hard to eliminate without deep profiling
                "forced-reflow-insight": ["warn"],

                // Framework overhead: Next.js chunks, Sentry replay, motion/react. Pinned to the
                // current chunk count so a new bundle fails the audit; raise it deliberately
                "unused-javascript": ["error", { maxLength: 4 }],

                // Already using WebP via next-image-export-optimizer; minor AVIF savings
                "image-delivery-insight": ["warn"],

                // Sentry v10 SDK bundles internal polyfills for Array.prototype.at/flat/flatMap
                // regardless of browserslist target — not fixable without replacing Sentry.
                // Pinned to the current flagged chunk count so new legacy code fails the audit
                "legacy-javascript-insight": ["error", { maxLength: 2 }],

                // Next.js injects critical CSS inline; framework behavior, not fixable
                "network-dependency-tree-insight": ["warn"],

                // Next.js emits one stylesheet per layout chunk (5 on the home page, 4 elsewhere).
                // Pinned so an additional render-blocking stylesheet fails the audit
                "render-blocking-insight": ["error", { maxLength: 5 }],

                ...(process.env.VALIDATING_LIVE_SITE === "true"
                    ? LIVE_SITE_ASSERTIONS
                    : {}),
            },
        },
    },
};
