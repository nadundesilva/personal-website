/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const PATHS = ["/", "/achievements", "/experience"];

let LIVE_SITE_ASSERTIONS = {};
if (process.env["VALIDATING_LIVE_SITE"] === "true") {
    LIVE_SITE_ASSERTIONS = {
        ...LIVE_SITE_ASSERTIONS,
        ...{
            "unsized-images": ["warn"],
            "uses-responsive-images": ["warn"],
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
