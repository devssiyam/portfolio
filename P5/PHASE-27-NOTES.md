# PHASE 27 — VISUAL POLISH

**Status:** COMPLETE — a systematic pass over spacing, typography,
alignment, transitions, borders, surfaces, buttons, and whitespace,
based on the actual built CSS (the real visual truth). Exactly
**2 high-confidence inconsistencies** were fixed; everything else was
audited and deliberately left (documented below). No fashionable
effects added. No working behavior touched.

## Method

- No headless browser was available in the sandbox (Playwright's
  Chromium CDN is blocked; no system browser, no root) — so the audit
  parsed the **built, minified CSS** (what the browser actually
  applies) with a brace parser and cross-checked every visual system:
  spacing values, font sizes, radii, borders, transitions, grid
  templates, label columns, panel paddings, kicker/label language.
- The jsdom runtime confirms the DOM/class side (all 12 suites green).
- Rule: a change only if the evidence shows a real inconsistency —
  not taste, not "could be better".

## Fixed (2 — the only off-system values in the sheet)

| Site | Before | After | Why it was a real inconsistency |
|---|---|---|---|
| `.form-group input, .form-group textarea` | `transition: border 0.3s, box-shadow 0.3s` | `transition: border-color var(--transition-fast), box-shadow var(--transition-fast)` | The only interactive control off the site's transition system: raw duration, no easing curve, and the `border` shorthand (which also animates width/style). Every other control — nav links, buttons, actions, tags, socials, rows — is on `var(--transition-fast)` (0.18s, `var(--ease)`) |
| `.nav__logo:hover .nav__logo-bracket` | `transition: color .3s` | `transition: color var(--transition-fast)` | Raw duration, no easing — the same off-system pattern in the only other spot in the sheet |

Effect: the form focus ring and the logo-bracket hover now respond
with the exact timing/curve every other interactive element already
uses. Nothing else changes (same properties, sane duration).

## Audited — verified consistent, left untouched

- **Spacing**: one scale (`--space-xs…4xl`: 4/8/16/24/32/48/96) used
  throughout; the handful of raw values are intentional micro
  adjustments (`.2rem` nudge, `2px` h4 margin, `4px` hamburger,
  `.5em` action gap). No off-scale values.
- **Typography**: coherent steps per role (kickers .62–.78 mono,
  body text .85–1.05, panel titles 1.05–1.3, section titles
  clamp 2–2.8, hero clamp 2.4–4.25). The small per-panel title
  differences (1.6/1.3/1.2/1.05) are the Phase 09–14 hierarchy
  decisions, each in its own context.
- **Alignment/grids**: hero + about both `7fr/5fr`; experience,
  projects, services rows all on a `64px` label column (48px ≤480);
  contact on `90px` (its labels are longer — "WhatsApp", "Location").
  `.projects__case` is `align-items: start` (no stretched button);
  case-file spans `1 / -1` with a hairline.
- **Borders**: 1px everywhere (2px only on the hamburger bars —
  geometry, not a border). Colors: `var(--border)` /
  `var(--border-accent)` / transparent bases. 32 surfaces on the
  same hairline.
- **Surfaces/radii**: `--radius-sm` (6px) controls, `--radius-md`
  (12px) surfaces, `--radius-full` pills, 50% dots — no drift. Panel
  paddings differ by hierarchy (code card 16/24, index 32,
  experience/skills/contact 32/48, form card 48) — deliberate
  weight, each appropriate.
- **Buttons**: `hero__action` ≡ `about__action` (identical rules);
  `.btn` base is variant-complete (every usage carries `--sm` or
  `--full` — no flat, padding-less button exists).
- **Kicker/label language**: all mono + `--text-muted`; 0.04em for
  `//` kickers, 0.08em for uppercase field labels — consistent
  across all 7 label roles.
- **Section rhythm**: shared `SectionHeader` (tag → title → content,
  96px header margin) — identical by construction.
- **Transitions**: after the 2 fixes, **every** transition in the
  sheet is token-based or raw-with-`var(--ease)`; the single raw
  without easing is `visibility .25s` on the mobile sheet — correct
  (stepped property, easing does not apply). Zero transitions on
  layout properties (Phase 22 invariant, re-verified).
- **Whitespace/balance**: hero vertical rhythm (32/24/16/32/24),
  form rhythm (24 between fields, 4 label→input), footer
  (48 top / 16 bottom, 32 above the closing line) — all even and
  intentional.
- **Image crops**: not applicable — the site has zero `<img>`
  elements (suite-verified since Phase 11; the project glyphs are
  inline SVGs).
- **The one considered-but-not-done**: a hairline above the footer's
  closing line (the site's structural idiom elsewhere). The footer
  works and is clean; adding a rule for symmetry would be fashion
  over function. Left.

## Verification

- `tsc --noEmit` 0; `oxlint` 0/0 (27 files)
- Build: CSS **31.23 kB (6.05 gz)** · JS 260.02 kB (80.45 gz) —
  JS byte-identical to Phase 26; CSS +60 B (the longer transition
  values)
- **polish27 suite 12/12**: both fixes asserted in built CSS;
  transition-system invariants (no raw uneased durations, no layout
  props, tokens intact); consistency invariants (radius/border
  systems, grid language, kicker language); runtime (0 errors,
  focus ring declared, 4 form fields, logo present)
- Regressions: a11y 86/86 (its form-rule assertion updated to the
  tokenized transition), responsive 60/60, contact 33/33, footer
  33/33, interaction 35/35, motion 27/27, experience 28/28, SEO
  54/54, functional 45/45, P26 audit 50/50, P25 quality 42/42
