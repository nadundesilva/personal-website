---
name: blog-article
description: "Use whenever creating or editing any page.mdx, blog category page, or MDX component mapping, or when the request is about writing, publishing or fixing a blog post or article, even if it never mentions MDX. Covers how to write or edit blog articles in this repo: the MDX page structure and required exports, heading-level shifting, element mappings, unsupported MDX syntax, the .mdx copyright header wrapper, and how articles are discovered."
---

# Blog Articles

**Directory:** `app/(content)/blog-articles/(articles)/{category}/{article-name}/page.mdx`

**Every `page.mdx` has this shape** (after the `_copyright` wrapper described under "Copyright header in `.mdx` files" below, which must be first):

```jsx
import articleImage from "@/assets/blog-articles/article-image.webp";
import { buildArticleMetadata } from "@/utils/common/blog-article-metadata";

export const blogMetadata = {
    image: articleImage,
    mediumUrl: "https://medium.com/...",
    publishedDate: new Date("YYYY-MM-DD"),
    keywords: ["keyword1", "keyword2"],
};

export const metadata = {
    title: "Article Title",
    description: "Article description.",
    ...buildArticleMetadata(blogMetadata),
};

export default function Layout({ children }) {
    return (
        <BlogArticleLayout pageMetadata={metadata} blogMetadata={blogMetadata}>
            {children}
        </BlogArticleLayout>
    );
}
```

Spread `buildArticleMetadata` (`utils/common/blog-article-metadata.ts`) instead of writing `keywords`/`openGraph`/`twitter` by hand. It sets `openGraph.type: "article"` and uses the optimized image (see the `responsive-images` skill). The type has to live in each page's own `openGraph` because Next.js replaces, rather than deep-merges, `openGraph` per route segment, so a layout-level type would be dropped.

> **MDX TypeScript restriction:** MDX uses an acorn JavaScript-only parser. TypeScript syntax is **not** supported in `.mdx` files. Do not use `import type`, `: TypeName` annotations, or any other TypeScript-specific syntax inside `.mdx` files — they will cause a build failure: `Could not parse import/exports with acorn`.

**MDX heading levels are shifted** (mapping in `mdx-components.tsx`): `h1` (`#`) → `SectionHeading` (renders `h2`), `h2` (`##`) → `SubsectionHeading` (renders `h3`). The actual `h1` is always the `Title` component in the TypeScript wrapper — never write one in MDX. `h3`–`h6` (`###` through `######`) **throw a build error** — only two heading levels are available in articles.

**Other MDX element mappings** (all defined in `mdx-components.tsx`): `p` → `Paragraph`, `ul`/`ol` → `List`, `li` → `ListItem`, `a` → `Link` (always opens in a new tab, resolved relative to `${WEBSITE_PUBLIC_URL}/blog-articles/`), `code` → `InlineCodeSegment`, `pre` → `CodeBlock`, `hr` → `Separator`, `blockquote` → `LeftAccent` (italic).

**Unsupported MDX syntax:** Raw markdown images (`![alt](src)`) and tables throw build errors — use the `<Image>` MDX component for images instead.

**Category listing pages** (`{category}/page.tsx`) are TypeScript files using `ArticlesList` — they are not MDX and do not follow the blog article structure above.

**MDX link behavior:** Do not add `target="_blank"` manually to links in MDX — see "Other MDX element mappings" above.

**Blog discovery:** `utils/server/blog-articles.ts` globs the filesystem to discover articles and imports each `page.mdx` for its `metadata`, `blogMetadata` and `readingTimeMinutes`. `app/layout.tsx` (root layout) calls `getBlogArticleGroups(".")`, builds a route tree from the result, and passes it to `Layout` and `RouterBreadcrumbs` for the breadcrumb/nav tree.

**Reading time** is computed once, at MDX compile time, by the rehype plugin `build/utils/rehype-reading-time.mjs` (wired into `next.config.mjs`; the only user of the `reading-time` package). It exports `readingTimeMinutes` from every article, which the article list cards read, and injects a hidden `data-reading-time-minutes` element that the client-side `ReadingProgress` component reads. One computation over the compiled content keeps the list card and the progress widget in agreement; don't recompute it from the raw file, which would include the copyright header, imports and metadata objects.

## Copyright header in `.mdx` files

**`.mdx` files** — Prettier's MDX formatter treats `/* */` block comments as Markdown content and mangles them (escapes `/*`, converts `*` lines to list items). HTML comments (`<!-- -->`) are also rejected by the MDX parser. The only format that survives Prettier and is valid MDX is a JS export wrapper:

```mdx
export const _copyright =
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
    undefined;
```

This must appear as the very first thing in the file, before any `import` statements.
