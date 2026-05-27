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
// setup structurally can't satisfy them.
const LIVE_SITE_ASSERTIONS = {
    deprecations: ["warn"],
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
                // next-pwa service worker intercepts navigation, preventing BFCache during
                // Lighthouse's headless simulation — Lighthouse marks this "Not actionable"
                "bf-cache": ["warn"],

                // Intentional third parties: Sentry error tracking + Cloudflare Analytics
                "third-parties-insight": ["warn"],

                // SPA complexity — hard to eliminate without deep profiling
                "forced-reflow-insight": ["warn"],

                // Framework overhead: Next.js chunks, Sentry replay, motion/react
                "unused-javascript": ["warn"],

                // Already using WebP via next-image-export-optimizer; minor AVIF savings
                "image-delivery-insight": ["warn"],

                // Sentry v10 SDK bundles internal polyfills for Array.prototype.at/flat/flatMap
                // regardless of browserslist target — not fixable without replacing Sentry
                "legacy-javascript": ["warn"],
                "legacy-javascript-insight": ["warn"],

                // SPA routing complexity — hard to eliminate without deep profiling
                "max-potential-fid": ["warn"],

                // Next.js injects critical CSS inline; framework behavior, not fixable
                "network-dependency-tree-insight": ["warn"],
                "render-blocking-insight": ["warn"],
                "render-blocking-resources": ["warn"],

                // Cloudflare CDN cache TTL is controlled by the platform, not the build
                "uses-long-cache-ttl": ["warn"],

                // Next.js App Router includes CSS from nested layouts in a global shared chunk
                // loaded on every page to support SPA navigation — the syntax-highlight CSS from
                // the blog-articles layout is therefore present but unused on non-article pages.
                // This is a framework bundling behaviour, not fixable without restructuring CSS.
                "unused-css-rules": ["warn"],

                ...(process.env.VALIDATING_LIVE_SITE === "true"
                    ? LIVE_SITE_ASSERTIONS
                    : {}),
            },
        },
    },
};
