---
name: writing-tests
description: "Use whenever adding, editing or debugging any *.test.ts or *.cy.tsx file, and whenever a code change needs test coverage or a test must be added, renamed or deleted, even if the request never says 'test file'. Covers the conventions for writing or changing tests in this repo (Jest unit tests, Cypress component tests and Cypress E2E specs): choosing the test level, naming tests after behavior, assertion style, selectors and data-test attributes, custom Cypress commands, and the console-error guard."
---

# Writing Tests

## Testing Philosophy

**Unit tests** (`*.test.ts`, colocated next to the source file) — pure logic with no DOM:

- Functions over the `constants/*` and `utils/*` data (dates, route resolution, `sizes` string builders, metadata builders, skill-usage indexing)
- Build-time helpers (`build/utils/*` rehype plugins)
- Node-only modules that neither Cypress runner can load (`utils/server/*` — `fs`/`glob`)
- A pure helper reached only through an async wrapper may be `export`ed solely for its `*.test.ts` (e.g. `groupArticles` in `utils/server/blog-articles.ts`, whose error paths need hand-built fixtures) — mark such an export with a comment saying so, so it is not mistaken for dead code
- Setup, conventions and commands: see [references/jest.md](references/jest.md)

**Component tests** (`cypress/component/`) — component-specific behaviors in isolation:

- Props variants and render paths
- Accessibility attributes (ARIA roles, labels, `role=list`, `dateTime`, etc.)
- User interactions contained within a single component (open/close, clipboard, scroll state)
- No running server required (`cy.mount()` only)

**E2E tests** (`cypress/e2e/`) — website-level flows:

- Routing and navigation between pages
- Breadcrumb navigation
- SEO metadata, JSON-LD, sitemap, RSS
- Theme persistence across reload
- Server-generated or statically-exported content correctness

**Choose the cheapest level that can verify the behavior — unit > component > E2E.** A behavior moves up a level only when the level below genuinely cannot reach it:

- **Unit** — the default. Use it unless the assertion needs a DOM or rendered output.
- **Component** — only when the behavior needs a mounted component (`cy.mount()`), but not a real URL, page load, or cross-page flow.
- **E2E** — only for routing, cross-page flows, theme persistence across reload, and server-generated / statically-exported output correctness (SEO metadata, JSON-LD, sitemap, RSS).

If a test _can_ be a unit test it _must_ be one — don't mount a component to exercise a pure helper. Likewise don't reach for E2E when `cy.mount()` suffices: `ReadingProgress` scroll math is a component test (`cypress/component/components/blog-articles/ReadingProgress.cy.tsx`), not an E2E step; the `sizes` string builders are unit tests, not component tests over a rendered image.

**Don't test behavior the app doesn't use.** Only cover props/variants/paths actually exercised somewhere in `app/` or `components/`. Before adding a test for a prop or variant, grep for a real caller passing it — if none exists, skip the test rather than adding one "for completeness." This applies especially to shadcn-derived primitives (`components/primitives/`): they ship with a much larger surface (variants, directions, sizes) than this site ever uses, and testing the unused parts just adds maintenance cost for behavior nobody depends on. Example: `Drawer`'s `swipeDirection` prop supports `down | up | left | right`, but `components/layout/Layout.tsx` only ever renders `swipeDirection="up"` — so `down` (the component's own default), `left` and `right` aren't tested.

**A component's behavior is asserted in that component's own spec, not a consumer's.** If `ChildComponent` decides how it opens, closes, or renders internally, that mechanism is pinned in `ChildComponent.cy.tsx` — a consumer spec (`ParentComponent.cy.tsx`) only asserts the decisions _it_ makes: which props it passes, how it wires children together, whether real data reaches a threshold the child reacts to. Re-asserting the child's own mechanism from the parent's spec is duplicate maintenance surface with no additional signal. The one exception is when mounting the component directly is not possible — e.g. an async Server Component, which React's client renderer rejects (see `ArticlesGroup.cy.tsx`'s comment) — in which case the nearest mountable sub-component stands in, with a comment recording why.

### Name tests after behavior, not implementation

Every `it()` title must state the **user-observable behavior** being verified — what a user, screen reader, or crawler experiences — never the mechanism the component uses to achieve it.

**The test:** would a refactor that preserves user-observable behavior falsify this name? Swap `<div>` → `<span>`, rename a CSS class, change `ul` → `ol`. If the name becomes wrong but nothing observable changed, the name is implementation-coupled — rewrite it.

Asserting on the mechanism is fine, and is often the only practical way to check a visual behavior. Only the _name_ must rise above it:

```tsx
// WRONG — name is the mechanism
it("sets height to 100vh", …)
it("renders children as a ul with role=list", …)
it("sets the dateTime attribute to ISO format", …)

// RIGHT — name is the behavior, assertion is still the mechanism
it("spans the full height of the viewport", () => {
    cy.get("img").should("have.css", "height", "100vh");
});
it("announces its items as a list to screen readers", …)
it("exposes the date in machine-readable form for crawlers and assistive tech", …)
```

Three corollaries:

- **The name must not claim more than the assertion proves.** `"renders key page content"` is unverifiable — name the specific thing checked.
- **`describe()` names the subject; `it()` names the behavior.** `describe("DateInfo")` and `describe("sitemap")` are correct — do not push behavior up into them.
- **Never name a test after a prop.** `when size='sm'` is the caller's API, not the user's experience; name the visual result instead (`in its compact form`).

- **A prop name is fine as input context, not as a substitute for the effect.** `"applies the compact size when size='sm'"` uses the prop _instead of_ describing the outcome — name the visual result instead (`"uses tighter spacing in its compact form"`). But naming the prop _while also_ stating the effect it causes is fine and often clearer, e.g. `"clamps to the visible range when startIndex is out of bounds"` — the prop tells the reader which input scenario is under test; the behavior clause is still what's being verified.

## Where to read next

Read only the reference that matches the test you are writing:

| Writing or changing…                              | Read                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| A Jest unit test (`*.test.ts`)                    | [references/jest.md](references/jest.md)                                                                            |
| A Cypress component spec (`cypress/component/**`) | [references/component.md](references/component.md) and [references/cypress-common.md](references/cypress-common.md) |
| A Cypress E2E spec (`cypress/e2e/**`)             | [references/e2e.md](references/e2e.md) and [references/cypress-common.md](references/cypress-common.md)             |

`cypress-common.md` holds what both Cypress suites share: asserting computed CSS rather than class names, exact URL assertions, selector and `data-test` rules, and the console-error guard that fails tests on any `console.error`. How to run the suites is in the `running-e2e-tests` skill.
