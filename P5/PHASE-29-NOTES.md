# PHASE 29 — RUNTIME HARDENING

**Status:** COMPLETE. Audited the complete app for runtime and failure
cases: console errors/warnings, broken imports/routes/components,
undefined/null/empty states, failed images/fonts/assets, invalid inputs
and form failures, loading/error states, network/slow-load behavior,
refresh/direct-route, back/forward navigation, broken buttons/links,
browser/runtime exceptions.

**Result: zero confirmed app defects → zero code changes.** Every
candidate failure turned out to be either impossible in this codebase,
already guarded, or a test-harness artifact (jsdom spec deviation).
All 13 suites green (588 checks); build byte-identical to Phase 28
(same asset hashes — no source touched).

## Method

- Fresh-eyes read of all 27 source files (2,065 lines) + built bundle.
- API-surface sweep of the production bundle: the only DOM APIs the
  app uses are rAF, IntersectionObserver, matchMedia, scrollTo,
  getBoundingClientRect, getComputedStyle, Element.animate (guarded by
  `typeof`), and addEventListener. `scrollIntoView`, `fetch(`,
  `history.`, `location.`, `localStorage`, `ResizeObserver` hits in
  the bundle are all **React DOM internals** (focus management,
  modulepreload helper, View Transitions) — verified by context
  inspection, zero in app source.
- New `runtime29` suite (42 checks, 8 phases) loads the REAL built
  bundle in jsdom with a zero-tolerance console/error trap and
  exercises every flow: clean boot, scroll/reveal, in-page nav (both
  motion modes), all form failure modes, direct loads, back/forward,
  full button/link sweep.

## Findings per category — all verified clean

| Category | Verdict |
|---|---|
| Console errors/warnings | **Zero** console.error/warn/log/info from the production bundle at boot or through every interaction (A2, H1). |
| Broken imports/routes/components | Build resolves everything; single-page app has no routes to break; all 7 sections + footer + 3 interactive widgets mount (A8). No empty headings, no unlabelled controls (A9). |
| Undefined/null/empty states | No `undefined`/`NaN`/`[object`/`null` anywhere in rendered text (A3). Every data-driven list (projects, skills, services, experience, navLinks) is complete and statically guarded (`featured &&`, `caseStudy &&`). |
| Failed images/fonts/assets | **No `<img>` in the DOM at all** (all SVG inline) — no broken-image surface (A5). Favicon is a `data:` URI. Google Fonts = only external asset; `display=swap` + full system fallback stacks on every `--font-*` token, so a font failure degrades to system fonts. All referenced `/assets/*` + og/robots/sitemap exist in dist (A7). |
| Invalid inputs / form failures | Exercised all of them (D1–D9): empty submit, whitespace-only, 6 malformed emails (→ specific error, focus on first invalid field, `aria-invalid`, shake, **never** a mailto), padded email (correctly accepted after the app's `trim()` — the trimmed value lands in the composed body), unicode/emoji/quotes/newlines/injection payload (URL-encoded, decodes verbatim, zero injected elements), 5,000-char message (composes fine), double submit (two mailtos, no crash), error-clears-on-typing. `shakeInput`'s `Element.animate` is `typeof`-guarded for runtimes without WAAPI (D9). |
| Loading/error states | Static site, zero data fetching → no loading state to fail and no error state to invent (P26 removed the fake loader — decision on record). The form's honest status line (role=status) is the only status and it says exactly what happened (D8). |
| Network / slow-load | Runtime network = same-origin bundle/CSS + Google Fonts only (H2 — canonical/og/JSON-LD are meta, never loaded). No fetch/XHR at app level → nothing to retry, no slow-request UI needed. CSS is not a runtime dependency (E3). |
| Refresh / direct-route | Direct loads at `/#contact`, even an unknown `/#nonexistent` fragment, and with CSS missing entirely all boot the full app with zero errors (E1–E3). |
| Back/forward | The app registers **zero history listeners** (verified in bundle), so back/forward across hash entries cannot break it — exercised, no exceptions, DOM intact (F1). |
| Broken buttons/links/interactions | 29 anchors, all from the allowed set (resolving `#` fragments / `https:` / the real `mailto:` / the real `whatsapp://` deep link) — no dead `#`, no `javascript:`, no mixed content (A4). All 7 `_blank` links noopener+noreferrer (A6) and clickable (G3). All 3 buttons work: hamburger (open/link-close/Escape cycle + focus management, G2), compose (D-series), backToTop (C7). Skip link keeps native fragment navigation with focus transfer (C5). Reduced-motion users get instant jumps (C9). |
| Browser/runtime exceptions | Zero uncaught exceptions, zero unhandled promise rejections across 9 jsdom sessions (A1, A10, H1). |

## Audited and accepted (documented quirks, NOT bugs — behavior preserved)

- **Form status line never resets** after "Opening your email app…" —
  the statement stays true forever; resetting would be invented state.
- **Double submit composes two mailtos** — browser opens two drafts;
  no exception, no data problem (nothing is stored or sent).
- **Mobile menu open + resize to desktop** keeps `body{overflow:hidden}`
  until closed (Escape still works). Identical to the frozen vanilla
  baseline's mechanism (module 4) — preserved by design.
- **Very long composed mailto** — mail *clients* (not the site) may
  truncate huge URLs; the composer only pre-fills the visitor's own
  client. 5,000 chars verified composing cleanly.
- **`cvHref: '#'`** remains in `siteConfig` but is referenced by no
  rendered element (the dead CV button was removed in Phase 09; a real
  CV file still does not exist).

## Harness notes (why this needed care)

jsdom deviates from the DOM spec: it runs element **activation
behavior even for script-dispatched events** (EventTarget-impl.js), so
a dispatched click on the detached mailto composer anchor queues a
fake "navigate to mailto:" and logs a jsdom not-implemented error.
Real browsers never run activation on dispatched events, and the
composer's actual `.click()` opens the mail client — the suite
dispatches synthetic clicks only for in-document anchors. `window.eval`
of the bundle, native value-setter + `input` events for controlled
inputs, and real `click()` for the skip link (to exercise native
fragment navigation) are the other jsdom specifics the suite handles.
**No browser binary exists in this sandbox** (Playwright CDN still
blocked — re-verified this phase), so runtime verification = jsdom
sessions + static API-surface analysis of the production bundle; every
API the app calls is standard and universally supported in modern
browsers.

## Verification (42/42 + full regression)

- `runtime29` suite 42/42 (A clean boot ×10, B scroll/reveal ×4,
  C navigation ×9 incl. reduced-motion, D form failures ×9,
  E direct-route ×3, F back/forward ×1, G button/link sweep ×3,
  H global state ×2).
- Regressions: P28 security 31, P26 audit 50, a11y 86, responsive 60,
  contact 33, footer 33, interaction 35, motion 27, experience 28,
  SEO 54, functional 45, P25 quality 42, P27 polish 12 — **all green
  (586 checks; 588 total with runtime29)**.
- `tsc --noEmit` 0; `oxlint` 0/0 (26 files).
- Build unchanged: CSS 31.23 kB (6.05 gz) `index-DI7PMBRh.css`, JS
  260.56 kB (80.41 gz) `index-DB3H5BZE.js`, index.html 7.88 kB.
