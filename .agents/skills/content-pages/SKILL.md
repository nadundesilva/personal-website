---
name: content-pages
description: "Use whenever adding or editing a page, a page section, a heading, a list of items or a page's title/description, even if the request only says 'add X to the site' or 'show Y on the experience page'. Covers how to build or edit pages and sections in this repo: the semantic content components in components/content (Title, Section, SectionHeading, List, AccentedList, …) and their props, the heading hierarchy, the per-page metadata export and title format, registering a route in constants/routes.ts, and how sitemap, feed and JSON-LD pick pages up."
---

# Content Pages

Pages are built from the semantic components in `components/content/` (barrel: `components/content/index.tsx`). Never use raw HTML elements for document structure: the components carry the heading hierarchy, ARIA wiring and scroll-reveal that crawlers and screen readers depend on. For choosing UI components (cards, buttons, tooltips…) see the `ui-components` skill; for blog articles see `blog-article`.

## Semantic components

| Component                    | Renders as                        | Use for                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Title`                      | `h1`                              | Page title (one per page)                                                                                                                                                                                                                                                                                                                                                                                          |
| `Section` + `SectionHeading` | section + `h2`                    | Major content sections. `Section` wraps children in `ScrollReveal` and appends a `Separator` itself, so do not add those. Pass a unique `id` to `SectionHeading` and the same value to `Section`'s `labelledById` so `aria-labelledby` links them. `SectionHeading` also takes optional `date` (renders `DateInfo` below), `logo` (right-aligned) and `actionButton` (`LinkButtonProps`, a CTA below the heading). |
| `SubsectionHeading`          | `h3`                              | Subsections within a section; optional `id` for anchor linking                                                                                                                                                                                                                                                                                                                                                     |
| `Paragraph`                  | `p`                               | Body text                                                                                                                                                                                                                                                                                                                                                                                                          |
| `List` + `ListItem`          | `ul`/`ol` + `li`                  | Lists                                                                                                                                                                                                                                                                                                                                                                                                              |
| `AccentedList`               | left-accented list                | Highlighted/feature lists. Requires `heading` and `headingVariant` (optional on `List`)                                                                                                                                                                                                                                                                                                                            |
| `Link`, `LinkButton`         | `a` (Next.js), button-styled link | All links / CTA links (details in `ui-components`)                                                                                                                                                                                                                                                                                                                                                                 |
| `Logo`, `Image`              | optimized image                   | Logos / in-page images (sizing rules in `responsive-images`)                                                                                                                                                                                                                                                                                                                                                       |
| `DateInfo`                   | date/date range display           | Dates and date ranges                                                                                                                                                                                                                                                                                                                                                                                              |

## Heading hierarchy

Never skip levels. The home page `<h1>` is the person's name inside `WelcomeBanner`; every other page uses `Title`. Section headings are `h2` (`SectionHeading`), subsections `h3` (`SubsectionHeading`). Items in a list or timeline (experience roles, projects, certifications) use `<p>` or `CardTitle`: the `<ol>`/`<ul>` already provides the structure, and only standalone named sections that users should reach through heading shortcuts get a heading. CTA copy is never a heading, however large it looks. `CardTitle` is a layout slot, not a heading (see `ui-components`).

## Metadata and title

Every `page.tsx` exports `metadata` with a `title` and a `description`:

```tsx
export const metadata: Metadata = {
    title: resolveRoute("/education").name,
    description: `${FULL_NAME}'s academic background and educational qualifications.`,
};
```

`title` is the bare page name. The root layout's `title.template` (`%s | ${FULL_NAME}`) appends the site name, so writing `"Education | Nadun De Silva"` would duplicate it. Take the name from `resolveRoute(path).name` (`utils/common/routes.ts`) so the title, nav and breadcrumbs stay in sync. Listing pages render `CollectionPageJsonLd` (`components/layout/`) with the page's `metadata` and pathname.

## Adding a page

1. Register the route in `constants/routes.ts` (a `name` plus optional `subRoutes`), which feeds navigation, breadcrumbs, `sitemap.ts` and `resolveRoute`. `WebsiteHome.subRoutes` is always defined, so do not add optional-chaining guards when reading it.
2. Create `app/(content)/<route>/page.tsx` with the `metadata` export above; the `(content)` layout supplies the shared padding.
3. Use `CvPdfPath` from `constants/routes.ts` instead of hardcoding the CV PDF path.
4. `app/sitemap.ts` is derived from `WebsiteHome.subRoutes` and the blog article glob, so no further registration is needed. Do not rename route exports or change URL structure without checking `app/sitemap.ts` and `app/(content)/blog-articles/feed.xml/route.ts`.
5. Add E2E coverage following `writing-tests`.
