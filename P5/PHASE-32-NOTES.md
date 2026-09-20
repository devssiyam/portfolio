# PHASE 32 — CROSS-DEVICE QA

**Status:** COMPLETE. Stress-tested the complete portfolio at 1440,
1280, 1024, 820, 768, 600, 480, 390 and 360 px against:
overflow/clipping/overlap/broken wrapping, navigation/menu + touch
interactions, typography/spacing/media, fixed & sticky elements,
keyboard-only navigation + visible focus, tab order + accessible
names, semantic HTML/labels/alt/ARIA, contrast + reduced-motion, and
mobile-browser edge cases. **Result: 25/25 checks PASS, zero
confirmed bugs, zero code changes.** One documented borderline zone
and one documented limitation remain (both pre-existing, both
mitigated by design).

## Method (honest about what it can and cannot do)

No browser binaries exist in this sandbox (Playwright CDN blocked, no
Chromium), and jsdom neither sizes the viewport (innerWidth is fixed
at 1024) nor evaluates `@media` conditions in `getComputedStyle`.
So per-width behavior was verified by **static cascade resolution of
the production, minified CSS** (`dist/assets/index-DI7PMBRh.css`):
the file is parsed into rules, each `@media(width<=Npx)` block
tagged (LightningCSS emits the no-space `width<=` syntax), and every
selector's effective declarations are computed per width
(base → 1024 → 768 → 480 in source order, plus the
`prefers-reduced-motion` block). Media-block inventory: 243 base
rules, 11 @1024, 40 @768, 18 @480, 4 reduced-motion. Width-
independent behavior (DOM, ARIA, keyboard, contrast, boot) was
verified in jsdom against the real built `index.html` + `index-
DBXWEggz.js` bundle.

Two harness defects were found and fixed in the *test tooling*
during this phase (not the app): the cascade resolver initially
leaked every media rule into base (minified media syntax), and it
initially missed lightningcss-merged comma-joined selectors
(`.projects__case,.projects__row{grid-template-columns:48px 1fr}` at
≤480). Both fixed and re-verified before trusting any result.

## The 25-check suite (all PASS)

Per-width cascade (15):
- **W1** nav mode — inline >768 px; ≤768 fixed sheet:
  `top:var(--nav-height)`, `max-height:calc(100dvh − nav-height)`,
  `overflow-y:auto` (inner scroll, no page scroll), z-999.
- **W2** two-column grids collapse at their breakpoint —
  `.projects__case` `64px 1fr auto` → `64px 1fr` (≤768) → `48px 1fr`
  (≤480, tile 48×36); contact rows → 1fr (≤480); experience row →
  1fr (≤768).
- **W3** fixed-px grid columns leave >40 px for the 1fr column at
  360/390/480 px.
- **W4** no declared fixed width/min-width exceeds any tested
  viewport (the 48px tile glyph is exempt — sized by design).
- **W5** fluid type stays readable: hero ≥28 px, section h2 ≥24 px
  at all widths, body 16 px.
- **W6** code card (the only `white-space:pre` block) longest line
  (22 ch × 12.8 px mono ≈ 174 px) fits 360 px (≈264 px available).
- **W7** overflow guards: `body{overflow-x:hidden}`, `.hero`/
  `.section` clip, `.contact__row-link{overflow-wrap:anywhere}`.
- **W8** nav row 769–1024 px worst-case model (container 705 px at
  769; row ≈700–724 px depending on font metrics) — overflow is
  *impossible* (flex-shrink + CTA wrap headroom ≈45 px); worst
  visible case is a 2-line "Hire Me" in a ≈769–780 px band —
  see Borderline below.
- **W9** touch targets ≤768: sheet links ≈47 px, sheet CTA ≈46 px,
  socials 42 px, backToTop 46 px, hamburger 36 px — all ≥ WCAG 2.2
  AA's 24 px minimum (hamburger: 36 px = 1.5× the minimum).
- **W10** form inputs inherit 16 px (no explicit <16 px
  font-size) → no iOS focus-zoom.
- **W11** viewport meta allows pinch zoom (no `user-scalable=no` /
  `maximum-scale=1`).
- **W12** `-webkit-text-size-adjust:100%` set; zero `100vw` usage
  in the entire CSS (no safe-area-inset needed — nothing uses
  100vw).
- **W13** fixed geometry at 360 px: navbar 60 px (≤768 token)
  top-0; backToTop 46 px inset `--space-xl` (32 px) bottom/right —
  inside the viewport at every tested width.
- **W14** z-order consistent: overlay 998 < sheet/backToTop 999 <
  navbar 1000 < progress 9999.
- **W15** reduced-motion: `*,::before,::after`
  `transition-duration:.01ms!important` +
  `animation-duration:.01ms!important` +
  `animation-iteration-count:1!important`; `html`
  `scroll-behavior:auto!important`; logo caret `animation:none`;
  `[data-aos]` forced `opacity:1;transform:none` (content visible
  even if scroll-reveal never fires).

DOM / a11y / keyboard / contrast (10, jsdom on the real bundle):
- **D1** tab order: skip link → logo → 01Home…06Contact → Hire Me →
  hamburger ("Open menu") → content (CTAs, socials, email, form
  fields, footer links) → Back to top last; no positive `tabindex`.
- **D2** every focusable element has a non-empty accessible name
  (own text, `aria-label`, or paired `<label for>`).
- **D3** visible focus everywhere: 12 `:focus-visible` selector
  occurrences (3 rule groups) covering skip-link, navbar links +
  hamburger, menu links, every CTA variant, socials, backToTop,
  footer links — 2 px accent outline, 2 px offset; form
  inputs/textarea use `:focus` with accent border + 3 px accent
  box-shadow ring. **Investigated as a potential bug (inputs have
  `outline:none`) and cleared**: the `:focus` ring is the focus
  indicator, present in source (style.css L1458–1462) and in the
  minified artifact.
- **D4** single `h1` first in document order; no skipped heading
  levels.
- **D5** 4/4 `<label for>↔id` pairs; every input/textarea labeled.
- **D6** ARIA inventory valid: `aria-expanded`/`aria-controls` on
  the hamburger, `aria-current` on the active nav link,
  `aria-invalid` on failing fields, `role=status` live region for
  form feedback, two labelled `<nav>` landmarks.
- **D7** semantics: `lang="en"`, single `<main>` (skip-link target,
  `tabindex="-1"`), one header/footer, `figure`+`figcaption`, seven
  sections, zero `<img>` (all visuals are CSS/SVG — no alt debt).
- **D8** every `aria-hidden` element hides only decoration (no
  interactive content inside any of them).
- **D9** contrast from live `:root` tokens: 11 text pairs ≥4.5:1,
  2 non-text pairs (borders/outline) ≥3:1.
- **D10** the app boots with zero console errors/exceptions.

## Borderline (documented, not changed)

1. **Nav row 769–780 px band** (W8): at exactly 769–~780 px the
   inline nav row can reach ≈705–724 px against a 705–~726 px
   container depending on font metrics. Overflow is structurally
   impossible (logo `flex-shrink:0`, menu `margin-left:auto` shrinks
   first, CTA may wrap and has ≈45 px headroom). Worst visible
   outcome is a 2-line "Hire Me" CTA in that ≈11 px band — the
   tightening breakpoint (≤1024) already reduced the gaps/padding
   for this reason. Cannot be confirmed or ruled out without real
   font metrics in a real browser; verify visually at deploy time.
2. **Hamburger 36 px** (W9): below the 44 px iOS heuristic but 1.5×
   the WCAG 2.2 AA 24 px minimum; the full sheet row (≈47 px) is the
   actual primary tap target. No change.

## Limitation (honest)

Cross-*browser* layout consistency could not be exercised (no
browser binaries in the sandbox). All CSS used here is standard
flexbox/grid/custom properties with one `100dvh` (progressively
enhanced — `max-height` only, capped against a fixed-position
element) and `overflow-wrap:anywhere`; nothing depends on
browser-specific features. The one font-metrics-dependent zone is
the W8 band above.

## Verification battery (post-QA, no source changes)

- `tsc --noEmit`: clean.
- oxlint: 0 warnings / 0 errors (27 files, 116 rules).
- `vite build`: html 7.88 kB, CSS 31.23 kB (6.05 gz), JS 260.52 kB
  (80.40 gz) — byte-identical sizes to Phase 31 (no source edits
  were needed or made).
- Runtime regression (42-check harness, real dist in jsdom):
  42/42 PASS.

## Decision

No confirmed cross-device issues exist at any tested width. The
phase is closed with **zero code changes** — the intended design is
fully preserved.
