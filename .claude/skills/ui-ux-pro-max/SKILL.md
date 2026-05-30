---
name: ui-ux-pro-max
description: Senior UI/UX craft pass for web frontends. Use when the user asks to upgrade, polish, redesign, or "make it premium/pro" — applies design-token systems, visual hierarchy, spacing rhythm, accessible color/contrast, motion restraint, and responsive layout. Best for React/Tailwind/CSS projects.
---

# UI/UX Pro Max

A disciplined senior-designer pass over a web UI. Goal: make it look
intentional, premium, and accessible — never decorated for its own sake.

## When to use
Invoke when the user wants to "upgrade the UI/UX", "make it pro/premium",
"redesign", or polish an existing interface.

## Method (work in this order)

1. **Audit first, change second.** Read the actual components and global
   styles. List concrete problems (hardcoded colors, inconsistent spacing,
   weak hierarchy, poor contrast, no focus states) before editing. Show the
   audit to the user.

2. **Establish a token system.** Define color, spacing, radius, shadow, and
   type scale ONCE (CSS variables / Tailwind theme). Never hardcode the same
   hex in ten components. Light and dark must both derive from tokens.

3. **Hierarchy & rhythm.**
   - One clear focal point per section; size/weight/color reinforce it.
   - Consistent vertical rhythm (a spacing scale: 4/8/12/16/24/32/48/64).
   - Max line length ~70ch for body text; generous line-height (1.5–1.7).

4. **Color & contrast.** Body text ≥ 4.5:1, large text ≥ 3:1 (WCAG AA).
   Use a restrained palette: 1 brand + neutrals + 1–2 accents. Gradients
   are a seasoning, not a main course.

5. **Components, not snowflakes.** Buttons, cards, chips, inputs should be
   reusable classes/components with consistent padding, radius, and states
   (hover/active/focus/disabled).

6. **Motion with restraint.** Short (150–350ms), eased, purposeful.
   Always honor `prefers-reduced-motion`.

7. **Responsive & touch.** Test mental models at 360px, 768px, 1280px.
   Tap targets ≥ 44px. No horizontal overflow.

8. **Accessibility is non-negotiable.** Visible `:focus-visible` rings,
   semantic landmarks, `alt`/`aria-label`, labels tied to inputs, skip link.

## Definition of done
- No duplicated hardcoded colors; everything flows from tokens.
- Consistent spacing/type scale across sections.
- AA contrast, visible focus, reduced-motion respected.
- Build passes; nothing regressed. Show before/after notes.
