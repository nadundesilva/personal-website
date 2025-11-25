# Agent Knowledge Base

**Important**: Refer to this document before starting any task to understand the project structure, conventions, and patterns.

This document contains knowledge gained from comprehensive codebase reviews. For project setup and basic information, see [README.md](./README.md).

**Maintenance Guidelines**:

- **Always update this document** when new knowledge is gained or patterns are discovered during code reviews or development
- When updating this document, reduce duplication by:
    - Using cross-references to other sections instead of repeating information
    - Consolidating similar information into a single location
    - Removing redundant details that are already covered elsewhere
    - **Pointing to actual project files** (like `package.json`, `README.md`, config files, or source code) rather than duplicating their content here

## Table of Contents

- [CI/CD Pipeline](#cicd-pipeline)
- [Project-Specific Patterns](#project-specific-patterns)
- [Theme and Styling](#theme-and-styling)
- [Testing](#testing)
- [Known Issues & Solutions](#known-issues--solutions)

## CI/CD Pipeline

### Server Scripts

The CI/CD pipeline uses shell scripts to start and stop a local server for testing:

- **`start-server.sh`**: [`.github/scripts/start-server.sh`](./.github/scripts/start-server.sh) - Starts a local HTTPS server
- **`stop-server.sh`**: [`.github/scripts/stop-server.sh`](./.github/scripts/stop-server.sh) - Stops the server

**Important**: When using `run:` steps in GitHub Actions workflows, `start-server.sh` must be executed using `source` (not `bash`) because it exports environment variables that need to be available in the same shell session. `stop-server.sh` can be executed with `bash` since it does not export any variables.

## Project-Specific Patterns

### Route Structure

The `WebsiteHome.subRoutes` property is always defined (not optional). Since `WebsiteHome` uses type inference, TypeScript knows `subRoutes` is always defined, even though the `Route` interface types it as optional. See [constants/routes.ts](./constants/routes.ts) for the route definitions.

### Blog Article Structure

All blog articles in `app/(content)/blog-articles/(articles)/` must:

- Export `metadata` object with `title` and `description`
- Export `blogMetadata` object with `image`, `mediumUrl`, `publishedDate`, and `keywords`
- Use `BlogArticleLayout` component from [mdx-components.tsx](./mdx-components.tsx) in the default `Layout` export
- Follow the directory structure: `app/(content)/blog-articles/(articles)/{category}/{article-name}/page.mdx`

MDX links automatically open in new tabs and are resolved relative to `/blog-articles/` base URL. See [mdx-components.tsx](./mdx-components.tsx) for the link handler implementation.

**Note**: Category listing pages (like `kubernetes-the-right-way/page.tsx`) are TypeScript pages that use `ArticlesList` with filtered path patterns to list articles in that category. These are not MDX articles and don't follow the blog article structure.

### Static Site Generation

The project uses static export (`output: "export"`) for all builds except development. Static route handlers (`sitemap.ts`, `robots.ts`, `manifest.ts`) use `export const dynamic = "force-static"` to ensure static generation. See [next.config.mjs](./next.config.mjs) for the configuration.

## Theme and Styling

### Styling Through MUI Theme

**All styling should be done through the MUI theme as much as possible** to maintain consistency and ensure proper theme-aware behavior (light/dark mode support). The theme configuration is centralized in [components/theme/WebsiteThemeProvider.tsx](./components/theme/WebsiteThemeProvider.tsx).

### Theme-Aware Colors

Always use theme-aware color tokens (e.g., `text.secondary`, `text.primary`, `palette.primary.main`) instead of hardcoded colors to ensure proper contrast in both light and dark modes.

### Component Styling Patterns

Reusable component styles should be centralized in the theme's `components` section to maintain consistency across the site rather than being defined inline in individual components.

**Important**: Do not move styles into constants. Keep style values inline even if they are duplicated. However, Material-UI styled-components (using the `styled` utility) can be used when necessary for reusable styled-components. Only move styles to the theme object if they are truly reusable across multiple components. Component-specific styles (e.g., Timeline components only used in one place) should remain in the component rather than being moved to the theme.

## Testing

### Cypress End-to-End Testing

The project uses Cypress with `@testing-library/cypress` for end-to-end tests. See [cypress/e2e/](./cypress/e2e/) for test files and [cypress/support/commands.ts](./cypress/support/commands.ts) for custom commands.

**Viewport Configuration**: The Cypress viewport is set to `1280x768` in [cypress.config.ts](./cypress.config.ts) to match Material-UI's `lg` breakpoint (`1200px`). Using a smaller viewport causes the desktop navigation to be hidden and mobile drawer to appear, breaking navigation tests.

**Custom Commands**: Custom Cypress commands use Testing Library queries (`findByRole`, `findByTestId`, etc.) and should prefer role-based queries with `name` matchers over attribute checks when possible. See [cypress/support/commands.ts](./cypress/support/commands.ts) for examples.

## Known Issues & Solutions

### Array Mutations

Some array operations (like `.sort()`) are intentionally used without creating copies when the array is newly created and not reused elsewhere.
