# PHASE 25 — CODE QUALITY

**Status:** COMPLETE — 4 categories of genuine technical debt cleaned:
2 dead files, 16 dead CSS selectors + 1 dead token, 6 shadowed duplicate
declarations, 1 token-inconsistency. CSS shrank 37.95 → 36.67 kB.
Everything else audited and deliberately kept (documented below).
Suite: 42/42. All 9 regression suites green. tsc 0 errors. oxlint 0/0.

## Method

Systematic, evidence-based — nothing removed on preference:
- **Unused-CSS scanner**: every CSS class selector vs (a) every class
  string in TSX source and (b) the live runtime DOM (jsdom boot).
- **Token audit**: every `:root`/local custom property vs all `var()` usages.
- **Duplicate-selector scan** + **same-scope conflict scan** (property set
  twice with different values at the same scope/width).
- **Import-graph scan** (orphan components/files) + **dependency audit**.
- Every removal re-verified: zero references in source, zero in runtime
  DOM, zero in bundle.

## Debt cleaned

### Dead files (2)
| File | Evidence |
|---|---|
| `src/components/Button.tsx` | Zero importers; proven absent from the bundle (Phase 22: 0 "rippling" matches). Its ripple CSS (`.btn::after`/`.btn:active::after`) IS live (used by `.btn` on the contact/projects buttons) and stays |
| `src/styles/tokens.ts` | Zero importers; its header comment claimed use by `useMediaQuery`/Hero — stale, they pass literal queries |

### Dead CSS (16 selectors + 1 token, zero live consumers)
P06-era typography rules targeting classes that exist nowhere (pre-migration
names): `.hero__badge`, `.project-card__category`, `.service-card__link`,
`.hero__stat-label` (from a compound selector), `.hero__stat-number`,
`.skill-card__name`, `.project-card__title`, `.service-card__title`,
`.about__highlight h4`, `.contact__info-card h4`,
`.testimonial-card__author h4`, `.testimonial-card__quote`,
`.testimonial-card__text`; plus the never-used button variants
`.btn--outline` (+`:hover`) and `.btn--lg`; plus the `--font-serif` token
whose only consumers were the dead testimonial rules (Lora left the font
load in Phase 22; nothing referenced the token since).

### Shadowed duplicate declarations (6 — behavior-identical resolution)
The Phase 06 typography block (authoritative, trailing) overrides these
base-rule values; the stale earlier values were left behind
(`.hero__title` had already been trimmed with a pointer comment in P06 —
this completes the same convention for the stragglers):
- first `:root`: old `--font-base` + `--font-mono` (P06's extended
  stacks are now the single declaration)
- `.form-group label`: `font-family: var(--font-mono)` (P06: display)
- `.stats__number`: `font-weight: 900` + `letter-spacing: -0.04em`
  (P06: 800 / -0.03em)
- `.footer__logo`: `font-weight: 900` (P06: 800)
- `.section-title`: `font-weight: 800` + `line-height: 1.2` (P06: 700 / 1.15)
Each site carries a pointer comment to the P06 block. Computed styles are
byte-identical (cascade: the later rule won before and is now the only rule).

### Token inconsistency (1)
`ScrollProgressBar` inline style used raw `#3B82F6, #8B5CF6` — the only
raw accent literals left in the whole app (CSS is fully tokenized). Now
`var(--accent), var(--accent-2)`. Not a reversal of the Phase 05 decision
(which was about the 1b token set); `--accent` is a core §1 token used
everywhere else.

## Audited — deliberately NOT touched (documented)

- **48 "unused" tokens in the §1b block** (`--success*`, `--code-*`,
  `--dot-*`, `--overlay-*`, `--text-*`, `--weight-*`, `--z-*`,
  `--leading-*`, `--radius-lg/xl`, `--shadow-*`, `--ease-bounce`): the
  Phase 05 block is an **explicitly documented reference set** ("Names
  the values that were already in repeated use… Nothing that already
  used a literal was rewritten to use these — that would be a
  visual-regression risk this phase does not take"). Removing them would
  reverse an explicit documented decision → kept.
- **Literal hex at the `.code-*` / status-dot rules**: same Phase 05
  decision — the tokens exist; the literals stay by design.
- **Duplicate selectors across base + media blocks** (e.g. 4×
  `.hero__title`): legitimate responsive pattern; the same-scope conflict
  scan found **no accidental conflicts** — only the intentional
  `max-height: calc(100vh…) / calc(100dvh…)` fallback pair (Phase 20) and
  the 6 shadowed cases now resolved.
- **Three separate `@media (max-width:768px)` blocks**: fragmentation,
  not conflict — the Phase 20 cascade sweep verified the effective
  result at 9 widths; reordering would be preference.
- **Listeners**: all justified (Phase 22 audit — passive, cleaned up,
  single-instance, each with a distinct responsibility).
- **Dependencies**: all 9 in package.json are used (react/react-dom;
  vite + plugin-react; typescript + @types/*; oxlint). No pruning
  needed. (jsdom for the QA suites resolves from the workspace, not a
  repo dependency — noted, no action.)
- **`.btn:active::after` ripple**: live (used by `.btn`), comment accurate.
- **`a11y`/identity tokens from Phases 21–24**: re-verified intact by the
  suite (regression guard).

## Verification

- `npx tsc --noEmit` clean; `oxlint` 0/0 (34 files, was 36)
- Production build: **CSS 36.67 kB (7.16 gz)** — 1.28 kB / 0.31 gz
  smaller than Phase 24; JS 265.94 kB (82.05 gz), unchanged behavior
- **quality suite 42/42**: 4 dead-code, 17 dead-CSS, 8 shadowed-duplicate
  (incl. built-CSS behavior-identity), 1 full unused-class audit re-run
  (zero real unused selectors remain), 5 token-integrity, 7
  architecture/behavior-preservation (import graph, deps, runtime boot,
  nav, progress bar, form)
- Regressions: a11y 88/88, responsive 60/60, contact 33/33, footer 33/33,
  interaction 35/35, motion 30/30, experience 28/28, SEO 54/54,
  functional 45/45
  - Suite updates (intentional): interaction's `.btn--outline` check now
    asserts removal; contact's P17-era check no longer expects the dead
    `.contact__info-card h4` selector to survive
