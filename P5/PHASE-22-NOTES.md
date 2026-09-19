# PHASE 22 — PERFORMANCE QA

**Status:** COMPLETE — 4 optimizations applied (all justified), 10+ areas
audited and deliberately left alone (documented below).
Suite: 46/46. All 7 regression suites green. tsc 0 errors. oxlint 0/0.

## Method

No browser in sandbox → no paint/composite profiling. Audited instead:
static asset graph (dist), built-CSS keyframe/transition property analysis,
source-level listener inventory (passive flags, cleanup balance), and runtime
behavior in jsdom (getBoundingClientRect call counts as the scroll-work proxy,
rAF-throttle timing, DOM size, listener bail-outs). Documented limit: real
device frame timing is not measurable here; every fix removes a provable
cost class (dead download, per-frame DOM scan, non-compositor keyframe,
idle animation), not an unproven one.

## Audit by area — findings

| Area | Finding | Action |
|---|---|---|
| Images / formats | **Zero `<img>` in the site, zero image files in dist, zero `url()` refs in the built CSS**; project tiles are inline SVG; favicon is an inline data URI (0 requests) | Nothing to optimize — verified, not assumed |
| Fonts | 4 Google families; **Lora (roman + italic variable woff2) had zero consuming elements** — its only CSS consumers (`.testimonial-card__*`) died with the testimonials section (Phase 15) | **P1** |
| Lazy loading | No images → nothing to lazy-load; below-the-fold content is plain DOM | n/a |
| Bundle / deps | JS 265.95 kB min / **80.96 kB gz**; dominated by React 19 + react-dom (unavoidable); dead Button.tsx provably absent from bundle; single page, one render — no deferred content worth splitting | No code-splitting (documented below) |
| Listeners | 3 window-scroll listeners, all `{ passive: true }`, all cleaned up on unmount, all single-instance; every addEventListener has a removeEventListener (per-file balance verified); cursor bails entirely on coarse pointers (Phase 19) + rAF idle-stops | **P2** (AOS scan) |
| Animation | Keyframe property audit: only `loaderPulse` animates `box-shadow`; the 2 status dots animated `box-shadow` **infinite** (repaint every frame, forever); the loader pulse kept repainting its hidden box after 1.8 s; mobile sheet transitions only opacity/transform/visibility; **no transition anywhere on a layout property** | **P3**, **P4** |
| DOM / layout | 505 nodes (small); no `backdrop-filter`, no `will-change`, no `position:sticky`; all persistent effects are transform/opacity | None needed |
| Mobile | 81 kB-gz JS, variable fonts (3 requests), passive listeners, cursor rAF loop absent on touch, `100dvh` nav sheet (Phase 20) | Covered by P1–P4 |

## Optimizations applied

**P1 — Dead font removed (`index.html`)**
`Lora:ital,wght@0,400..700;1,400..700` dropped from the Google Fonts URL.
Nothing on the page uses `--font-serif` (the 4 dead testimonial CSS rules
remain but match no elements; the token's Georgia fallback covers any
future use). Saves the Lora roman + italic variable woff2 downloads
(2 font files) on every visit. Zero visual change — provably no consumer.

**P2 — AOS scan self-terminates (`useAosReveal.ts`)**
The reveal scanner ran `querySelectorAll('[data-aos]')` +
`getBoundingClientRect()` on every element **every scroll frame, forever**.
Now, with behavior unchanged (same 80 px threshold, same delays, same
class): (a) the 23-element list is cached once (DOM is static — every
section mounts at App mount); (b) revealed elements are skipped (the class
is never removed), so rect reads only happen for elements that can still
change; (c) once all are revealed the scroll/resize listeners detach for
good. Verified in jsdom: 0 rect reads after full reveal (listeners gone),
and 20 scroll events in one frame → exactly 1 scan pass (rAF throttle
intact).

**P3 — Status dots: box-shadow keyframe → compositor-only glow**
The hero kicker dot and experience period dot ran
`animation: dotPulse 2s infinite` animating `box-shadow` (5 px → 15/30 px)
— a main-thread repaint of both dots every frame for the entire session.
Now: static 5 px base shadow on the dot + a shared `::after` glow layer
(`inset: 0` → identical shadow geometry to the old keyframe) animated with
`opacity` + `transform: scale(0.4→1)` only — compositor-only. The 0 % and
50 % keyframe states composite to the same stills as before (base 5 px
glow; base + full 15/30 px glow); the scale mirrors the old blur shrink.

**P4 — Loader pulse stopped when hidden (`style.css`)**
The loader stays in the DOM after its 1.8 s (hidden, not unmounted — the
original's structure, kept). Its `loaderPulse` (box-shadow, infinite) kept
repainting an invisible box forever. `.loader.done .loader__logo {
animation: none; }` — one rule, no visual change (element is `opacity: 0`
at that point).

## Deliberately NOT changed (justified)

- **No code-splitting**: single page, everything needed for first paint;
  81 kB-gz is one request; splitting adds waterfall for no LCP win.
- **Cursor `left/top` positioning** (2 tiny fixed divs, rAF-throttled,
  idle-stopped, touch-gated): layout cost is negligible and moving to
  `transform` would collide with the CSS class `transform` states
  (`translate(-50%,-50%) scale(…)`). Not justified.
- **ScrollProgressBar** reads `scrollY` + `scrollHeight` per scroll event
  (two cheap property reads) and writes a compositor-only `scaleX`;
  rAF-gating it would shave work that is already sub-frame.
- **`useScrollThreshold`** (2 instances): a boolean compare per event;
  React bails on unchanged state, so re-renders happen only at the
  threshold crossing.
- **Loader box-shadow pulse while visible**: finite (1.8 s), one small box;
  converting it would not be worth the complexity (and P4 kills the idle
  cost).
- **`content-visibility: auto`** on off-screen sections: the page is small
  (505 nodes, ~38 kB CSS) and `contain` would interact with anchor-scroll
  offsets and the loader-coupled reveal timing. Not justified.
- **Google Fonts stylesheet is render-blocking**: the page is
  JS-rendered anyway (empty `<body>` until React mounts), the font CSS is
  tiny, and preconnect is already in place. No preload targets needed
  (no images, no pinned woff2 URLs to name).
- **StrictMode**: no overhead in production builds.
- **`loaderPulse` stays a box-shadow keyframe** (only consumer is the
  1.8 s loader; P4 handles the idle case).

## Verification

- `npx tsc --noEmit` — clean; `oxlint` — 0/0 (36 files)
- Production build: CSS 37.95 kB (7.47 gz), JS 265.95 kB (**80.96 gz** —
  no bloat vs Phase 21's 265.72 kB min)
- **perf suite 46/46**: 14 asset/font checks, 18 built-CSS pattern checks
  (keyframe property audit, transition property audit, passive flags),
  2 source listener-hygiene checks, 10 runtime checks (DOM size, cursor
  bail-out, AOS end-to-end reveal, stop-path detach, rAF throttle
  20→1 scan, skip-revealed 0 reads, progress-bar math)
- Regressions: a11y 88/88, responsive 60/60, contact 33/33, footer 33/33,
  interaction 35/35, motion 30/30, experience 28/28
  - Suite updates (intentional): motion keyframe list + dot-glow
    occurrence count (P3's combined `::after` rule); interaction
    box-shadow inventory 5→6 (P3's static base on both dots);
    experience dot-glow identity assertion (P3) + 3 stale P14-era checks
    brought to current reality (#testimonials removed Phase 15; Stats
    band anchorless; cursor absent under coarse-pointer emulation,
    Phase 19 gate)
