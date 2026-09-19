# PHASE 21 — ACCESSIBILITY QA

**Status:** COMPLETE — 11 genuine issues found and fixed (9 contrast, 2 semantic).
Suite: 88/88. All 5 regression suites green. tsc 0 errors. oxlint 0/0.

## Scope (as tasked)

Audit semantic HTML, headings, alt text, keyboard, focus, links/buttons, forms,
ARIA, contrast, and reduced motion. Test keyboard-only navigation. Fix genuine
issues **without damaging the visual identity** and **without adding a11y UI
clutter**. No browser in this sandbox → jsdom + built-CSS cascade/keyword
assertions + WCAG 2.1 relative-luminance math (documented limit: no real
focus paint or layout; keyboard order is simulated via DOM-order focus plus the
CSS cascade, contrast is computed exactly per the WCAG formula).

## Audit results — verified OK (no changes needed)

| Area | Finding |
|---|---|
| Document | `lang="en"`, descriptive `<title>`, meta description, viewport meta |
| Headings | Exactly one `<h1>` (Hero). Six `<h2>` via SectionHeader (one per content section). h3/h4 under them. Full order sweep: **no skipped levels** |
| Landmarks | `header` / `nav[aria-label=Main]` / `main` / `footer` + `footer nav[aria-label=Footer]`. Stats band is intentionally headingless and not a landmark (a `<section>` without an accessible name is a generic container — acceptable) |
| Skip link | First anchor in DOM, `href="#main"`, `#main` has `tabindex="-1"`, hidden until focused, revealed on `:focus`. Smooth-scroll hook **deliberately does not intercept it** (native fragment navigation transfers focus) |
| Mobile menu | `aria-expanded` + `aria-controls="navMenu"`; on open, focus moves to first link; Tab/Shift+Tab **trap** inside the sheet; Escape closes (document-level); focus **returns to the hamburger** on close. `display:none` at base → never in the desktop tab order |
| Forms | Every field has a real `<label for>`. Conditional `aria-invalid` + `aria-describedby` pointing at rendered error ids. `role="status" aria-live="polite"` region for outcomes. `type="submit"` on the CTA. On validation failure, focus **auto-moves to the first invalid field** |
| Links / buttons | All 30 links and 3 buttons have accessible names (visible text or `aria-label`). Icon-only links (socials, back-to-top) carry `aria-label` |
| Images / SVG | Zero `<img>` in the site. All 12 inline SVGs are decorative → `aria-hidden="true"` (verified every one in the DOM) |
| Focus visibility | `:focus-visible` outline on all interactive elements (Phase 18). Form inputs use a visible ring (`border-color` + 3px glow) — the one `outline:none` in the built CSS is the form-group base rule that provides that ring |
| Tabindex hygiene | No positive `tabindex` anywhere (CSS or DOM) |
| Reduced motion | Phase 19 `prefers-reduced-motion: reduce` block intact in the built CSS (all durations → 0.01ms, iteration 1) |

## Issues found and fixed

### Contrast (WCAG 1.4.3 text / 1.4.11 UI — computed on the built tokens)

9 text-contrast failures, all fixed by **hue-family-only** shifts (same hue,
different lightness step — no new colors, no layout changes):

| # | Element | Before | After | Ratio before → after |
|---|---|---|---|---|
| C1 | `--text-muted` (kickers, labels, footer text, placeholders — ~10–12px mono) | `#64748B` | `#8196B4` | 3.75:1 on bg / 3.07:1 on card → **5.90 / 4.83 / 5.40 (card-2) / 6.24 (footer)** |
| C2 | `.contact__error` (11.5px, on card) | `#EF4444` | `#F87171` | 3.89:1 → **5.29:1** |
| C3 | `.btn--primary` gradient (white 14–16px label) | accent → accent-2 | accent-dark → `--accent-2-deep #7C4DEB` | 3.68 / 4.23 → **5.17 / 5.10** |
| C4 | `.btn--primary:hover` gradient | accent-dark → accent | `--accent-dark-deep #1D4ED8` → `--accent-2-deep` | 5.17 / 3.68 → **6.70 / 5.10** |
| C5 | `.section-tag` pill (12.5px bold, all 6 section headers) | `var(--accent)` on 10% tint | `var(--accent-text #5295FB)` | 4.31:1 → **5.32:1** |
| C6 | `.skills__group-num`, `.experience__entry-num` (10.4px, on card) | `var(--accent)` | `var(--accent-text)` | 3.98:1 → **4.91:1** |
| C7 | `.skills__token:hover` (12.5px, on card) | `var(--accent)` | `var(--accent-text)` | 3.98:1 → **4.91:1** |
| C8 | `.contact__row-link:hover` (13.6px, on card) | `var(--accent)` | `var(--accent-text)` | 3.98:1 → **4.91:1** |
| C9 | `.btn--ghost:hover` (GitHub button, on case-study card) | `var(--accent)` | `var(--accent-text)` | 3.98:1 → **4.91:1** |

New tokens: `--accent-text: #5295FB` (lightened accent **for text on card
surfaces only** — fills and icons keep `--accent`, which already passes the 3:1
non-text rule), `--accent-2-deep: #7C4DEB`, `--accent-dark-deep: #1D4ED8`.

Verified passing and left untouched: white on `--accent-dark` states, `#0F172A`
on `--accent` (5.70:1, hero active state + skip-link pill), `--text-secondary`
(5.70:1 on card), accent on `--bg` (4.85:1), all large-text items ≥3.0:1
(loader logo 32px, stats numbers, project numbers), non-text UI ≥3.0:1 (social
icons 3.98:1, back-to-top 3.68:1).

### Semantic (invisible, no visual change)

| # | Fix |
|---|---|
| S1 | Contact `<form>` had no accessible name → `aria-labelledby="contactFormTitle"` on the form, `id` on the existing "Send Me a Message" `<h3>` |
| S2 | 5 decorative SVGs lacked `aria-hidden` (4 shared social icons + back-to-top arrow; 6 project glyph SVGs got it too for consistency) → `aria-hidden="true" focusable="false"` on all |

## Keyboard-only navigation test (jsdom simulation)

All 15 checks pass:

1. First Tab lands on the skip link; its click is **not** intercepted (native
   fragment navigation preserved → browser moves focus to `#main`).
2. Menu open → focus first link; Tab on last wraps to first; Shift+Tab on first
   wraps to last (trap holds); Escape closes and **focus returns to the
   hamburger**.
3. Empty form submit → 3 errors rendered with `aria-invalid` + `aria-describedby`
   wired; **focus jumps to the first invalid field**; errors clear on valid
   input; valid submit announces the outcome through the live region.

## Identity preservation

- No layout, typography, spacing, or radius changes. No new visual UI
  (no visible labels, no role soup, no aria on elements with visible text).
- All color changes stay inside the existing hue families (slate for muted,
  Tailwind red-400 step for the error, blue-700/800 + violet-600-deep steps for
  the button, blue-450 for small card text). The page reads as the same design,
  slightly cleaner on the small labels.

## Verification

- `npx tsc --noEmit` — clean
- `npm run build` — CSS 37.69 kB (7.43 gz), JS 265.72 kB (82.00 gz)
- `oxlint` — 0 warnings / 0 errors (36 files)
- **a11y suite 88/88** (21 computed contrast pairs, 16 built-CSS structural,
  38 DOM semantic, 15 keyboard, 4 runtime hygiene)
- Regressions: responsive 60/60, contact 33/33, footer 33/33, motion 30/30,
  interaction 35/35 (3 assertions updated to the corrected button/skills
  strings — the intended Phase-21 changes)

## Documented judgments (not problems)

- **Form field borders** are the site's hairline aesthetic
  (`rgba(255,255,255,0.07)`). WCAG 1.4.11 non-text contrast is *not* enforced on
  them: fields remain identifiable by label + fill + placeholder, and the focus
  ring is strong (3px glow). Raising every hairline to 3:1 would change the
  look of the whole site — rejected under the no-identity-damage constraint.
- **Stats band** has no heading — acceptable (not a landmark, content reads
  linearly).
- **Skip-link focus transfer** (browser moves focus to `#main` natively) and
  **mailto composition** (jsdom cannot open a mail client) are browser
  behaviors, verified only at the code level.
- Pre-existing `console.log("🚀 Portfolio by…")` in the production bundle —
  out of scope for an a11y task, noted for a future cleanup.
