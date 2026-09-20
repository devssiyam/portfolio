# CHECKPOINT — Siyam Portfolio

## Phase 03 — React Foundation: COMPLETE (verified)

### What was done
Implemented MIGRATION-PLAN.md: scaffolded Vite + React + TypeScript, built one component
per existing section, extracted all repeated logic into hooks, and moved all content into
typed data files — with real content, exact values, and existing behavior preserved. No
section redesign, no generic/template UI, no new functionality added.

- `react-app/` — Vite + React 19 + TypeScript project.
  - `index.html` — same meta/SEO/favicon/fonts as the original, unchanged.
  - `src/styles/style.css` — original stylesheet copied byte-for-byte (diff-verified),
    imported once. No CSS Modules/styled-components introduced.
  - `src/types/content.ts` + `src/data/` — navLinks, typingPhrases, skills, projects,
    services, stats, testimonials, siteConfig. Every value (percents/widths, text, bullets,
    quotes, targets, the two conflicting emails, placeholder `#` links, shared GitHub repo
    URL) carried over exactly as authored.
  - `src/hooks/` — useScrollThreshold, useMediaQuery, useAosReveal, useCountUp, useInView,
    useTypingEffect, useCardTilt, useSmoothScroll — each a direct extraction of the matching
    script.js module's exact logic/timing/easing.
  - `src/components/` — Loader, CustomCursor, Navbar, Hero, About, Skills/SkillCard,
    Projects/ProjectCard, Services/ServiceCard, Stats, Testimonials/TestimonialCard, Contact,
    Footer, BackToTop, ScrollProgressBar, + shared SectionHeader/Button/icons.
  - `src/App.tsx` — wires everything; Loader's onComplete preserves the checkAOS() coupling.

### Explicit decisions made (per plan's own requirement, not resolved silently)
- **Active-nav-link duplication:** kept only module 18 (IntersectionObserver section
  highlight) in Navbar.tsx; dropped module 5 (scroll-position version) as redundant.
- **checkAOS() ↔ loader coupling:** preserved via Loader's `onComplete` prop, called by
  App.tsx exactly where the original called checkAOS() directly.
- **rAF/timeout cleanup (highest risk):** CustomCursor, useTypingEffect, useCardTilt, and
  Hero's orb parallax all have explicit useEffect cleanup. Verified under StrictMode
  (double-invokes effects) with no leaked loops/listeners.

### Known pre-existing issues carried forward unresolved (not fixed this phase)
Two conflicting emails; no real contact-form backend; 7 placeholder `#` links; `cursor:
none` gated by media query not hover/pointer capability; no prefers-reduced-motion; all 6
project GitHub links point to the same repo.

### Verification
- `npx tsc --noEmit` — 0 errors.
- `npm run build` — succeeds (tsc -b && vite build), working dist/ produced.
- `vite preview` served the build successfully (confirmed via curl).
- jsdom smoke test on the production bundle: 0 thrown/console errors, 0 warnings (aside
  from expected font-fetch failures jsdom can't make — not a code defect); all 22
  structural DOM checks passed (every section present; correct counts — 6 nav links, 8
  skill cards, 6 project cards, 5 service cards, 3 testimonials, 4 stats items; loader,
  cursor, back-to-top, typing-text, send button, success message all present); console
  branding log fires on mount.
- `src/styles/style.css` diffed against the original — byte-identical.
- Original index.html/script.js/style.css in this zip's root are unmodified (byte-diff
  verified) — the React app is a parallel implementation, nothing live was touched.
- Test script and dev/preview server processes removed after verification; nothing left
  running. `react-app/` copied into the package excluding node_modules and dist.

### This checkpoint
- ZIP: `portfolio-backups/phase-03-react.zip` — index.html, script.js, style.css
  (unmodified) + AUDIT.md + MIGRATION-PLAN.md + PHASE-03-NOTES.md + full react-app/ source
  (no node_modules, no dist).
- Verified via `unzip -l`: 65 files total, all expected paths present.
- Tests: PASS (typecheck clean, build clean, smoke test all-pass, style.css unchanged).

### Next task
Awaiting Phase 04 instruction (not started, not assumed). Likely candidates when
requested:
- Visual/section redesign work (explicitly deferred until now, per every prior phase).
- Resolving flagged content issues (email conflict, placeholder links, shared repo URL).
- Decision on decorative-module fate (cursor, tilt, parallax) if redesign changes scope.
- prefers-reduced-motion support.
- Real contact-form backend.

## Blocker
None.

## Phase 04 — Content Architecture: COMPLETE (verified — audit, no changes needed)

### What was done
Audited `react-app/src/` for the requested content categories (projects, skills,
services, experience, testimonials) to confirm they live in clean typed data structures
with no repeated content hardcoded in components.

**Finding:** all four real categories were already fully externalized during Phase 03:
- `src/data/projects.ts` (`Project[]`) → `Projects.tsx` → `ProjectCard.tsx`
- `src/data/skills.ts` (`Skill[]`) → `Skills.tsx` → `SkillCard.tsx`
- `src/data/services.ts` (`Service[]`) → `Services.tsx` → `ServiceCard.tsx`
- `src/data/testimonials.ts` (`Testimonial[]`) → `Testimonials.tsx` → `TestimonialCard.tsx`

Grepped every component file for literal strings matching known repeated content
(project titles, skill names) outside `src/data/` — zero matches. No source files were
modified.

**"Experience" — confirmed not present in source.** Re-checked index.html, AUDIT.md, and
MIGRATION-PLAN.md: no experience/timeline/work-history section or repeated experience
content exists anywhere in the original site. The word appears only twice as ordinary
prose ("smooth user experience", "web experiences" in the About bio) — not structured or
repeated content. Per GLOBAL CONTROL's no-invented-content rule, no experience data
structure was created; nothing was fabricated to fill this category.

### Verification
- `npx tsc --noEmit` — 0 errors.
- `npm run build` — succeeds; output bundle hashes (`index-DsR3DQ2X.css`,
  `index-vzjdFBNe.js`) byte-identical to the Phase 03 build, confirming zero functional/
  content change occurred this phase.
- jsdom smoke test targeted at the four affected sections: correct element counts (8
  skill cards, 6 project cards, 5 service cards, 3 testimonials); spot-checked real text
  survived intact (HTML5, Shopify, "Shopify Product Page", "Personal Portfolio Website",
  "Shopify Store Design", "Shakib Khan"); 0 console errors, 0 warnings.
- Test script and jsdom dev-dependency removed after verification.

### This checkpoint
- ZIP: `portfolio-backups/phase-04-content.zip` — index.html, script.js, style.css
  (unmodified) + AUDIT.md + MIGRATION-PLAN.md + PHASE-03-NOTES.md + PHASE-04-NOTES.md +
  full react-app/ source (no node_modules, no dist).
- Verified via `unzip -l`: 66 files total, all expected paths present.
- Tests: PASS (typecheck clean, build clean and byte-identical to Phase 03, content
  smoke test all-pass).

### Next task
Awaiting Phase 05 instruction (not started, not assumed). Likely candidates when
requested:
- Visual/section redesign work (explicitly deferred until now, per every prior phase).
- Resolving flagged content issues (email conflict, placeholder links, shared repo URL).
- Decision on decorative-module fate (cursor, tilt, parallax) if redesign changes scope.
- prefers-reduced-motion support.
- Real contact-form backend.
- If a genuine "experience" section is wanted, it needs real source content supplied
  first — none exists to migrate.

## Blocker (Phase 04)
None.

## Phase 05 — Design Tokens: COMPLETE (verified)

### What was done
Audited `src/styles/style.css`'s existing `:root` token block against actual repeated
values across the file, then extended it additively — no existing rule/token changed,
renamed, or removed; no section redesigned.

**Already existed (unchanged):** color (bg/accent/text/border), 8-step spacing scale,
radius scale, shadow scale, motion (ease/transition), container/nav-height/section-pad.

**Added (new, mirrors values already in repeated use):**
- Semantic `--success` (+glow/bg/border) — was `#22C55E` repeated at 4 unrelated sites.
- Code-snippet syntax palette `--code-keyword/var/op/key/str/comment` (6 colors, hero
  code card).
- Decorative `--dot-red/yellow/green` (macOS traffic-light dots).
- Overlay tones `--overlay-heavy/strong/soft` (was 3 different rgba(15,23,42,X) calls).
- Typography scale `--text-display/h2/h3/h4/body-lg/body/body-sm/caption/micro` — names
  sizes already in use; did NOT rewrite any of the 60 existing font-size declarations.
- Font-weight tokens `--weight-regular/medium/semibold/bold/black`.
- Line-height tokens `--leading-tight/snug/normal/relaxed`.
- Z-index scale `--z-base/nav/nav-overlay/nav-menu/modal/cursor/cursor-follower/loader`.
- Breakpoints (1024/768/480px) — documented as a CSS comment (custom properties can't
  be read inside `@media` conditions) and mirrored as real TS constants in new
  `src/styles/tokens.ts` (`breakpoints`, `mediaQuery`).

### Code changes
- `src/styles/style.css` — one new `:root` block inserted right after the existing one,
  plus a breakpoints reference comment. Diffed: the change is a single contiguous
  insertion, zero pre-existing lines touched.
- `src/styles/tokens.ts` (new) — breakpoint/mediaQuery constants.
- `useCardTilt.ts` + `Hero.tsx` — the two call sites hardcoding `'(max-width: 768px)'`
  now import `mediaQuery.mobile` instead. Same value, same behavior — deduplicates a
  magic string, changes nothing rendered.

### Verification
- Diff-confirmed the style.css change is purely additive (single contiguous insertion).
- Grepped for remaining hardcoded breakpoint literals outside tokens.ts/comments — none.
- `npx tsc --noEmit` — 0 errors.
- `npm run build` — succeeds; CSS hash changed (expected, new `:root` content), JS size
  essentially unchanged (269.02 KB → 269.16 KB).
- jsdom regression smoke test: all structural counts unchanged (loader, navbar, 6 nav
  links, 8 skill cards, 6 project cards, 5 service cards, 3 testimonials, 4 stats,
  contact success element) and 0 console errors. Raw built CSS inspected directly to
  confirm every token compiles to the correct value (minifier lowercases/hex-converts
  but values are identical — e.g. `--overlay-heavy` → `#0f172afa` = exactly
  `rgba(15,23,42,0.98)`).
- Test script and jsdom dev-dependency removed after verification.

### This checkpoint
- ZIP: `portfolio-backups/phase-05-tokens.zip` — index.html, script.js, style.css
  (unmodified originals) + AUDIT.md + MIGRATION-PLAN.md + PHASE-03/04/05-NOTES.md +
  full react-app/ source (no node_modules, no dist).
- Tests: PASS (typecheck clean, build clean, zero visual/structural regressions).

### Next task
Awaiting Phase 06 instruction (not started, not assumed). Likely candidates when
requested:
- Visual/section redesign work, now that a fuller token system exists to redesign with.
- Resolving flagged content issues (email conflict, placeholder links, shared repo URL).
- Decision on decorative-module fate (cursor, tilt, parallax) if redesign changes scope.
- prefers-reduced-motion support.
- Real contact-form backend.
- Retrofitting the 60 existing font-size declarations onto the new type scale, if a
  redesign phase decides that's in scope (deliberately not done here to avoid
  regression risk in a tokens-only phase).

## Blocker (Phase 05)
None.
## Phase 06 — Typography: COMPLETE (verified)

### What was done
Implemented TASK 06: a three-voice type system — **Geist** (headings, nav,
buttons, labels, technical UI), **Inter** (body/supporting text), **Lora**
(selective editorial emphasis only — the testimonial voice) — with
hierarchy, weight, line-height, tracking, measure, and responsive-scaling
refinements. No layout redesign: no grid/padding/container/box-model change;
all content/voice preserved verbatim.

**Files changed: exactly 2** (plus this checkpoint documentation):
- `react-app/index.html` — one Google Fonts request now loads all four
  families as variable fonts with `display=swap` (Geist 500..900, Inter
  300..900, Lora ital 0/1 400..700, Fira Code 300..700). The Fira Code range
  was widened from 400;500 → 300..700 because the typing cursor uses weight
  300 — previously a synthesized weight, now a real one.
- `react-app/src/styles/style.css` — one new labeled block,
  **"1c. TYPOGRAPHY SYSTEM (Phase 06)"**, appended at END of file so it wins
  the cascade. Diff vs the original stylesheet is still purely additive
  (195 added lines total across Phases 05+06, zero pre-existing lines
  touched).

### Explicit decisions made (recorded, not silent)
- **Lora used in exactly one place** — `.testimonial-card__text` + its large
  `.testimonial-card__quote` glyph (was `Georgia` — same decorative role, now
  the real serif voice). Nowhere else; anything more would make serif a
  second body voice, against "selective editorial emphasis only".
- **Fira Code motif preserved** (typing line, code card, loader text,
  floating badges, tag chips, skill %, service numbers) — the code motif is
  established identity per AUDIT.md; "technical UI" is covered by Geist on
  all sans chrome (nav, buttons, labels, tags, numbers).
- **Top-of-file insertion rejected during verification**: built-CSS cascade
  inspection showed original per-section rules would override Phase-06
  weight/line-height/tracking values. Block moved to end of file; built CSS
  confirmed Phase-06 rules win while the §17 responsive `font-size`
  overrides still apply.
- **No display weight 900** — Geist Black is materially wider/heavier than
  Inter Black; hierarchy steps down 800 (h1/numbers/logos) / 700 (h2) /
  600 (card titles + h4s) with sub-px size trims (skill name 0.92→0.95rem,
  project title 1→1.05rem, service title 1.05→1.1rem) and tightened
  display line-heights (1.05 / 1.15) + optical tracking (-0.03em / -0.02em).
- **Fallbacks**: `--font-display` chain is Geist → Inter → system stack (a
  Geist failure degrades to the old look, not a system font); `--font-base`
  re-declared with extended stack (Segoe UI/Roboto/Helvetica Neue);
  `--font-mono` gains ui-monospace/SFMono/Menlo/Consolas; `display=swap`.
- **Measure**: `.about__bio` capped at `62ch` (desktop column ran ~70ch —
  the only width constraint added). **Responsive additions**: ≤768px mobile
  menu links 600 + -0.01em; ≤480px hero/section-title tracking relaxed
  (-0.025em/-0.015em) for Geist's wider metrics.

### Known pre-existing issues carried forward unresolved
Unchanged from prior phases: email conflict; fake contact form; 7
placeholder `#` links; all-6-projects shared repo URL; `cursor: none`
device-class bug; no `prefers-reduced-motion`; testimonial initials (R/S/M)
don't match their names; skill bar `width` ≠ displayed `percent`; `Button.tsx`
dead code; `useAosReveal` dead `rafRef`; 3 lint warnings.

### Verification
- `npx tsc --noEmit` — 0 errors.
- `npm run build` — succeeds. **JS bundle byte-identical to Phase 05
  (269.16 kB) — CSS + HTML font-link change only, zero JS change.** CSS
  32.12 kB → 34.26 kB.
- `npm run lint` — 0 errors, same 3 pre-existing warnings, none new.
- `diff` original vs. react-app style.css — purely additive, 0 lines
  changed/removed.
- Built-CSS cascade inspection — Phase-06 declarations last-in-order for
  `.hero__title`, `.section-title`, `.testimonial-card__text`, `.nav__logo`,
  `.stats__number` (weight/line-height/tracking/size all win).
- jsdom smoke test on the production bundle — **32/32 PASS, 0 console
  errors, 0 warnings**: all structural counts unchanged (6 nav links, 8
  skill cards, 6 project cards, 5 service cards, 3 testimonials, 4 stats,
  loader/cursor/back-to-top/typing/send/success present); all four font
  tokens resolve to Geist/Inter/Lora/Fira Code; computed styles confirm the
  winning cascade (hero title weight 800, section title 700, testimonial
  text .95rem on `--font-serif`, headings/nav/btn/labels on
  `--font-display`, body on `--font-base`, mono motif on `--font-mono`,
  about-bio measure active, font link has all four families + display=swap).
- jsdom installed via `npm install --no-save` — `package.json` /
  `package-lock.json` unmodified; test script run from a temp copy and
  removed.

### This checkpoint
- ZIP: `portfolio-backups/phase-06-type.zip` — index.html, script.js,
  style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06-NOTES.md + full react-app/ source (no node_modules, no
  dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates when
requested:
- Visual/section redesign work (typography is now the foundation to
  redesign against).
- Resolving flagged content issues (email conflict, placeholder links,
  shared repo URL, CV file, testimonial initials).
- Decision on decorative-module fate (cursor, tilt, parallax, typing).
- `prefers-reduced-motion` support.
- Real contact-form backend.

## Blocker (Phase 06)
None.
## Phase 07 — Header: COMPLETE (verified)

### What was done
Redesigned the Header/Navbar only ("the index" concept — the site's
code-editor identity extended into the nav: numbered file-index entries,
square corners, solid surfaces). Identity preserved and refined: the
actual `<SIYAM/>` wordmark (not a template logo) gains a blinking block
caret echoing the hero typing cursor. All 6 real nav sections from
`data/navLinks` with Fira Code indices (01–06). Active state: accent
index + full-width 2px underline growing from the left +
`aria-current="true"`. Scrolled state: solid `var(--bg)` + 1px hairline
(replaces rgba + 20px blur + drop shadow). CTA "Hire Me" (content
kept) reduced from filled banner to a quiet 1px-boxed text link.
Mobile: the 280px blurred slide-out panel is replaced by a full-width
sheet dropping below the 60px header — solid `var(--bg-card-2)`,
numbered entries, "Hire Me →" as the final row (previously absent on
mobile), 0.25s drop+fade with `visibility` gating.

**Accessibility (new):** skip link (first focusable, `href="#main"`,
off-canvas until focused) + `<main id="main" tabIndex={-1}>` (2
attributes in App.tsx, recorded); `useSmoothScroll` returns early for
`.skip-link` so the skip link keeps NATIVE jump+focus (every other
anchor's smooth-scroll behavior byte-identical); hamburger with dynamic
`aria-label`/`aria-expanded`/`aria-controls`; sheet focus management
(focus-in on open, Tab/Shift+Tab trap, focus-returns-to-hamburger on
close via any path); 2px accent `:focus-visible` outlines on all header
controls. Deliberately NO menubar/arrow-key pattern (WAI-ARIA antipattern
for site nav).

**Explicitly avoided (per task):** glass, blur, glow (zero
`backdrop-filter`/`filter: blur`/`box-shadow` in all header rules —
verified in source and built CSS), pills, template logos, oversized CTA,
and common portfolio-nav patterns (dot indicators, center-grow
underlines, side slide-ins, glass bars).

### Files changed
- `src/components/Navbar.tsx` — restructured (skip link, indexed links,
  caret, CTA row inside menu, a11y wiring, focus management).
- `src/styles/style.css` — §7 NAVBAR section rewritten in place (redesign
  = replacement, the point of the task) + 768px "Navbar mobile" block
  rewritten in place. No other line of the stylesheet touched.
- `src/hooks/useSmoothScroll.ts` — 6-line documented skip-link exclusion.
- `src/App.tsx` — `<main id="main" tabIndex={-1}>`.

Not touched: legacy `P5/index.html|script.js|style.css` (git-clean),
`ScrollProgressBar` (separate component — noted), `data/navLinks.ts`,
all other components/hooks/data/CSS, all non-header sections.

### Verification (45/45 PASS, 0 console errors)
- `npx tsc --noEmit` — 0 errors; `npm run build` — succeeds (JS
  270.31 kB / CSS 36.04 kB); `npm run lint` — 0 errors, 3 pre-existing
  warnings (the first draft's transient 4th warning was fixed in-line).
- jsdom behavioral simulation on the production bundle (no browser in
  sandbox — desktop/mobile/keyboard verified at behavior level +
  minified-CSS inspection):
  - Desktop: skip link first focusable → `#main`; wordmark + caret;
    6 links 01–06; active home + `aria-current="true"`; quiet CTA
    (no `btn--primary`); hamburger aria wiring correct; closed at rest;
    `nav` landmark "Main"; old `.nav__cta` gone.
  - Mobile: open → expanded/label/`.open`/scroll-lock/focus-in/X-state;
    focus trap both directions (7 focusable entries); Escape, scrim
    click, and entry click all close with focus returned to the
    hamburger; body scroll restored.
  - Keyboard: skip link focusable; skip-link click not intercepted by
    smooth-scroll (native behavior preserved) while normal nav links
    still smooth-scroll.
  - Regression: all structural counts unchanged (8/6/5/3/4 + loader,
    cursor, typing, footer, 7 sections).
  - Built CSS: no `backdrop-filter` on any header rule; scrolled =
    solid `var(--bg)` no shadow; sheet = solid `var(--bg-card-2)` +
    visibility/opacity/transform; skip-link + `:focus-visible` rules;
    `logoCaretBlink`; mono indices; unfilled CTA; `scaleX(1)` underline.
- Documented env limit: no real-browser visual pass possible in sandbox
  (jsdom has no layout/media evaluation/native fragment navigation) —
  a visual check in a browser is the recommended first manual step
  before deploy.

### This checkpoint
- ZIP: `portfolio-backups/phase-07-header.zip` — index.html, script.js,
  style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07-NOTES.md + full react-app/ source (no
  node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates when
requested:
- Redesigning the next section (hero or footer are the usual
  follow-ups to a header pass).
- Resolving flagged content issues (email conflict, placeholder links,
  shared repo URL, CV file, testimonial initials).
- `prefers-reduced-motion` pass (would also cover the new caret blink).
- Real contact-form backend.

## Blocker (Phase 07)
None.
## Phase 08 — Hero: COMPLETE (verified)

### What was done
Redesigned the Hero only ("the masthead") — an editorial
composition built solely from content already in the source: mono
status kicker (real availability + `siteConfig.location`), the exact
role as H1 (original line breaks + accent span), his own one-liner
verbatim, the typing line (the identity, unchanged), two real
actions, and a personal byline ("Siyam Uzzaman — first-year CSE
student, CSE'30" — all real source facts). Set left in an asymmetric
7/5 grid beside the one real visual asset: the code card, now a
captioned `<figure>` ("stack — HTML5 · CSS3 · JavaScript · Shopify"
— the old floating badges' real names, preserved, not deleted).

**Removed (recorded decisions):** fake avatar portrait + rings (no
real photo exists — not a real asset); 3 orbs + the parallax effect;
hero stat trio (20+/15+/2+) — the complete 20/15/2/8 band remains in
the Stats section, nothing lost; "View Projects" repointed from the
shared placeholder GitHub repo URL (AUDIT-flagged) to the real
in-page `#projects`; code card de-glassified (solid `var(--bg-card)`,
no blur/shadow); actions restyled to the Phase-07 quiet-box language.
No claims, stats, personality, or positioning invented; no generic
copy; WhatsApp stays where it lives (About), not tripled.

### Files changed
- `src/components/Hero.tsx` — restructured (orb parallax effect,
  avatar, rings, badges, stat trio removed; kicker/byline/figure
  added).
- `src/styles/style.css` — §8 HERO rewritten in place; 768px hero
  rules rewritten (single column, **stays left-set — no centered
  mobile hero**); 480px hero rules reduced to the left-set actions
  stack. 1024px hero rules untouched and still apply.

Not touched: legacy originals (git-clean), `useTypingEffect`,
`typingPhrases`, `siteConfig`, `stats.ts`, all other components/hooks/
data/CSS blocks, all non-hero sections, AOS mechanism. (Two now-dead
Phase-06 selectors remain in that trailing block — harmless, block
left intact.)

### Verification (31/31 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (JS 267.16 kB — shrank vs Phase 07
  with the removed code; CSS 34.01 kB); lint 0 errors, 3
  pre-existing warnings.
- jsdom behavioral simulation of the production bundle: content
  exact (kicker/H1 lines+accent/subtitle verbatim/typing/byline/code
  card/figure caption); removals confirmed absent from DOM; Stats
  band intact (4 items); **actions tested** (View Projects →
  `#projects` smooth-scrolls on click; Email Me →
  `mailto:devs.siyam@gmail.com` native; no placeholder CTA);
  **responsive** verified in built CSS (7/5 base grid; 768 single
  column with no centering; 480 left-set stacked actions); no
  `backdrop-filter`/blur on any hero rule; code card solid;
  mono kicker/byline/caption; full regression (8/6/5/3/4/6 counts,
  Phase-07 header intact, loader/cursor/footer/sections).
- Documented env limit: no browser in sandbox — visual pass in a real
  browser recommended before deploy (same as Phase 07).

### This checkpoint
- ZIP: `portfolio-backups/phase-08-hero.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08-NOTES.md + full react-app/ source (no
  node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- Redesigning the next section (About or Footer are the natural
  follow-ups).
- Resolving flagged content issues (email conflict, placeholder
  links, shared repo URL on project cards, CV file, testimonial
  initials).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 08)
None.
## Phase 09 — About: COMPLETE (verified)

### What was done
Redesigned the About section only ("the profile") — an editorial
spread instead of the standard portrait + bio pattern: his real words
as a statement (left, 7fr — mono kicker "First-year CSE student ·
Bangladesh", his greeting, both bio paragraphs verbatim, "Let's Talk"
→ real WhatsApp deep link) beside a technical index panel (right,
5fr — `// what I work on`: 01 Frontend "HTML · CSS · JavaScript ·
React.js" (his own bio sentence), 02 Shopify "Store design & Liquid
templating", 03 Responsive & UI "Mobile-first, modern UI", 04 Now
"CSE'30 — learning through projects" — plus his three principles,
verbatim, compacted from cards to rows). Every line is existing
source content; nothing invented; no generic/filler copy.

**Removed (recorded decisions):** fake avatar + profile column +
badge (no real photo exists in the repo); three info chips (content
redistributed to kicker/statement/rows — nothing lost); "Download CV"
(dead `#` link — an AUDIT-flagged open item; re-add when a real CV
exists); highlight cards → compact principle rows.

### Files changed
- `src/components/About.tsx` — restructured to statement + index
  `<aside>` panel.
- `src/styles/style.css` — §9 ABOUT rewritten in place; 3 dead about
  rules removed from the 768px block. 1024px gap rule and the 768px
  single-column rule kept and still apply (new layout stacks
  left-set).

Not touched: legacy originals (git-clean), skills/services data and
sections, all other components/hooks/data/CSS blocks, all
non-About sections, AOS mechanism. (One now-dead Phase-06 selector
remains in that trailing block — harmless, block intact.)

### Verification (26/26 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (JS 265.49 kB — shrank vs Phase 08;
  CSS 34.06 kB); lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation of the production bundle: content
  real & verbatim (kicker/greeting/both bios/index rows 01–04/
  principles/WhatsApp href exact); removals confirmed absent (no
  avatar/chips/highlights/SVG portrait/dead CV); composition
  (real `<aside>`, 7/5 asymmetric, bordered solid panel, mono
  identity labels); **responsive** verified in built CSS (768 single
  column left-set, 1024 tighter gap); zero blur/glow/shadow on about
  rules; full regression (8/6/5/3/4/6 counts, hero+header intact,
  loader/cursor/footer/sections).
- Documented env limit (as Phases 07/08): no real-browser visual pass
  possible in sandbox — browser check recommended before deploy.

### This checkpoint
- ZIP: `portfolio-backups/phase-09-about.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08/09-NOTES.md + full react-app/ source (no
  node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- Redesigning the next section (Skills or Services are natural
  follow-ups; Footer last).
- Resolving flagged content issues (email conflict, placeholder
  links, shared repo URL, CV file — re-add About's CV button once
  real, testimonial initials).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 09)
None.
## Phase 10 — Skills: COMPLETE (verified)

### What was done
Redesigned the Skills section only ("the stack manifest") — the
generic 8-card grid with animated progress bars and fake percentages
(which never matched the displayed numbers — AUDIT-flagged) replaced
by ONE bordered manifest in the site's numbered-index language (Phase
07 header / Phase 09 About): the 9 genuinely supported skills,
grouped by the areas they actually cover, numbered 01–04, each skill
a mono code-style token.

- **Groups (real, source-verified):** 01 Frontend [HTML5, CSS3,
  JavaScript, React.js] · 02 UI & Responsive [UI/UX Design,
  Responsive Design] · 03 Shopify [Shopify, Liquid] · 04 Tools
  [GitHub]. React.js added — supported by his own bio sentence and
  the Phase 09 About index (no icon asset in source → empty
  `iconPaths`, icon-less like all tokens).
- **No "Currently Learning" group** — no such list exists in the
  source; none invented.
- **Fake proficiency deleted from model AND presentation** — `width`
  and `percent` removed from the `Skill` type and every data entry;
  no bar, fill, `data-width`, or `%` label anywhere in the section.
- **SkillCard.tsx deleted** (its only purpose was the fake bars);
  icons kept in data, not rendered (manifest is a code-style list).
- Section header keeps the real existing labels verbatim. Zero
  blur/glow/shadow/glass — solid panel, hairline tokens,
  border+color hover only.

### Files changed
- `src/types/content.ts` — `Skill`: −`width`, −`percent`, +`group`
  (+ `SkillGroup` union).
- `src/data/skills.ts` — 8 → 9 entries (React.js added), no
  proficiency fields, real `group` per entry, icon data preserved.
- `src/components/Skills.tsx` — rewritten as the manifest; decision
  log in file header.
- `src/components/SkillCard.tsx` — deleted.
- `src/styles/style.css` — §10 rewritten in place
  (`.skills__manifest` bordered panel; `.skills__group`/`-head`/
  `-num`/`-label`; `.skills__tokens`/`-token` mono hairline chips);
  media: @1024 head basis 170px, @768 groups stack (label above
  tokens) + tighter padding, @480 tokens 0.72rem — replacing all 3
  old `.skills__grid` lines. `.skills__bg` radial kept (existing).
  Phase-06 trailing block's `.skill-card__name` is now a dead
  selector — harmless, block intact (established convention).

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, AOS mechanism, useInView (still used by Stats).

### Verification (25/25 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 33.89 kB / JS 265.07 kB, 41
  files); lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation of the production bundle: manifest
  structure (1 panel / 4 numbered groups / 9 tokens / correct
  per-group membership / no "Currently Learning"); fake-proficiency
  removal (no `%` in section text, no bar/fill/inline width, model
  fields gone, no `skill-card__` rules in built CSS, component file
  deleted); identity (mono tokens, solid bordered panel, zero
  blur/shadow on skills rules, real header labels, h3 group
  headings); **responsive** verified in built CSS (768 stack / 480
  shrink / 1024 head basis — resolved against the actual media
  block); full regression (6/5/3/4 cards, 6 nav, all sections,
  loader/cursor/footer, AOS).
- Documented env limit (as Phases 07/08/09): no real-browser visual
  pass possible in sandbox — browser check recommended before deploy.

### This checkpoint
- ZIP: `portfolio-backups/phase-10-skills.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08/09/10-NOTES.md + full react-app/ source (no
  node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- Redesigning the next section (Projects or Services are natural
  follow-ups; Footer last).
- Resolving flagged content issues (email conflict, placeholder
  links, shared repo URL, CV file, testimonial initials).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 10)
None.
## Phase 11 — Projects: COMPLETE (verified)

### What was done
Redesigned the Projects section only ("the work index") — verification-
first: the actual availability of proof (checked against the GitHub
API, 2026-09-18) determines the hierarchy instead of 6 identical cards
with dead "#" demo buttons and a shared, unrelated repo link (AUDIT
risks #3 + #8).

Reality verified: devssiyam's public repos are ONLY `portfolio` (this
site's real source) and `devs.siyam` (README only — no project code);
no GitHub Pages / no live deployment anywhere; zero image files in the
repo (no screenshots); the only "visuals" are the baseline's
per-project inline SVG wireframes. So the only verified public project
artifact is the portfolio's own source.

- **Featured case (01) — Personal Portfolio Website**: the one project
  with a verified public source → bordered panel + the real GitHub
  link (`github.com/devssiyam/portfolio`, new tab, `noopener
  noreferrer`).
- **Numbered index (02–06)**: the other five as rows in one bordered
  panel — mono `0N · Category`, title, verbatim description, mono
  stack tokens, real per-project schematic wireframe as a glyph marker
  (kept from baseline, not presented as a screenshot — none exist).
- **Factual footnote**: "The source for the other projects is not
  hosted as public repositories."
- Goal/problem/role/challenge/solution/result/case-study fields had no
  source content — nothing invented; no results/metrics added;
  descriptions are the existing source copy verbatim.
- Section header keeps the real labels verbatim; zero blur/glow/
  shadow/glass; interaction = row hover + AOS reveal (3D tilt removed
  with the cards; `useCardTilt` stays — Services/Testimonials use it).

### Files changed
- `src/types/content.ts` — `Project`: −`demoUrl`, `repoUrl` → optional
  (verified-target doc), `placeholderSvg` documented as glyph.
- `src/data/projects.ts` — verified-link pass (dead `#` demos and
  shared repo URL removed; one verified `repoUrl` on the portfolio
  entry); all content verbatim.
- `src/components/Projects.tsx` — rewritten as featured case +
  numbered index + factual footnote; decision log in file header.
- `src/components/ProjectCard.tsx` — deleted.
- `src/styles/style.css` — §11 rewritten in place (`.projects__case`,
  `.projects__tile`, `.projects__meta/-num/-title/-desc/-stack/-tag`,
  `.projects__index`, `.projects__row`, `.projects__note`); media:
  @1024 case padding, @768 case stacks + button below + tighter index,
  @480 glyph/tags shrink. All 3 old `.projects__grid` media lines
  replaced. Phase-06 trailing block's `.project-card__*` rules now
  dead selectors — harmless, block intact (established convention).

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, AOS mechanism, footer socials (pre-existing).

### Verification (36/36 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 34.23 kB / JS 265.19 kB, 40
  files); lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation of the production bundle: header labels
  verbatim; featured case (correct project, verbatim desc/stack, exact
  verified URL + `_blank` + safe rel, real glyph/color); index (5
  rows 02–06, all title/meta/desc verbatim, stacks verbatim, real
  per-row colors + glyphs); **link honesty** (exactly ONE link in the
  section = the verified repo; zero `#` links; no "Live Demo"; shared
  repo not linked; factual footnote present; no invented
  results/metrics); structure (no card grid/tilt, 6 projects exactly
  once, no `<img>` — none faked); identity (solid bordered panels,
  zero blur/shadow on projects rules, mono tokens/meta); **responsive**
  verified in built CSS (1024/768/480 — resolved against the actual
  media block); full regression (5/3/4 cards, 6 nav, 9 skill tokens,
  hero/about/header, sections, loader/cursor/footer).
- **Page-wide image + link audit**: 0 `<img>` elements anywhere (repo
  has no image files — consistent); 22 links total, **0 dead `#`/empty
  links left on the whole site** (AUDIT risk #3 fully resolved with
  Phase 09's CV removal; risk #8 resolved here).
- Documented env limit (as Phases 07–10): no real-browser visual pass
  possible in sandbox — browser check recommended before deploy.

### This checkpoint
- ZIP: `portfolio-backups/phase-11-projects.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08/09/10/11-NOTES.md + full react-app/ source
  (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- Redesigning the next section (Services or Testimonials/Stats are
  natural follow-ups; Footer last).
- Resolving flagged content issues (email conflict, placeholder CV —
  re-add when real, shared-repo footer social, testimonial initials).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 11)
None.
## Phase 12 — Case Study: COMPLETE (verified)

### What was done
Created a case study ONLY where the gate was met: enough real,
verifiable information exists for exactly ONE project — the Personal
Portfolio Website (the only project with a verified public source,
per Phase 11's verification). All five other projects have
name/context/tags only — a case study for them would be filler, so
none created (not even stubs).

**One concise case file** inside the Phase 11 featured case (under a
hairline divider): `// case file` kicker + 3 mono-labeled dimensions:
- **Context** — "A single-page portfolio for a first-year CSE
  student, presenting his frontend and Shopify work." (site's own
  verbatim copy)
- **Role** — "Sole developer — the only author on the repository."
  (git-verified: 1 commit, 1 author)
- **Technical decisions** (4, each source-backed): no external JS
  libraries — typing/scroll-reveal/counters hand-rolled vanilla JS
  (AUDIT + source: single local script, no CDNs); one token-based
  `:root` stylesheet; inline SVG only — zero image files in the repo;
  now rebuilt in React (Vite + TypeScript) — the served build.

Tech (stack tokens) and Links (verified GitHub button) already live on
the case's identity row from Phase 11 — not duplicated. **Dimensions
with no source content (Problem, Approach, Challenges, Solution,
Result) are simply absent — never padded; zero metrics/numbers
invented.** Placed inside Projects: no new section, no nav change.

### Files changed
- `src/types/content.ts` — `Project`: + optional `caseStudy`
  (`context`, `role`, `technicalDecisions[]`) — "only when real" doc.
- `src/data/projects.ts` — portfolio entry gains the case file with
  per-line verification sources in comments; other entries unchanged.
- `src/components/Projects.tsx` — renders the case file only when
  `featured.caseStudy` exists (gate is structural); decision log
  extended.
- `src/styles/style.css` — §11 extended (`.projects__casestudy`,
  `.projects__cs-kicker/-label/-body/-list`, dash `li::before`);
  @768 case file stacks one column. No other media rules touched.

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, nav, AOS mechanism.

### Verification (32/32 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 35.35 kB / JS 266.41 kB, 40
  files); lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: **gate** (exactly one case file, in the
  portfolio case, zero on index projects); **structure** (only
  Context/Role/Technical decisions + kicker; no invented dimension
  labels); **content** (all text verbatim from data and fully covered
  by the data file; 4 decisions verbatim; no metrics/numbers/
  improvement-verbs); **navigation** (`#projects` unique, case file
  reachable inside it, nav unchanged, nav click clean, DOM order
  case → index → footnote); **links** (still exactly one section link
  = verified repo, zero dead `#` site-wide); **identity** (mono
  labels/kicker/dashes, zero blur/shadow, hairline divider);
  **responsive** (768 stack + label spacing, Phase 11 768/480/1024
  invariants — resolved against the actual media block); **full
  regression** (Phase 11 case/index/footnote, 5/3/4/6/9 counts,
  hero/about/header, 0 `<img>`, sections/loader/cursor/footer).
- Documented env limit (as Phases 07–11): no real-browser visual pass
  possible in sandbox — browser check recommended before deploy.

### This checkpoint
- ZIP: `portfolio-backups/phase-12-case-study.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08/09/10/11/12-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- Redesigning the next section (Services or Testimonials/Stats are
  natural follow-ups; Footer last).
- Resolving flagged content issues (email conflict, placeholder CV —
  re-add when real, shared-repo footer social, testimonial initials).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 12)
None.
## Phase 13 — Services: COMPLETE (verified)

### What was done
Redesigned the Services section only ("the two trades") — the 5
repetitive agency-cliché cards ("high-converting", "capture leads",
"boost sales", "A/B Testing Ready", "4K displays", 5× "Get Started")
replaced by the TWO TRADES his verbatim role names ("Frontend
Developer & Shopify Store Designer" — Hero H1):

- **Subtitle = his verbatim Hero sentence** — "I create modern,
  responsive, and visually attractive websites with clean UI and
  smooth user experience" (what I do + practical value, his own
  words; the filler "grow your online presence" subtitle is gone).
- **Two editorial trade blocks** (no card grid), each with exactly
  the three asked-for dimensions as mono-labeled rows:
  - **01 Frontend Development** — WHAT: "Websites and interfaces
    built with HTML, CSS, JavaScript, and React — store UIs, landing
    pages, forms, dashboards" (About-index stack verbatim + the four
    real project kinds). FOR: "Anyone who needs a site or interface
    built — the kinds of work are listed in the projects above"
    (Projects IS above Services — DOM-true). Tech: HTML · CSS ·
    JavaScript · React.js.
  - **02 Shopify Store Design** — WHAT: "Custom Shopify stores and
    product pages — store design and Liquid templating" (real
    project's own description + About index verbatim). FOR: "Store
    owners who want a custom build — not a stock theme." Tech:
    Shopify · Liquid.
- **One CTA** at the end — `// have a project in mind?` + "Let's
  Talk →" → real WhatsApp deep link (same pattern as About).

The three old extra cards fold in with nothing real lost (table in
PHASE-13-NOTES.md): Landing Page → a project kind; Responsive Web
Design → capability (skill + "Mobile-first" + verbatim "responsive");
UI Customization → capability (UI/UX Design skill + verbatim "clean
UI"). All cliché copy removed — no source evidence supported any of
it; no fake guarantees/numbers/outcomes. No invented services: a
third trade would have no source backing.

### Files changed
- `src/types/content.ts` — `Service`: −`description`, −`bullets`,
  +`what`, +`audience`, +`tech[]`; `iconPath` documented as
  unrendered legacy.
- `src/data/services.ts` — 5 → 2 entries (the two trades), every
  phrase source-backed with the evidence table in comments.
- `src/components/Services.tsx` — rewritten (header + two trade
  blocks + one CTA); decision log in file header.
- `src/components/ServiceCard.tsx` — deleted.
- `src/styles/style.css` — §12 rewritten in place
  (`.services__trades`, `.services__trade*`, `.services__tech-token`,
  `.services__cta*`); media: @1024 tighter gap (2 dead lines
  removed), @768 single column + breathing room + stacked CTA (2
  dead lines removed), @480 trade rows stack. Phase-06 trailing
  block's `.service-card__title/__link` now dead selectors —
  harmless, block intact (established convention).

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, nav, AOS mechanism.

### Verification (36/36 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 35.15 kB / JS 265.61 kB, 39
  files); lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: **header** (real labels, verbatim Hero
  subtitle, filler gone); **trades** (exactly two, named by the
  verbatim role, numbered, old titles absent, all WHAT/FOR text
  verbatim from data, projects-above claim DOM-true); **tech**
  (real stacks only, nothing added); **clean** (zero agency clichés,
  zero fake guarantees/outcomes/numbers); **CTA** (exactly one, real
  WhatsApp link, mono kicker); **structure** (no card grid/icon
  tiles/svg chrome); **interaction** (AOS wired, no tilt); **built
  CSS** (§12 card rules gone — only the two Phase-06 dead
  display-font selectors remain by convention, zero blur/shadow,
  mono identity, hairline rows); **responsive** (1024/768/480 —
  resolved against the actual media block); **full regression**
  (Projects case + case file + 5 rows + footnote, 9 skill tokens / 4
  groups, 4/3/6 counts, hero/about/header, zero dead links, 0
  `<img>`, sections/loader/cursor/footer).
- Documented env limit (as Phases 07–12): no real-browser visual pass
  possible in sandbox — browser check recommended before deploy.

### This checkpoint
- ZIP: `portfolio-backups/phase-13-services.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08/09/10/11/12/13-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- Redesigning the next section (Testimonials or the Stats band are
  natural follow-ups; Footer last).
- Resolving flagged content issues (email conflict, placeholder CV —
  re-add when real, shared-repo footer social, testimonial initials,
  stat counters vs. real numbers).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 13)
None.
## Phase 14 — Experience: COMPLETE (verified)

### What was done
Key finding: **no Experience section existed anywhere** (not in the
vanilla baseline, the app, the nav, or the migration plan) — so this
is a conditional creation (Phase 12 discipline): built only from
what is real, content decides the form.

The source supports exactly ONE period (the present) with two real
positions — so it is **not a timeline** (one period; a multi-node
timeline would be invented structure). One bordered panel with a
CURRENT marker (Hero-kicker pulsing dot language):

- **01 Computer Science and Engineering Student** — Period:
  `1st year · CSE'30` (the source's own words; no institution name
  exists anywhere in the source, so no organization line; no dates
  because the source gives none) · Work: three verbatim fragments —
  "continuously improving my development skills through projects
  and hands-on practice" + "HTML, CSS, JavaScript, and React.js" +
  "learning through projects".
- **02 Frontend Developer** — Period: `Current` · Work: verbatim
  "building modern, responsive, and user-friendly web experiences"
  + verbatim "available for freelance work, Bangladesh 🇧🇩" + the
  factual pointer "The work is in the projects section; this
  portfolio's source is public."

Placed between Skills and Projects (can → currently → proof →
offer); **not in the nav** (Stats precedent — 6 links untouched).
Header: tag "Experience", title "Where I Am", no subtitle (nothing
real to fill it with). Mono PERIOD/WORK labeled rows — the Services
trade language.

### Files changed
- `src/types/content.ts` — + `ExperienceEntry` (role/period/work,
  each documented as source-exact).
- `src/data/experience.ts` — (new) `experiencePeriod = 'Current'` +
  2 entries, per-line evidence table in comments.
- `src/components/Experience.tsx` — (new) CURRENT marker + dot +
  two numbered entries; decision log in file header.
- `src/App.tsx` — `<Experience />` between `<Skills />` and
  `<Projects />`.
- `src/styles/style.css` — new §10B EXPERIENCE block
  (`.experience__panel/__period/-dot/__entry/-head/-num/-role/
  -row/-label/-text`); media: @1024 panel padding, @768 rows stack
  + tighter entries, @480 head gap + role size. No dead selectors
  created.

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, nav, AOS mechanism.

### Verification (28/28 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 36.83 kB / JS 267.39 kB, 41
  files); lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: section (exists once, DOM-ordered
  between Skills and Projects, tag/title exact, no subtitle);
  single CURRENT marker + dot; one panel, zero timeline elements;
  exactly two verbatim roles; periods exactly "1st year · CSE'30" /
  "Current"; **no invented dates** (no 4-digit years / "since" /
  "– present"), **no invented organization** (no
  university/institute/college/polytechnic), **no invented
  positions** (no intern/junior/senior/founder); all work text
  verbatim and ⊆ data file; nav untouched; identity (mono labels,
  solid panel, dot #22C55E + dotPulse, zero blur/shadow);
  **alignment** (consistent 64px label grid, baseline heads);
  **responsive** (1024 padding — minifier groups the rule with
  `.projects__case`, resolved against the actual media block / 768
  rows stack + tighter entries / 480 head + role adapt); AOS wired;
  **full regression** (8 anchor sections now, Projects case + case
  file + 5 rows, 2 services trades, 9 skill tokens, 4/3 counts,
  hero/about/header, 0 dead links, 0 `<img>`, loader/cursor/footer).
- Documented env limit (as Phases 07–13): no real-browser visual
  pass possible in sandbox — browser check recommended before
  deploy.

### This checkpoint
- ZIP: `portfolio-backups/phase-14-experience.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08/09/10/11/12/13/14-NOTES.md + full
  react-app/ source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- Redesigning the next section (Testimonials or the Stats band are
  natural follow-ups; Footer last).
- Resolving flagged content issues (email conflict, placeholder CV —
  re-add when real, shared-repo footer social, testimonial
  initials/names, stat counters vs. real numbers).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 14)
None.
## Phase 15 — Testimonials: COMPLETE (verified)

### What was done
Gate outcome: **zero genuine supplied testimonials → the section
was removed** (the task's explicit fallback). Each of the three
testimonials was checked against all available evidence:

| Testimonial | Why it fails |
|---|---|
| "Shakib Khan — E-Commerce Owner, BD" | avatar initial WRONG ('R'≠'S'); no business named; matches no listed project; name nowhere else in repo |
| "Khadizatul Kubra — Startup Founder, UK" | avatar initial WRONG ('S'≠'K'); no product/startup named; matches no listed project |
| "Sowkot Aziz — Business Owner, BD" | avatar initial WRONG ('M'≠'S'); no business named; matches no listed project |

Structural evidence: all three initials wrong (the AUDIT-flagged
telltale); **zero client/company corroboration anywhere in the
source** (the only "client" mention is the "15 Happy Clients"
counter itself); all six projects self-attributed; his own status
"Available for freelance work" (available, not engaged); quotes are
generic praise matching no real project; no external verification
path exists. Removing them (not repairing initials/wording — that
would dress up unverifiable attributions), and with none left, the
whole section went. No testimonial-style filler created as
replacement.

### Files removed
- `src/components/Testimonials.tsx`, `src/components/
  TestimonialCard.tsx`, `src/data/testimonials.ts` — deleted
- `src/types/content.ts` — `Testimonial` interface removed
- `src/App.tsx` — import + `<Testimonials />` removed
- `src/styles/style.css` — §14 TESTIMONIALS block (80 lines) + 4
  media lines (2×1024, 2×768) removed; section numbering now skips
  14 (gap kept, Phase 10B/14 convention); Phase-06 trailing block's
  3 `.testimonial-card__*` font selectors now dead — harmless,
  block intact (established convention)
- `src/hooks/useCardTilt.ts` — deleted as a consequence (last
  consumer was the TestimonialCard; Phases 11/13 removed the rest);
  two stale doc comments updated (Projects.tsx, tokens.ts)
- No nav change (never a nav item); Stats' "15 Happy Clients"
  untouched (own task — now even less visibly supported, carried in
  next-task list)

### Verification (20/20 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 35.32 kB / JS 264.45 kB —
  both shrank; 37 files); lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: **removal** (no `#testimonials`,
  zero cards/grid, no "Client Love"/"What Clients Say", no
  `a[href="#testimonials"]`); **unsupported content gone** (all 3
  names + all 3 quotes absent; no filler created); **source** (3
  files + hook deleted, interface gone, no `cardTilt` in built
  bundle); **built CSS** (no live testimonials rules; exactly the
  three Phase-06 dead font selectors remain, by convention; none in
  any media block); **full regression** (7 anchor sections now, 6
  nav, Projects case + case file + 5 rows, 2 services trades,
  Experience 2 entries, 9 skill tokens / 4 groups, hero/about/
  header/stats/contact intact, 0 dead links, 0 `<img>`,
  loader/cursor/footer, AOS wired).
- Documented env limit (as Phases 07–14): no real-browser visual
  pass possible in sandbox.

### This checkpoint
- ZIP: `portfolio-backups/phase-15-testimonials.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08/09/10/11/12/13/14/15-NOTES.md + full
  react-app/ source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Likely candidates
when requested:
- The Stats band (20+ / 15 / 2+ counters — "15 Happy Clients" now
  has no visible support at all; needs a real-numbers pass or
  removal), or the Contact section (fake form + email conflict),
  or Footer (last).
- Resolving flagged content issues (email conflict, placeholder CV
  — re-add when real, shared-repo footer social).
- `prefers-reduced-motion` pass.
- Real contact-form backend.

## Blocker (Phase 15)
None.

## Phase 16 — Contact (COMPLETE)

### What changed
- `siteConfig`: `contactEmail` → **devs.siyam@gmail.com** (the real,
  git-author-verified address; the old `devs.siyam@email.com` used a
  non-existent TLD — AUDIT "conflicting emails" risk resolved, one
  canonical address everywhere incl. Hero). `social.github` →
  **github.com/devssiyam profile** (verified P11; the old repo URL held
  no code).
- `Contact.tsx` rewritten — **"direct"**: left bordered panel (mono
  labels: Email / WhatsApp / Location / Response + 4 labeled social
  buttons, all `_blank`+noopener); right = **honest mailto composer**
  replacing the fake form (fake "Sending..."/"Message sent!" states,
  runtime `.spin` keyframes, `#sendBtn`/`#contactSuccess` all gone).
  Real validation with honest specific errors (shake guarded for
  engines without `Element.animate`, aria-invalid, first-invalid
  focus); valid submit builds a real
  `mailto:devs.siyam@gmail.com?subject=…&body=message\n\n— Name (email)`
  and opens the visitor's own mail client; honest aria-live status;
  "nothing is stored on this site" stated on the form. **No CV line**
  (no real file — dead link ≠ contact method). Location/Response kept
  as plain-text facts (non-links).
- `style.css` §15 fully rewritten (direct panel, 90px mono-label rows,
  socials grid, form card, honest note/error/status, focus-visible
  trio, hover = border+color only) + media: 768 padding tightened,
  480 rows stack (label above value). Zero blur/glow/shadow on contact
  rules.

### Verification (33/33 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 35.83 kB / JS 263.53 kB);
  lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: **real methods** (gmail link+text; fake
  `.email` gone from whole page; WhatsApp href + number shown from
  href; location/response as facts; 4 safe labeled socials incl.
  profile switch; no CV; zero invented emails/phones); **form
  honesty** (labeled fields, honest note, real `type=submit`, no
  `#contactSuccess`/"Message sent!"/"Sending..." — re-checked after the
  old fake 2.7 s window); **validation** (empty → all 3 honest errors +
  aria-invalid, no mailto; bad email caught; errors clear on fix);
  **action** (mailto To = real email; default + custom subject; body =
  message + sender; honest status, never "sent"); **keyboard**
  (focus-visible outlines in built CSS); **mobile** (1024/768
  1-column, 768 padding, 480 rows stack); **identity** (bordered solid
  panel, mono labels, zero blur/glow/shadow, old chrome gone — only
  Phase-06 dead `h4` selector remains by convention); **full
  regression** (7 anchor sections, 6 nav, 0 dead links, 0 `<img>`,
  hero gmail intact, other sections intact).
- Documented env limit (as Phases 07–15): no real-browser visual pass
  possible in sandbox.

### This checkpoint
- ZIP: `portfolio-backups/phase-16-contact.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…16-NOTES.md + full react-app/ source (no node_modules, no
  dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining candidates
when requested:
- The Stats band ("15 Happy Clients" counter — visibly unsupported;
  needs real numbers or removal).
- Footer (last unredesigned section).
- `prefers-reduced-motion` pass; cursor width-gate bug; 1.8 s loader;
  dead Button.tsx; 3 lint warnings (all pre-existing flags).

## Blocker (Phase 16)
None.

## Phase 17 — Footer (COMPLETE)

### What changed
- `Footer.tsx` rewritten — **"the last line"**: one quiet row that
  closes the page in the site's own language instead of a generic
  company footer. Identity (`<SIYAM/>` mark + one-line role ·
  location), `// jump` (the six sections, reusing `navLinks.ts` —
  same single source as the header), `// reach` (Email / WhatsApp /
  GitHub / LinkedIn as text links, safe new-tab), then the source's
  copyright bar verbatim. Deliberately NO CTA (Contact above is the
  call to action), NO icon grid (zero SVG), NO link columns (exactly
  10 links), no CV (no real file). Facebook/Instagram stay in the
  Contact section, which carries the full set.
- `style.css` §17 rewritten (`.footer__main` row + hairline, mono
  `.footer__kicker`, merged nav/reach wrap lists, color-only hover,
  `.footer a:focus-visible`, `.footer__bottom` bar) + media: 768
  stacks + centers, 480 tightens. Old `.footer__inner`/
  `.footer__socials` rules removed. Zero blur/glow/shadow on footer
  rules.
- Doc-level: stale `siteConfig.ts` header comment corrected (claimed
  AUDIT risk #1 "intentionally NOT resolved" — resolved in Phase 16).
  No values changed.

### Verification (33/33 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 36.50 kB / JS 264.65 kB);
  lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: **structure** (footer after #contact,
  no button/.btn/CTA wording, zero SVG, exactly 10 links, old chrome
  gone); **identity** (mark + role/location line); **navigation**
  (real labeled nav, same six links as header in same order, all
  resolve); **reach** (real gmail, WhatsApp href+display, GitHub
  profile + LinkedIn safe new-tab, no CV/#, only real email/phone
  digits per-element); **copyright** (both source lines verbatim);
  **built CSS** (exact minified strings; 768 stack/center; 480
  tightening; old chrome absent; zero blur/glow/shadow); **full
  regression** (7 sections, 6 nav, hero gmail, contact intact, 0
  dead links, 0 `<img>`).
- Documented env limit (as Phases 07–16): no real-browser visual pass
  possible in sandbox.

### This checkpoint
- ZIP: `portfolio-backups/phase-17-footer.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…17-NOTES.md + full react-app/ source (no node_modules, no
  dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining candidates
when requested:
- The Stats band ("15 Happy Clients" counter — visibly unsupported;
  needs real numbers or removal).
- `prefers-reduced-motion` pass; cursor width-gate bug; 1.8 s loader;
  dead Button.tsx; 3 lint warnings (all pre-existing flags).

## Blocker (Phase 17)
None.

## Phase 18 — Interaction System (COMPLETE)

### What changed (all in `style.css`)
- **Audit**: every `:hover`/`:focus`/`:active` rule enumerated.
  Violations were concentrated in the button system + back-to-top;
  gaps in keyboard coverage and touch feedback.
- **Universal patterns eliminated**: `.btn--primary` always-on glow;
  `.btn--primary/:outline` hover lift+glow; `.btn--ghost` hover lift;
  `.back-to-top` glow + hover lift. Buttons now: primary hover
  deepens the fill (press-ready, no motion), outline hover tint
  fill, ghost hover tint+border+color; the press RIPPLE is kept
  (buttons → press). Zero `translateY(-2px/-3px)` and zero glow
  shadows remain anywhere in the built CSS — complete box-shadow
  inventory is loader pulse ×2 + status-dot pulse ×2 + form focus
  ring ×1.
- **Keyboard completed**: `.btn:focus-visible` now global (contact
  compose + projects-case GitHub button); `.hero__action`,
  `.about__action`, `.services__cta-link`, `.back-to-top` joined the
  square accent-outline convention (lightningcss merges into one
  8-selector rule).
- **Touch alternatives**: new §17B — `:active` press states
  mirroring each element's own hover (hero/about tint+border,
  primary deeper fill, nav CTA, services CTA color+gap, back-to-top
  darker fill, project rows number+tile). Color/fill only — no
  transforms on any press.
- **Experience → node**: with one period there is no multi-node
  timeline (P14 decision), so the entry index IS the node — hover
  underlines it.
- **Kept (already context-specific)**: nav color+index accent, CTA
  arrow nudges, skills token, projects row number+tile, services
  CTA gap, contact channel feedback, form focus ring, footer quiet
  hover, skip-link reveal.

### Verification (35/35 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 37.04 kB / JS 264.65 kB);
  lint 0 errors, 3 pre-existing warnings.
- jsdom + built-CSS: universal effects eliminated (exact strings +
  full shadow inventory), button press/focus, link responses kept,
  7 touch `:active` states, complete keyboard coverage + native
  focusability (30+ interactive elements, no tabindex traps),
  context responses, no interaction rule gated inside a viewport
  media block, behavior smoke (contact validation + real mailto
  still work), full regression (7 sections, 6 nav, footer 10 links,
  0 dead links, 0 `<img>`, 0 console errors).
- Regression suites re-run: Phase 16 contact 33/33, Phase 17 footer
  33/33 — still green.
- Documented env limit (as Phases 07–17): `:hover`/`:active`
  verified by exact compiled CSS, not emulated pointer states.

### This checkpoint
- ZIP: `portfolio-backups/phase-18-interactions.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…18-NOTES.md + full react-app/ source (no node_modules, no
  dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining candidates
when requested:
- `prefers-reduced-motion` pass (remaining motion: arrow nudges,
  ripple, AOS, loader + status-dot pulses).
- The Stats band ("15 Happy Clients" — unsupported).
- Cursor width-gate bug; 1.8 s loader; dead Button.tsx; 3 lint
  warnings (pre-existing flags).

## Blocker (Phase 18)
None.

## Phase 19 — Motion (COMPLETE)

### What changed
- **Audit**: all 6 CSS keyframes + 7 JS motion sources classified
  against hierarchy/feedback/storytelling. Banned-pattern sweep
  (snap/blur/3D/particles/blobs/parallax) — none present, asserted
  absent.
- **Removed**: `scrollBob` (hero scroll hint's constant bob — the
  only pure "modern portfolio" motion); static line + label remain.
- **Reduced motion respected everywhere** (new CSS §20 + JS):
  all CSS animation/transition → ~0, ambient pulses to clean static
  base, carets stay visible, `[data-aos]` always visible,
  `scroll-behavior: auto`; JS: typing → static phrase, count-up →
  snap, smooth scroll → instant (`behavior: 'auto'`).
- **Performance (behavior-identical)**: scroll progress bar →
  direct `scaleX` write via ref (no state/re-renders/width
  transition); custom cursor gated to fine-pointer devices
  (width-gate bug fixed in JS — no rAF/listeners on touch) +
  rAF idle-stop when converged; AOS scanner rAF-throttled (one scan
  per frame); loader fill + cursor grows → transform only —
  **zero** width/height transitions or animations remain in the
  built CSS.
- **Lint hygiene**: `useMediaQuery` rewritten on
  `useSyncExternalStore` — last of the three pre-existing warnings
  cleared; build now **0 warnings, 0 errors**.
- Kept (justified): AOS reveals (≤300 ms stagger), loader pulse +
  fill, caret/typing blinks, status-dot pulses, smooth scroll,
  count-up, typing, validation shake.

### Verification (30/30 PASS, 0 console errors, 3 simulated modes)
- `tsc` 0 errors; build 37 files (CSS 37.34 kB / JS 265.43 kB);
  lint 0 warnings, 0 errors.
- jsdom: **normal desktop** (count-up runs + lands, typing live,
  AOS end-to-end, smooth scroll captured, cursor follows +
  idle-stop resumes, progress bar scaleX/no state); **reduced
  motion** (counters snap, typing static, instant jumps,
  `[data-aos]` override); **coarse pointer** (cursor absent, page
  functional). Built-CSS invariants: keyframe inventory = exactly
  the five justified ones; zero width/height transitions; full RM
  override set; banned patterns absent; AOS transform+opacity;
  stagger ≤300 ms; all transitions paint/transform/opacity only.
- Regression suites re-run: Phase 16 contact 33/33, Phase 17
  footer 33/33, Phase 18 interactions 35/35 — all green (contact
  harness updated to simulate a fine-pointer desktop).
- Documented env limit (as Phases 07–18): frame-level behavior
  verified by exact compiled CSS + simulated events in jsdom.

### This checkpoint
- ZIP: `portfolio-backups/phase-19-motion.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…19-NOTES.md + full react-app/ source (no node_modules, no
  dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining candidates
when requested:
- The Stats band ("15 Happy Clients" — unsupported content).
- 1.8 s loader duration (source behavior, deliberately unchanged);
  dead Button.tsx; CV file.

## Blocker (Phase 19)
None.

## Phase 20 — Responsive QA (COMPLETE)

### Method
No browser in sandbox → effective CSS cascade computed at all 9
widths (1440/1280/1024/820/768/600/480/390/360) from the built CSS
(mini cascade simulator over base + `width<=N` media blocks,
later-wins) + DOM structure checks in jsdom + conservative
font-metric models for pixel-level questions.

### Genuine problems found — 2, both fixed
- **F1 (clipping)**: mobile nav sheet (≈ 410 px of content) had no
  `max-height`/`overflow` — on short viewports (landscape phones/
  tablets) the lower links + CTA row were clipped and unreachable.
  Fix: `max-height: calc(100vh - var(--nav-height))` + `100dvh`
  override + `overflow-y: auto` in the @768 sheet rule.
- **F2 (overflow)**: desktop nav row needed ~747 px worst-case vs
  ~705 px available at 769 (and ~22–40 px over at the 820 test
  point). Fix in the existing @1024 block: `.nav` gap 32→16 px,
  `.nav__link` padding .65rem→.5rem, CTA margin 0 + tighter
  padding — worst case now 669 px (36 px headroom). Spacing only,
  same design; base spacing unchanged above 1024.

### Verified not problems (no change)
Hero code snippet fits at 360 (longest line 24 chars measured);
stats 2-col numbers unclipped at 360; form inputs stretch via
column-flex; 36 px hamburger is pre-existing design; no
hijacking/snap/particles/blobs/parallax/3D/blur exist.

### Verification (60/60 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 37.57 kB / JS 265.43 kB);
  lint 0 warnings, 0 errors.
- 9-width cascade sweep (grids at each width, fixed-width overflow
  guard, typography steps) + nav capacity model + exact built-CSS
  assertions for both fixes + overflow/clipping/overlap/spacing/
  composition/touch guards + DOM checks (zero `<img>`, 7 sections,
  0 console errors).
- Regression suites re-run: contact 33/33, footer 33/33,
  interactions 35/35, motion 30/30 — all green.
- Documented env limit: pixel-level reflow approximated with
  conservative metric models; fixes carry headroom margins, not
  edge-fits.

### This checkpoint
- ZIP: `portfolio-backups/phase-20-responsive.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…20-NOTES.md + full react-app/ source (no node_modules, no
  dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining candidates
when requested:
- The Stats band ("15 Happy Clients" — unsupported content).
- 1.8 s loader duration (source behavior, unchanged); dead
  Button.tsx; CV file.

## Blocker (Phase 20)
None.
## Phase 21 — Accessibility QA (COMPLETE)

### Method
Audit across semantic HTML, headings, alt text, keyboard, focus,
links/buttons, forms, ARIA, contrast, reduced motion. No browser in
sandbox → WCAG 2.1 contrast ratios computed exactly (relative
luminance) from the built CSS tokens; keyboard-only navigation
simulated in jsdom (DOM-order focus + trap/Escape/restore events);
built-CSS structural assertions. Documented limit: no real focus
paint or layout.

### Genuine problems found — 11, all fixed
- **9 contrast failures (WCAG 1.4.3/1.4.11)**, all fixed with
  hue-family-only shifts (same design language, no new colors):
  `--text-muted #64748B → #8196B4` (3.07–3.96:1 → ≥4.83:1 on all
  four surfaces); `.contact__error #EF4444 → #F87171` (3.89 →
  5.29:1); `.btn--primary` base+hover gradient darkened to
  accent-dark/`--accent-2-deep #7C4DEB` (+ `--accent-dark-deep
  #1D4ED8` on hover) so white text is ≥5.10:1 at every end (was
  3.68/4.23); `.section-tag` + 5 small accent-text-on-card spots
  (skills group nums, experience entry nums, token/link/ghost
  hovers) → new `--accent-text #5295FB` (3.98/4.31 → 4.91/5.32:1).
  Fills/icons keep `--accent` (already passes the 3:1 non-text
  rule).
- **2 semantic (invisible)**: contact form now
  `aria-labelledby="contactFormTitle"` (existing h3 got the id);
  11 decorative SVGs (4 shared social icons, back-to-top arrow, 6
  project glyphs) now `aria-hidden="true" focusable="false"`.

### Verified OK, untouched
lang/title/description/viewport; single h1 + 6 h2, no heading
level skips; header/nav(Main)/main/footer landmarks; skip link
first-in-DOM → #main[tabindex=-1], native nav preserved by the
scroll hook; mobile menu trap (Tab/Shift+Tab wrap, Escape close,
focus return to hamburger); real labels + aria-invalid/describedby
+ role=status live region + focus-to-first-invalid on failed
submit; all 30 links & 3 buttons named; zero <img>; all 12 SVGs
hidden from AT; :focus-visible everywhere (Phase 18); the one
outline:none carries a visible ring; no positive tabindex;
reduced-motion block intact (Phase 19).

### Verification (88/88 PASS)
- `tsc` 0 errors; build 37 files (CSS 37.69 kB / JS 265.72 kB);
  lint 0 warnings, 0 errors.
- 21 computed contrast pairs + 16 built-CSS structural + 38 DOM
  semantic + 15 keyboard-only + 4 runtime hygiene.
- Regression suites re-run: responsive 60/60, contact 33/33,
  footer 33/33, motion 30/30, interactions 35/35 (3 interaction
  assertions updated to the corrected button/skills strings —
  the intended Phase-21 changes).
- Documented judgments in PHASE-21-NOTES.md: hairline form-field
  borders kept (1.4.11 judgment — label+fill+strong focus ring),
  headingless Stats band acceptable, skip-link focus transfer and
  mailto are browser behaviors, pre-existing prod console.log
  noted for future cleanup.

### This checkpoint
- ZIP: `portfolio-backups/phase-21-a11y.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03…21-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- The Stats band ("15 Happy Clients" — unsupported content).
- 1.8 s loader duration (source behavior, unchanged); dead
  Button.tsx; CV file; prod console.log.

## Blocker (Phase 21)
None.
## Phase 22 — Performance QA (COMPLETE)

### Method
No browser in sandbox → static asset analysis of dist, built-CSS
keyframe/transition property audit, source listener inventory
(passive flags, cleanup balance), runtime behavior in jsdom
(getBoundingClientRect call counts, rAF-throttle timing, DOM size,
listener bail-outs). Documented limit: no real device frame profiling;
every applied fix removes a provable cost class.

### Optimizations — 4, all justified
- **P1 (dead download)**: Lora (roman+italic variable woff2) removed
  from the Google Fonts URL — zero consuming elements (its only CSS
  consumers died with the testimonials section, Phase 15). 3 font
  families remain, variable + display=swap + preconnect intact.
- **P2 (per-frame DOM scan)**: AOS reveal scanner now caches the
  [data-aos] list once, skips already-revealed elements, and detaches
  its scroll/resize listeners entirely once everything is revealed.
  Same 80px threshold / delays / class. Verified: 0 rect reads after
  full reveal; 20 scroll events in one frame → exactly 1 scan pass.
- **P3 (non-compositor keyframe)**: status-dot pulse was an infinite
  box-shadow animation (repaint every frame, forever). Now a static
  5px base shadow + a shared ::after glow layer animated with
  opacity + scale only (compositor-only); 0%/50% stills match the old
  keyframe exactly (identical shadow geometry, inset:0).
- **P4 (idle animation)**: `.loader.done .loader__logo{animation:none}`
  — the loader pulse (box-shadow, infinite) no longer repaints a
  hidden box after the 1.8s intro.

### Audited, deliberately untouched (documented in notes)
zero images (nothing to lazy-load/format — verified, not assumed);
no code-splitting (single 81kB-gz page, no deferred content); cursor
left/top positioning (negligible, transform would collide with CSS
class states); ScrollProgressBar reads (sub-frame);
useScrollThreshold (boolean + React bail-out); loader pulse while
visible (finite 1.8s); content-visibility (505-node page, anchor/
reveal risk); render-blocking font CSS (page is JS-rendered anyway,
preconnect in place); StrictMode (no prod overhead).

### Verification (46/46 PASS)
- `tsc` 0 errors; build 37 files (CSS 37.95 kB / JS 265.95 kB,
  80.96 kB gz — no bloat); lint 0 warnings, 0 errors.
- 14 asset/font + 18 built-CSS pattern (keyframe/transition property
  audits, passive flags, no layout-property transitions, no
  backdrop-filter/will-change) + 2 listener-hygiene + 10 runtime
  (DOM 505 nodes, cursor touch bail-out, AOS reveal end-to-end,
  stop-path detach, rAF throttle, progress-bar math) checks.
- Regression suites re-run: a11y 88/88, responsive 60/60, contact
  33/33, footer 33/33, interactions 35/35, motion 30/30, experience
  28/28. Suite updates (intentional): motion keyframe list + dot-glow
  count (P3), interaction box-shadow inventory 5→6 (P3), experience
  dot-glow identity assertion (P3) + 3 stale P14-era checks brought
  to current reality (#testimonials removed Phase 15; Stats band
  anchorless; cursor absent under coarse-pointer emulation — Phase 19
  gate).

### This checkpoint
- ZIP: `portfolio-backups/phase-22-performance.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03…22-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- The Stats band ("15 Happy Clients" — unsupported content).
- 1.8 s loader duration (source behavior, unchanged); dead
  Button.tsx + dead testimonial CSS; CV file; prod console.log.

## Blocker (Phase 22)
None.
## Phase 23 — SEO (COMPLETE)

### Method
Implemented/verified every listed item against verified real data
(git-verified facts, Phase 11/16 API checks, the site's own declared
content). Person schema is field-restricted by an allow-list assertion in
the test suite — invented fields fail the build. Production metadata
verified on the BUILT dist, not the source.

### Key judgment call (documented)
Canonical/sitemap/robots need a real address but the site is not
deployed (Phase 16). Used the deterministic GitHub Pages URL for this
exact repo — https://devssiyam.github.io/portfolio/ (owner + repo are
verifiable facts; GitHub's scheme makes it exact). Declared canonical
address, live once Pages is enabled. All 7 URL-bearing places listed in
the HTML comment for a future domain move.

### Implemented
- canonical (repo-derived); OG extended (og:url, og:image + 1200x630
  dims, og:site_name); twitter card (summary_large_image +
  title/description/image); Person JSON-LD (name, jobTitle, url,
  email git-verified, addressCountry Bangladesh, sameAs = GitHub
  API-verified + LinkedIn site-declared — no skills/credentials/photo);
  sitemap.xml (1 url, real non-future lastmod); robots.txt (allow all +
  absolute Sitemap line); social image public/og-image.png (64KB
  1200x630, rendered from site data only: name, real tagline,
  "Based in Bangladesh", favicon S motif — zero invented claims).
- Verified unchanged: title (57c), description (167c, real, Google
  truncates by pixels), keywords (6 factual role descriptors — no
  stuffing added), author, favicon (inline data URI survives build),
  single h1 + no heading skips, zero <img> (nothing needs alt), all
  links named.
- Deliberate omissions (documented): og:locale (region claim),
  twitter:creator (no verified X handle), Person image (branding card
  is not a photo), FB/IG in sameAs (unverified consumer profiles).

### Verification (54/54 PASS)
- `tsc` 0 errors; build 37 files (index.html 5.07 kB; JS unchanged
  265.95 kB / 82.06 gz); lint 0 warnings, 0 errors.
- 21 core-metadata (built HTML) + 12 Person-schema (field allow-list +
  cross-check vs siteConfig) + 6 sitemap + 4 robots + 6 social-image
  (PNG signature, IHDR 1200x630, size, byte-identity) + 5
  production-DOM checks; truthfulness guards (no award/certified/
  top-rated/#1 patterns) on all descriptions.
- Regression suites re-run: a11y 88/88, responsive 60/60, contact
  33/33, footer 33/33, interactions 35/35, motion 30/30, experience
  28/28 — all green.

### This checkpoint
- ZIP: `portfolio-backups/phase-23-seo.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03…23-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (makes the canonical URL live) + deploy.
- The Stats band ("15 Happy Clients" — unsupported content).
- 1.8 s loader duration (source behavior, unchanged); dead
  Button.tsx + dead testimonial CSS; CV file; prod console.log.

## Blocker (Phase 23)
None.
## Phase 24 — Functional QA (COMPLETE)

### Method
Production dist booted in jsdom (controllable IntersectionObserver
stub for the active-section test, stubbed anchor click to capture the
form's composed mailto, captured window.scrollTo) + local HTTP smoke
test on vite preview (content types + byte identity) + network checks
(authenticated GitHub API for authoritative liveness; direct external
network unavailable in sandbox — socials return 403 bot-walls,
documented as unverifiable, no evidence of death).

### Genuine defect found — 1, fixed
- **WhatsApp deep link in local format**
  (`whatsapp://send?phone=01330585129`). Click-to-chat spec requires
  international format (country code, no leading zero) — local format
  is not a valid destination from a browser. Now
  `phone=8801330585129` (same real number, BD code +880 — not an
  invented destination). New `whatsappDisplay` keeps the displayed
  number the familiar local 01330585129 (display/destination
  separated). All 4 hrefs flow from the single config value.

### Verified working / already correct
- Navigation: 6/6 targets, smooth-scroll interception, logo→#home,
  active-section IO highlight moves correctly, skip link native.
- Mobile menu: open/close/Escape + focus trap + focus return +
  link-click closes and scrolls.
- Projects: 1 link → the site's REAL repo (API-verified public/main);
  placeholder repo (devs.siyam) gone.
- GitHub: profile + repo live (authenticated API).
- Live links: complete inventory — 5 unique https (4 site-declared
  socials + real repo), 3 mailto, 4 whatsapp, 8 anchors all resolve,
  zero `a[href="#"]`, no javascript:, no click-only pseudo-links.
- Email: single git-verified address everywhere; form composes a real
  mailto (address/subject/body + fallback captured and asserted).
- CV: correctly absent (no real file — Phase 16/17 held).
- Buttons: 3, all named, all functional (hamburger / submit /
  back-to-top scrollTo top:0 smooth).
- Forms: full validation flow + live region, 0 page errors.
- HTTP: / + JS + CSS + og-image (byte-identical) + robots + sitemap
  all 200 with correct types; favicon.ico 404 expected (data-URI icon).

### Verification (45/45 PASS)
- `tsc` 0 errors; build 37 files (JS 265.92 kB / 82.05 gz; CSS
  37.95 kB / 7.47 gz); lint 0 warnings, 0 errors.
- Functional suite 45/45; regressions re-run: a11y 88/88,
  responsive 60/60, contact 33/33, footer 33/33, interactions
  35/35, motion 30/30, experience 28/28, SEO 54/54 (contact + footer
  updated for the intentional WhatsApp format change).

### This checkpoint
- ZIP: `portfolio-backups/phase-24-functional.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03…24-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (makes canonical + social image + sitemap live).
- The Stats band ("15 Happy Clients" — unsupported content).
- 1.8 s loader duration (source behavior, unchanged); dead
  Button.tsx + dead testimonial CSS; CV file; prod console.log.

## Blocker (Phase 24)
None.
## Phase 25 — Code Quality (COMPLETE)

### Method
Systematic evidence-based audit: unused-CSS scanner (every selector vs
source class strings + live runtime DOM), token audit (every custom
property vs var() usages), duplicate-selector + same-scope conflict
scan, import-graph scan, dependency audit. Nothing removed on
preference; every removal re-verified zero-reference.

### Debt cleaned (4 categories)
- **Dead files (2)**: Button.tsx (zero importers, never bundled — its
  ripple CSS is live and stays), tokens.ts (zero importers, stale
  "used by useMediaQuery" comment — they pass literal queries).
- **Dead CSS (16 selectors + --font-serif)**: P06-era typography rules
  targeting pre-migration class names (hero__badge, project-card__*,
  service-card__*, skill-card__name, about__highlight,
  contact__info-card, testimonial-card__*, hero__stat-*) + unused
  button variants .btn--outline/.btn--lg + --font-serif (Lora left the
  load in Phase 22; no consumer left).
- **Shadowed duplicates (6)**: old :root --font-base/--font-mono (P06
  extended stacks now sole declaration); .form-group label mono
  font-family; .stats__number 900/-0.04em; .footer__logo 900;
  .section-title 800/1.2 — all shadowed by the P06 trailing block
  (completes the convention P06 already applied to .hero__title).
  Computed styles byte-identical.
- **Token inconsistency (1)**: ScrollProgressBar inline #3B82F6/#8B5CF6
  -> var(--accent)/var(--accent-2) (last raw accent literals in the app).

### Deliberately kept (documented)
48 "unused" §1b tokens = Phase 05's explicit documented reference set
(reversing that decision would violate GLOBAL CONTROL); literal hex at
.code-*/status dots (same P05 decision); duplicate selectors across
media blocks (legit responsive pattern; same-scope scan found no
accidental conflicts — only the intentional vh/dvh pair); three
separate @768 blocks (fragmentation, not conflict — P20 sweep
verified); listeners (all justified, Phase 22); dependencies (all 9
used — no pruning).

### Verification (42/42 PASS)
- `tsc` 0 errors; build 35 files (CSS 36.67 kB / 7.16 gz — 1.28 kB
  smaller than Phase 24; JS 265.94 kB / 82.05 gz); lint 0/0 (34 files).
- Quality suite 42/42 (dead code, dead CSS, shadowed duplicates incl.
  built-CSS behavior identity, full unused-class audit re-run = zero,
  token integrity, import graph, runtime behavior).
- Regressions: a11y 88/88, responsive 60/60, contact 33/33, footer
  33/33, interactions 35/35, motion 30/30, experience 28/28, SEO 54/54,
  functional 45/45 (interaction + contact updated for the intentional
  removals).

### This checkpoint
- ZIP: `portfolio-backups/phase-25-code-quality.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03…25-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (makes canonical + social image + sitemap live).
- The Stats band ("15 Happy Clients" — unsupported content).
- 1.8 s loader duration (source behavior, unchanged); CV file;
  prod console.log.

## Blocker (Phase 25)
None.
## Phase 26 — Human Design Audit (COMPLETE)

### Scope
Audit the full portfolio against "a specific real developer's
portfolio, not an AI-generated template" — generic/AI copy, template
composition, repetitive cards, artificial premium effects,
unnecessary gradients/glow, decorative clutter, unnecessary
animation, vague project presentation. Subtraction + specificity
only; nothing invented; high-confidence changes only.

### Removed (all high-confidence, all documented)
- **Components (4 template tells)**: Loader (1.8 s fake
  "Initializing Portfolio…" screen — nothing to initialize; AOS first
  pass now on mount + window load), CustomCursor (decorative dot +
  ring, cursor:none, permanent rAF), Stats band (count-up counters —
  generic pattern, unsupported numbers incl. the AUDIT-flagged "15
  Happy Clients"), Hero typewriter (cycling-phrase motion; the stack
  it cycled is already in the figure caption + Skills).
- **Effects**: gradient title text → solid accent; gradient button →
  solid --accent-dark (P21 contrast preserved: 5.17:1 / 5.9:1);
  button ripple; hero background grid; 3 ambient radial section
  glows; status-dot glow + pulse; fake editor traffic-light dots +
  "✨"; --accent-glow token; 2 production console.logs; orphaned
  .code-comment rule. Built CSS now has exactly ONE keyframe:
  logoCaretBlink (the brand caret).
- **Copy**: About bio paragraph 2 (cliché cluster); Skills + Contact
  filler subtitles; project descriptions trimmed to factual core
  ("sleek/high-converting/premium/smooth" gone; "typed.js" inaccuracy
  fixed — baseline typing is hand-rolled).

### Kept (documented)
His verbatim voice (greeting, one-liner, byline, principles,
"Built with ❤️"); the code-editor identity (wordmark + caret, //
kickers, index/manifest layouts); AOS reveal (source-derived,
RM-gated); scroll progress bar (functional); back-to-top, form
shake, hover transitions (functional feedback); static Scroll cue;
§1b token reference set (P05/25 decision).

### AUDIT.md open items resolved
"15 Happy Clients" → removed; "1.8 s loader" → removed; "2 prod
console.logs" → removed. "CV file" unchanged (no file exists; no
dead link carried).

### Verification (50/50 PASS)
- tsc 0; build: CSS 31.17 kB / 6.05 gz (−5.5 kB vs P25), JS 260.02
  kB / 80.45 gz (−5.9 kB); oxlint 0/0 (27 files).
- Phase-26 audit suite 50/50 (removals asserted gone in DOM/CSS/JS
  strings; 22 kept-content + behavior assertions).
- Regressions: a11y 86, responsive 60, contact 33, footer 33,
  interaction 35, motion 27 (rewritten for the new motion set),
  experience 28, SEO 54, functional 45, P25 quality 42 — all green.

### This checkpoint
- ZIP: `portfolio-backups/phase-26-human-audit.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03…26-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (makes canonical + social image + sitemap live).
- CV file (when a real one exists → Contact/About/hero actions).
- Anything the user wants re-added (e.g. a real photo would make the
  hero figure stronger than the code card).

## Blocker (Phase 26)
None.
## Phase 27 — Visual Polish (COMPLETE)

### Scope
Spacing, typography, alignment, transitions, image crops, borders,
surfaces, buttons, whitespace, balance, consistency — based on the
actual portfolio; no fashionable additions; leave what works.

### Method
No headless browser in the sandbox (Chromium CDN blocked) → parsed
the BUILT minified CSS (the real visual truth) with a brace parser:
every spacing value, font size, radius, border, transition, grid
template, label column, panel padding, kicker/label role cross-checked
for system consistency. jsdom runtime confirms the DOM side.

### Fixed (2 — the only off-system values in the sheet)
- `.form-group input/textarea` transition: raw `border 0.3s,
  box-shadow 0.3s` (no easing, shorthand) →
  `border-color/box-shadow var(--transition-fast)` — matches every
  other interactive element.
- `.nav__logo:hover .nav__logo-bracket`: raw `color .3s` (no easing)
  → `color var(--transition-fast)`.
After this, every transition is token-based or raw-with-var(--ease)
(the lone exception is the mobile sheet's `visibility .25s` — stepped
property, easing does not apply).

### Audited — consistent, left untouched (evidence in the notes)
spacing scale (one, on-scale), typography steps per role, 7/5 +
64px/90px grid/label language, 1px hairline border system,
sm/md/full radius system, button variant completeness (no flat
btn), kicker/label language (mono + muted, 0.04/0.08em), section
rhythm (shared component), panel padding hierarchy. Image crops:
N/A (zero <img> — suite-verified). One considered-but-not-done:
footer hairline (works; symmetry-over-function rejected).

### Verification (12/12 PASS)
- tsc 0; build CSS 31.23 kB / 6.05 gz (+60 B vs P26), JS
  260.02 kB / 80.45 gz (byte-identical); oxlint 0/0 (27 files).
- polish27 suite 12/12 (fixes in built CSS + transition/consistency
  invariants + runtime).
- Regressions: a11y 86 (form-rule assertion updated for the
  tokenized transition), responsive 60, contact 33, footer 33,
  interaction 35, motion 27, experience 28, SEO 54, functional 45,
  P26 audit 50, P25 quality 42 — all green.

### This checkpoint
- ZIP: `portfolio-backups/phase-27-visual-polish.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03…27-NOTES.md + full react-app/
  source (no node_modules, no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (makes canonical + social image + sitemap live).
- CV file (when a real one exists).
- A real photo would strengthen the hero (no fake assets added).

## Blocker (Phase 27)
None (browser-less sandbox noted; audit method documented).
## Phase 28 — Security Hardening (COMPLETE)

### Audit scope
XSS / dangerouslySetInnerHTML / unsafe DOM, user-controlled input +
URLs, unsafe href/embeds/iframes/external scripts, secrets/env,
dependency + lockfile integrity, third-party attack surface,
security headers, debug/production exposure.

### Fixes (3 genuine issues)
1. **Raw-HTML sink eliminated** — the app's only one
   (dangerouslySetInnerHTML in Projects' wireframes). SVG strings →
   React element trees (data/projects.tsx; Project.placeholderSvg:
   ReactNode). No sanitizer lib needed — the sink itself is gone.
2. **Lockfile integrity restored** — 34 extraneous top-level packages
   (a full untracked jsdom tree) were in node_modules but in neither
   package.json nor package-lock.json. jsdom moved to the workspace
   root (outside the repo, for the QA suites); `npm ci` → node_modules
   matches the lock exactly (0 extraneous, 0 invalid, npm audit 0).
3. **Security policy added** — GitHub Pages has no header support, so
   meta form: CSP (script-src 'self'; object-src 'none';
   frame-ancestors 'none'; base-uri 'self'; connect-src 'self';
   font/img scoped to Google Fonts; form-action 'self' mailto:
   whatsapp:; style-src 'unsafe-inline' documented as the inline-style
   attribute trade-off) + Referrer-Policy: no-referrer. Every
   directive derived from the verified built output.

### Verified clean (no fix)
links all https/mailto/whatsapp/# + 7/7 noopener; single input path
(mailto composer) fully encodeURIComponent'd with a static recipient
— proven by a live <img onerror>/<svg onload> injection attempt
(structurally safe URL, zero injected elements/handlers, zero errors);
zero iframes/embeds/fetch/XHR; zero secrets/env; zero console/debugger;
no source maps in dist; no external <script>; Google Fonts = only
third party (P22 documented), now scope-limited by CSP. No backend
exists (static site — none invented); client-side validation treated
as UX, not security.

### Verification (31/31 PASS)
- security28 suite 31/31 (sinks, URL/embed safety, input-path proof,
  secrets, npm audit + lockfile match, CSP structure, debug, runtime).
- Regressions: P26 audit 50, a11y 86, responsive 60, contact 33,
  footer 33, interaction 35, motion 27, experience 28, SEO 54,
  functional 45, P25 quality 42, P27 polish 12 — all green (546 total).
- tsc 0; oxlint 0/0; build: CSS 31.23 kB / 6.05 gz (unchanged), JS
  260.56 kB / 80.41 gz (+0.5 kB SVG elements), html 7.88 kB (CSP +
  docs).

### This checkpoint
- ZIP: `portfolio-backups/phase-28-security.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…28-NOTES.md + full react-app/ source (no node_modules,
  no dist).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (canonical + social image + sitemap go live;
  CSP already in place for it).
- CV file (when a real one exists).
- Move the CSP to HTTP headers if the host ever supports them
  (style hashes would drop 'unsafe-inline').

## Blocker (Phase 28)
None.

## Phase 29 — Runtime Hardening (COMPLETE)

### Audit scope
console errors/warnings, broken imports/routes/components,
undefined/null/empty states, failed images/fonts/assets, invalid
inputs + form failures, loading/error states, network/slow-load,
refresh/direct-route, back/forward, broken buttons/links/interactions,
runtime exceptions.

### Result: zero confirmed app defects → zero code changes
Fresh-eyes read of all 27 source files + API-surface sweep of the
production bundle (scrollIntoView/fetch/history/location/storage hits
are all React DOM internals, verified by context). New `runtime29`
suite (42 checks) loads the real bundle in jsdom with zero-tolerance
error traps and exercises every flow — all clean:
- zero console noise, zero exceptions, zero unhandled rejections;
- no undefined/NaN/[object] in rendered text; no empty headings;
- no <img>/iframe/embed surface; font failure degrades via system
  fallback stacks (display=swap); all /assets + og/robots/sitemap exist;
- 29 anchors all from the allowed set (resolving #/https/real
  mailto/real whatsapp); 7/7 _blank noopener+noreferrer;
- every form failure mode exercised (empty, whitespace, 6 malformed
  emails, padded email accepted-after-trim, unicode/injection payload,
  5,000 chars, double submit, clear-on-typing) — honest errors,
  correct encoding, never a bad mailto;
- direct load at any fragment (even unknown) + missing-CSS boot OK;
  back/forward safe (zero history listeners); reduced-motion path OK;
  hamburger/compose/backToTop + skip-link native focus transfer OK.

### Audited-accepted (documented, behavior preserved)
status line never resets (stays true), double submit = two drafts,
menu-open + desktop resize keeps scroll lock until closed (same as
frozen baseline), mail clients may truncate huge mailtos (not the
site), cvHref '#' referenced by no rendered element.

### Verification (42/42 + full regression)
- runtime29 42/42; regressions: security28 31, audit26 50, a11y 86,
  responsive 60, contact 33, footer 33, interaction 35, motion 27,
  experience 28, SEO 54, functional 45, quality 42, polish27 12 —
  **588 checks total, all green**.
- tsc 0; oxlint 0/0 (26 files); build byte-identical to Phase 28
  (index-DB3H5BZE.js 260.56/80.41 gz, index-DI7PMBRh.css 31.23/6.05 gz,
  html 7.88 kB) — no source touched.
- Harness note: jsdom runs activation behavior on script-dispatched
  clicks (spec deviation) — suite dispatches synthetic clicks only for
  in-document anchors. No browser binary in sandbox (Playwright CDN
  re-verified blocked); runtime verification = jsdom + bundle analysis.

### This checkpoint
- ZIP: `portfolio-backups/phase-29-runtime.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…29-NOTES.md + full react-app/ source (no node_modules,
  no dist). Diff vs Phase 28 zip: +PHASE-29-NOTES.md only.

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (canonical + social image + sitemap go live).
- CV file (when a real one exists).
- HTTP-header CSP if the host ever supports it (style hashes drop
  'unsafe-inline').

## Blocker (Phase 29)
None.

## Phase 30 — Performance Hardening (COMPLETE)

### Audit scope
bundle size, re-renders/expensive React work, image/font loading,
lazy loading + resource priority, render-blocking, network requests,
CSS/DOM complexity, animation/frame performance, layout shift,
mobile/slow devices, CWV determinants. Measurement-first (no invented
scores — no browser/network in sandbox, stated as such).

### Result: no justifiable bottleneck → zero code changes
Measured (real numbers):
- Bundle 260.56 kB / 80.41 gz = 219.55 kB / 68.56 gz React framework
  (measured via a throwaway same-toolchain baseline build) + 41.0 kB /
  11.9 gz app code — no bloat; 84% is the structural P05 framework.
- Runtime payload: 7 requests (HTML 3.08 gz + JS 80.41 gz + CSS 6.05
  gz = 89.5 kB gz, + 3 variable woff2 latin + 1 font CSS) — no
  third-party JS, no XHR (CSP connect-src 'self').
- CSS: 325 rules, max selector depth 1, 1 keyframe (opacity-only
  infinite), 7 !important all in the reduced-motion block, 0
  will-change/backdrop-filter/filter.
- DOM: 474 elements, depth 13, 823 attributes.
- Re-renders: App never re-renders (no state/context); scroll
  threshold handlers bail out (zero renders while scrolling); Contact
  leaf-local per keystroke. No memoization needed.
- CLS: zero images, transform-only reveals, fixed overlays, reserved
  nav height; only font-swap shift (standard, display=swap).
- No render-blocking JS (module = deferred); only cross-origin
  render-blocker = font CSS, preconnect'd; unblocking would need
  inline JS the P28 CSP forbids (rejected trade).
Rejected candidates with evidence: content-visibility (premature on
474 nodes), critical-CSS inline (HTML bloat), font weight-range
narrowing (variable files identical), fetchpriority/preload (nothing
to prioritize), will-change (memory cost), og-image WebP
(crawler-only), HTML comment removal (decision trail), memoization
(premature), gap-hover transition removal (visual change).

### Environment incident (transparent)
Sandbox reset between P29 and P30 wiped untracked rebuildable state
(node_modules, dist, /tmp suites). Restored via npm ci (P28 lockfile
fix intact) + jsdom re-hoist + rebuild → **bit-identical hashes**
(index-DB3H5BZE.js / index-DI7PMBRh.css) = artifact identity with the
588-check-green P28/P29 build. runtime29 harness restored from session
record and re-run green.

### Verification (42/42 + regression by artifact identity)
- runtime29 42/42 on the rebuilt dist (boot, scroll, nav both motion
  modes, all form failures, direct loads, back/forward, sweep, zero
  exceptions/noise/rejections).
- Full 588-check P28/P29 regression stands: built artifact is
  byte-identical (content-addressed hash match).
- tsc 0; oxlint 0/0 (26 files); npm audit 0; npm ci tree clean.

### This checkpoint
- ZIP: `portfolio-backups/phase-30-performance.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…30-NOTES.md + full react-app/ source (no node_modules,
  no dist). Diff vs Phase 29 zip: +PHASE-30-NOTES.md only.

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (canonical + social image + sitemap go live;
  real CWV numbers measurable once deployed — e.g. via CrUX/Lighthouse).
- CV file (when a real one exists).
- HTTP-header CSP if the host ever supports it.

## Blocker (Phase 30)
None.

## Phase 31 — Code Health (COMPLETE)

### Audit scope
component boundaries, state/data flow, unsafe any/weak typing,
fragile effects/dep arrays, unstable keys/event handling,
duplication/dead code, import/dependency hygiene, maintainability,
unnecessary abstractions, React patterns causing bugs/wasted renders.

### Refactors (3 genuine issues, all value-preserving)
1. Dead `Stat` interface removed (orphan of P26's Stats removal).
2. `heroEmail` removed — duplicate of `contactEmail` (P16 declared
   contactEmail the single canonical email; drift hazard). Hero now
   reads contactEmail — same emitted mailto, runtime-verified.
3. Dead `cvHref: '#'` removed (no rendered element referenced it;
   P09/P17) + Contact header comment updated.
No new hooks/context/libs/memoization — none justified (App never
re-renders; threshold handlers bail out; Contact re-renders
leaf-local; all effects have correct cleanups; zero `any`; 3 standard
type assertions only; all imports used; all keys stable/unique).

### Audited clean (verified, no change)
boundaries, data flow, effects (incl. live matchMedia read in
handler, stable getSnapshot), keys, events, duplication (navLinks
single-source; whatsapp split = P24; skill icons = P10), hygiene,
naming, abstractions, render patterns.

### Verification
- tsc 0; oxlint 0/0 (26 files).
- Build: CSS unchanged (index-DI7PMBRh.css 31.23/6.05 gz); JS
  index-DBXWEggz.js 260.52 kB / 80.40 gz (−0.04 kB).
- runtime29 42/42 on the new build (boot, nav both motion modes, all
  form failures incl. exact mailto values, direct loads, back/forward,
  sweep, zero exceptions/noise/rejections).
- No stale heroEmail/cvHref/Stat references outside deliberate P31
  doc comments (grep-verified).
- Regression scope (honest): 12 rolling suites lost in the P30
  sandbox reset, not re-creatable; P31 delta = 3 surgical
  data/type removals, tsc-proven reference-free + 42-check runtime
  harness green on the new artifact.

### This checkpoint
- ZIP: `portfolio-backups/phase-31-code-health.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…31-NOTES.md + full react-app/ source (no node_modules,
  no dist). Name diff vs Phase 30 zip: +PHASE-31-NOTES.md only.

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (canonical + social image + sitemap go live;
  real CWV numbers measurable once deployed).
- CV file (when a real one exists — cvHref rule documented in P31).
- HTTP-header CSP if the host ever supports it.

## Blocker (Phase 31)
None.

## Phase 32 — Cross-Device QA
**Status: COMPLETE. 25/25 checks PASS at 1440/1280/1024/820/768/600/
480/390/360 px — zero confirmed bugs, zero code changes.**
- Method: static cascade resolution of the production minified CSS
  (jsdom cannot size viewports or evaluate @media) for per-width
  behavior + jsdom on the real built bundle for DOM/ARIA/keyboard/
  contrast/boot. 15 per-width checks (nav mode, grid collapses,
  fixed-column fit, viewport-exceeding widths, type floors, pre
  overflow, overflow guards, 769–1024 nav-row model, touch targets,
  iOS focus-zoom, pinch zoom, text-size-adjust/100vw, fixed
  geometry, z-order, reduced-motion) + 10 DOM checks (tab order,
  accessible names, focus-visible coverage, headings, labels, ARIA,
  semantics, aria-hidden, contrast, zero console errors).
- Notable investigation cleared: form inputs carry `outline:none`
  but a `:focus` accent border + 3px box-shadow ring (source L1458–
  1462, present in artifact) — focus IS visible; not a bug.
- Borderline (documented, unchanged): 769–~780 px nav row may wrap
  the CTA to 2 lines (overflow structurally impossible — flex-shrink
  + ≈45 px headroom); hamburger 36 px (1.5× the WCAG 24 px minimum).
  Font-metrics zone to eyeball at deploy.
- Verification: tsc clean, oxlint 0/0, build byte-identical sizes to
  P31 (no source edits made), 42-check runtime harness 42/42.

### This checkpoint
- ZIP: `portfolio-backups/phase-32-cross-device.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…32-NOTES.md + full react-app/ source (no node_modules,
  no dist). Name diff vs Phase 31 zip: +PHASE-32-NOTES.md only
  (84 entries vs 83).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (canonical + social image + sitemap go live;
  real CWV numbers measurable once deployed).
- CV file (when a real one exists — cvHref rule documented in P31).
- HTTP-header CSP if the host ever supports it.

## Blocker (Phase 32)
None.

## Phase 33 — Production Readiness
**Status: COMPLETE. 1 genuine deployment-blocking issue found and
fixed; everything else audited clean. Full battery green.**
- **Fix**: `base: './'` in vite.config.ts — Vite's default absolute
  `/assets/...` URLs 404 on the site's documented GitHub Pages
  subpath (`devssiyam.github.io/portfolio/`) → blank page. Relative
  URLs resolve at any depth; safe because there is no client-side
  routing. JS/CSS content byte-identical (same hashes); only the
  URL prefixes in index.html changed. Plus `preview.allowedHosts`
  (local-verification only, commented in config).
- **Audited clean**: build config (tsc-gated build, no sourcemaps,
  no dev branches), env/secret exposure (zero env usage, no .env),
  debug leftovers (none in src or dist), fonts/asset paths
  (https-only, preconnect, data-URI favicon), title/meta/canonical
  (consistent, source-based, P23 provenance), robots/sitemap/OG
  (consistent single-URL set, all 200), internal links (7 anchors ↔
  7 section ids), external links (all https, single data source,
  CSP form-action covers mailto:/whatsapp:), HTTPS-dependence
  (zero secure-context APIs, zero mixed content), caching
  (content-hashed assets; HTML freshness host-controlled).
- **Production-like runtime (actually run)**: `vite preview` root
  geometry all-200; dist served under `/portfolio/` (the documented
  geometry) — document + all assets + robots/sitemap/og 200
  (pre-fix these asset paths would have 404'd); HTTP fetch + boot
  test: 441 nodes, 7/7 sections, zero errors.
- **Verification**: tsc clean, oxlint 0/0, build identical sizes/
  hashes, runtime29 42/42 (A7 asset scan updated for `./assets/`
  — test-side), crossdev32 25/25.
- No metadata changed; nothing invented; no 404.html (single-URL
  site — documented, not a defect).

### This checkpoint
- ZIP: `portfolio-backups/phase-33-production.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…33-NOTES.md + full react-app/ source (no node_modules,
  no dist). Name diff vs Phase 32 zip: +PHASE-33-NOTES.md only
  (85 entries vs 84).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (the build is now subpath-safe — the P33 fix
  unblocks exactly this).
- CV file (when a real one exists — cvHref rule documented in P31).
- HTTP-header CSP if the host ever supports it.

## Blocker (Phase 33)
None.

## Phase 34 — Full Regression
**Status: COMPLETE. 82 checks, all PASS. Zero regressions, zero
confirmed bugs, zero code changes.**
- **Checkpoint comparison**: fresh `tsc -b && vite build` is
  BYTE-IDENTICAL to the P33 checkpoint (JS sha256 237ada2b…, CSS
  a72e0010…, HTML 94a89776…) — zero functional/visual change
  possible; no sourcemaps, no stray dist files.
- **Battery**: new P34 section/interaction suite 15/15 (7 sections
  in order, all headings exact incl. tagline-as-h1, data counts
  9 skills / 1 case + 5 rows 01-06 / 2 trades / 2 entries, contact
  4 rows + exact mailto/whatsapp hrefs, footer 10 links + exact
  copyright, 6 project titles verbatim, nav 6 pairs + CTA #contact
  + hamburger aria-expanded, og-image 1200×630 PNG, robots/sitemap
  byte-identical, fonts wiring, no orphan keyframes + caret blink,
  19/19 data-aos revealed, perf sizes + 40,963B app overhead vs
  P30 perfbase, CSP byte-exact + referrer + 7/7 _blank hygiene,
  :root tokens unchanged, fresh-boot silence); P29 runtime suite
  42/42; P32 cross-device suite 25/25; HTTP: /, /index.html,
  /#contact all 200 + / vs /index.html byte-identical (refresh-
  safe); subpath geometry all 200.
- All initial check failures during suite development were
  test-side wrong guesses (h1 tagline, 4 contact rows, 10 footer
  links, 1+5 project layout, React 19 async render, minifier
  casing) — each corrected against actual source/DOM; app behavior
  was intended design in every case.

### This checkpoint
- ZIP: `portfolio-backups/phase-34-regression.zip` — index.html,
  script.js, style.css (unmodified) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03…34-NOTES.md + full react-app/ source (no node_modules,
  no dist). Name diff vs Phase 33 zip: +PHASE-34-NOTES.md only
  (86 entries vs 85).

### Next task
Awaiting instruction (not started, not assumed). Remaining
candidates when requested:
- Enable GitHub Pages (the build is subpath-safe since P33).
- CV file (when a real one exists — cvHref rule documented in P31).
- HTTP-header CSP if the host ever supports it.

## Blocker (Phase 34)
None.
