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
  primitives/                      # Small "use client" UI primitives (see §7 — Primitive Components)
  theme/                           # WebsiteThemeProvider.tsx, fonts.ts, colors.ts
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

1. External package imports (e.g. `@mui/material`, `next`, `react`)
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

Current routes: `/experience`, `/achievements`, `/projects`, `/testimonials`, `/blog-articles`, `/education`.

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
        <BlogArticleLayout metadata={metadata} blogMetadata={blogMetadata}>
            {children}
        </BlogArticleLayout>
    );
}
```

> **MDX TypeScript restriction:** MDX uses an acorn JavaScript-only parser. TypeScript syntax is **not** supported in `.mdx` files. Do not use `import type`, `: TypeName` annotations, or any other TypeScript-specific syntax inside `.mdx` files — they will cause a build failure: `Could not parse import/exports with acorn`.

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
| `DateInfo`                   | date/date range display     | Dates and date ranges           |
| `HighlightsSection`          | highlights layout           | Key highlights                  |

### Primitive Components

Small reusable building blocks in [`components/primitives/`](./components/primitives/). They render a specific visual segment — a gradient line, a bordered accent, a divider — but carry no semantic meaning on their own. Think of them like design tokens expressed as components: the same visual pattern used in multiple places.

**Available primitives:**

| Primitive                | What it renders                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `HorizontalGradientLine` | Short left-anchored gradient accent line (color → transparent) used under headings      |
| `LeftAccent`             | Left border accent wrapping a content block (3 px, `alpha(primary, 0.3)` by default)    |
| `GradientDivider`        | Full-width symmetric gradient rule (transparent → color → transparent) between sections |

**When to add a new primitive:**

- A visual pattern (gradient, border accent, decorative line, etc.) is used in more than one place.
- The element has no semantic meaning by itself — it is purely visual.

Export all primitives from `components/primitives/index.tsx`.

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

**Raw palette constants** (`themePrimary`, `themeSecondary`, `linkColors`) are exported from [`components/theme/colors.ts`](./components/theme/colors.ts). Import from there when you need the raw hex values outside of a theme callback (e.g. in a server component like `app/layout.tsx`). `WebsiteThemeProvider.tsx` also imports from this file — do not duplicate color definitions.

**Prefer `useTheme()` or sx callbacks over sx string tokens.** MUI's `sx` prop accepts dot-path strings like `"text.secondary"` or `"action.disabledBackground"` as a shorthand — but these are **not type-checked**. A typo compiles silently and produces broken/invisible styles at runtime with no error:

```tsx
// PREFER: type-checked — typos are caught at compile time
const theme = useTheme();
bgcolor: theme.palette.action.disabledBackground;

// PREFER: equally type-safe via sx callback
bgcolor: (theme) => theme.palette.action.disabledBackground;

// AVOID: "action.disabledBakground" (typo) would also compile fine
bgcolor: "action.disabledBackground";
```

To create lighter or darker shades of an existing palette color (e.g. for gradients), use MUI's `darken` and `lighten` utilities from `@mui/material/styles` — do not hardcode new hex values:

```ts
import { darken } from "@mui/material/styles";

background: (theme) =>
    `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${darken(theme.palette.background.paper, 0.1)} 100%)`,
```

To apply opacity to a palette color, use MUI's `alpha()` utility — do not use `rgba()` literals or append hex alpha digits:

```ts
import { alpha } from "@mui/material/styles";

// CORRECT
backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12);

// AVOID — hardcodes the color value, breaks when theme changes
backgroundColor: "rgba(56, 73, 89, 0.12)";
```

### Spacing and Sizing

**`sx` prop auto-multipliers** — Some numeric values in `sx` are automatically scaled; others are not:

| Property group                                                  | Auto-multiplied by                   | Example                         |
| --------------------------------------------------------------- | ------------------------------------ | ------------------------------- |
| `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my`, `p`, `pt`, etc., `gap` | `theme.spacing()` (8px)              | `mt: 2` → `margin-top: 16px`    |
| `borderRadius`                                                  | `theme.shape.borderRadius` (4px)     | `borderRadius: 1.5` → `6px`     |
| `width`, `height`, `top`, `bottom`, `left`, `right`             | **NOT scaled** — treated as raw px/% | Use callbacks or explicit units |

**`theme.spacing()` is fixed** — it does **not** auto-scale based on screen size or breakpoints. If you need responsive spacing, specify it explicitly with a breakpoint object:

```tsx
// Static
mt: 2

// Responsive
mt: { xs: 2, md: 4 }
```

**Semantic rule for when to use `theme.spacing()`:** Only use it for layout whitespace — `margin`, `padding`, `gap`. Do **not** use it for:

- Motion distances: `translateY(-2px)` — use `theme.motion.hoverLift` instead (see below)
- Element dimensions: `width: 24`, `height: 38` — these are design dimensions, leave as numbers
- Positional offsets: `top: 12`, `bottom: 10` — positional values are not layout spacing

Similarly, do **not** use `theme.shape.borderRadius` for unrelated numeric coincidences — only when the value is semantically "a fraction or multiple of the base border radius".

### Custom Theme Extensions (`theme.motion`)

Hover-lift distances are stored as a custom `motion` namespace in the theme — not as `theme.spacing()` values (which are semantic for layout whitespace, not motion). Use these for all `translateY` hover effects:

| Token                          | Value   | Use for                                 |
| ------------------------------ | ------- | --------------------------------------- |
| `theme.motion.hoverLift`       | `"2px"` | Cards, FABs, photos, icons, skill chips |
| `theme.motion.hoverLiftSubtle` | `"1px"` | Buttons, link buttons, small chips      |

```tsx
// CORRECT
"&:hover": {
    transform: (theme) => `translateY(-${theme.motion.hoverLift})`,
}
```

**Extending the theme with custom namespaces:** When a concept has no MUI equivalent, extend via TypeScript module augmentation in `WebsiteThemeProvider.tsx`:

```ts
declare module "@mui/material/styles" {
    interface Theme {
        motion: {
            hoverLift: string;
            hoverLiftSubtle: string;
        };
    }
    interface ThemeOptions {
        motion?: {
            hoverLift?: string;
            hoverLiftSubtle?: string;
        };
    }
}
```

Then add the values to the `createTheme()` call at the top level of the theme object (not inside `colorSchemes`). Values in the top-level theme are shared across all color schemes.

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

### MDX heading levels are shifted by one

In [`mdx-components.tsx`](./mdx-components.tsx): MDX `h1` → `SectionHeading` (renders `h2`), MDX `h2` → `SubsectionHeading` (renders `h3`). The actual `h1` for a blog page is always the `Title` component in the page's TypeScript wrapper. Write MDX headings one level higher than you would in plain HTML.

### MDX copyright headers require the `export const _copyright` pattern

→ See [Section 6 — File Header](#file-header) for the required pattern and explanation.

### TypeScript syntax is forbidden inside `.mdx` files

→ See [Section 7 — Blog Articles](#blog-articles) for the correct MDX export pattern and list of forbidden constructs.

### `WebsiteHome.subRoutes` is never undefined

→ See [§7 — Route Definitions](#route-definitions).

### CSS keyframes with theme colors must be defined inside the component

MUI `keyframes` (from `@mui/system`) cannot use `(theme) => ...` callbacks. When theme-aware colors are required, define the keyframe inside the component body after `useTheme()` and interpolate values directly via template literals. See [`Experience.tsx`](<./app/(home)/_content/sections/Experience.tsx>) for the pattern.

### CSP `unsafe-eval` is only added in development and test

[`app/layout.tsx`](./app/layout.tsx) adds `'unsafe-eval'` to `script-src` only when `NODE_ENV === "development"` or `BUILD_TYPE === "test"`. Do not rely on `eval` in production code.
