---
name: frontend-design
description: Translate a design intent into clean, idiomatic frontend code. Use when building or refactoring UI components — enforces composition, design tokens, responsive layout, accessibility, and matching the surrounding codebase's conventions. For React/Vue/Tailwind/CSS work.
---

# Frontend Design

Turn design intent into production-quality frontend code that reads like the
rest of the codebase.

## When to use
Invoke when implementing or refactoring UI components, layouts, or design
systems.

## Principles

1. **Match the codebase.** Mirror existing naming, file structure, styling
   approach (Tailwind utilities vs CSS modules vs vars), and import order.
   New code should be indistinguishable from good existing code.

2. **Compose, don't duplicate.** Extract repeated markup into components.
   Repeated style strings → a shared class or token. If you copy-paste a
   block twice, stop and abstract it.

3. **Tokens over literals.** Reference design tokens (CSS vars / theme
   keys) for color, spacing, radius, shadow. No magic numbers or stray hexes.

4. **Semantic + accessible HTML.** Use the right element (`button`, `nav`,
   `section`, `label`). Provide `alt`, `aria-*`, and keyboard support.
   Every interactive element has a visible focus state.

5. **Responsive by default.** Mobile-first; layouts adapt at sensible
   breakpoints. No fixed widths that break small screens.

6. **State coverage.** Handle loading, empty, error, hover, active, focus,
   disabled — not just the happy path.

7. **Performance.** Lazy-load heavy/below-the-fold content, code-split big
   dependencies, lazy images/iframes, avoid layout thrash.

## Workflow
1. Read neighboring components to learn conventions.
2. Sketch the component API (props) before writing JSX.
3. Build with tokens + semantic markup + all states.
4. Verify: build passes, responsive at 360/768/1280, a11y checks, no console
   errors.
