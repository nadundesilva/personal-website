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

// Per-breakpoint min-width and total horizontal padding (both sides, px) that
// ContentContainer applies. Mirrors the px-* classes in
// components/layout/ContentContainer.tsx — update both together.
// CSS custom properties cannot be used in the image `sizes` HTML attribute
// (var() is not resolved outside CSS property contexts), so padding values
// must be literal numbers for constructing calc() strings.
// "default" (minWidth: 0) covers all widths below sm and sorts last so it is
// emitted as the final unconditional sizes clause.
const CONTENT_BREAKPOINTS = {
    "2xl": { minWidth: 1536, padding: 640 }, // px-80 → 2 × 320px
    "xl": { minWidth: 1280, padding: 320 }, // px-40 → 2 × 160px
    "lg": { minWidth: 1024, padding: 160 }, // px-20 → 2 × 80px
    "md": { minWidth: 768, padding: 64 }, // px-8  → 2 × 32px
    "sm": { minWidth: 640, padding: 48 }, // px-6  → 2 × 24px
    "default": { minWidth: 0, padding: 32 }, // px-4  → 2 × 16px
} as const;

type ContentBreakpoint = keyof typeof CONTENT_BREAKPOINTS;

// All content breakpoints sorted descending by min-width.
// "default" (min-width: 0px) sorts last, covering all widths below sm.
const ALL_CONTENT_BREAKPOINTS_DESC: ContentBreakpoint[] = (
    Object.keys(CONTENT_BREAKPOINTS) as ContentBreakpoint[]
).sort(
    (a, b) => CONTENT_BREAKPOINTS[b].minWidth - CONTENT_BREAKPOINTS[a].minWidth,
);

// Shared iteration logic for both public helpers. For each ContentBreakpoint
// (sorted largest → smallest):
//   1. Requires "default" to be present — throws if missing (public helpers inject it).
//   2. Skips `md` unless explicitly specified (sm covers md adequately — the
//      ContentContainer padding increases only 16 px at the sm→md boundary,
//      too small to shift srcset candidate selection).
//   3. Finds the owning specified breakpoint (the highest-priority specified
//      breakpoint whose min-width is ≤ the ContentBreakpoint's min-width) and
//      calls toSizesValue to produce the sizes clause for that ContentBreakpoint.
//   4. "default" (min-width: 0px) is treated as a regular breakpoint — it matches
//      all widths and naturally serves as the final fallback clause.
//   5. Adjacent duplicate values are removed: if a clause's value equals the next
//      lower breakpoint's value, the higher clause is redundant (the lower one
//      already covers those viewports) and is dropped.
//
// toSizesValue: maps (contentBreakpoint, entry) → a sizes clause string.
function buildSizes<T>(
    inputByBreakpoint: Partial<Record<ContentBreakpoint, T>>,
    toSizesValue: (contentBp: ContentBreakpoint, entry: T) => string,
): string {
    if (!("default" in inputByBreakpoint)) {
        throw new Error('buildSizes: "default" entry is required');
    }

    const specifiedBps = (
        Object.keys(inputByBreakpoint) as ContentBreakpoint[]
    ).sort(
        (a, b) =>
            CONTENT_BREAKPOINTS[b].minWidth - CONTENT_BREAKPOINTS[a].minWidth,
    );

    const rawClauses: { minWidth: number; value: string }[] = [];
    for (const contentBp of ALL_CONTENT_BREAKPOINTS_DESC) {
        if (contentBp === "md" && !(contentBp in inputByBreakpoint)) continue;

        // Highest specified breakpoint whose min-width ≤ this breakpoint's min-width
        const owner = specifiedBps.find(
            (sp) =>
                CONTENT_BREAKPOINTS[sp].minWidth <=
                CONTENT_BREAKPOINTS[contentBp].minWidth,
        );
        if (owner === undefined) continue;

        const entry = inputByBreakpoint[owner];
        if (entry === undefined) continue;

        rawClauses.push({
            minWidth: CONTENT_BREAKPOINTS[contentBp].minWidth,
            value: toSizesValue(contentBp, entry),
        });
    }

    // Drop a clause when the next lower breakpoint produces the same value —
    // the lower clause already covers all viewports this one would match.
    const clauses = rawClauses.filter(
        ({ value }, i) =>
            i === rawClauses.length - 1 || value !== rawClauses[i + 1].value,
    );

    return clauses
        .map(({ minWidth, value }) =>
            minWidth === 0 ? value : `(min-width: ${minWidth}px) ${value}`,
        )
        .join(", ");
}

// Exactly one of viewportFraction or absolute must be specified.
export type ContentSizeEntry =
    | { viewportFraction: number; absolute?: never }
    | { viewportFraction?: never; absolute: string };

// Generates a complete `sizes` attribute string organised around ContentContainer
// breakpoints. Each value is either:
//   - { viewportFraction: number } — fraction (0–1) of the content width; auto-computes
//     calc(fraction×100vw − fraction×padding) using the RESOLVED breakpoint's padding,
//     so { xl: { viewportFraction: 0.55 } } with no "2xl" entry correctly generates
//     calc(55vw − 352px) at 2xl (640px padding), not 176px.
//   - { absolute: string } — verbatim string (e.g. "280px") for fixed-width containers.
//
// Only specify breakpoints where the rendered image width genuinely changes.
// If "default" is omitted it defaults to { viewportFraction: 1 } (full content width).
export function generateSizesForContentBreakpoints(
    sizesByBreakpoint: Partial<Record<ContentBreakpoint, ContentSizeEntry>>,
): string {
    const input: Partial<Record<ContentBreakpoint, ContentSizeEntry>> =
        "default" in sizesByBreakpoint
            ? sizesByBreakpoint
            : { ...sizesByBreakpoint, default: { viewportFraction: 1 } };

    return buildSizes(input, (contentBp, entry) => {
        if (entry.viewportFraction !== undefined) {
            const fraction = entry.viewportFraction;
            const padding = CONTENT_BREAKPOINTS[contentBp].padding;
            return `calc(${fraction * 100}vw - ${fraction * padding}px)`;
        }
        return entry.absolute;
    });
}

export interface ColumnLayoutParams {
    cols: number;
    gapPx?: number;
    columnInsetPx?: number;
}

// Generates a complete `sizes` attribute string for an image in a multi-column
// flex/grid layout inside ContentContainer.
//
// Only specify breakpoints where the layout genuinely changes (column count, gap,
// or per-column inset). The helper auto-generates entries for all ContentContainer
// breakpoints above the highest specified breakpoint.
// If "default" is omitted it defaults to { cols: 1 } (single-column, full content width).
export function generateSizesForColumnLayout(
    layoutByBreakpoint: Partial<Record<ContentBreakpoint, ColumnLayoutParams>>,
): string {
    const input: Partial<Record<ContentBreakpoint, ColumnLayoutParams>> =
        "default" in layoutByBreakpoint
            ? layoutByBreakpoint
            : { ...layoutByBreakpoint, default: { cols: 1 } };

    return buildSizes(input, (bp, { cols, gapPx = 0, columnInsetPx = 0 }) => {
        // Total fixed px = container padding + inter-column gaps + per-column inset
        const totalFixedPx =
            CONTENT_BREAKPOINTS[bp].padding +
            (cols - 1) * gapPx +
            cols * columnInsetPx;
        return cols === 1
            ? `calc(100vw - ${totalFixedPx}px)`
            : `calc((100vw - ${totalFixedPx}px) / ${cols})`;
    });
}
