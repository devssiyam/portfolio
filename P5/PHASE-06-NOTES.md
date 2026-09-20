# PHASE-06-NOTES.md — Typography

Implements TASK 06: a three-voice type system (Geist / Inter / Lora) over the
existing layout, with hierarchy, weight, line-height, tracking, measure, and
responsive-scaling refinements. No layout redesign — no grid, padding,
container, or box model was touched. All content/voice preserved verbatim.

## What was changed (2 files)

### 1. `react-app/index.html` — font loading
- Single Google Fonts request now loads all four families as variable fonts
  with `display=swap`:
  `Fira+Code:wght@300..700 & Geist:wght@500..900 & Inter:wght@300..900 &
  Lora:ital,wght@0,400..700;1,400..700`
- The typing cursor uses `font-weight: 300` in a Fira Code context; the
  original request only shipped 400/500, so the cursor was a synthesized
  weight. Widening the Fira Code range to 300..700 makes every requested
  weight real (font-loading fix, no visual change intended).
- Preconnects unchanged. `display=swap` guarantees the fallback stacks are
  visible immediately if the font network request is slow/blocked.

### 2. `react-app/src/styles/style.css` — one additive block
- New labeled section **"1c. TYPOGRAPHY SYSTEM (Phase 06)"**, appended at the
  END of the stylesheet (after the §17 media queries) so it wins the cascade
  against the original per-section rules. The diff against the original
  `style.css` is still purely additive — zero pre-existing lines touched.
  (An initial top-of-file placement was caught and rejected during
  verification: the built CSS showed original rules overriding the Phase-06
  weight/line-height/tracking values; the end placement was confirmed
  correct in the minified output.)

## Role split (the design decision)

| Voice    | Family | Where it is used |
|----------|--------|------------------|
| Display  | **Geist** | `h1`–`h4` (all headings), nav (logo/links), all `.btn`, form labels, section tags, hero badge, scroll cue, project category chip, service "Get Started" link, stat numbers + labels, card titles, footer logo |
| Body     | **Inter** | `body` and everything inheriting it: bios, descriptions, subtitles, bullets, contact copy, footer text, form inputs/placeholders — all supporting text |
| Serif    | **Lora** | **Selectively, editorial only**: the testimonial voice — `.testimonial-card__text` (quote) + its large decorative `.testimonial-card__quote` glyph (was `Georgia` — same role, now the real serif voice). No other element uses the serif voice. |
| Mono     | **Fira Code** | The site's code motif, UNCHANGED: typing line, hero code card, loader text, floating hero badges, project tag chips, skill percentages, service numbers. (Task 06's "technical UI" reads as sans UI chrome; the code motif is an established identity element per AUDIT.md and stays mono.) |

## Hierarchy / optical refinements (display face)

- `--font-display` token: `"Geist", "Inter", system-stack` — Inter is in the
  display fallback chain so a Geist fetch failure degrades to the old look,
  not a system font.
- `--font-base` re-declared with an extended fallback stack (adds Segoe UI /
  Roboto / Helvetica Neue) — same family as §1, better non-Web-font
  degradation.
- `--font-serif` token: `"Lora", Georgia, "Times New Roman", serif`.
- `--font-mono` re-declared with `ui-monospace/SFMono/Menlo/Consolas`
  fallbacks — same primary family.
- Display weights stepped down to match Geist's wider, heavier metrics:
  - `.hero__title` (h1): 900 → **800**, line-height 1.1 → **1.05**,
    tracking -0.035em → **-0.03em**
  - `.section-title` (h2): 800 → **700**, line-height 1.2 → **1.15**
    (keeps -0.02em)
  - Card titles (h3) and small headings (h4): 700 → **600** with sub-px
    size trims where needed (skill name 0.92→0.95rem, project title
    1→1.05rem, service title 1.05→1.1rem) so Geist 600 keeps the presence
    Inter 700 had without out-shouting the section titles.
  - `.stats__number`: 900 → **800**, tracking -0.04em → -0.03em.
  - `.nav__logo` / `.footer__logo`: 900 → **800**.
- **Measure:** `.about__bio` constrained to `62ch` (the desktop content
  column runs ~70ch wide — above the comfortable 60–75ch range for body
  reading). This is the only width constraint added.
- **Line-height:** body rhythm kept (1.7 base / 1.8 bio); display line-heights
  tightened per above; `.testimonial-card__text` 1.8 → 1.75 at its new size.
- **Responsive scaling:** existing `clamp()` title scaling and the §17 media
  font-size overrides are untouched and still apply (verified in built CSS
  order). Two additions in the Phase-06 block:
  - ≤768px: mobile menu links gain weight 600 + -0.01em (display face at
    1.1rem needs a touch more presence in the slide-out menu).
  - ≤480px: hero/section-title tracking relaxed (-0.025em / -0.015em) —
    Geist is wider than Inter at equal pt, so the smallest display sizes
    breathe better on narrow screens.

## Explicit decisions (per GLOBAL CONTROL — recorded, not silent)

1. **Lora is used in exactly one place** — the testimonial voice. Applying it
   anywhere else (hero, about, section subtitles) would make the serif a
   second body voice, contradicting "selective editorial emphasis only".
2. **Fira Code motif preserved**, not migrated to Geist. The task's "technical
   UI" is covered by Geist on all sans chrome (nav/buttons/labels/tags/
   numbers); the code-styled elements (typing line, code card, chips, %,
   service numbers) are the site's code motif and stay mono.
3. **Top-of-file insertion rejected during verification** — cascade analysis
   of the built CSS showed original rules would override Phase-06 values.
   Block lives at end of file; built CSS confirmed Phase-06 rules win.
4. **No font-weight 900 anywhere in the display face** — Geist Black is
   materially wider/heavier than Inter Black; 800 carries the display
   hierarchy without breaking the existing optical balance.

## What was deliberately NOT changed

- Original `P5/index.html`, `P5/script.js`, `P5/style.css` — byte-identical
  (verified: git status shows only the two react-app files).
- No section padding, grid, gap, container, border-radius, or color touched.
- Body line-heights, section subtitles, hero subtitle, all `clamp()`
  responsive title scales — unchanged.
- Content/voice: zero text changes.

## Verification

- `npx tsc --noEmit` — 0 errors.
- `npm run build` — succeeds. **JS bundle byte-identical to Phase 05
  (269.16 kB — this phase is CSS + HTML font-link only, no JS change)**;
  CSS 32.12 kB → 34.26 kB (new tokens/rules).
- `npm run lint` — 0 errors, same 3 pre-existing warnings, none new.
- `diff P5/style.css P5/react-app/src/styles/style.css` — 195 added lines,
  **0 changed/removed** (Phase 05 block + Phase 06 block).
- Built-CSS cascade inspection: for `.hero__title`, `.section-title`,
  `.testimonial-card__text`, `.nav__logo`, `.stats__number` the Phase-06
  declaration is the last in source order and wins for weight/line-height/
  tracking/size; the §17 responsive `font-size` overrides still apply after
  (different properties, no conflict).
- jsdom structural + type-system smoke test on the production bundle:
  **32/32 PASS, 0 console errors, 0 warnings** — all prior structural counts
  unchanged (6 nav links, 8 skill cards, 6 project cards, 5 service cards,
  3 testimonials, 4 stats, loader/cursor/back-to-top/typing/send/success
  present); all four font tokens resolve (Geist/Inter/Lora/Fira Code);
  computed styles confirm the winning cascade: hero title weight 800, section
  title 700, testimonial text `.95rem` on `--font-serif`, headings/nav/btn/
  labels on `--font-display`, body on `--font-base`, mono motif elements on
  `--font-mono`, about bio measure active, font link carries all four
  families + `display=swap`.
  (jsdom does not fetch Google Fonts and does not substitute `var()` inside
  `font-family`; family assertions therefore check the winning `var()`
  reference plus the token definitions — the equivalent chain a browser
  performs.)
- Test dependency installed with `npm install --no-save` (jsdom) —
  `package.json` and `package-lock.json` are unmodified; test script was
  run from a temp copy and removed.

## Known pre-existing issues carried forward (unchanged, not in scope)

All items from AUDIT.md / Phase 03–05 checkpoints remain open: email
conflict, fake contact form, placeholder `#` links, shared project repo URL,
missing CV file, `cursor: none` device-class bug, no
`prefers-reduced-motion`, testimonial initial mismatches (R/S/M vs their
names), skill `width` vs `percent` mismatches, `Button.tsx` dead code,
`useAosReveal` dead `rafRef`, 3 lint warnings.

## This checkpoint

- ZIP: `portfolio-backups/phase-06-type.zip` — index.html, script.js,
  style.css (unmodified originals) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06-NOTES.md + full react-app/ source (no node_modules, no
  dist).

## Next task

Awaiting instruction (not started, not assumed). Likely candidates:
- Visual/section redesign work (still deferred — typography is now the
  foundation to redesign against).
- Resolving flagged content issues (email conflict, placeholder links,
  shared repo URL, CV file, testimonial initials).
- Decision on decorative-module fate (cursor, tilt, parallax, typing).
- `prefers-reduced-motion` support.
- Real contact-form backend.
