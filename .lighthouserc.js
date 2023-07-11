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

const PATHS = ["/", "/achievements", "/experience"];

let LIVE_SITE_ASSERTIONS = {};
if (process.env["VALIDATING_LIVE_SITE"] === "true") {
    LIVE_SITE_ASSERTIONS = {
        ...LIVE_SITE_ASSERTIONS,
        ...{
            "unsized-images": ["warn"],
            "uses-responsive-images": ["warn"],
            "errors-in-console": ["warn"],
        },
    };
}

module.exports = {
    ci: {
        collect: {
            url: PATHS.map((path) => "https://nadundesilva.github.io" + path),
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
                "errors-in-console": ["warn"],
                "inspector-issues": ["warn"],
                "canonical": ["warn"],
                "csp-xss": ["warn"],
                "non-composited-animations": ["warn"],
                "offscreen-images": ["warn"],
                "preload-lcp-image": ["warn"],
                "unused-javascript": ["warn"],
                ...LIVE_SITE_ASSERTIONS,
            },
        },
    },
};
