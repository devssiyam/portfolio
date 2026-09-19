# Phase 19 — Motion (COMPLETE)

## Task
Audit all motion. Keep animation only when it improves hierarchy,
feedback or storytelling. Reveal/stagger/image/state transitions/
limited parallax only when justified. No motion "because modern
portfolios do". Prefer transform/opacity. No scroll hijacking, snap
scrolling, particles, blobs, constant movement, long animation,
excessive blur, unnecessary 3D. Respect reduced motion. Check
performance. Build + checkpoint + stop.

## The audit — every motion source, classified

### CSS keyframes (6 found → 5 kept, 1 removed)
| Motion | Verdict | Why |
|---|---|---|
| AOS reveals (`[data-aos]`, fade-up, stagger ≤300 ms) | **Keep** | Hierarchy/storytelling; transform+opacity only |
| `loaderPulse` (1 s) | **Keep**, RM-gated | Loading-state feedback, not decoration |
| `loadFill` (1.6 s) | **Keep, converted width → `scaleX`** | Progress feedback; was per-frame layout |
| `logoCaretBlink` (1.1 s) | **Keep**, RM-gated | Code-editor identity (the cursor after `<SIYAM/>`) |
| `dotPulse` (2 s, hero kicker + experience CURRENT) | **Keep**, RM-gated | Status semantics — "available now" / "current role" |
| `blink` (0.9 s, typing cursor) | **Keep**, RM-gated | Part of the typing identity |
| **`scrollBob` (2 s, hero scroll hint)** | **Removed** | Constant decorative motion, zero information; the line + "Scroll" label remain as a static cue |

### JS-driven motion (7 found)
| Motion | Verdict |
|---|---|
| Typing loop (hero code line) | **Keep** — identity storytelling; RM → first phrase, static |
| Count-up (stats, rAF, in-view) | **Keep** — data storytelling; RM → snap to value |
| Smooth scroll (nav + back-to-top) | **Keep** — navigation feedback; RM → instant jump |
| AOS scanner (scroll-coupled) | **Keep, rAF-throttled** (perf) |
| Custom cursor follower (rAF lerp) | **Keep, gated to fine pointers + idle-stop** (perf) |
| Scroll progress bar | **Keep, rewritten** (perf) |
| Contact shake (validation) | **Keep** — error feedback (state transition) |

### Banned-pattern sweep
No `scroll-snap`, no `backdrop-filter`, no 3D transforms
(`perspective`/`rotateX/Y`/`translateZ`/`matrix3d`), no `will-change`,
no particles, no blobs, no parallax — none ever existed in the React
app; asserted absent in the built CSS.

## What changed
1. **`scrollBob` removed** — the only pure "modern portfolio" motion;
   static scroll cue remains.
2. **`prefers-reduced-motion: reduce` respected everywhere**:
   - CSS §20: every animation/transition collapses to ~0; ambient
     pulses stop at their clean static base state (`animation: none`,
     so no held glow frame); carets stay visible (a frozen mid-blink
     would hide them); `[data-aos]` content is always visible
     (never dependent on the scan); `scroll-behavior: auto`.
   - JS: typing → static first phrase; count-up → snap to value;
     smooth scroll → `behavior: 'auto'` (nav anchors and
     back-to-top); the cursor is untouched (RM doesn't remove a
     pointer).
3. **Performance (all behavior-identical)**:
   - **Scroll progress bar**: was React state + `width%` + a 0.1 s
     width transition on every scroll event (re-render + per-frame
     layout). Now a direct `transform: scaleX` write via ref — no
     re-renders, compositor-only, no transition (1:1 scroll tracking
     doesn't need one).
   - **Custom cursor**: (a) the audit's **width-gate bug fixed in
     JS** — the component now renders only for
     `(hover: hover) and (pointer: fine)` devices, so the rAF loop
     and mousemove listeners no longer run on touch devices (the CSS
     already hid it below 768 px but the JS kept running); (b)
     **idle-stop** — the lerp loop parks itself when the follower has
     converged and restarts on the next mousemove (no rAF work while
     the pointer is still).
   - **AOS scanner**: rAF-throttled — at most one DOM scan per frame
     instead of one per scroll event (the loader/initial
     `runCheck()` path is unchanged).
   - **Loader fill + cursor grows**: `width`/`height` animations →
     `transform: scaleX`/`scale` (compositor-only). There are now
     **zero** width/height transitions or animations in the built
     CSS.
4. **Lint hygiene**: `useMediaQuery` rewritten on
   `useSyncExternalStore` (it was on the hot path for the new RM
   gating) — this cleared the **last of the three pre-existing lint
   warnings**; the build is now **0 warnings, 0 errors**.

## Verification (30/30 PASS, 0 console errors, three modes)
- `tsc` 0 errors; build 37 files (CSS 37.34 kB / JS 265.43 kB);
  lint **0 warnings, 0 errors**.
- jsdom, three simulated environments:
  - **A — normal desktop**: count-up runs and lands on targets;
    typing loop is live; AOS reveal end-to-end; anchor + back-to-top
    smooth-scroll (captured `behavior: 'smooth'`); cursor follower
    converges on pointer movement (idle-stop resumes); progress bar
    is full-width scaleX with no width/transition/state.
  - **B — reduced motion**: counters snap to values immediately
    (early read = targets); typing is the static first phrase;
    anchor + back-to-top jump instantly (`behavior: 'auto'`);
    `[data-aos]` override present; zero console errors.
  - **C — coarse pointer (touch)**: cursor not rendered (no rAF, no
    listeners); page fully functional.
- Built-CSS invariants: keyframe inventory is exactly the five
  justified ones (scrollBob gone); hero scroll hint static; loader
  fill scaleX; zero width/height transitions; full
  `prefers-reduced-motion` override set; banned patterns absent; AOS
  stays transform+opacity; stagger bounded ≤300 ms; every transition
  targets paint/transform/opacity properties only.
- Regression suites re-run: Phase 16 contact 33/33, Phase 17 footer
  33/33, Phase 18 interactions 35/35 — all still green (contact
  harness updated to simulate a fine-pointer desktop).
- Documented env limit (as Phases 07–18): `:hover`/`:active` and
  frame-level behavior verified by exact compiled CSS + simulated
  pointer/scroll events in jsdom, not a real-browser visual pass.

## Still open (deliberately NOT assumed)
- Stats band content ("15 Happy Clients" unsupported — content issue,
  not motion).
- CV file; 1.8 s loader duration (source behavior, unchanged); dead
  Button.tsx.
