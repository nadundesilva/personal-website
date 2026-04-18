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

- Maintain correct heading hierarchy (`h1` → `h2` → `h3`) using the semantic content components — never skip levels.
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

| Layer          | Technology                                                                                                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | Next.js (App Router, `output: "export"`)                                                                                                                                                                                   |
| Language       | TypeScript (strict, ES2022)                                                                                                                                                                                                |
| UI             | Tailwind CSS v4 + shadcn/ui + `@base-ui/react`                                                                                                                                                                             |
| Icons          | lucide-react (general UI icons) + `@icons-pack/react-simple-icons` (brand/social icons)                                                                                                                                    |
| Dark Mode      | next-themes (`class` strategy)                                                                                                                                                                                             |
| Animation      | motion (Framer Motion v12) + tw-animate-css                                                                                                                                                                                |
| Blog           | MDX + rehype-pretty-code (Dracula / GitHub Light themes)                                                                                                                                                                   |
| Images         | next-image-export-optimizer (custom loader)                                                                                                                                                                                |
| PWA            | next-pwa                                                                                                                                                                                                                   |
| Error Tracking | Sentry (`@sentry/nextjs`)                                                                                                                                                                                                  |
| E2E Testing    | Cypress + @testing-library/cypress                                                                                                                                                                                         |
| Code Coverage  | NYC/Istanbul via @cypress/code-coverage                                                                                                                                                                                    |
| Linting        | ESLint (`next/core-web-vitals` + `next/typescript`) + Stylelint (`stylelint-config-standard` + `stylelint-config-tailwindcss`)                                                                                             |
| Formatting     | Prettier (`semi`, `trailingComma: all`, `tabWidth: 4`, `printWidth: 80`, `quoteProps: consistent`) + `prettier-plugin-organize-imports` (auto-sorts imports) + `prettier-plugin-tailwindcss` (auto-sorts Tailwind classes) |
| Git Hooks      | Husky + lint-staged                                                                                                                                                                                                        |

Full dependency list: [`package.json`](./package.json)
Full Next.js config: [`next.config.mjs`](./next.config.mjs)

---

## 4. Repository Structure

```
app/                               # Next.js App Router
  app.css                          # CSS entry point: Tailwind import, design tokens, base styles, custom variants
  themes.css                       # Light/dark theme color variables (imported by app.css)
  layout.tsx                       # Root layout: theme, Sentry, WebVitals, CSP headers, JSON-LD
  (home)/
    page.tsx                       # Home page
    page.css                       # Home-page-scoped styles
    _content/                      # Home-page components (sections, common, types)
  (content)/                       # Content section with shared breadcrumb layout
    layout.tsx
    blog-articles/
      page.tsx                     # Blog index
      feed.xml/route.ts            # RSS feed (force-static)
      (articles)/
        layout.css                 # Syntax highlight theme overrides (dark/light)
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
  instrumentation.ts               # Sentry server-side instrumentation
  instrumentation-client.ts        # Sentry client-side instrumentation
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
  primitives/                      # shadcn-style UI primitives (see §7 — Primitive Components)
  theme/                           # fonts.ts, index.tsx (re-exports fonts)
  WebVitals.tsx
constants/
  date.ts                          # FormattableDate domain model (Date, Now, DateRange)
  routes.ts                        # Route definitions (WebsiteHome, Route interface)
  metadata.ts                      # FULL_NAME, MAIN_DESCRIPTION, WEBSITE_PUBLIC_URL
  # ...plus: achievements, certificates, companies, competitions, education, experience,
  #           institutes, logos, people, profiles, projects, skill-categories, skills, testimonials
cypress/
  e2e/                             # E2E test specs (*.cy.tsx)
  support/commands.ts              # Custom commands
hooks/                             # Custom React hooks
utils/
  common/                          # Client-safe utilities: experience.ts, image-metadata.ts
  server/                          # Server-only utilities: blog-articles.ts (filesystem glob + path resolution)
.github/
  scripts/
    start-server.sh                # MUST be run with `source` (exports env vars)
    stop-server.sh                 # Can be run with `bash`
  workflows/
    deploy-site.yaml               # Main pipeline: lint → E2E → build → links → audit → deploy
    deployment-check.yaml          # Daily checks on live site
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
| `@/hooks/*`      | `hooks/*`      |
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
- PascalCase filenames for components. camelCase for utilities and hooks.

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

### Route Definitions

Defined in [`constants/routes.ts`](./constants/routes.ts). `WebsiteHome.subRoutes` is **always defined** (never `undefined`) — TypeScript infers this from the constant initializer even though `Route.subRoutes` is typed as optional. Do not add optional-chaining guards when accessing `WebsiteHome.subRoutes`.

Current routes: `/experience`, `/achievements`, `/projects`, `/projects/personal`, `/testimonials`, `/blog-articles`, `/education`, `/education/certifications`.

### Blog Articles

**Directory:** `app/(content)/blog-articles/(articles)/{category}/{article-name}/page.mdx`

**Every `page.mdx` must export:**

```jsx
export const metadata = {
    title: "Article Title",
    description: "Article description.",
};

export const blogMetadata = {
    image: importedImageStaticData,
    mediumUrl: "https://medium.com/...",
    publishedDate: new Date("YYYY-MM-DD"),
    keywords: ["keyword1", "keyword2"],
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

**Unsupported MDX syntax:** Raw markdown images (`![alt](src)`) and tables throw build errors — use the `<Image>` MDX component for images instead.

**Category listing pages** (`{category}/page.tsx`) are TypeScript files using `ArticlesList` — they are not MDX and do not follow the blog article structure above.

**MDX link behavior:** All MDX links open in a new tab (set in `mdx-components.tsx`). Do not add `target="_blank"` manually. Links are resolved relative to `${WEBSITE_PUBLIC_URL}/blog-articles/`.

**Blog discovery:** [`utils/server/blog-articles.ts`](./utils/server/blog-articles.ts) globs the filesystem to discover articles and compute reading time (using the `reading-time` package) for use in article list cards. The content layout uses this to build the breadcrumb tree. [`build/utils/rehype-reading-time.mjs`](./build/utils/rehype-reading-time.mjs) is a rehype plugin (wired into `next.config.mjs`) that also computes reading time at build time and injects a `data-reading-time-minutes` attribute into each article's HTML — this lets the client-side `ReadingProgress` component read a pre-computed value rather than deriving it from DOM text at runtime.

### Semantic HTML Components

Never use raw HTML elements for document structure. Use from [`components/content/`](./components/content/):

| Component                    | Renders as              | Use for                         |
| ---------------------------- | ----------------------- | ------------------------------- |
| `Title`                      | `h1`                    | Page title (one per page)       |
| `Section` + `SectionHeading` | section + `h2`          | Major content sections          |
| `SubsectionHeading`          | `h3`                    | Subsections within a section    |
| `Paragraph`                  | `p`                     | Body text                       |
| `List` + `ListItem`          | `ul`/`ol` + `li`        | Lists                           |
| `AccentedList`               | left-accented list      | Highlighted/feature lists       |
| `Link`                       | `a` (Next.js)           | All internal and external links |
| `LinkButton`                 | button-styled link      | CTA links                       |
| `Logo`                       | image with link         | Logos                           |
| `Image`                      | optimized image         | In-page images                  |
| `DateInfo`                   | date/date range display | Dates and date ranges           |

### Primitive Components

Small reusable building blocks in [`components/primitives/`](./components/primitives/). They render a specific visual segment — a gradient line, a bordered accent, a divider — but carry no semantic meaning on their own. Think of them like design tokens expressed as components: the same visual pattern used in multiple places.

**Available primitives** (all exported from [`components/primitives/index.tsx`](./components/primitives/)):

| Primitive                | What it renders                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `HorizontalGradientLine` | Short left-anchored gradient accent line (color → transparent) used under headings |
| `LeftAccent`             | Left border accent wrapping a content block                                        |
| `Separator`              | Full-width horizontal rule                                                         |
| `Card`                   | Bordered content card                                                              |
| `KeywordChip`            | Inline keyword/tag chip                                                            |
| `PrimaryTintedIcon`      | Icon tinted with the primary color                                                 |
| `CopyButton`             | Clipboard copy button (used in code blocks)                                        |
| `ProgressFab`            | Floating action button showing scroll progress                                     |
| `ScrollReveal`           | Wraps children in a motion-based scroll-reveal animation                           |
| `StaggerReveal`          | Wraps a list in staggered scroll-reveal animations                                 |
| `Breadcrumb` (+ parts)   | Accessible breadcrumb navigation components                                        |

> **shadcn components** (`Badge`, `Button`, `Tooltip`) also live in `components/primitives/` but are imported directly where needed (not re-exported from the index), following the shadcn convention.

> **shadcn component integrity rule:** Never partially remove sub-components from a shadcn component. If at least one sub-component is used anywhere in the project, the entire component (including all unused sub-components) stays. Only remove the whole component if none of its exports are used anywhere.

**When to add a new primitive:**

- A visual pattern (gradient, border accent, decorative line, etc.) is used in more than one place.
- The element has no semantic meaning by itself — it is purely visual.

Export all primitives from `components/primitives/index.tsx`.

### Component Selection Hierarchy

When adding new UI functionality, follow this priority order:

1. **shadcn component** — check `components/primitives/` first. If a suitable component does not exist there, check the shadcn registry (`npx shadcn add`) for one that can be scaffolded in.
2. **`@base-ui/react` primitive** — if no shadcn component fits semantically, use `@base-ui/react` directly. It is the unstyled primitive library that the shadcn components in this project are built on.
3. **Custom implementation** — only if neither option above applies. Before writing a custom component, ask the user for approval.

### Custom Link Component

[`components/content/Link.tsx`](./components/content/Link.tsx) is a `forwardRef` wrapper around `next/link` with Tailwind classes applied via `cn()`. It automatically:

- Adds `rel="noopener noreferrer"` for `target="_blank"` links.
- Appends an `aria-label` suffix `" (opens in a new tab)"` when `aria-label` is set and `target="_blank"`.
- Renders an `sr-only` "(opens in a new tab)" span when no `aria-label` is set.

For button-styled links, use [`LinkButton`](./components/content/LinkButton.tsx). Never nest `<Link>` inside another `<Link>` or inside a `<button>` — this produces invalid HTML.

**Always use the custom `Link` (or `LinkButton`) instead of importing `next/link` directly.** Even when passing a link as a `render` prop to a base-ui component (e.g. `BreadcrumbLink`), pass `<Link href={...} />` — not `<NextLink href={...} />`. The custom component adds the accessibility and rel-attribute behaviour described above.

### Image Handling

Always import `Image` from `next-image-export-optimizer`, not from `next/image`. Source images live in `assets/` and are imported as static modules (e.g. `import img from "@/assets/foo.webp"`). Optimized WebP output is written to `public/optimized-images/` during `npm run build`.

---

## 8. Theme and Styling

### Core Approach

Styling uses **Tailwind CSS v4** (CSS-first config) with **shadcn/ui** design tokens. No CSS-in-JS.

- Design tokens (fonts, colors, radii, easings, animations) are defined in the `@theme inline` block in [`app/app.css`](./app/app.css) using oklch values. The light/dark color values themselves live in [`app/themes.css`](./app/themes.css), imported by `app.css`.
- Dark mode is provided by `next-themes` using the `class` strategy — the `dark` class on `<html>` activates a `@custom-variant dark` defined in [`app/app.css`](./app/app.css). A second custom variant `short-h` (`@media (max-height: 500px)`) is also defined there for hero collapse on short viewports.
- Compose class strings with `cn()` from [`components/primitives/utils/cn.ts`](./components/primitives/utils/cn.ts) (clsx + tailwind-merge). Use `class-variance-authority` for multi-variant component APIs (shadcn pattern).

### Responsive Breakpoints

No custom breakpoints are defined — Tailwind v4 defaults apply: `sm` = 640px, `md` = 768px, `lg` = 1024px, `xl` = 1280px, `2xl` = 1536px.

**Use `lg:` as the threshold for major layout switches** (e.g. `flex-col` → `flex-row`, stacked → side-by-side). `md:` (768px) is standard iPad width — applying a desktop layout there gives tablet users the desktop experience, which is rarely the intent. This convention matches the nav component in [`components/layout/Layout.tsx`](./components/layout/Layout.tsx), which also switches to the desktop nav at `lg:`.

### Color Tokens

Never hardcode color values. Use semantic Tailwind utility classes tied to design tokens:

- `text-foreground`, `text-muted-foreground` — body text
- `bg-background`, `bg-card`, `bg-muted` — backgrounds
- `text-primary`, `bg-primary`, `text-primary-foreground` — primary accent

### Animation and Motion

[`app/layout.tsx`](./app/layout.tsx) wraps the app with `<LazyMotion><MotionConfig reducedMotion="user">` — the `motion` library (Framer Motion v12) automatically honours `prefers-reduced-motion`. `LazyMotion` with `domAnimation` keeps the animation bundle lean. Prefer `motion/react` primitives (`m.div`, `AnimatePresence`, etc.) for interactive transitions. For CSS-only animations, use `tw-animate-css` utilities.

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

[`app/app.css`](./app/app.css) is the global CSS entry point (imported once from [`app/layout.tsx`](./app/layout.tsx)) — Tailwind import, `tw-animate-css`, shadcn base layer, all design tokens, base styles, custom variants, and shared keyframes. It imports [`app/themes.css`](./app/themes.css) for the light/dark color variables. Do not add component styles to either file.

Co-located styles live alongside the file that owns them, named to match the importing file (e.g. `page.css` for `page.tsx`, `NotFound.css` for `NotFound.tsx`, `layout.css` for `layout.tsx`). Current files: [`app/(home)/page.css`](<./app/(home)/page.css>), [`app/404/NotFound.css`](./app/404/NotFound.css), and [`app/(content)/blog-articles/(articles)/layout.css`](<./app/(content)/blog-articles/(articles)/layout.css>) for blog code-block syntax highlighting overrides.

---

## 9. Testing

### E2E with Cypress

- Test files: [`cypress/e2e/`](./cypress/e2e/) (`.cy.tsx` extension)
- Custom commands: [`cypress/support/commands.ts`](./cypress/support/commands.ts)
- Configuration: [`cypress.config.ts`](./cypress.config.ts)

**Viewport:** `1280x768`. This is above the `lg` Tailwind breakpoint where the desktop nav renders — below it, the mobile drawer appears, breaking navigation tests. The exact breakpoint is in [`components/layout/Layout.tsx`](./components/layout/Layout.tsx) (currently `lg:` / 1024 px). Do not change the viewport without understanding this.

**Custom commands:**

| Command                          | Description                                     |
| -------------------------------- | ----------------------------------------------- |
| `cy.loadPage(url)`               | Visit URL, reset scroll, set light color scheme |
| `cy.clickNavLink(name)`          | Click nav link by accessible name               |
| `cy.clickBreadcrumbByName(name)` | Click breadcrumb by text                        |
| `cy.clickBreadcrumbByHref(href)` | Click breadcrumb by href                        |
| `cy.clickLinkByHref(href)`       | Click any link by href                          |

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

### Stages (in order)

1. **`run-project-linter`** — `npm run lint` (ESLint + Stylelint)
2. **`run-super-linter`** — GitHub Super Linter (markdown, YAML, shell, etc.)
3. **`run-vulnerability-analysis`** — Trivy scan → SARIF → GitHub Security tab
4. **`run-e2e-tests`** — 4-browser matrix (electron, chrome, firefox, edge) with NYC coverage instrumentation + CodeCov upload
5. **`build-site`** — Production build, uploads `out/` as artifact
6. **`check-links`** — Lychee link validation on built site
7. **`check-site-build`** — 4-browser matrix E2E on the exported artifact
8. **`run-website-audit`** — Lighthouse CI audit
9. **`deploy-site`** — Cloudflare Pages deploy (push to `main` only, requires all above)

### Server Scripts

- [`start-server.sh`](./.github/scripts/start-server.sh) generates a self-signed TLS cert, starts `npx serve` on port 443, installs the cert as trusted CA, and exports `NODE_EXTRA_CA_CERTS` and `SERVE_PID`.
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
