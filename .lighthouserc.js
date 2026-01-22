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
    "/education",
    "/education/certifications",
];

const LIVE_SITE_ASSERTIONS =
    process.env.VALIDATING_LIVE_SITE !== "true" ? {} : {};

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
                "unused-javascript": ["warn"],
                "uses-responsive-images": ["warn"],
                "uses-rel-preconnect": ["warn"],
                "total-byte-weight": ["warn"],
                "lcp-lazy-loaded": ["warn"],
                "heading-order": ["warn"],
                "image-delivery-insight": ["warn"],
                "legacy-javascript-insight": ["warn"],
                "modern-http-insight": ["warn"],
                "network-dependency-tree-insight": ["warn"],
                "lcp-discovery-insight": ["warn"],
                "color-contrast": ["warn"],
                "link-text": ["warn"],
                "deprecations": ["warn"],
                "canonical": ["warn"],
                "forced-reflow-insight": ["warn"],
                ...LIVE_SITE_ASSERTIONS,
            },
        },
    },
};
