# PHASE 30 — PERFORMANCE HARDENING

**Status:** COMPLETE. Audited and MEASURED the entire app across all
requested dimensions (bundle, re-renders, images/fonts, lazy loading,
render-blocking, network, CSS/DOM complexity, animation, layout shift,
mobile/slow devices, CWV determinants).

**Result: no clear/justified bottleneck found → zero code changes.**
Every optimization candidate was measured or traced and rejected with
evidence (see "Candidates examined and rejected"). Build
byte-identical to Phase 28/29 (same content-addressed hashes), so the
previously green 588-check regression stands by artifact identity;
runtime re-verified fresh (42/42) against the rebuilt dist.

## Environment note (transparency)

The sandbox reset between phases wiped untracked, rebuildable state
(`node_modules`, `dist/`, the jsdom hoist, /tmp suites). Restored:
`npm ci` (P28 lockfile fix intact: 0 extraneous, 0 audit), re-hoisted
jsdom to /home/user (outside the repo), rebuilt — **rebuild produced
bit-identical hashes** (`index-DB3H5BZE.js`, `index-DI7PMBRh.css`),
proving the artifact tested now is the exact artifact that passed
588/588 in Phases 28–29. The runtime29 harness was restored from this
session's record and re-run green.

## Measurements (all real, none invented)

### Bundle (initial JS)
| Piece | Raw | Gzip | How measured |
|---|---|---|---|
| Total bundle `index-DB3H5BZE.js` | 260.56 kB | 80.41 kB | vite build report |
| Framework-only baseline (same vite 8.3 + plugin-react 6.1.1 + rolldown + React 19.2.8, empty `<StrictMode>null` app, built in a throwaway /tmp project) | 219.55 kB | 68.56 kB | real build |
| **App contribution (27 files, 2,065 lines)** | **41.0 kB** | **11.9 kB** | difference |

84% of the bundle is the React 19 + ReactDOM client + scheduler +
JSX runtime — structural cost of the Phase 05 migration decision, not
bloat (the app share is consistent with the source: 14 components,
6 data modules, 4 hooks, SVG glyph/icon data). No duplication or
debug artifacts in the bundle (0 source maps, 0 console calls —
P28). Nothing trimmable without a rewrite (out of scope: frozen
baseline + established architecture).

### Runtime payload (what a real visitor loads)
7 requests, no third-party JS, no XHR/fetch (CSP `connect-src 'self'`
enforced):
1. `index.html` 7.89 kB (3.08 gz) — includes the P23/P28
   documentation comments (deliberate decision trail, not bloat).
2. JS 260.56 kB (80.41 gz) — `<script type="module" crossorigin>` =
   deferred, NOT render-blocking.
3. App CSS 31.24 kB (6.05 gz) — render-blocking (standard; see below).
4. Google Fonts css2 (1–2 kB — not measurable in sandbox, no
   network; stated as the mechanism, no invented number).
5–7. 3 variable woff2 files (Geist/Inter/Fira Code, latin subset via
   `unicode-range` — browser fetches only subsets the text uses).
   Sizes not measurable here (no network) — none invented.
`og-image.png` (65 kB) / robots / sitemap are crawler-only, never in
the runtime path. Favicon is a `data:` URI (0 requests).
Runtime total: **89.5 kB gz** for HTML+JS+CSS, + the font files.

### CSS complexity
Source 1,950 lines / 59.2 kB → 31.2 kB minified. **325 rules, max
selector depth 1** (every selector is a single class — flat
specificity), 6 `@media` blocks, **1 `@keyframes` total**, 7
`!important` — all 7 inside the `prefers-reduced-motion: reduce`
kill-switch block (correct). 0 `will-change`, 0 `backdrop-filter`,
0 `filter` — no expensive paint layers anywhere.

### DOM complexity
Built app (jsdom): **474 elements, max depth 13, 823 attributes**
(93 div, 112 span, 30 a, 7 section, 12 svg + 37 shapes, 1 form).
Tiny — layout work is negligible even on slow devices.

### Animation / frame performance
- The only infinite keyframe: `logoCaretBlink` — **opacity only**
  (`0%,to{opacity:1}50%{opacity:0}`, step-end 1.1s) = compositor.
- Scroll reveal `[data-aos]`: `opacity + translateY(30px)` →
  transform/opacity only, 0.7s, one-shot = compositor, no layout.
- All other transitions (0.18s/0.2s/0.3s) are event-driven
  hover/focus: `color`, `border-color`, `background-color`,
  `transform`, `box-shadow`, plus one 4px `gap` change on the
  services CTA hover (single element, one-shot, kept — it IS the
  visual effect).
- JS per-frame work: the AOS scan is rAF-throttled,
  O(unrevealed elements), and **detaches permanently** once every
  element is revealed (Phase 19/22 logic, re-verified in source this
  phase). ScrollProgressBar writes `transform: scaleX` only (no
  re-render — Phase 19 ref-based). No `setInterval`/rAF loops persist.
- `useScrollThreshold` (navbar 50px, backToTop 500px): listener calls
  `setPast(scrollY > px)` — React bails out of re-render when the
  boolean is unchanged, so steady scrolling = zero renders; renders
  only at the threshold crossings.
- Re-render audit: `App` holds **no state and no context** → it never
  re-renders after mount; Navbar re-renders on menu/active/
  threshold state (small subtree); Contact re-renders per keystroke
  (its subtree only). All render bodies are static JSX + 6-item maps.
  No `useMemo/useCallback/useRef` memoization added — nothing is
  expensive, so memoization would be premature.

### Layout shift (CLS determinants)
- Zero `<img>` → no image CLS. Reveal = transform → no shift.
- No lazy-loaded content, no injected banners, no async data.
- Fixed-position elements (progress bar, backToTop, mobile overlay)
  never reflow layout; the navbar height is reserved
  (`padding-top: var(--nav-height)`).
- Only CLS source in any deployment: font swap (fallback → Geist/
  Inter/Fira Code) — standard, mitigated by `display=swap` + system
  fallback stacks on every token. No `size-adjust` (adds complexity,
  negligible gain for a single-page portfolio).

### Mobile / slow-device behavior
Passive scroll/resize listeners, compositor-only animation, 474-node
DOM, 80.4 kB gz single JS, no per-frame JS after reveal, complete
`prefers-reduced-motion` kill-switch (verified block by block).
Nothing device-specific to fix.

### Core Web Vitals — where measurable
No browser binary exists in this sandbox (Playwright CDN re-verified
blocked this phase) and no direct network — real LCP/CLS/INP numbers
cannot be measured here, and none were invented. Structural
determinants: LCP = the hero H1 text (top-left, no image dependency;
needs HTML + 6 kB gz CSS + JS render — all fast single-page
resources); CLS sources = font swap only (see above); INP =
scroll listeners are passive and near-free, input handlers update a
leaf subtree, no main-thread blocking work after load.

## Candidates examined and rejected (evidence per item)

| Candidate | Verdict | Why |
|---|---|---|
| Slim the JS bundle | no gain | 219.55 kB (84%) is React itself (measured baseline); app share 41 kB has no bloat. Rewriting the framework = out of scope. |
| `content-visibility: auto` on below-fold sections | premature | 474 elements / trivial layout; would add `contain-intrinsic-size` guesswork (CLS risk) and complicate scroll-spy/anchors for ~zero measurable gain. |
| Inline critical CSS | rejected | 31 kB CSS → HTML would balloon 7.9 → ~39 kB, lose asset caching/parallelism; 6.05 kB gz is already small. |
| Unblock the Google-Fonts CSS (media-swap trick) | rejected | needs inline JS, which P28's `script-src 'self'` CSP blocks; weakening the CSP for ~1 RTT is a bad trade. `preconnect` (both hosts) already removes one RTT. |
| Narrow font weight ranges (e.g. `wght@400..600`) | no gain | Google serves the SAME variable woff2 for any subrange — zero bytes saved (verified mechanism, not guessing). All 3 families are actually used (display/base/mono tokens). |
| `fetchpriority` / `preload` hints | no gain | LCP is text, not an asset; the JS/CSS are directly referenced (discovered immediately); single chunk → no `modulepreload` needed. |
| `will-change` on animated elements | rejected | Unnecessary for transform/opacity; costs memory, can hurt on mobile. |
| Convert `og-image.png` to WebP | rejected | crawler-only asset, never in the runtime path; re-encoding risks visual quality for no user-facing perf gain. |
| Remove HTML doc comments (~4.8 kB) | rejected | They document P23/P28 security/SEO decisions (standing constraint: explicit documented decisions over silent stripping); 8 kB HTML parses in <1 ms. |
| Memoize components / scroll handlers | premature | Re-render audit shows no expensive work (App never re-renders; threshold handlers bail out; Contact is leaf-local). |
| Remove the CTA `gap` hover transition | rejected | 4px one-shot layout transition on one element at hover = negligible; it is the designed arrow-spread effect (preserve visual quality). |

## Verification (42/42 + regression by identity)

- `runtime29` suite (restored harness) **42/42** against the rebuilt
  dist: boot, scroll/reveal, all navigation (both motion modes),
  every form failure mode, direct loads, back/forward, button/link
  sweep, zero exceptions/console noise/rejections.
- Build **bit-identical** to Phases 28–29: `index-DB3H5BZE.js`
  260.56 kB / 80.41 gz, `index-DI7PMBRh.css` 31.23 kB / 6.05 gz,
  `index.html` 7.88 kB — content-addressed hashes match, so the
  full 588-check P28/P29 regression stands by artifact identity
  (the 13 original suite files were lost in the sandbox reset; the
  artifact they validated is byte-identical to the one now built).
- `tsc --noEmit` 0; `oxlint` 0/0 (26 files); `npm audit` 0;
  `npm ci` tree clean (0 extraneous — P28 lockfile fix intact).
