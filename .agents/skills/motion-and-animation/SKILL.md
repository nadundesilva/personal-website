---
name: motion-and-animation
description: "Use whenever adding or changing any transition, animation, scroll reveal, hover effect, fade, slide or pulse, or when styling an interactive element that should feel animated, even if the request never says 'animation'. Covers the animation rules for this repo: when to use motion/react versus CSS, the motion-safe reduced-motion guard, and page-scoped animation tokens defined next to their keyframes."
---

# Motion and Animation

## Animation and Motion

`app/layout.tsx` wraps the app with `<LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">` — declarative `motion` components automatically honour `prefers-reduced-motion`. `LazyMotion` with `domAnimation` keeps the animation bundle lean, and `strict` makes a full `motion.*` component warn in development, so always use the lazy `m.*` variants. Prefer `motion/react` primitives (`m.div`, `AnimatePresence`, etc.) for interactive transitions. For CSS-only animations, use `tw-animate-css` utilities.

**Library preference for animations:** For any animation that cannot be done through pure CSS (`motion-safe:` Tailwind utilities), use `motion/react` — its declarative `m.*` components or, when the animation is a value rather than an element (e.g. a counting number), the standalone `animate()` function. Do **not** use `window.matchMedia` for reduced-motion detection or `requestAnimationFrame` loops to drive animations (`requestAnimationFrame` to defer a layout read or state update is fine). The root `MotionConfig reducedMotion="user"` handles reduced motion correctly for declarative `m.*` components; prefer those for stagger and scroll-triggered animations.

The imperative APIs do **not** get that for free. `animate()` ignores `MotionConfig`, so gate it on `useReducedMotion()` yourself, and wait for an explicit `false` before starting: the hook returns `null` until it resolves on the client (an SSR/hydration quirk in Next.js), and starting on `null` would flash the animation for reduced-motion users. `AnimatedStatValue.tsx` is the reference implementation. `useAnimate` has the same limitation, so declarative `m.*` components remain the reliable choice.

## Reduced-Motion Guard

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

## Page-scoped Animation Tokens

For animations that are specific to one page or component (not shared design tokens), use this pattern:

1. **Define a CSS custom property** in the `:root` block of the co-located CSS file (grouped with that file's other `--animate-*` tokens), and the corresponding `@keyframes` in the same file:

```css
/* page.css */
:root {
    --animate-home-timeline-dot-pulse: home-timeline-dot-pulse 2.5s ease-out
        infinite backwards;
}

@keyframes home-timeline-dot-pulse { … }
```

2. **Reference it in JSX** using Tailwind v4's CSS variable shorthand:

```tsx
className = "motion-safe:animate-(--animate-home-timeline-dot-pulse)";
```

This keeps the animation timing values in the same file as their keyframes, the CSS variable is inspectable in DevTools, and Tailwind's `motion-safe:` variant applies correctly.
