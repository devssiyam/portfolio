# PHASE-07-NOTES.md — Header

Implements TASK 07: redesign of the Header/Navbar only. Everything outside
the header is untouched (verified — see scope below).

## Design: "the index"

The site's actual identity is a code-editor identity: JSX wordmark
(`<SIYAM/>`), hero code card, typing line, Fira Code chips. The redesign
extends that identity into the header instead of importing a generic
portfolio-nav pattern — the nav reads as the editor's **file index**:
numbered entries, square corners, solid surfaces.

### Identity (clear)
- Wordmark stays the site's actual mark: `<SIYAM/>` brackets in accent,
  "SIYAM" in Geist 800 — not a template logo, no new mark invented.
- A 3px blinking block caret after the `/>` — an intentional echo of the
  hero typing cursor (the site's own motif, not a generic flourish).
  `aria-hidden` (decorative).

### Navigation (precise)
- The 6 real sections from `data/navLinks` — no invented entries.
- Each entry carries a Fira Code index (`01`–`06`, muted → accent on
  hover/active) — a table-of-contents affordance that matches the code
  identity. `aria-hidden` (the label text is the accessible name).
- Hover: label → primary, index → accent. Active: label primary, index
  accent, full-width 2px accent underline growing from the left
  (`scaleX` transform — crisp, no center-expand wobble), plus
  `aria-current="true"` for assistive tech.
- Active-section mechanism unchanged (Phase-03 decision on record:
  IntersectionObserver module 18 only).

### States (appropriate)
- Top of page: transparent bar (content reads through, as before).
- Scrolled (>50px, same `useScrollThreshold`): **solid `var(--bg)`
  surface + 1px hairline border** — replaces the old rgba + 20px
  backdrop-blur + 30px drop shadow. No glass, no blur, no glow.
- Mobile hamburger: same three-bar → X transform as before.

### CTA (not oversized)
- "Hire Me" (content preserved) is now a quiet boxed text link — 1px
  `--border` box, square-ish `--radius-sm`, text-primary, hover →
  accent text + accent border + 3px arrow nudge. No fill, no shadow,
  no size increase. Replaces the old filled `.btn--primary` banner.

### Mobile nav (accessible)
- The old 280px right slide-out panel (rgba + blur) is replaced by a
  **full-width sheet dropping below the 60px header**: solid
  `var(--bg-card-2)` surface, hairline bottom border, numbered entries
  with hairline dividers, active entry in accent, "Hire Me →" as the
  final row (was previously dropped from mobile entirely).
- Entry animation: 10px drop + fade, 0.25s ease; `visibility` hidden
  when closed (out of tab order + AT tree when closed).
- Scrim: solid `rgba(0,0,0,0.6)` — the old 4px backdrop-blur removed.
- Behavior: body scroll locked while open (pre-existing), closes on
  Escape / scrim click / entry click (all pre-existing, verified).

### Keyboard / focus (support, verified by simulation)
- **Skip link** — first focusable element in the DOM, `href="#main"`,
  off-canvas until focused. `<main>` gained `id="main"` + `tabIndex={-1}`
  (the two smallest possible changes outside the header, required for
  the skip link to receive focus — recorded, not silent).
- **Skip-link navigation stays native**: `useSmoothScroll` (global
  module-12 hook) now returns early for `.skip-link`, because its
  `preventDefault()` + `scrollTo` would scroll without transferring
  focus — defeating the skip link. All other in-page anchors keep the
  identical smooth-scroll behavior (verified by test).
- **Hamburger**: dynamic `aria-label` (Open/Close menu),
  `aria-expanded`, `aria-controls="navMenu"`.
- **Sheet focus management**: focus moves to the first entry on open;
  Tab/Shift+Tab cycle is trapped inside the sheet; on close (any path)
  focus returns to the hamburger.
- **Focus visibility**: 2px accent `:focus-visible` outline, 2px offset,
  on the skip link and every header control.
- No menubar/arrow-key pattern — site navigation intentionally stays a
  plain nav + links (the WAI-ARIA-recommended structure; menubar is the
  common antipattern this avoids).

## Explicitly avoided (per TASK 07)
- Glass / blur: zero `backdrop-filter`, zero `filter: blur`, zero
  `box-shadow` in all header rules (source §7 block + 768px mobile
  block, and the built CSS — verified by grep on both).
- Glow: no shadows anywhere in the header.
- Pills: `--radius-sm` (6px) or square only; no `radius-full` in header
  rules.
- Template logos: the existing identity mark is kept and refined, not
  replaced.
- Oversized CTA: quiet boxed link (see above).
- Common patterns: no dot indicators, no center-grow underlines, no
  slide-in panel from the side, no glass sticky bar, no menubar.

## Scope (what changed vs. what didn't)

Changed:
- `src/components/Navbar.tsx` — restructured (skip link, indexed links,
  caret, CTA row inside the menu, full a11y wiring, focus management)
- `src/styles/style.css` — §7 NAVBAR section rewritten in place (this is
  a redesign task, so replacement is the point); the 768px media
  "Navbar mobile" block rewritten in place. Nothing else in the
  stylesheet touched.
- `src/hooks/useSmoothScroll.ts` — 6-line documented early-return for
  the skip link (behavior for every other anchor byte-identical).
- `src/App.tsx` — `<main id="main" tabIndex={-1}>` (2 attributes).

Not touched (verified):
- `P5/index.html`, `P5/script.js`, `P5/style.css` (legacy originals) —
  git status clean.
- `ScrollProgressBar` (separate component; its 2px top edge visually
  coexists with the header — noted, out of scope).
- `data/navLinks.ts` — the 6 links are the single source of truth,
  unchanged.
- All other components, hooks, data, tokens, the Phase-05/06 CSS
  blocks, and every non-header section.

## Verification (45/45 PASS, 0 console errors)

- `npx tsc --noEmit` — 0 errors. `npm run build` — succeeds
  (JS 270.31 kB, CSS 36.04 kB). `npm run lint` — 0 errors, 3
  pre-existing warnings (the transient 4th from the first draft's
  ref-in-cleanup was fixed the same way the linter suggested).
- jsdom behavioral simulation on the production bundle (no browser
  exists in this sandbox — desktop/mobile/keyboard verified at the
  behavior level + built-CSS inspection):
  - **Desktop (default state):** skip link first focusable targeting
    `#main`; wordmark + caret; 6 links numbered 01–06; active = home
    with `aria-current="true"`; quiet CTA (no `btn--primary`);
    hamburger `aria-label/expanded/controls` correct; menu/overlay
    closed; body scroll unlocked; `nav` landmark labeled "Main";
    old `.nav__cta` gone.
  - **Mobile (sheet):** open → `aria-expanded=true`, label "Close
    menu", menu+overlay `.open`, body locked, focus on first entry,
    hamburger X state; **focus trap** verified both directions
    (Tab on last → first; Shift+Tab on first → last; 7 focusable
    entries = 6 links + CTA row); Escape → closed + focus returned
    to hamburger + scroll restored; scrim click → closed + focus
    returned; entry click → closed + focus returned.
  - **Keyboard:** skip link focusable; skip-link click NOT intercepted
    by smooth-scroll (native jump+focus preserved) while a normal nav
    link still smooth-scrolls.
  - **Regression:** all structural counts unchanged (8 skills, 6
    projects, 5 services, 3 testimonials, 4 stats; loader/cursor/
    typing/footer/7 sections present).
  - **Built CSS:** no `backdrop-filter` on any header rule; scrolled
    state = solid `var(--bg)` with no shadow; mobile sheet = solid
    `var(--bg-card-2)` + visibility/opacity/transform (no offscreen
    slide); skip-link + `:focus-visible` outline rules present;
    `logoCaretBlink` keyframes present; index numbers mono; CTA has
    no fill; active underline `scaleX(1)` present.
- Known environment limits (documented, not defects): jsdom has no
  layout/real media-query evaluation, no native fragment navigation,
  and no `scrollTo` — mobile/desktop are therefore verified via
  behavior simulation + minified-CSS inspection. A visual pass in a
  real browser is recommended as the first manual step of the next
  phase (or before deploy).

## Known pre-existing issues carried forward (unchanged)
All AUDIT.md / Phase 03–06 items remain open: email conflict, fake
contact form, placeholder `#` links, shared project repo URL, missing
CV file, `cursor: none` device-class bug, no
`prefers-reduced-motion` (the caret blink is new motion but follows
the site's current no-reduced-motion stance — a reduced-motion pass
would cover it), testimonial initials, skill width/percent mismatches,
`Button.tsx` dead code, `useAosReveal` dead `rafRef`, 3 lint warnings.

## This checkpoint
- ZIP: `portfolio-backups/phase-07-header.zip` — index.html, script.js,
  style.css (unmodified originals) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07-NOTES.md + full react-app/ source (no
  node_modules, no dist).

## Next task
Awaiting instruction (not started, not assumed).
