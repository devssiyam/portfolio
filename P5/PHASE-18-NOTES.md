# Phase 18 — Interaction System (COMPLETE)

## Task
Audit all hover/focus/active interactions. Make interaction
context-specific (projects → content, links → underline/arrow,
buttons → press/focus, skills → subtle, services → directional,
experience → timeline, contact → feedback — examples, not
mandates). No universal glow/lift/scale/shadow/neon/magnetic/3D.
Provide keyboard + touch alternatives. Test desktop/mobile.
Build + checkpoint + stop.

## The audit
Every `:hover` / `:focus` / `:active` rule in the app was enumerated
and classified. Result — most of the site was already
context-specific (redesigned sections deliberately avoided the
universal pattern); the violations were concentrated in the
**button system** and the **back-to-top button**, and the gaps were
in **keyboard coverage** and **touch feedback**:

### Violations found (universal patterns)
| Rule | Offense | Fix |
|---|---|---|
| `.btn--primary` (base) | always-on glow `box-shadow: 0 4px 20px var(--accent-glow)` | removed |
| `.btn--primary:hover` | lift `translateY(-2px)` + larger glow | → **fill deepens**: `linear-gradient(135deg, accent-dark, accent)` — the button reads as "press-ready" with zero motion |
| `.btn--outline:hover` | lift + glow | → tint fill only (`rgba(59,130,246,0.1)`) |
| `.btn--ghost:hover` | lift | → tint + border + color only (kept) |
| `.back-to-top` (base) | always-on glow | removed |
| `.back-to-top:hover` | lift `translateY(-3px)` | → darker fill only |

The press **ripple** (`.btn:active::after` scale-out) was kept —
"buttons → press" is exactly the context the task asks for; a press
ripple is press feedback, not a hover scale.

### Gaps found
- **Keyboard**: `.hero__action`, `.about__action`,
  `.services__cta-link`, `.back-to-top` and the projects-case
  `.btn` had **no** `:focus-visible` rule (the `.btn` rule was
  scoped to the contact form).
- **Touch**: `:hover` never fires on touch and no `:active` press
  state existed for the link-style actions (only `.btn` had one).
- **Experience**: zero interaction on the entries.

## What changed (all in `style.css`)
1. **Buttons → press/focus.** Removed the three hovers' lift/glow and
   the primary's static glow; primary hover now deepens the fill.
   Ripple press + `:focus-visible` retained.
2. **Back-to-top → press/focus.** Glow and lift removed; hover/press
   = darker fill; gained `:focus-visible`.
3. **Keyboard coverage completed.** `.btn:focus-visible` is now
   global (covers the contact compose button *and* the projects-case
   GitHub button); `.hero__action`, `.about__action`,
   `.services__cta-link`, `.back-to-top` joined the site's square,
   high-contrast outline convention. (lightningcss merges the
   navbar trio + new group into one 8-selector rule in the build.)
4. **Touch alternatives.** New §17B block: `:active` press feedback
   mirroring each element's own hover — hero/about actions (tint +
   border), primary hero action (deeper fill, mirrors the button),
   nav CTA, services CTA (color + arrow gap), back-to-top (darker
   fill), project rows (number + tile, same as hover). Color/fill
   only — **no transforms on any press state**.
5. **Experience → node response.** With one period there is no
   multi-node timeline (Phase 14 decision), so the entry **index** is
   the node: hover underlines it (no color change — it's already the
   accent — no motion).
6. **Kept (already context-specific, verified):** header nav
   color + numbered-index accent; CTA arrow nudges (nav/hero/about);
   skills token border+color; projects row number+tile reveal;
   services CTA directional gap; contact channel rows + social
   buttons border+color; form field focus ring (contact → feedback);
   footer quiet color-only hover; skip-link reveal; logo bracket
   color shift; scrollbar thumb.

## The resulting invariant (asserted in the test suite)
- **Zero** `translateY(-2px)` / `translateY(-3px)` anywhere in the
  built CSS — no lift exists.
- **Zero** glow shadows — the complete box-shadow inventory is
  exactly: loader pulse keyframes (×2), the experience CURRENT status
  dot pulse (×2), and the form focus ring (×1). The status dot and
  loader are non-interactive ambient states (pre-existing, separate
  audit items), not interaction effects.
- No `:hover` rule uses `scale`/`blur`/`backdrop-filter`; no
  `:active` rule uses any transform (except the kept press ripple).
- Every interactive element (`a[href]`, `button`, `input`,
  `textarea` — 30+ in the DOM) is natively focusable with a visible
  focus state; no tabindex traps.
- No interaction rule is gated inside a viewport media block —
  desktop and mobile behave identically except viewport layout.

## Verification (35/35 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 37.04 kB / JS 264.65 kB);
  lint 0 errors, 3 pre-existing warnings.
- jsdom + built-CSS simulation: universal effects eliminated (exact
  built strings + full shadow inventory), button press/focus,
  link context responses kept, all seven touch `:active` states,
  complete keyboard coverage (8-selector merged rule + contact trio
  + footer + form ring + native focusability), context responses
  (skills/projects/services/experience/contact), media-gate check,
  **behavior smoke** (contact form still validates honestly; valid
  submit still composes the real mailto) and full regression
  (7 sections, 6 nav, footer 10 links, 0 dead links, 0 `<img>`,
  0 console errors).
- Regression suites re-run: Phase 16 contact 33/33, Phase 17 footer
  33/33 — both still green.
- Documented env limit (as Phases 07–17): no real-browser visual
  pass possible in sandbox; `:hover`/`:active` states are verified
  by their exact compiled CSS, not by emulated pointer states.

## Still open (deliberately NOT assumed)
- `prefers-reduced-motion` pass (separate audit item — the
  remaining motion is the arrow nudge, ripple, AOS and the two
  ambient pulses).
- Stats band ("15 Happy Clients" unsupported); CV file; cursor
  width-gate bug; 1.8 s loader; dead Button.tsx; 3 lint warnings.
