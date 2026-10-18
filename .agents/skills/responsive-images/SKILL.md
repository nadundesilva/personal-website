---
name: responsive-images
description: "Use whenever adding or changing any image, picture, logo, icon file, Image or Logo usage, sizes string, or og/twitter/JSON-LD image, including when a new section or page merely needs a picture or logo, and when images load slowly or too large. Covers the rules for rendering images and logos in this repo: which Image component to use, the mandatory sizes prop and its helper functions, dark/light logo pairs, optimized images for SEO metadata, and the ContentContainer padding mirror in image-sizes.ts."
---

# Responsive Images

## Image Handling

Always import `Image` from `next-image-export-optimizer`, not from `next/image`. Source images live in `assets/` and are imported as static modules (e.g. `import img from "@/assets/foo.webp"`). Optimized WebP output is written to `out/optimized-images/` during `pnpm run build`.

**Metadata images use the optimized variant, never the original.** og:image, twitter:image, JSON-LD `image`, RSS enclosures and icons must go through `getOptimizedImage()` from `utils/common/image-metadata.ts` rather than `StaticImageData.src`. Originals under `_next/static/media` are otherwise fetched at full size and (for raster images) are excluded from the PWA precache in `next.config.mjs` (`buildExcludes`). `getOptimizedImage` mirrors the optimizer's `-opt-<width>.WEBP` naming, which the library doesn't expose — the `seo.cy.tsx` image-fetch tests catch drift.

### Two image components — which to use

There are two ways to render images; choose based on context:

| Situation                                                                                                                                                        | What to use                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Standard content images** — any image that fits naturally into the text flow (e.g. floated article images, article hero)                                       | `Image` from `components/content/Image.tsx` (custom wrapper) |
| **Custom UI images** — images that need precise layout control or special styling (e.g. logo grids, hero backgrounds, image galleries, certification thumbnails) | `Image` from `next-image-export-optimizer` directly          |

The custom wrapper adds `rounded-sm`, a box-shadow, and a subtle hover lift — suitable for standalone content images. It auto-computes `sizes` based on context (full-width or float layout), so you rarely need to pass `sizes` explicitly. It also accepts a `float?: "left" | "right"` prop that applies the full float layout (`float-left`/`float-right`, `my-5 h-auto`, full-width below `md` (`w-full`), then vw-based widths: `md:w-[calc(33.3333vw-21.3333px)] lg:w-[calc(25vw-40px)] xl:w-[calc(20vw-64px)] 2xl:w-[calc(20vw-128px)]`, plus `mr-5`/`ml-5` side margin). Sizes are auto-computed when `float` is used — do not pass `sizes`:

```tsx
<Image src={img} alt="…" float="right" />
```

The wrapper also passes through `fetchPriority`, `loading`, `fill`, `sizes` and `className` (the article hero uses `fetchPriority="high" loading="eager"`). With `fill` it forces `object-cover`. Use the direct import whenever the rounded/shadow defaults are unwanted, or when you need `preload`, other `object-*` behavior, or the dual dark/light image pattern.

### `sizes` attribute — mandatory on every fill image (direct usage)

When using `next-image-export-optimizer` directly, `sizes` is **not** auto-generated. Without it the browser falls back to `100vw` for srcset selection and downloads unnecessarily large images. **Every direct `<Image fill …>` must have a `sizes` prop.** (The content wrapper from `components/content/Image.tsx` auto-sets `sizes` — see above.)

Use the helpers from `utils/common/image-sizes.ts`:

```tsx
import {
    generateSizesForContentBreakpoints,
    generateSizesForColumnLayout,
} from "@/utils/common/image-sizes";

// Width narrows from full → 55% as viewport grows:
<Image
    src={…}
    alt=""
    fill
    sizes={generateSizesForContentBreakpoints({
        xl:      { viewportFraction: 0.55 }, // 55% × content width; auto-expands to 2xl with correct 640px padding
        lg:      { viewportFraction: 0.65 }, // 65% × content width (viewport − lg padding)
        sm:      { viewportFraction: 0.9  }, // 90% × content width (viewport − sm padding)
        default: { viewportFraction: 1    }, // full content width (viewport − default padding)
    })}
/>

// Fixed-pixel container (capped by max-w-*):
<Image src={…} alt="" fill sizes={generateSizesForContentBreakpoints({ lg: { absolute: "360px" } })} />

// Multi-column layout — specify only breakpoints where cols/gap/inset changes:
const IMAGE_SIZES = generateSizesForColumnLayout({
    lg: { cols: 3, gapPx: 16, columnInsetPx: 72 },
    md: { cols: 2, gapPx: 16, columnInsetPx: 72 },
    sm: { cols: 2, gapPx: 16, columnInsetPx: 56 },
    default: { cols: 1, columnInsetPx: 56 },
});
<Image src={logo.srcLight} alt="" fill sizes={IMAGE_SIZES} className="object-contain dark:hidden" />
<Image src={logo.srcDark}  alt="" fill sizes={IMAGE_SIZES} className="hidden object-contain dark:block" />
```

**`generateSizesForContentBreakpoints(sizesByBreakpoint)`** — accepts a map of `ContentBreakpoint` keys (`"2xl" | "xl" | "lg" | "md" | "sm" | "default"`) to a `ContentSizeEntry`:

- **`{ viewportFraction: number }`** — fraction (0–1) of the content width; auto-computes `calc(fraction×100vw − fraction×padding)` using the **resolved** breakpoint's own padding. A single `xl: { viewportFraction: 0.55 }` with no `"2xl"` entry correctly generates `calc(55vw − 352px)` for 2xl (using 2xl's 640px padding, not xl's 320px).
- **`{ absolute: string }`** — verbatim string (e.g. `"280px"`) for fixed-width containers.

Each entry covers that breakpoint and all higher ones for which no entry is specified (auto-expansion). Rules:

- **`"default"` (min-width 0)** is a first-class breakpoint that produces the unconditional fallback value (no `(min-width: …)` condition). When omitted, the built-in fallback `calc(100vw − 32px)` (the default breakpoint's padding) is used — equivalent to `default: { viewportFraction: 1 }`, so that entry is always redundant for `generateSizesForContentBreakpoints`.
- **Never auto-emits a `md` entry.** The ContentContainer padding increases only 16 px at the sm→md boundary (48 px → 64 px), too small to shift srcset candidate selection — the `sm` entry already covers the md viewport range. Include `md` explicitly only when the rendered width genuinely changes there.
- **`viewportFraction` entries auto-expand correctly** — the function uses the resolved breakpoint's own padding, so `xl: { viewportFraction: 0.2 }` with no `"2xl"` entry correctly generates `calc(20vw - 128px)` at 2xl (using 2xl's 640px padding). No explicit `2xl:` entry is needed.
- **`absolute` entries are verbatim** — `{ absolute: "280px" }` is used unchanged at every breakpoint it covers. Add an explicit entry only when the pixel value genuinely differs at that breakpoint.
- **Omit redundant higher-breakpoint entries.** If `lg: { absolute: "360px" }` already covers xl and 2xl with the same value, do not add `xl:` or `2xl:` entries — they produce identical output and are dead code.

**`generateSizesForColumnLayout(layoutByBreakpoint)`** — same auto-expansion and `"default"` semantics for multi-column layouts. Each entry is `{ cols, gapPx?, columnInsetPx? }`. `gapPx` (default `0`) is the CSS gap between columns; `columnInsetPx` (default `0`) is the total fixed px of padding/margin inside each column item (e.g. `mx-5 p-2` → 2×20 + 2×8 = 56 px). Only specify breakpoints where any of these values genuinely changes.

### Dark / light logos — use two `<Image>` elements

For logos and icons that have separate light and dark variants, render **two `<Image>` elements** with CSS visibility toggling:

```tsx
<Image src={logo.srcLight} alt="" fill sizes={IMAGE_SIZES} className="object-contain dark:hidden" />
<Image src={logo.srcDark}  alt="" fill sizes={IMAGE_SIZES} className="hidden object-contain dark:block" />
```

This works before JavaScript loads (no FOUC) because it is pure CSS. A single `src`-switching approach would require `"use client"` and would flash on hydration.

## `ContentContainer` padding must be mirrored in `image-sizes.ts`

`CONTENT_BREAKPOINTS` in `utils/common/image-sizes.ts` hardcodes the min-width and padding pixel values for each breakpoint. The padding values mirror the `px-*` Tailwind classes in `components/layout/ContentContainer.tsx`. Both `generateSizesForContentBreakpoints` and `generateSizesForColumnLayout` derive their `calc()` strings from these values. If `ContentContainer`'s padding classes change, update `CONTENT_BREAKPOINTS` in the same PR or all `sizes` strings will be wrong.

## `Logo` takes a `height` (em) and derives `sizes` from it

Logos are height-limited (`object-scale-down`), so their rendered width is `height × aspect ratio`, not the container width. `components/content/Logo.tsx` sets the box height from its `height` prop (em) and emits `sizes` as `height × width/height` in `em`. Do not size a logo through a `h-[…em]` class — the `sizes` would fall back to the container width and the browser would fetch a larger srcset candidate than needed. `em` in `sizes` resolves against the root font size (not the element's), which matches the page only while no ancestor overrides `font-size`.
