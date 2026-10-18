---
name: ui-components
description: "Use whenever adding or changing a component, or any UI that needs a button, card, badge, popover, tooltip, drawer, overlay, link, decorative accent or variant props, and whenever touching shadcn/ or running `pnpm dlx shadcn add`, even if the request never names a component. Covers how to choose and build UI components in this repo: the selection order (shadcn/ui, then @base-ui/react, then a custom component only with the user's approval), the hand-written primitives in components/primitives, the custom Link and LinkButton, class-variance-authority variants, and the rules for the CLI-managed shadcn/ directory (never hand-edit, how to regenerate, the integrity rule)."
---

# UI Components

## Selection order

When new UI needs a component, work down this list and stop at the first option that fits:

1. **shadcn component** — check `shadcn/ui/` first (table below). If the one you need is missing, look in the shadcn registry and scaffold it in with the CLI (see "Working with `shadcn/`").
2. **`@base-ui/react` primitive** — if no shadcn component fits semantically, use `@base-ui/react` directly. It is the unstyled primitive library most shadcn components here are built on (exceptions: `Card` uses plain React and `Spinner` only uses `lucide-react`).
3. **Custom implementation** — only when neither applies. Ask the user for approval before writing one, since it takes on accessibility and styling work the first two options already cover.

## The two component homes

- **`shadcn/`** — CLI-managed. `shadcn/ui/` holds the shadcn primitives, `shadcn/lib/` holds the `cn()` utility, and `shadcn/hooks/` is where shadcn-provided hooks would land if any are ever added.
- **`components/primitives/`** — hand-written building blocks that render a specific visual segment (a gradient line, a bordered accent, a divider) but carry no semantic meaning on their own. Think of them as design tokens expressed as components.

### shadcn primitives available

All are exported from `shadcn/ui/index.tsx`:

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

### Hand-written primitives available

All are exported from `components/primitives/index.tsx`:

| Primitive                | What it renders                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `CopyButton`             | Clipboard copy button (used in code blocks)                                                 |
| `HorizontalGradientLine` | Short left-anchored gradient accent line (color → transparent) used under headings          |
| `LeftAccent`             | Left border accent wrapping a content block                                                 |
| `PrimaryTintedIcon`      | Icon tinted with the primary color                                                          |
| `ProgressFab`            | Circular progress ring FAB — used by `ReadingProgress` to show article reading progress     |
| `ScrollReveal`           | Wraps children in a CSS scroll-triggered scale reveal (`animation-trigger`, fixed duration) |
| `StaggerReveal`          | Wraps a list in staggered scroll-reveal animations                                          |

**Add a new hand-written primitive when** a visual pattern (gradient, border accent, decorative line, etc.) is used in more than one place and the element has no semantic meaning by itself — it is purely visual.

## `CardTitle` is a slot, not a heading

`CardTitle` marks the title area of a card regardless of which HTML element renders it. Whether that title is also a document heading (`<h2>`, `<h3>`, …) is a separate decision driven by the page's heading hierarchy:

- In list items (project cards, certification cards inside `<li>`), the list provides the document structure, so `CardTitle` as a `<div>` is correct — no heading element is needed.
- For a standalone named section users should be able to reach by heading, place a heading element directly inside `CardContent` instead of using `CardTitle`. Experience roles are not an example: they are items in the timeline `<ol>` and render as `<p>`.

## Variants with `class-variance-authority`

Use `cva` + `VariantProps` whenever a component accepts props that map to different class sets (e.g. `size`, `variant`, `intent`). This is the shadcn pattern — see `shadcn/ui/button.tsx` and `shadcn/ui/badge.tsx`. Expose the resolved variant type via `VariantProps<typeof myVariants>` in the props interface so callers get autocomplete and type safety. For a single varying dimension (e.g. only `size`), a single `cva` call is enough; no separate helper function is needed.

## Links: `Link` and `LinkButton`

`components/content/Link.tsx` is a `forwardRef` wrapper around `next/link` with Tailwind classes applied via `cn()`. It automatically:

- adds `rel="noopener noreferrer"` for `target="_blank"` links;
- appends `" (opens in a new tab)"` to the `aria-label` when `aria-label` is set and `target="_blank"`;
- renders an `sr-only` "(opens in a new tab)" span when no `aria-label` is set, so do not add that text yourself.

For button-styled links use `components/content/LinkButton.tsx`. Even when passing a link as a `render` prop to a base-ui component (e.g. `BreadcrumbLink`), pass `<Link href={...} />`, not `next/link`, so the accessibility and `rel` behaviour above still applies. Never nest a `Link` inside another `Link` or inside a `<button>`; it is invalid HTML.

## Working with `shadcn/`

> **shadcn components must not be hand-edited — only regenerated via the CLI.** If a shadcn primitive needs to change (new upstream version, a variant tweak, a prop addition), run `pnpm dlx shadcn add <component> --overwrite` and `git mv` the freshly generated file(s) into `shadcn/ui/` (or `shadcn/lib/`), rather than editing the existing file by hand. This keeps them byte-for-byte reproducible from the registry — a hand-edit today becomes a silent, undiscoverable diff from upstream that the next regeneration either clobbers or conflicts with.

- If a shadcn primitive doesn't support something the app needs, either wrap it from `components/primitives/` (composition, not modification) or raise it with the user before hand-patching the CLI output.
- shadcn files skip the usual file-header and PascalCase-filename rules: use the CLI's output as-is (lowercase-kebab filenames, no copyright header).
- The hand-written `index.tsx`/`index.ts` barrels in `shadcn/ui/` and `shadcn/lib/` are the one exception within `shadcn/` — they're ours, not CLI output, so they keep the normal header and conventions. Export new primitives from `shadcn/ui/index.tsx` (or the utility from `shadcn/lib/index.ts`) when regenerating.

> **shadcn component integrity rule:** Never partially remove sub-components from a shadcn component. If at least one sub-component is used anywhere in the project, the entire component (including all unused sub-components) stays. Only remove the whole component if none of its exports are used anywhere.
