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
import { describe, expect, it } from "@jest/globals";

import {
    generateSizesForColumnLayout,
    generateSizesForContentBreakpoints,
} from "@/utils/common/image-sizes";

describe("generateSizesForContentBreakpoints", () => {
    it("uses the full content width at every breakpoint when no default breakpoint is given", () => {
        // An empty input still auto-fills a { viewportFraction: 1 } default,
        // so every breakpoint's clause is calc(100vw - padding), each using
        // its own padding from CONTENT_BREAKPOINTS in the source file.
        expect(generateSizesForContentBreakpoints({})).toBe(
            "(min-width: 1536px) calc(100vw - 640px), " +
                "(min-width: 1280px) calc(100vw - 320px), " +
                "(min-width: 1024px) calc(100vw - 160px), " +
                "(min-width: 640px) calc(100vw - 48px), " +
                "calc(100vw - 32px)",
        );
    });

    it("subtracts the container padding of the viewport the clause applies to, not the one it was specified at", () => {
        const sizes = generateSizesForContentBreakpoints({
            xl: { viewportFraction: 0.55 },
        });

        // No "2xl" entry was specified, so "xl" also owns the "2xl" clause.
        // This asserts the padding subtracted is 2xl's own (352px =
        // 0.55 × 640px) — a bug reusing the specified breakpoint's padding
        // instead would produce 176px (0.55 × xl's 320px) here.
        expect(sizes).toMatch(
            /\(min-width: 1536px\) calc\(55(\.\d+)?vw - 352px\)/,
        );
    });

    it("omits a breakpoint whose computed width is identical to the next smaller one", () => {
        const sizes = generateSizesForContentBreakpoints({
            lg: { absolute: "400px" },
            default: { absolute: "400px" },
        });

        // A fixed-width image is the same size regardless of viewport, so
        // every per-breakpoint clause collapses into the single fallback.
        expect(sizes).toBe("400px");
    });
});

describe("generateSizesForColumnLayout", () => {
    it("leaves out md unless the layout actually changes there", () => {
        const withoutMd = generateSizesForColumnLayout({
            lg: { cols: 3 },
            default: { cols: 1 },
        });
        expect(withoutMd).not.toContain("768px");

        const withMd = generateSizesForColumnLayout({
            lg: { cols: 3 },
            md: { cols: 2 },
            default: { cols: 1 },
        });
        expect(withMd).toContain("768px");
    });

    it("divides the content width between columns, accounting for gaps and per-column insets", () => {
        const sizes = generateSizesForColumnLayout({
            lg: { cols: 3, gapPx: 16, columnInsetPx: 72 },
            default: { cols: 1 },
        });

        // Asserts the gaps and insets are folded into the subtracted width
        // alongside padding, not just padding alone: 408px = lg's 160px
        // padding + 32px gaps (2 × 16px) + 216px insets (3 × 72px).
        expect(sizes).toContain(
            "(min-width: 1024px) calc((100vw - 408px) / 3)",
        );
    });

    it("uses the whole content width for a single-column layout", () => {
        // Single column (cols: 1) has no gap/inset math to do, so this
        // reduces to the same calc(100vw - padding) per breakpoint as
        // generateSizesForContentBreakpoints's full-width case above.
        const sizes = generateSizesForColumnLayout({});

        expect(sizes).toBe(
            "(min-width: 1536px) calc(100vw - 640px), " +
                "(min-width: 1280px) calc(100vw - 320px), " +
                "(min-width: 1024px) calc(100vw - 160px), " +
                "(min-width: 640px) calc(100vw - 48px), " +
                "calc(100vw - 32px)",
        );
    });
});
