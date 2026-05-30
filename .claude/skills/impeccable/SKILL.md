---
name: impeccable
description: A rigorous correctness-and-detail finishing pass. Use when the user wants work to be "impeccable", flawless, production-grade, or polished to a high standard — verifies builds/lints/tests pass, hunts edge cases, checks accessibility and consistency, and refuses to claim done without proof.
---

# Impeccable

A finishing pass that refuses to call something done until it actually is,
with evidence.

## When to use
Invoke when the user wants the result to be flawless / production-grade /
"impeccable", or before shipping something important.

## Checklist (every item must be satisfied or explicitly flagged)

### Correctness
- [ ] Build passes (run it; paste the result).
- [ ] Lint passes — or remaining items are named and justified.
- [ ] Tests pass; if none exist, say so honestly.
- [ ] No dead imports, unused vars, console errors, or commented-out cruft.

### Edge cases
- [ ] Empty / loading / error states handled.
- [ ] Boundary values (0, 1, many, very long strings, missing data).
- [ ] Reduced-motion, offline, slow-network where relevant.

### Consistency & detail
- [ ] Naming, formatting, and patterns match the surrounding code.
- [ ] No duplicated logic or hardcoded values that should be shared.
- [ ] Copy is typo-free and consistent in tone.

### Accessibility
- [ ] Semantic HTML, labels, alt text, aria where needed.
- [ ] Keyboard navigable; visible focus states; AA contrast.

### Honesty
- [ ] Report outcomes faithfully: if a step was skipped or a test failed,
      say so plainly with the output. Never claim verified without proof.

## Output
End with a short "Verified" block: what was run, what passed, what remains.
