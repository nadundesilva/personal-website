# Cypress conventions shared by component and E2E specs

## Assert computed CSS for visual behavior, not Tailwind class names

For a visual/layout behavior (size, spacing, float, color), prefer `cy.get(...).should("have.css", "<property>", "<value>")` — the computed style — over `should("have.class", "<tailwind-class>")`. A class-name assertion is coupled to the utility class chosen today; if the class is renamed or replaced with an equivalent one during a refactor, the test fails even though the rendered behavior is unchanged. `have.css` checks the actual rendered outcome, matching the "name tests after behavior" rule in SKILL.md.

**Exception — color values.** Do not assert literal computed colors (`background-color`, `border-color`, etc.) — the "never hardcode color values" rule (`AGENTS.md`, Color Tokens) applies to test assertions too: the resolved value is theme-dependent and its serialization (oklch vs. rgb) isn't stable. For a color-driven variant, either keep the class assertion (and name the test for the variant's effect, not the class), or assert that the computed color differs between two variants rather than asserting a literal value.

## Assert URL-shaped contracts exactly, not by substring

For `link[rel="canonical"]`, `og:url`, JSON-LD `@id`/`sameAs`, and similar tags whose entire purpose is to identify one exact URL, assert exact equality (`.to.eq(...)`), never `.include(...)` or a loose `.match(/^https?:\/\//)`. A substring or protocol-only match still passes on a wrong host or a corrupted `metadataBase` — precisely the regression these tags exist to catch.

**Exception — component API surface.** A `data-*` attribute or ARIA attribute that is a component's own public contract (e.g. `data-size="sm"`) is not an internal implementation detail to be swapped out under refactor — assert it directly.

## The selector must mirror the element's meaning, not its position

A selector should name _what the element is_, the same thing its accessible role/name conveys to assistive tech — `findByRole` with a `name`, an accessible label, visible text, a contract `data-*`. The selector and the a11y tree should be picking out the element for the same reason. A structural CSS selector (`[aria-hidden='true'] div`, `.some-wrapper > span:nth-child(2)`) instead names a _position in the current markup_: it matches by accident of nesting, silently starts matching a different element after a refactor that leaves behavior unchanged, and tells a reader nothing about what was selected.

When the element genuinely carries no meaning in the a11y tree — a decorative bar in a chart, an unlabeled visual slot — give it an explicit handle in the component. **Every attribute that exists only for tests lives under the `data-test` namespace:** `data-testid` for identity (this is what `findByTestId` queries — the `@testing-library` default, not reconfigured here), and `data-test-<name>` for any _state_ under test, selected with a plain attribute selector (`.filter('[data-test-filled="true"]')`, `cy.get('[data-test-open]')`). There is no `findBy*` helper for the `data-test-<name>` flags and none is needed — attribute selectors are how variant state is queried. The shared `data-test` prefix keeps test-only hooks greppable and unmistakable for production behavior.

Derive a state flag from the **same expression** that drives the visual state, in one place, so the two cannot diverge (a test that still passes while the visual is wrong is worse than no test):

```tsx
const isFilled = i <= bars;
// …
<div
    data-test-filled={isFilled}
    className={cn(isFilled ? filledClass : emptyClass)}
/>;
```

Such a test-only attribute is part of the component's public test contract (per the "component API surface" exception above), not an implementation leak. Never distinguish element states by Tailwind class presence (`el.className.includes("bg-foreground/15")`) — that is the class-name coupling the section above forbids; expose the state as a `data-test-<name>` attribute instead.

## Console errors fail tests (both suites)

`cypress/support/console-guard.ts` makes **any
`console.error` or uncaught exception fail the test** — wired into
`cypress/support/e2e.ts` (via `window:before:load`) and
`cypress/support/component.ts` (via a `beforeEach`
`cy.window()` patch). This is what catches React hydration errors (e.g. #418) that
would otherwise pass silently.

- **Fails fast, at the error.** The wrapped `console.error` re-throws from a
  microtask, so it surfaces as a test failure on the offending test — sibling
  tests in the same spec file still run. (A plain synchronous re-throw doesn't
  work: React's render wraps `console.error` calls in try/catch.) The failure
  lists **every** console error from the incident (a React/browser incident logs
  its calls in one synchronous burst, and Cypress halts the test on the first
  failure).
- **Allowing a known-benign message:** `cy.allowConsoleError(pattern)` (string =
  literal substring, or a regex) whitelists matching messages **for the current
  test only**. Pass the _specific_ expected message, not a catch-all — the
  deliberate throw-in-`ErrorBoundary` tests (`mdx-components.cy.tsx`,
  `ProgressFab.cy.tsx`, `Heading.cy.tsx`) each allow the exact error string they
  assert on, and `global-error.cy.tsx` allows the two exact React-internal
  messages that a full `<html><body>` triggers under isolated mounting. It is
  only legitimate for (a) framework/runner noise or (b) a deliberately-triggered,
  asserted error path — never to quiet an error the app or a test should handle.
- `GLOBAL_ALLOWLIST` in `console-guard.ts` holds the one unavoidable piece of
  tooling noise (`[webpack-dev-server] Invalid Host/Origin header`). Keep it tiny.
- The e2e `IntersectionObserver` mock lives in the same `window:before:load` hook
  but is unrelated — it forces `whileInView` animations to run headless.

## Narrowing possibly-missing values

Use `at()` (`@/cypress/support/collections`) and `defined()` (`@/cypress/support/defined`) to narrow indexed lookups and optional values instead of `!`; a missing value then fails with a clear message.
