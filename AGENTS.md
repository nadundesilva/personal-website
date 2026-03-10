# Agent Knowledge Base

> Read this file in full before starting any task. It is the authoritative reference for all project conventions, patterns, and gotchas. Update it whenever you discover new knowledge during development.

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
- Limit accent colors to those already defined in the MUI theme palette.
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

| Layer          | Technology                                                               |
| -------------- | ------------------------------------------------------------------------ |
| Framework      | Next.js (App Router, `output: "export"`)                                 |
| Language       | TypeScript (strict, ES2022)                                              |
| UI             | MUI + Emotion (CSS-in-JS)                                                |
| Blog           | MDX + rehype-pretty-code (Dracula theme)                                 |
| Images         | next-image-export-optimizer (custom loader)                              |
| PWA            | next-pwa                                                                 |
| Error Tracking | Sentry (`@sentry/nextjs`)                                                |
| E2E Testing    | Cypress + @testing-library/cypress                                       |
| Code Coverage  | NYC/Istanbul via @cypress/code-coverage                                  |
| Linting        | ESLint (`next/core-web-vitals` + prettier)                               |
| CSS Linting    | Stylelint (`stylelint-config-standard`)                                  |
| Formatting     | Prettier (`semi`, `trailingComma: all`, `tabWidth: 4`, `printWidth: 80`) |
| Git Hooks      | Husky + lint-staged                                                      |

Full dependency list: [`package.json`](./package.json)
Full Next.js config: [`next.config.mjs`](./next.config.mjs)

---

## 4. Repository Structure

```
app/                               # Next.js App Router
  layout.tsx                       # Root layout: theme, Sentry, WebVitals, CSP headers, JSON-LD
  (home)/page.tsx                  # Home page
  (content)/                       # Content section with shared breadcrumb layout
    layout.tsx
    blog-articles/
      page.tsx                     # Blog index
      feed.xml/route.ts            # RSS feed (force-static)
      (articles)/
        {category}/page.tsx        # Category listing page (TypeScript, uses ArticlesList)
        {category}/{article}/page.mdx  # Individual blog article (MDX)
    achievements/page.tsx
    education/page.tsx
    experience/page.tsx
    projects/page.tsx
    testimonials/page.tsx
  404/page.tsx
  error.tsx
  manifest.ts                      # PWA manifest (force-static)
  robots.ts                        # robots.txt (force-static)
  sitemap.ts                       # sitemap.xml (force-static)

assets/                            # Static data: images, JSON/TS data files
components/
  blog-articles/                   # ArticleLayout, ArticlesList, ArticlesListItem
  content/                         # Semantic structure components (Title, Section, Link, etc.)
  layout/                          # Navigation, footer
  theme/                           # WebsiteThemeProvider.tsx, fonts.ts
  WebVitals.tsx
constants/
  routes.ts                        # Route definitions (WebsiteHome, Route interface)
  metadata.ts                      # FULL_NAME, JOB_TITLE, MAIN_DESCRIPTION, WEBSITE_PUBLIC_URL
cypress/
  e2e/                             # E2E test specs (*.cy.tsx)
  support/commands.ts              # Custom commands
hooks/                             # Custom React hooks
styles/
  main.css                         # Global CSS: reduced motion, scrollbars, body resets
  syntax-highlighting.css          # Syntax highlight overrides
utils/
  blog-articles.ts                 # Blog article discovery and path resolution
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
| `@/styles/*`     | `styles/*`     |
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

Every source file (`.ts`, `.tsx`, `.css`, `.mdx`) must start with:

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

Use the year of original file creation. Do not update the year on edits.

### TypeScript Conventions

- Strict mode is enforced (`strict: true`, `noImplicitAny`, `strictNullChecks`).
- Type-only imports use the `type` keyword: `import type React from "react"`.
- React return types: `React.ReactElement` for single-element returns, `React.ReactNode` for children props.
- Props interfaces use the `Props` suffix, defined directly above the component.
- Default exports for components. Named exports for utilities, hooks, and types.
- PascalCase filenames for components. camelCase for utilities and hooks.

### Component Structure Template

```tsx
// copyright header
"use client"; // only if needed

import type React from "react";
// external imports first, then @/ aliases

interface Props {
    // ...
}

const MyComponent = ({ ... }: Props): React.ReactElement => {
    return (...);
};

export default MyComponent;
```

### Array Mutations

In-place `.sort()` without copying is allowed when the array is newly created within the same scope and not referenced elsewhere. ESLint may flag this — it is intentional. See [`utils/blog-articles.ts`](./utils/blog-articles.ts).

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

Current routes: `/experience`, `/achievements`, `/projects`, `/testimonials`, `/blog-articles`, `/education`.

### Blog Articles

**Directory:** `app/(content)/blog-articles/(articles)/{category}/{article-name}/page.mdx`

**Every `page.mdx` must export:**

```tsx
export const metadata: Metadata = {
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
        <BlogArticleLayout metadata={metadata} blogMetadata={blogMetadata}>
            {children}
        </BlogArticleLayout>
    );
}
```

**Category listing pages** (`{category}/page.tsx`) are TypeScript files using `ArticlesList` — they are not MDX and do not follow the blog article structure above.

**MDX link behavior:** All MDX links open in a new tab (set in `mdx-components.tsx`). Do not add `target="_blank"` manually. Links are resolved relative to `${WEBSITE_PUBLIC_URL}/blog-articles/`.

**Blog discovery:** [`utils/blog-articles.ts`](./utils/blog-articles.ts) globs the filesystem to discover articles. The content layout uses this to build the breadcrumb tree.

### Semantic HTML Components

Never use raw MUI components or HTML elements for document structure. Use from [`components/content/`](./components/content/):

| Component                    | Renders as                  | Use for                         |
| ---------------------------- | --------------------------- | ------------------------------- |
| `Title`                      | `h1`                        | Page title (one per page)       |
| `Section` + `SectionHeading` | section + `h2`              | Major content sections          |
| `SubsectionHeading`          | `h3`                        | Subsections within a section    |
| `Paragraph`                  | `p`                         | Body text                       |
| `List` + `ListItem`          | `ul`/`ol` + `li`            | Lists                           |
| `Link`                       | `a` (MUI + Next.js)         | All internal and external links |
| `LinkButton`                 | button-styled link          | CTA links                       |
| `Logo`                       | image with link             | Logos                           |
| `Photo`                      | image with optional caption | Photos                          |
| `Datespan`                   | time range display          | Date ranges                     |
| `HighlightsSection`          | highlights layout           | Key highlights                  |

### Custom Link Component

[`components/content/Link.tsx`](./components/content/Link.tsx) wraps MUI `Link` with `NextLink`. When using MUI components with a `component` prop (`Button`, `CardActionArea`), pass `Link` via `component={Link}` — never nest `<Link><Button /></Link>`:

```tsx
// CORRECT
<Button component={Link} href="/some-path">Click</Button>

// WRONG — hydration errors + invalid HTML (nested <a> tags)
<Link href="/some-path"><Button>Click</Button></Link>
```

### Image Handling

Always import `Image` from `next-image-export-optimizer`, not from `next/image`. Source images go in `public/images/`. Optimized WebP output is written to `public/optimized-images/` during `npm run build`.

### Accessibility

- Keyboard accessibility: interactive overlays use `tabIndex={0}` and `:focus-within`.
- Decorative images: `alt=""` so screen readers skip them.
- Semantic heading hierarchy is enforced by using the content components above.

---

## 8. Theme and Styling

### Core Rule

**All styling must go through the MUI theme first.** Only add global CSS for the specific use cases listed below.

The theme is in [`components/theme/WebsiteThemeProvider.tsx`](./components/theme/WebsiteThemeProvider.tsx).

### Color Tokens

Never use hardcoded color values. Use theme tokens:

- `text.primary`, `text.secondary`, `text.disabled`
- `palette.primary.main`, `palette.primary.light`, `palette.primary.dark`
- `background.default`, `background.paper`

### Where to Put Styles

| Use case                                  | Location                                                 |
| ----------------------------------------- | -------------------------------------------------------- |
| Style shared across multiple components   | Theme `components` section in `WebsiteThemeProvider.tsx` |
| Style for a single component instance     | Inline via `sx` prop                                     |
| Reusable styled wrapper needed            | MUI `styled()` utility                                   |
| Same value appears in multiple components | Keep inline — do NOT extract to constants                |
| Component-specific style (one place only) | Stay in the component, not the theme                     |

### Global CSS (`styles/main.css`)

Only for:

- `@media (prefers-reduced-motion: reduce)` — disables all animations and smooth scrolling globally.
- Custom scrollbar styling (WebKit + Firefox).
- `body`/`html` resets: margin, scroll behavior, `overflow-x: hidden`.
- Monospace font stack for `code` elements.

Do not add component styles here.

---

## 9. Testing

### E2E with Cypress

- Test files: [`cypress/e2e/`](./cypress/e2e/) (`.cy.tsx` extension)
- Custom commands: [`cypress/support/commands.ts`](./cypress/support/commands.ts)
- Configuration: [`cypress.config.ts`](./cypress.config.ts)

**Viewport:** `1280x768`. This is above MUI's `lg` breakpoint (`1200px`). Below `lg`, the desktop AppBar is hidden and the mobile drawer appears — breaking navigation tests. Do not change the viewport without understanding this.

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

### Environment Variables

| Variable                  | Where used                      | Notes                                     |
| ------------------------- | ------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_WEBSITE_URL` | Dev script                      | `http://localhost:3000` in dev            |
| `SENTRY_AUTH_TOKEN`       | Build (CI secret)               | Source map upload                         |
| `SENTRY_RELEASE`          | Build (CI)                      | Set to `github.sha`                       |
| `ANALYZE`                 | `build:analyze` script          | Set to `true` to open bundle report       |
| `BUILD_TYPE`              | E2E pipeline + `app/layout.tsx` | Set to `test` for coverage + loosened CSP |
| `CYPRESS_RECORD_KEY`      | E2E pipeline (CI secret)        | Cypress Cloud recording                   |
| `CODECOV_TOKEN`           | Coverage upload (CI secret)     | CodeCov authentication                    |
| `CLOUDFLARE_API_TOKEN`    | Deploy step (CI secret)         | Cloudflare Pages deploy                   |
| `CLOUDFLARE_ACCOUNT_ID`   | Deploy step (CI secret)         | Cloudflare account identifier             |

---

## 11. Known Gotchas

### `start-server.sh` must use `source`, not `bash`

Exports `NODE_EXTRA_CA_CERTS` and `SERVE_PID`. Running with `bash` loses those exports, causing Cypress to fail connecting to the HTTPS server. See [Section 9](#9-cicd-pipeline).

### `output: "export"` is not set in development

`next.config.mjs` conditionally sets static export only when `phase !== PHASE_DEVELOPMENT_SERVER`. Route handlers work differently in dev vs. production. Always add `export const dynamic = "force-static"` to any new route handler.

### Do not nest interactive elements inside `<Link>`

Wrapping `<Button>`, `<CardActionArea>`, etc. inside `<Link>` creates nested `<a>` tags — invalid HTML and causes React hydration errors. Pass `Link` via the `component` prop:

```tsx
<CardActionArea component={Link} href="/path">
    ...
</CardActionArea>
```

### MDX heading levels are shifted by one

In [`mdx-components.tsx`](./mdx-components.tsx): MDX `h1` → `SectionHeading` (renders `h2`), MDX `h2` → `SubsectionHeading` (renders `h3`). The actual `h1` for a blog page is always the `Title` component in the page's TypeScript wrapper. Write MDX headings one level higher than you would in plain HTML.

### MDX links always open in new tabs

The `a` override in `mdx-components.tsx` hardcodes `target="_blank"` on all MDX links. Do not add `target` manually. Relative links resolve against `${WEBSITE_PUBLIC_URL}/blog-articles/`.

### `WebsiteHome.subRoutes` is never undefined

TypeScript infers this from the constant initializer. Do not add `?.` optional chaining when accessing it — TypeScript will error. See [`constants/routes.ts`](./constants/routes.ts).

### Cypress viewport is fixed at 1280x768

Below MUI's `lg` breakpoint (1200px), the desktop nav bar is replaced by a mobile drawer, breaking all navigation tests. Do not change the viewport unless specifically testing responsive layouts.

### Use `next-image-export-optimizer`, not `next/image`

The project configures a custom image loader. Import `Image` from `next-image-export-optimizer`. Using `next/image` directly bypasses the optimization pipeline.

### Sentry is disabled in development

`sentryConfig.enabled` is `false` when `NODE_ENV === "development"`. Source map uploads require a valid `SENTRY_AUTH_TOKEN` in the build environment.

### CSP `unsafe-eval` is only added in development and test

[`app/layout.tsx`](./app/layout.tsx) adds `'unsafe-eval'` to `script-src` only when `NODE_ENV === "development"` or `BUILD_TYPE === "test"`. Do not rely on `eval` in production code.

### `.sort()` without copy is intentional

When arrays are freshly created and not referenced elsewhere, in-place `.sort()` is used intentionally. Do not "fix" these by adding `.slice().sort()`.
