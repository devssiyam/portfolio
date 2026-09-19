# Phase 20 — Responsive QA (COMPLETE)

## Task
Test at 1440, 1280, 1024, 820, 768, 600, 480, 390, 360 px. Check
overflow, clipping, overlap, spacing, typography, grids, nav, images,
touch and mobile composition. Fix only genuine responsive problems.
No redesign, no generic mobile patterns. Build + checkpoint + stop.

## Method (documented env limit)
No browser exists in this sandbox (jsdom has no layout engine), so
"test at width W" was done by **computing the effective CSS cascade at
each width from the built CSS** (a mini cascade simulator: parses the
minified output, applies base + every `@media (width<=N)` block with
W ≤ N, later-wins per property) and analyzing layout-critical
declarations — grid tracks, fixed widths vs available width,
`white-space`, z-order, paddings, tap-target metrics — plus DOM
structure checks in jsdom. What this catches: grid/track errors,
fixed-width overflow, clipping configuration, stacking order, spacing
steps, typography scale steps, missing media coverage. What it cannot
catch: pixel-level text reflow — mitigated with conservative
font-metric models (worst case 0.52 em/char for Geist 500) and
content-measured line lengths (e.g. the code card's longest line).

## The sweep — what was checked at all 9 widths
- **Grids**: hero (7/5 → 1fr), about (7/5 → 1fr @1024), stats
  (4 → 2 @1024), contact (1fr/1.6fr → 1fr @1024), projects rows
  (64px → 48px glyphs @480), experience rows (64px/1fr → 1fr @768),
  service rows (1fr @480), contact rows + socials (stack @480).
- **Overflow/clipping**: every fixed-width element vs available
  width at each width; the hero code card's `white-space: pre`
  snippet (longest line measured: **24 chars** ≈ 184 px < 264 px
  usable at 360 — fits, no fix needed); long contact values
  (`overflow-wrap: anywhere`); `section { overflow: hidden }`
  prevents AOS offsets from creating page-level scroll.
- **Overlap**: mobile sheet z-order (overlay 998 < sheet 999 <
  navbar 1000); fixed elements (back-to-top, loader) at 360 px.
- **Spacing/typography**: `--section-pad` steps 100/70/60;
  `--nav-height` 70/60; container padding 32/24 px;
  `.section-title` clamp → 1.8rem @480.
- **Nav**: desktop row capacity (below), mobile sheet structure +
  tap targets, hamburger states.
- **Images**: zero `<img>` (site is image-free); SVG glyphs are
  fixed-size and step down at 480 px.
- **Touch**: mobile menu link tap height (54 px), CTA row (44+ px,
  full-width), social buttons 42 px, back-to-top 46 px.
- **Composition**: desktop two-col / tablet mixed / phone fully
  single-column + centered footer, at every width.

## Genuine problems found — 2 (both fixed)

### F1 — Mobile nav sheet clipped on short viewports (clipping)
The sheet (fixed under the 60 px header) holds 6 links (≈ 54 px
each) + the full-width CTA row + padding ≈ **410 px of content**.
On short viewports — landscape phones (640×360, 812×375), tablet
landscape (≈ 744×390) — the sheet extends past the bottom of the
screen and, having no `max-height`/`overflow`, the lower links and
the CTA were **clipped and unreachable**.
**Fix** (in the @768 sheet rule): `max-height:
calc(100vh - var(--nav-height))` + a `100dvh` override line
(progressive) + `overflow-y: auto`. The sheet scrolls internally;
nothing else changes.

### F2 — Desktop nav row over capacity at 769–~818 px (overflow)
At 769 px the container offers **705 px**; the worst-case (wide
font metrics) row — logo ~100 px + six numbered links (~509 px
with base .65rem padding) + the "Hire Me" CTA (~106 px incl. its
8 px margin) + 2×32 px gaps — needs **~747 px**: ~42 px over,
worsening toward 769. At 820 px it was ~22–40 px over depending on
font metrics — exactly the task's 820 test point.
**Fix** (in the existing @1024 block, which covers 769–1024): the
row compresses for that band only — `.nav` gap 32→16 px,
`.nav__link` padding .65rem→.5rem, CTA margin 8→0 + padding
.8rem→.7rem-equivalent (0.65rem/0.8rem). Savings ≈ 59 px →
worst case **669 px vs 705 px** (36 px headroom). Same elements,
same design, spacing only. Above 1024 the base spacing is
unchanged (756+ px available).

## Not problems (checked, no change)
- Hero code card snippet fits at 360 px (measured above).
- Stats at 2-col/360 px: numbers stay inside their items (no
  clipping — no `overflow:hidden` on the items).
- `.form-group` inputs stretch full width via column-flex
  (no `width:100%` needed).
- 36 px hamburger: pre-existing design, not a responsive defect
  (left as-is per "do not redesign").
- No scroll hijacking, snap, particles, blobs, parallax, 3D, or
  blur exist (verified absent — inherited from Phases 18/19).

## Verification (60/60 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 37.57 kB / JS 265.43 kB);
  lint 0 warnings, 0 errors.
- Cascade sweep at all 9 widths (grid tracks, fixed-width overflow
  guard, typography steps) + nav capacity model + both fixes
  asserted against exact built-CSS strings + overflow/clipping/
  overlap/spacing/composition/touch guards + DOM structure (zero
  `<img>`, snippet line length, 7 sections, 0 console errors).
- Regression suites re-run: Phase 16 contact 33/33, Phase 17
  footer 33/33, Phase 18 interactions 35/35, Phase 19 motion
  30/30 — all still green.
- Documented env limit: no real-browser visual pass; pixel-level
  reflow is approximated with conservative metric models — the two
  fixes are robust to that uncertainty (headroom margins, not
  edge-fits).

## Still open (deliberately NOT assumed)
- Stats band content ("15 Happy Clients" — unsupported).
- CV file; 1.8 s loader duration; dead Button.tsx.
