# Agent Knowledge Base

> Read this file in full before starting any task. It is the authoritative reference for all project conventions, patterns, and gotchas. Update it whenever you discover new knowledge during development. **Keep this file in context for the entire duration of every task** — do not let it scroll out of context mid-task. If context pressure forces a choice, preserve this file over other read content.

**Maintenance rules:**

- Reduce duplication: cross-reference sections instead of repeating information.
- Point to actual project files rather than duplicating their content here.
- When updating, consolidate similar information; do not add standalone "new discovery" sections.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design & Quality Principles](#2-design--quality-principles)
3. [Tech Stack](#3-tech-stack)
4. [Repository Structure](#4-repository-structure)
5. [Development Commands](#5-development-commands)
6. [Code Style and Conventions](#6-code-style-and-conventions)
7. [Architecture and Key Patterns](#7-architecture-and-key-patterns)
8. [Theme and Styling](#8-theme-and-styling)
9. [Testing](#9-testing)
10. [CI/CD Pipeline](#10-cicd-pipeline)
11. [Known Gotchas](#11-known-gotchas)

---

## 1. Project Overview

Portfolio and blog website for **Nadun De Silva** (`nadundesilva.com`). Deployed as a fully static export to **Cloudflare Pages** via GitHub Actions. There is no server-side rendering at runtime — every page is pre-rendered at build time.

---

## 2. Design & Quality Principles

These principles apply to every change — code, content, and configuration alike. Check against all of them before considering a task done.

### Modern Minimalistic Design

The site follows a **modern minimalistic aesthetic**: generous whitespace, restrained use of color, clean typography, and no decorative clutter. When making visual changes:

- Prefer simplicity — remove rather than add when in doubt.
- Use whitespace deliberately; avoid cramming content.
- Limit accent colors to those already defined as design tokens in [`app/app.css`](./app/app.css).
- Animations and transitions should be subtle and purposeful, never decorative.
- All new UI should feel consistent with the existing pages — inspect adjacent components before designing a new one.

### SEO

Every page must be discoverable and correctly described:

- Always provide a meaningful `metadata` export (`title`, `description`) on every `page.tsx` and `page.mdx`. See existing pages for the pattern.
- Titles follow the format: `"Page Name | Nadun De Silva"` — check existing pages for the exact separator and structure.
- Use semantic HTML (via the content components in `components/content/`) so crawlers can parse document structure.
- Images must have descriptive `alt` text (except decorative images which use `alt=""`).
- The `sitemap.ts`, `robots.ts`, and RSS `feed.xml` are auto-generated — do not break them by removing route exports or changing URL structures without updating those files.

### Accessibility

Accessibility is a hard requirement, not optional:

- Maintain correct heading hierarchy (`h1` → `h2` → `h3`) using the semantic content components — never skip levels. On the home page the `<h1>` is the person's name inside `WelcomeBanner`; section headings use `Heading` (which renders `<h2>`); experience job titles use `<p>` — they are items in the Experience timeline `<ol>`, not independent navigable sections.
- All interactive elements must be keyboard-reachable and have visible focus indicators.
- Interactive overlays (image cards, hover effects) must use `tabIndex={0}` and `:focus-within` so keyboard users can activate them.
- Color contrast must meet WCAG AA — always use theme color tokens, never hardcode colors.
- Decorative images use `alt=""`. Informational images use a concise, descriptive `alt`.
- Never nest interactive elements (no `<a>` inside `<a>`, no `<button>` inside `<a>`).
- Screen reader text: the custom `Link` component automatically appends "(opens in a new tab)" for `target="_blank"` links — do not duplicate this manually.

### Clean Code & Minimal Changes

- **Make only the changes required by the task.** Do not refactor, reformat, or "improve" surrounding code that is not related to the task.
- Do not add comments, docstrings, or type annotations to code you did not write or modify.
- Do not extract constants, helpers, or abstractions unless they are directly needed by the current task.
- If a change causes unrelated lint or type errors, fix only the minimum required to resolve them — do not take the opportunity to clean up the file.
- Prefer editing existing files over creating new ones.
- **After completing any task, always run `npm run lint` and `npm run format` to ensure the code is clean before finishing.** Fix any issues reported before considering the task done.

---

## 3. Tech Stack

| Layer          | Technology                                                                                                                                                                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | Next.js (App Router, `output: "export"`)                                                                                                                                                                                                                                                                    |
| Language       | TypeScript (strict, ES2022)                                                                                                                                                                                                                                                                                 |
| UI             | Tailwind CSS v4 + shadcn/ui + `@base-ui/react`                                                                                                                                                                                                                                                              |
| Icons          | lucide-react (general UI icons) + `@icons-pack/react-simple-icons` (brand/social icons)                                                                                                                                                                                                                     |
| Dark Mode      | next-themes (`class` strategy)                                                                                                                                                                                                                                                                              |
| Animation      | motion (v12) + tw-animate-css                                                                                                                                                                                                                                                                               |
| Blog           | MDX + rehype-pretty-code (Dracula / GitHub Light themes)                                                                                                                                                                                                                                                    |
| Images         | next-image-export-optimizer (custom loader)                                                                                                                                                                                                                                                                 |
| PWA            | next-pwa                                                                                                                                                                                                                                                                                                    |
| Error Tracking | Sentry (`@sentry/nextjs`)                                                                                                                                                                                                                                                                                   |
| E2E Testing    | Cypress + @testing-library/cypress                                                                                                                                                                                                                                                                          |
| Code Coverage  | NYC/Istanbul via @cypress/code-coverage                                                                                                                                                                                                                                                                     |
| Linting        | ESLint (`next/core-web-vitals` + `next/typescript` + `eslint-config-prettier`) + Stylelint (`stylelint-config-standard` + `stylelint-config-tailwindcss`)                                                                                                                                                   |
| Formatting     | Prettier (`semi`, `trailingComma: all`, `tabWidth: 4`, `printWidth: 80`, `quoteProps: consistent`) + `prettier-plugin-organize-imports` (auto-sorts imports) + `prettier-plugin-tailwindcss` (auto-sorts Tailwind classes in `className`, `cn()`, and `clsx()` calls — `tailwindFunctions: ["cn", "clsx"]`) |
| Git Hooks      | Husky + lint-staged                                                                                                                                                                                                                                                                                         |

Full dependency list: [`package.json`](./package.json)
Full Next.js config: [`next.config.mjs`](./next.config.mjs)

---

## 4. Repository Structure

```
app/                               # Next.js App Router
  app.css                          # CSS entry point: Tailwind import, design tokens, base styles, custom variants
  themes.css                       # Light/dark theme color variables (imported by app.css)
  layout.tsx                       # Root layout: theme, Sentry, WebVitals, CSP headers, JSON-LD, global context providers
  (home)/
    page.tsx                       # Home page
    page.css                       # Home-page-scoped styles
    _content/                      # Home-page components (sections, common)
  (content)/                       # Content section pages; layout adds shared ContentContainer padding
    layout.tsx
    blog-articles/
      page.tsx                     # Blog index
      layout.tsx                   # Shared SEO metadata for all blog article pages (authors, category, robots, openGraph, twitter, alternates)
      feed.xml/route.ts            # RSS feed (force-static)
      (articles)/
        layout.css                 # Syntax highlight theme overrides (dark/light)
        layout.tsx                 # Renders ReadingProgress and imports layout.css; wraps all article pages
        {category}/page.tsx        # Category listing page (TypeScript, uses ArticlesList)
        {category}/{article}/page.mdx  # Individual blog article (MDX)
    achievements/page.tsx
    education/
      page.tsx
      certifications/page.tsx
    experience/page.tsx
    projects/
      page.tsx
      personal/page.tsx
    testimonials/
      page.tsx
      Testimonial.tsx              # testimonial card component
  404/
    page.tsx
    NotFound.tsx                   # component rendered by page.tsx and not-found.tsx
    NotFound.css                   # styles for the NotFound component
  error.tsx
  global-error.tsx
  loading.tsx
  not-found.tsx                    # renders the NotFound component for unknown routes
  manifest.ts                      # PWA manifest (force-static)
  robots.ts                        # robots.txt (force-static)
  sitemap.ts                       # sitemap.xml (force-static)

assets/                            # Static image files (imported via @/assets/* alias)
build/
  utils/
    rehype-reading-time.mjs        # Rehype plugin: injects data-reading-time-minutes at MDX compile time
components/
  blog-articles/                   # ArticleLayout, ArticlesList, ArticlesListItem, ArticleImage,
                                   # CodeBlock, InlineCodeSegment, ReadingProgress
  content/                         # Semantic structure components (Title, Section, Link, etc.)
  icons/                           # Custom SVG icon components (e.g. LinkedInIcon)
  layout/                          # Navigation, breadcrumbs, scroll handling
  primitives/                      # Hand-written primitives (see §7)
  theme/                           # fonts.ts, index.tsx (re-exports fonts)
  WebVitals.tsx
shadcn/                            # CLI-managed only — never hand-edit (see §7)
  ui/                              # Badge, Breadcrumb, Button, Card, Drawer, Popover, Separator,
                                   # Spinner, Tooltip + index.tsx (barrel, hand-written)
  lib/
    cn.ts                          # cn() — clsx + tailwind-merge
    index.ts                       # barrel (hand-written)
  hooks/                           # shadcn-provided hooks land here if/when added (none yet)
constants/
  date.ts                          # FormattableDate domain model (Date, Now, DateRange)
  routes.ts                        # Route definitions (WebsiteHome, Route interface)
  metadata.ts                      # FULL_NAME, MAIN_DESCRIPTION, WEBSITE_PUBLIC_URL, CONTACT_EMAIL, TAGLINE, BLOG_CATEGORY
  # ...plus: achievements, certificates, companies, competitions, education, experience,
  #           institutes, logos, people, profiles, projects, skill-categories, skills, skill-usages, testimonials
cypress/
  e2e/                             # E2E test specs (*.cy.tsx)
  support/commands.ts              # Custom commands
utils/
  common/                          # Client-safe utilities: experience.ts, image-metadata.ts, image-sizes.ts
  server/                          # Server-only utilities: blog-articles.ts (filesystem glob + path resolution)
.github/
  scripts/
    start-server.sh                # MUST be run with `source` (exports env vars)
    stop-server.sh                 # Can be run with `bash`
  workflows/
    deploy-site.yaml               # Main pipeline: lint → E2E → build → links → audit → deploy
    deployment-check.yaml          # Daily checks on live site
instrumentation.ts                 # Sentry server-side instrumentation
instrumentation-client.ts          # Sentry client-side instrumentation
mdx-components.tsx                 # MDX component overrides (links, headings, images)
cypress.config.ts                  # Cypress configuration
next.config.mjs                    # Next.js configuration
tsconfig.json                      # TypeScript configuration
eslint.config.js                   # ESLint flat config
```

### Path Aliases (tsconfig.json)

| Alias            | Resolves to    |
| ---------------- | -------------- |
| `@/components/*` | `components/*` |
| `@/constants/*`  | `constants/*`  |
| `@/shadcn/*`     | `shadcn/*`     |
| `@/utils/*`      | `utils/*`      |
| `@/assets/*`     | `assets/*`     |

Always use these aliases in imports — never relative `../../` paths.

---

## 5. Development Commands

```bash
# Local development (hot reload, no static export)
npm run dev                  # http://localhost:3000 — NODE_ENV=development

# Production build (static export to out/) + image optimization
npm run build

# Build + serve the static output locally
npm run start

# Linting
npm run lint                 # ESLint + Stylelint
npm run lint:ts              # ESLint only
npm run lint:css             # Stylelint only

# Formatting
npm run format:check         # Dry-run Prettier check
npm run format               # Apply Prettier formatting

# E2E tests (requires running server)
npm run cypress:open         # Interactive Cypress UI
npm run cypress:run          # Headless Cypress run

# Bundle analysis
npm run build:analyze        # Sets ANALYZE=true, opens bundle report after build
```

**Before committing:** lint-staged runs automatically via Husky on staged files — ESLint fix + Stylelint fix + Prettier write. Do not skip hooks (`--no-verify`).

**Installing dependencies:** Use `npm ci` (not `npm install`) in CI and when reproducing CI behavior locally.

---

## 6. Code Style and Conventions

### File Header

Every source file (`.ts`, `.tsx`, `.css`, `.mdx`) must start with the copyright header. Use the year of original file creation. Do not update the year on edits.

**Exception:** files under `shadcn/ui/` and `shadcn/lib/` (excluding their hand-written `index.tsx`/`index.ts` barrels) are CLI output — do not add the copyright header to them, and do not rename them to PascalCase. Use whatever `npx shadcn add` generates, verbatim. See §7 for the full rule.

**`.ts`, `.tsx`, `.css` files** — standard block comment:

```ts
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
```

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

### TypeScript Conventions

- Strict mode is enforced (`strict: true`, `noImplicitAny`, `strictNullChecks`).
- Type-only imports use the `type` keyword: `import type React from "react"`.
- React return types: `React.ReactElement` for single-element returns, `React.ReactNode` for children props.
- Props interfaces use the `Props` suffix, defined directly above the component.
- Default exports for components. Named exports for utilities, hooks, and types.
- PascalCase filenames for components. camelCase for utilities and hooks. Exception: `shadcn/ui/*` and `shadcn/lib/*` keep the CLI's lowercase-kebab filenames (`badge.tsx`, `cn.ts`, etc.) — see §7.

### Import Ordering

Imports must follow this order with a blank line between each group:

1. External package imports (e.g. `motion/react`, `next`, `react`)
2. `@/` alias imports (e.g. `@/components/...`, `@/constants/...`)
3. Relative imports (e.g. `./Foo`, `../common/Bar`) — **always last**

### Component Structure Template

```tsx
// copyright header
"use client"; // only if needed

import type React from "react";
// external imports first, then @/ aliases, then relative imports

interface Props {
    // ...
}

const MyComponent = ({ ... }: Props): React.ReactElement => {
    return (...);
};

export default MyComponent;
```

---

## 7. Architecture and Key Patterns

### Static Site Generation

- `output: "export"` is set in `next.config.mjs` for all phases except `PHASE_DEVELOPMENT_SERVER`.
- No SSR or ISR at runtime. All data fetching happens at build time.
- Route handlers that generate static files (`sitemap.ts`, `robots.ts`, `manifest.ts`, `feed.xml/route.ts`) must include:
    ```ts
    export const dynamic = "force-static";
    ```
- The `out/` directory contains the fully built static site ready for deployment.

### Global Provider Configuration

All global context providers and wrappers live in [`app/layout.tsx`](./app/layout.tsx). This is the designated place for anything that needs to wrap the entire application — do not add new providers in page layouts, section components, or anywhere else in the tree.

Current global providers (in order of nesting):

- `ThemeProvider` (next-themes) — light/dark class strategy
- `React.StrictMode` — activates extra development-mode checks; no effect in production
- `LazyMotion features={domAnimation} strict` + `MotionConfig reducedMotion="user"` (motion/react) — lazy-loads animation features and opts all motion primitives into `prefers-reduced-motion` automatically; `strict` mode warns in development if full `motion.*` components are used instead of the lazy `m.*` variants
- `TooltipProvider` (@base-ui/react) — shared tooltip context

When adding a new library that requires a root provider, add it to `app/layout.tsx` inside the existing provider tree, at the appropriate nesting level.

### Route Definitions

Defined in [`constants/routes.ts`](./constants/routes.ts). `WebsiteHome.subRoutes` is **always defined** (never `undefined`) — TypeScript infers this from the constant initializer even though `Route.subRoutes` is typed as optional. Do not add optional-chaining guards when accessing `WebsiteHome.subRoutes`.

Current routes: `/experience`, `/achievements`, `/projects`, `/projects/personal`, `/testimonials`, `/blog-articles`, `/education`, `/education/certifications`. The file also exports `CvPdfPath = "/nadundesilva-cv.pdf"` — use this constant instead of hardcoding the CV PDF path.

### Blog Articles

**Directory:** `app/(content)/blog-articles/(articles)/{category}/{article-name}/page.mdx`

**Every `page.mdx` must export:**

```jsx
export const blogMetadata = {
    image: importedImageStaticData,
    mediumUrl: "https://medium.com/...",
    publishedDate: new Date("YYYY-MM-DD"),
    keywords: ["keyword1", "keyword2"],
};

export const metadata = {
    title: "Article Title",
    description: "Article description.",
    keywords: blogMetadata.keywords,
    openGraph: {
        images: [blogMetadata.image.src],
        publishedTime: blogMetadata.publishedDate.toISOString(),
        tags: blogMetadata.keywords,
    },
    twitter: {
        images: [blogMetadata.image.src],
    },
};

export default function Layout({ children }) {
    return (
        <BlogArticleLayout pageMetadata={metadata} blogMetadata={blogMetadata}>
            {children}
        </BlogArticleLayout>
    );
}
```

> **MDX TypeScript restriction:** MDX uses an acorn JavaScript-only parser. TypeScript syntax is **not** supported in `.mdx` files. Do not use `import type`, `: TypeName` annotations, or any other TypeScript-specific syntax inside `.mdx` files — they will cause a build failure: `Could not parse import/exports with acorn`.

**MDX heading levels are shifted** (mapping in [`mdx-components.tsx`](./mdx-components.tsx)): `h1` (`#`) → `SectionHeading` (renders `h2`), `h2` (`##`) → `SubsectionHeading` (renders `h3`). The actual `h1` is always the `Title` component in the TypeScript wrapper — never write one in MDX. `h3`–`h6` (`###` through `######`) **throw a build error** — only two heading levels are available in articles.

**Other MDX element mappings** (all defined in [`mdx-components.tsx`](./mdx-components.tsx)): `p` → `Paragraph`, `ul`/`ol` → `List`, `li` → `ListItem`, `a` → `Link` (always opens in a new tab, resolved relative to `${WEBSITE_PUBLIC_URL}/blog-articles/`), `code` → `InlineCodeSegment`, `pre` → `CodeBlock`, `hr` → `Separator`, `blockquote` → `LeftAccent` (italic).

**Unsupported MDX syntax:** Raw markdown images (`![alt](src)`) and tables throw build errors — use the `<Image>` MDX component for images instead.

**Category listing pages** (`{category}/page.tsx`) are TypeScript files using `ArticlesList` — they are not MDX and do not follow the blog article structure above.

**MDX link behavior:** Do not add `target="_blank"` manually to links in MDX — see "Other MDX element mappings" above.

**Blog discovery:** [`utils/server/blog-articles.ts`](./utils/server/blog-articles.ts) globs the filesystem to discover articles and compute reading time (using the `reading-time` package) for use in article list cards. `app/layout.tsx` (root layout) calls `getBlogArticleGroups(".")`, builds a route tree from the result, and passes it to `Layout` and `RouterBreadcrumbs` for the breadcrumb/nav tree. [`build/utils/rehype-reading-time.mjs`](./build/utils/rehype-reading-time.mjs) is a rehype plugin (wired into `next.config.mjs`) that also computes reading time at build time and injects a `data-reading-time-minutes` attribute into each article's HTML — this lets the client-side `ReadingProgress` component read a pre-computed value rather than deriving it from DOM text at runtime.

### Semantic HTML Components

Never use raw HTML elements for document structure. Use from [`components/content/`](./components/content/):

| Component                    | Renders as                            | Use for                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Title`                      | `h1`                                  | Page title (one per page)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `Section` + `SectionHeading` | section + `h2`                        | Major content sections — `Section` automatically wraps children in `ScrollReveal` and appends a `Separator`; do not add these manually. Pass a unique `id` to `SectionHeading` and the same value to `Section`'s `labelledById` prop so `aria-labelledby` links them. `SectionHeading` also accepts optional `date` (renders `DateInfo` below the heading), `logo` (right-aligned logo element), and `actionButton` (`LinkButtonProps` for a CTA button below the heading) props. |
| `SubsectionHeading`          | `h3`                                  | Subsections within a section; accepts an optional `id` prop for anchor linking.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Paragraph`                  | `p`                                   | Body text                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `List` + `ListItem`          | `ul`/`ol` + `li`                      | Lists                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `AccentedList`               | left-accented list                    | Highlighted/feature lists — requires `heading` and `headingVariant` props (unlike `List` where they are optional)                                                                                                                                                                                                                                                                                                                                                                 |
| `Link`                       | `a` (Next.js)                         | All internal and external links                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `LinkButton`                 | button-styled link                    | CTA links                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `Logo`                       | optimized image (light/dark variants) | Logos                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `Image`                      | optimized image                       | In-page images                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `DateInfo`                   | date/date range display               | Dates and date ranges                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### Primitive Components

Two separate homes, split by provenance:

- **`shadcn/`** — CLI-managed only (see the rule below). `shadcn/ui/` holds the 9 shadcn primitives, `shadcn/lib/` holds the `cn()` utility, `shadcn/hooks/` is where shadcn-provided hooks would land if any are ever added.
- **`components/primitives/`** — hand-written building blocks that render a specific visual segment (a gradient line, a bordered accent, a divider) but carry no semantic meaning on their own. Think of them like design tokens expressed as components.

> **shadcn components must not be hand-edited — only regenerated via the CLI.** If a shadcn primitive needs to change (new upstream version, a variant tweak, a prop addition), run `npx shadcn add <component> --overwrite` and `git mv` the freshly generated file(s) into `shadcn/ui/` (or `shadcn/lib/`), rather than editing the existing file by hand. This keeps them byte-for-byte reproducible from the registry — a hand-edit today becomes a silent, undiscoverable diff from upstream that the next regeneration either clobbers or conflicts with. If a shadcn primitive doesn't support something the app needs, either wrap it from `components/primitives/` (composition, not modification) or raise it with the user before hand-patching the CLI output. This means shadcn files also skip the usual file-header and PascalCase-filename rules — use the CLI's output as-is (lowercase-kebab filenames, no copyright header); see the **File Header** and **TypeScript Conventions** sections in §6. The hand-written `index.tsx`/`index.ts` barrels in `shadcn/ui/` and `shadcn/lib/` are the one exception within `shadcn/` — they're ours, not CLI output, so they keep the normal header and convention.

**shadcn primitives** (all exported from [`shadcn/ui/index.tsx`](./shadcn/ui/index.tsx)):

| Primitive              | What it renders                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `Badge`                | Inline status/category label                                                           |
| `Breadcrumb` (+ parts) | Accessible breadcrumb navigation components                                            |
| `Button`               | Styled action button (with size/variant CVA)                                           |
| `Card`                 | Bordered content card                                                                  |
| `Drawer` (+ parts)     | Accessible drawer / bottom-sheet overlay components (built on `@base-ui/react/drawer`) |
| `Popover` (+ parts)    | Accessible popover components                                                          |
| `Separator`            | Full-width horizontal rule                                                             |
| `Spinner`              | Animated loading indicator                                                             |
| `Tooltip` (+ parts)    | Accessible tooltip components                                                          |

**Hand-written primitives** (all exported from [`components/primitives/index.tsx`](./components/primitives/index.tsx)):

| Primitive                | What it renders                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `CopyButton`             | Clipboard copy button (used in code blocks)                                             |
| `HorizontalGradientLine` | Short left-anchored gradient accent line (color → transparent) used under headings      |
| `LeftAccent`             | Left border accent wrapping a content block                                             |
| `PrimaryTintedIcon`      | Icon tinted with the primary color                                                      |
| `ProgressFab`            | Circular progress ring FAB — used by `ReadingProgress` to show article reading progress |
| `ScrollReveal`           | Wraps children in a motion-based scroll-reveal animation                                |
| `StaggerReveal`          | Wraps a list in staggered scroll-reveal animations                                      |

> **shadcn component integrity rule:** Never partially remove sub-components from a shadcn component. If at least one sub-component is used anywhere in the project, the entire component (including all unused sub-components) stays. Only remove the whole component if none of its exports are used anywhere.

> **`CardTitle` and HTML heading levels are orthogonal concerns:** `CardTitle` is a UI slot — it marks the title area of a card regardless of what HTML element renders it. Whether that title should also be a document heading (`<h2>`, `<h3>`, etc.) is a separate decision driven by the page's heading hierarchy. In list items (e.g. project cards, certification cards inside `<li>`), the list provides the document structure so `CardTitle` as a `<div>` is correct — no heading element is needed. For standalone named sections that users should be able to navigate to by heading (e.g. an Experience role), place an `<h3>` directly inside `CardContent` instead of using `CardTitle`.

**When to add a new hand-written primitive:**

- A visual pattern (gradient, border accent, decorative line, etc.) is used in more than one place.
- The element has no semantic meaning by itself — it is purely visual.

Export shadcn primitives from `shadcn/ui/index.tsx` (or the utility from `shadcn/lib/index.ts`) when regenerating; export hand-written primitives from `components/primitives/index.tsx`.

### Component Selection Hierarchy

When adding new UI functionality, follow this priority order:

1. **shadcn component** — check `shadcn/ui/` first. If a suitable component does not exist there, check the shadcn registry (`npx shadcn add`) for one that can be scaffolded in (see the CLI-only rule in §7).
2. **`@base-ui/react` primitive** — if no shadcn component fits semantically, use `@base-ui/react` directly. It is the unstyled primitive library that most shadcn components in this project are built on (exception: `Card` uses plain React).
3. **Custom implementation** — only if neither option above applies. Before writing a custom component, ask the user for approval.

### Custom Link Component

[`components/content/Link.tsx`](./components/content/Link.tsx) is a `forwardRef` wrapper around `next/link` with Tailwind classes applied via `cn()`. It automatically:

- Adds `rel="noopener noreferrer"` for `target="_blank"` links.
- Appends an `aria-label` suffix `" (opens in a new tab)"` when `aria-label` is set and `target="_blank"`.
- Renders an `sr-only` "(opens in a new tab)" span when no `aria-label` is set.

For button-styled links, use [`LinkButton`](./components/content/LinkButton.tsx). Never nest `<Link>` inside another `<Link>` or inside a `<button>` — this produces invalid HTML.

**Always use the custom `Link` (or `LinkButton`) instead of importing `next/link` directly.** Even when passing a link as a `render` prop to a base-ui component (e.g. `BreadcrumbLink`), pass `<Link href={...} />` — not `<NextLink href={...} />`. The custom component adds the accessibility and rel-attribute behaviour described above.

### Image Handling

Always import `Image` from `next-image-export-optimizer`, not from `next/image`. Source images live in `assets/` and are imported as static modules (e.g. `import img from "@/assets/foo.webp"`). Optimized WebP output is written to `out/optimized-images/` during `npm run build`.

#### Two image components — which to use

There are two ways to render images; choose based on context:

| Situation                                                                                                                                                        | What to use                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Standard content images** — any image that fits naturally into the text flow (e.g. floated article images, article hero)                                       | `Image` from `components/content/Image.tsx` (custom wrapper) |
| **Custom UI images** — images that need precise layout control or special styling (e.g. logo grids, hero backgrounds, image galleries, certification thumbnails) | `Image` from `next-image-export-optimizer` directly          |

The custom wrapper adds `rounded-sm`, a box-shadow, and a subtle hover lift — suitable for standalone content images. It auto-computes `sizes` based on context (full-width or float layout), so you rarely need to pass `sizes` explicitly. It also accepts a `float?: "left" | "right"` prop that applies the full float layout (`float-left`/`float-right`, `my-5 h-auto`, full-width below `md` (`w-full`), then vw-based widths: `md:w-[calc(33.3333vw-21.3333px)] lg:w-[calc(25vw-40px)] xl:w-[calc(20vw-64px)] 2xl:w-[calc(20vw-128px)]`, plus `mr-5`/`ml-5` side margin). Sizes are auto-computed when `float` is used — do not pass `sizes`:

```tsx
<Image src={img} alt="…" float="right" />
```

Use the direct import whenever the rounded/shadow defaults are unwanted, or when you need `fetchPriority`, `preload`, custom `object-*` behavior, or the dual dark/light image pattern.

#### `sizes` attribute — mandatory on every fill image (direct usage)

When using `next-image-export-optimizer` directly, `sizes` is **not** auto-generated. Without it the browser falls back to `100vw` for srcset selection and downloads unnecessarily large images. **Every direct `<Image fill …>` must have a `sizes` prop.** (The content wrapper from `components/content/Image.tsx` auto-sets `sizes` — see above.)

Use the helpers from [`utils/common/image-sizes.ts`](./utils/common/image-sizes.ts):

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

- **`"default"` (min-width 0)** is a first-class breakpoint that produces the unconditional fallback value (no `(min-width: …)` condition). When omitted, the built-in fallback `calc(100vw − 16px)` is used — equivalent to `default: { viewportFraction: 1 }`, so that entry is always redundant for `generateSizesForContentBreakpoints`.
- **Never auto-emits a `md` entry.** The ContentContainer padding increases only 16 px at the sm→md boundary (48 px → 64 px), too small to shift srcset candidate selection — the `sm` entry already covers the md viewport range. Include `md` explicitly only when the rendered width genuinely changes there.
- **`viewportFraction` entries auto-expand correctly** — the function uses the resolved breakpoint's own padding, so `xl: { viewportFraction: 0.2 }` with no `"2xl"` entry correctly generates `calc(20vw - 128px)` at 2xl (using 2xl's 640px padding). No explicit `2xl:` entry is needed.
- **`absolute` entries are verbatim** — `{ absolute: "280px" }` is used unchanged at every breakpoint it covers. Add an explicit entry only when the pixel value genuinely differs at that breakpoint.
- **Omit redundant higher-breakpoint entries.** If `lg: { absolute: "360px" }` already covers xl and 2xl with the same value, do not add `xl:` or `2xl:` entries — they produce identical output and are dead code.

**`generateSizesForColumnLayout(layoutByBreakpoint)`** — same auto-expansion and `"default"` semantics for multi-column layouts. Each entry is `{ cols, gapPx?, columnInsetPx? }`. `gapPx` (default `0`) is the CSS gap between columns; `columnInsetPx` (default `0`) is the total fixed px of padding/margin inside each column item (e.g. `mx-5 p-2` → 2×20 + 2×8 = 56 px). Only specify breakpoints where any of these values genuinely changes.

#### Dark / light logos — use two `<Image>` elements

For logos and icons that have separate light and dark variants, render **two `<Image>` elements** with CSS visibility toggling:

```tsx
<Image src={logo.srcLight} alt="" fill sizes={IMAGE_SIZES} className="object-contain dark:hidden" />
<Image src={logo.srcDark}  alt="" fill sizes={IMAGE_SIZES} className="hidden object-contain dark:block" />
```

This works before JavaScript loads (no FOUC) because it is pure CSS. A single `src`-switching approach would require `"use client"` and would flash on hydration.

---

## 8. Theme and Styling

### Core Approach

Styling uses **Tailwind CSS v4** (CSS-first config) with **shadcn/ui** design tokens. No CSS-in-JS.

- Design tokens (fonts, colors, radii, easings, animations) are defined in the `@theme inline` block in [`app/app.css`](./app/app.css) using CSS variable references (e.g. `var(--background)`). The underlying color values use oklch and live in [`app/themes.css`](./app/themes.css), imported by `app.css`.
- Dark mode is provided by `next-themes` using the `class` strategy — the `dark` class on `<html>` activates a `@custom-variant dark` defined in [`app/app.css`](./app/app.css). A second custom variant `short-h` (`@media (max-height: 500px)`) is also defined there for hero collapse on short viewports.
- Compose class strings with `cn()` from [`shadcn/lib/cn.ts`](./shadcn/lib/cn.ts) (clsx + tailwind-merge).
- Use `class-variance-authority` (`cva` + `VariantProps`) whenever a component accepts props that map to different class sets (e.g. `size`, `variant`, `intent`). This is the shadcn pattern — see `shadcn/ui/button.tsx` and `shadcn/ui/badge.tsx` for examples. Expose the resolved variant type via `VariantProps<typeof myVariants>` in the props interface so callers get autocomplete and type safety. For a single varying dimension (e.g. only `size`), a single `cva` call is sufficient — no need for a separate helper function.

### Preflight

`@import "tailwindcss"` in `app/app.css` includes Tailwind preflight. Do not add utility classes that duplicate what preflight already applies globally — e.g. `m-0`/`p-0` on any element, `list-none` on `ol`/`ul`, `block`/`max-w-full`/`h-auto` on `img`/`video`, `font-normal` on headings (they inherit weight), or `no-underline` on anchors (they inherit text-decoration). Adding these is harmless but noise — omit them unless you are explicitly overriding a component that re-introduces the property.

One consequence worth knowing: VoiceOver in Safari strips list semantics from any `ol`/`ul` that has `list-style: none` — which is every list, since preflight applies it globally. Always add `role="list"` on `ol`/`ul` elements to restore those semantics.

### Responsive Breakpoints

No custom breakpoints are defined — Tailwind v4 defaults apply: `sm` = 640px, `md` = 768px, `lg` = 1024px, `xl` = 1280px, `2xl` = 1536px.

**Use `lg:` as the threshold for major layout switches** (e.g. `flex-col` → `flex-row`, stacked → side-by-side). `md:` (768px) is standard iPad width — applying a desktop layout there gives tablet users the desktop experience, which is rarely the intent. This convention matches the nav component in [`components/layout/Layout.tsx`](./components/layout/Layout.tsx), which also switches to the desktop nav at `lg:`.

### Color Tokens

Never hardcode color values. Use semantic Tailwind utility classes tied to design tokens:

- `text-foreground`, `text-muted-foreground` — body text
- `bg-background`, `bg-card`, `bg-muted` — backgrounds
- `text-primary`, `bg-primary`, `text-primary-foreground` — primary accent
- `text-link` — link text color (theme-aware; used by the `Link` component)

### Animation and Motion

[`app/layout.tsx`](./app/layout.tsx) wraps the app with `<LazyMotion><MotionConfig reducedMotion="user">` — the `motion` library automatically honours `prefers-reduced-motion`. `LazyMotion` with `domAnimation` keeps the animation bundle lean. Prefer `motion/react` primitives (`m.div`, `AnimatePresence`, etc.) for interactive transitions. For CSS-only animations, use `tw-animate-css` utilities.

**Library preference for animations:** For any animation that cannot be done through pure CSS (`motion-safe:` Tailwind utilities), use `motion/react` — its declarative `m.*` components or the standalone `animate()` function. Do **not** use `window.matchMedia` for reduced-motion detection or raw `requestAnimationFrame` loops. The root `MotionConfig reducedMotion="user"` handles reduced motion correctly for declarative `m.*` components; prefer those for stagger and scroll-triggered animations. Note: `useAnimate`'s imperative animate relies on `useReducedMotion()` internally which has an SSR/hydration bug in Next.js (always returns `null` at render time), so declarative `m.*` components are the reliable choice for correct reduced-motion support.

### Reduced-Motion Guard

**Rule: always use the positive guard.** Put motion CSS inside `motion-safe:` Tailwind variants so reduced-motion users never receive it. Never add transitions unconditionally and then cancel them with `motion-reduce:`.

**Preference order** (highest to lowest):

1. **Tailwind `motion-safe:`** — preferred because the component stays a Server Component. No `"use client"` required.
2. **`useReducedMotion()` from `motion/react`** — for `"use client"` components that need imperative control (e.g. scroll behavior, JS-driven animation logic).

```tsx
// BEST — pure Tailwind, server-component safe
className =
    "motion-safe:transition-transform motion-safe:duration-200 hover:-translate-y-0.5";

// OK — client component with imperative JS behavior
const reducedMotion = useReducedMotion(); // from motion/react
element.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });

// WRONG — unconditional transition cancelled with motion-reduce:
className = "transition-transform duration-200 motion-reduce:transition-none";
```

### Avoid `!important`

Do not use `!important` in Tailwind class strings or `@layer` blocks. Exhaust specificity options first.

### Global CSS

[`app/app.css`](./app/app.css) is the global CSS entry point (imported once from [`app/layout.tsx`](./app/layout.tsx)) — Tailwind import, `tw-animate-css`, `shadcn/tailwind.css` (shadcn base layer), all design tokens, base styles, custom variants, and shared keyframes. It imports [`app/themes.css`](./app/themes.css) for the light/dark color variables. Do not add component styles to either file.

Co-located styles live alongside the file that owns them, named to match the importing file (e.g. `page.css` for `page.tsx`, `NotFound.css` for `NotFound.tsx`, `layout.css` for `layout.tsx`), and are imported via JavaScript (`import "./page.css"`) from the owning component.

### Page-scoped Animation Tokens

For animations that are specific to one page or component (not shared design tokens), use this pattern:

1. **Define a CSS custom property** in the `:root` block of the co-located CSS file, directly above the corresponding `@keyframes`:

```css
/* page.css */
:root {
    --animate-home-timeline-dot-pulse: home-timeline-dot-pulse 2.5s ease-out infinite backwards;
}

@keyframes home-timeline-dot-pulse { … }
```

2. **Reference it in JSX** using Tailwind v4's CSS variable shorthand:

```tsx
className = "motion-safe:animate-(--animate-home-timeline-dot-pulse)";
```

This keeps the animation timing values co-located with their keyframes, the CSS variable is inspectable in DevTools, and Tailwind's `motion-safe:` variant applies correctly.

---

## 9. Testing

### E2E with Cypress

- Test files: [`cypress/e2e/`](./cypress/e2e/) (`.cy.tsx` extension)
- Custom commands: [`cypress/support/commands.ts`](./cypress/support/commands.ts)
- Configuration: [`cypress.config.ts`](./cypress.config.ts)

**Viewport:** `1280x768`. This is above the `lg` Tailwind breakpoint where the desktop nav renders — below it, the mobile drawer appears, breaking navigation tests. The exact breakpoint is in [`components/layout/Layout.tsx`](./components/layout/Layout.tsx) (currently `lg:` / 1024 px). Do not change the viewport without understanding this.

**Custom commands:**

| Command                          | Description                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `cy.loadPage(url)`               | Visit URL, reset scroll, set light color scheme, and wait for route loading spinners to clear |
| `cy.clickNavLink(name)`          | Click nav link by accessible name                                                             |
| `cy.clickBreadcrumbByName(name)` | Click breadcrumb by text                                                                      |
| `cy.clickBreadcrumbByHref(href)` | Click breadcrumb by href                                                                      |
| `cy.clickLinkByHref(href)`       | Click any link by href                                                                        |

**Query preference:** Use Testing Library queries (`findByRole`, `findByTestId`). Prefer `findByRole` with `name` matchers over `data-testid`.

**Cypress tasks** (registered in `cypress.config.ts`):

- `discoverBlogArticles(subPath)` — returns array of blog article URLs under a sub-path.
- `discoverBlogArticleSubGroups(subPath)` — returns array of article group URLs under a sub-path.

Use these tasks in tests that need to enumerate blog articles dynamically.

### Running Tests Locally

**Critical:** `start-server.sh` must be run with `source`, not `bash` — see [§10 — Server Scripts](#server-scripts) for details.

```bash
# Requires a server to be running first
npm run cypress:open    # Interactive test runner UI
npm run cypress:run     # Headless run
```

For the full CI-equivalent flow with coverage instrumentation:

```bash
BUILD_TYPE=test npx nyc instrument --in-place --compact=false .
npm run build
source .github/scripts/start-server.sh
npm run cypress:run
bash .github/scripts/stop-server.sh
```

---

## 10. CI/CD Pipeline

Pipeline: [`.github/workflows/deploy-site.yaml`](./.github/workflows/deploy-site.yaml)

### Stages

Jobs 1–4 run in parallel on every push/PR. Job 5 runs independently. Jobs 6–8 all depend on job 5 and run in parallel with each other. Job 9 depends on all of the above.

1. **`run-project-linter`** — `npm run lint` (ESLint + Stylelint)
2. **`run-super-linter`** — GitHub Super Linter (markdown, YAML, shell, etc.)
3. **`run-vulnerability-analysis`** — Trivy scan → SARIF → GitHub Security tab
4. **`run-e2e-tests`** — 4-browser matrix (electron, chrome, firefox, edge) with NYC coverage instrumentation + CodeCov upload
5. **`build-site`** — Production build, uploads `out/` as artifact
6. **`check-links`** — Lychee link validation on built site (two passes: general links and bot-protected sites)
7. **`check-site-build`** — 4-browser matrix E2E on the exported artifact
8. **`run-website-audit`** — Lighthouse CI audit
9. **`deploy-site`** — Cloudflare Pages deploy (push to `main` only, requires all above)

### Server Scripts

- [`start-server.sh`](./.github/scripts/start-server.sh) generates a self-signed TLS cert, starts `npx serve` on port 8080 (with an iptables NAT rule redirecting port 443 → 8080), adds `nadundesilva.com` to `/etc/hosts`, installs the cert as trusted CA, and exports `NODE_EXTRA_CA_CERTS` and `SERVE_PID`.
- [`stop-server.sh`](./.github/scripts/stop-server.sh) kills the server using `SERVE_PID`.

**Critical:** `start-server.sh` must use `source` (not `bash`) — the exported env vars must survive into the calling shell session.

```yaml
# CORRECT
- run: source ./.github/scripts/start-server.sh

# WRONG — env vars are lost, Cypress will fail to connect
- run: bash ./.github/scripts/start-server.sh
```

---

## 11. Known Gotchas

### CSP `unsafe-eval` is only added in development and test

[`app/layout.tsx`](./app/layout.tsx) adds `'unsafe-eval'` to `script-src` only when `NODE_ENV === "development"` or `BUILD_TYPE === "test"`. Do not rely on `eval` in production code.

### Production HTTP security headers live in `public/_headers`

HTTP security headers (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`) are served via [`public/_headers`](./public/_headers) — Cloudflare Pages reads this file automatically. The CSP is set separately via `<meta httpEquiv="Content-Security-Policy">` in [`app/layout.tsx`](./app/layout.tsx) so it can include the conditional `'unsafe-eval'` for dev/test builds.

Note: The CI LHCI server (Caddy Docker via [`start-server.sh`](./.github/scripts/start-server.sh)) parses `${WEBSITE_BUILD_DIR}/_headers` and translates each header under the `/*` pattern into a Caddy `header` directive, so security headers are present during CI LHCI audits.

### `ContentContainer` padding must be mirrored in `image-sizes.ts`

`CONTENT_BREAKPOINTS` in [`utils/common/image-sizes.ts`](./utils/common/image-sizes.ts) hardcodes the min-width and padding pixel values for each breakpoint. The padding values mirror the `px-*` Tailwind classes in [`components/layout/ContentContainer.tsx`](./components/layout/ContentContainer.tsx). Both `generateSizesForContentBreakpoints` and `generateSizesForColumnLayout` derive their `calc()` strings from these values. If `ContentContainer`'s padding classes change, update `CONTENT_BREAKPOINTS` in the same PR or all `sizes` strings will be wrong.
