# Phase 17 — Footer (COMPLETE)

## Task
Redesign ONLY the Footer as a natural closing point for this specific
portfolio. Use available identity, navigation, contact/social links and
copyright. No generic portfolio footer. No huge link grids, excessive
icons, giant CTA or clutter. Verify links + responsive behavior.
Build + checkpoint + stop.

## Design: "the last line"
The footer closes the page the way the portfolio itself talks — quiet,
solid, mono-kicked — instead of reopening it. One row, hairline below,
copyright bar. Four decisions keep it specific rather than generic:

- **No CTA.** The Contact section directly above *is* the call to
  action; a footer "Let's work together" button would duplicate it.
  Zero buttons in the footer.
- **No icon grid.** All links are plain, text-labeled — no SVG
  anywhere in the footer (the old `.footer__socials` icon-button CSS
  was removed along with the concept).
- **No link columns.** Exactly 10 links total (6 + 4), one row, no
  multi-column "company footer" layout.
- **The site's own language.** The two groups wear the mono `//`
  kickers used across the redesign: `// jump` and `// reach`.

### What's on it
| Block | Content | Source of truth |
|---|---|---|
| Identity | `<SIYAM/>` mark (same bracket styling as the navbar) + one line: "Frontend Developer & Shopify Store Designer · Bangladesh 🇧🇩" | Role + location are source facts (Hero/About/Contact); no invented bio |
| `// jump` | The six in-page sections, in header order | Reuses `navLinks.ts` — the same single source as the header (no duplicated list); anchors smooth-scroll via the global `useSmoothScroll` delegated hook |
| `// reach` | Email · WhatsApp · GitHub · LinkedIn as text links | Email = `devs.siyam@gmail.com` (git-verified, Phase 16); WhatsApp deep link with the number shown from the href (same pattern as Contact); GitHub = verified profile; LinkedIn = supplied. All new-tab links carry `target="_blank" rel="noopener noreferrer"` |
| Copyright bar | "© 2026 MD SIYAM UZZAMAN. All Rights Reserved." + "Built with ❤️ by Siyam Uzzaman" | Both the source's own wording, kept verbatim |

### Documented decisions
- **Facebook/Instagram stay in the Contact section only.** Contact
  carries the full supplied set; the footer keeps the four *direct*
  channels. (The task said "contact/social links" — all four socials
  remain on the site, just not duplicated into the footer.)
- **No CV link** — no real file exists (same rule as Phase 16).
- **Copyright kept verbatim** including "MD SIYAM UZZAMAN" — that is
  how the source writes the name; changing it would be an assumption.
- **Doc-level correction in `siteConfig.ts`**: the header comment still
  claimed AUDIT risk #1 (conflicting emails) was "intentionally NOT
  resolved" — Phase 16 resolved it, so the stale note was corrected.
  No value changed.

## CSS
§17 rewritten: `.footer__main` flex row (space-between, hairline
below), `.footer__id` (340 px max) + `.footer__tag`, mono
`.footer__kicker` (same values as `.contact__row-label`), merged
`.footer__nav-list, .footer__reach-list` wrap rows, color-only hover
(site convention — no lift/glow), `.footer a:focus-visible` outline,
`.footer__bottom` space-between muted bar. Media: **768** — main
stacks, everything centers (was the old `footer__inner` rule);
**480** — tighter padding + gaps. Old `.footer__inner`/`.footer__socials`
rules deleted. Zero `backdrop-filter`/blur/glow/shadow on any footer
rule. The Phase-06 trailing block's `.footer__logo` display-font rule
remains (the logo still exists — the rule is live).

## Verification (33/33 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 36.50 kB / JS 264.65 kB);
  lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: **structure** (footer after `#contact`,
  no CTA/button/CTA wording, zero SVG, exactly 10 links, old chrome
  gone); **identity** (`<SIYAM/>` mark, one-line role+location);
  **navigation** (real labeled `<nav>`, the same six links as the
  header in the same order after stripping the header's numeric
  prefixes, all six resolve to real sections); **reach** (real gmail
  link+text, WhatsApp href+display, GitHub profile + LinkedIn with
  safe new-tab, no CV/`#` href, per-element check: only the real
  email/phone digits appear); **copyright** (both source lines
  verbatim); **built CSS** (exact minified strings for base row,
  kicker, merged lists, hover, focus-visible, bottom bar; 768
  stack/center; 480 tightening; old chrome absent; zero
  blur/glow/shadow); **full regression** (7 anchor sections, 6 header
  nav, hero gmail, contact panel intact, 0 dead links site-wide, 0
  `<img>`).
- Documented env limit (as Phases 07–16): no real-browser visual pass
  possible in sandbox.

## AUDIT items closed by this phase
- None new. Footer carried no AUDIT flags; the stale siteConfig
  comment about AUDIT risk #1 was corrected (doc-level).

## Still open (deliberately NOT assumed)
- CV: placeholder in config; add a real file to re-introduce.
- Stats band's "15 Happy Clients" — still unsupported (Stats task).
- `prefers-reduced-motion` pass; cursor width-gate bug; 1.8 s loader;
  dead Button.tsx; 3 lint warnings (pre-existing flags).
