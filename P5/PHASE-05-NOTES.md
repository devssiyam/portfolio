# PHASE-05-NOTES.md — Design Tokens

## Approach

Audited `src/styles/style.css`'s existing `:root` block against the actual repeated
values used throughout the file, then extended it additively — no existing rule, class,
or previously-declared token was changed, renamed, or removed. Nothing was redesigned.

## What already existed (Phase 03/04, unchanged)

The project already had a real token system for:
- **Color:** `--bg`, `--bg-card`, `--bg-card-2`, `--accent`, `--accent-dark`,
  `--accent-glow`, `--accent-2`, `--text-primary`, `--text-secondary`, `--text-muted`,
  `--border`, `--border-accent`.
- **Spacing:** `--space-xs` through `--space-4xl` (8-step scale).
- **Radius:** `--radius-sm/md/lg/xl/full`.
- **Shadow:** `--shadow-sm/md/lg/accent`.
- **Motion:** `--ease`, `--ease-bounce`, `--transition`, `--transition-fast`.
- **Container/layout:** `--container`, `--nav-height`, `--section-pad`.

This is the "established direction" — the additions below extend it in the same style
(same naming convention, same `--category-variant` pattern), not a parallel system.

## What was missing and added (this phase)

An audit found several values repeated 2+ times across the stylesheet with no token
name, plus two entire categories (typography scale, breakpoints) with no tokens at all:

- **Semantic status color** — `#22C55E` appeared at 4 separate sites (hero availability
  badge dot + its glow keyframes, contact form success text/background/border) with no
  name. Added `--success`, `--success-glow`, `--success-bg`, `--success-border`.
- **Code-snippet syntax palette** — the hero's 6 `.code-*` classes
  (`.code-keyword/var/op/key/str/comment`) used 6 distinct hex colors with no shared
  name. Added `--code-keyword/var/op/key/str/comment`.
- **Decorative traffic-light dots** — `.hero__code-dots` used 3 macOS-style colors.
  Added `--dot-red/yellow/green`.
- **Overlay/scrim tones** — `rgba(15,23,42, 0.98/0.92/0.85)` appeared at the mobile nav
  panel, navbar scrolled state, and loader background respectively. Added
  `--overlay-heavy/strong/soft`.
- **Typography scale** — no type-scale tokens existed; 25+ distinct one-off `font-size`
  values were found scattered through the file (0.7rem through 4rem, plus several
  `clamp()` calls). Rather than retroactively rewrite all 60 `font-size` declarations
  (a change that risks visual regression and would be a restyle, not a token addition),
  this phase names the sizes actually in recurring use — `--text-display` (hero title),
  `--text-h2` (section title, tablet+), `--text-h3/h4`, `--text-body-lg/body/body-sm`,
  `--text-caption/micro` — as a real scale future edits can reach for. No existing
  `font-size` declaration was rewritten to use them.
- **Font-weight tokens** — `--weight-regular/medium/semibold/bold/black`, naming the 5
  weights already in use (400/500/600/700/900).
- **Line-height tokens** — `--leading-tight/snug/normal/relaxed`, naming the 4 values
  already in use (1.1/1.2/1.6/1.7).
- **Z-index scale** — `--z-base/nav/nav-overlay/nav-menu/modal/cursor/cursor-follower/
  loader`, naming the stacking layers already in use (1/998/999/999/1000/99997/99998/
  99999) without changing any of them.
- **Breakpoints** — the three sizes in use (1024px/768px/480px in `@media` queries) had
  no token. CSS custom properties cannot be read inside `@media` query *conditions* (a
  CSS-language limitation, not a choice made here), so these are documented as a
  reference comment block in style.css and mirrored as real, typed constants in a new
  `src/styles/tokens.ts` (`breakpoints`, `mediaQuery`) for the TS/JSX side.

## Code changes

- `src/styles/style.css` — one new `:root` block inserted immediately after the
  existing one (labeled "1b. DESIGN TOKENS — ADDITIVE EXTENSION"), plus a breakpoints
  reference comment. The diff against the pre-Phase-05 file is a single contiguous
  insertion — confirmed via `diff`, zero lines elsewhere were touched.
- `src/styles/tokens.ts` (new) — `breakpoints` and `mediaQuery` constants mirroring the
  three CSS breakpoint values.
- `src/hooks/useCardTilt.ts` and `src/components/Hero.tsx` — the two call sites that
  hardcoded the literal string `'(max-width: 768px)'` now import `mediaQuery.mobile`
  from the new tokens file instead. Same value, same behavior — this removes a
  duplicated magic string, it does not change what either hook does.

## Verification performed

- Diffed `style.css` against the pre-Phase-05 version: the entire change is one
  contiguous block insertion; no pre-existing line was modified.
- Grepped `src/` for remaining hardcoded `max-width:`/`min-width:` literals outside
  comments and `tokens.ts` itself — none found.
- `npx tsc --noEmit` — 0 errors.
- `npm run build` — succeeds. CSS bundle hash changed (expected — new `:root` content);
  JS bundle size essentially unchanged (269.02 KB → 269.16 KB, from the new import).
- jsdom regression smoke test against the built bundle: all structural checks passed
  (loader, navbar, 6 nav links, 8 skill cards, 6 project cards, 5 service cards, 3
  testimonials, 4 stats items, contact success element all present with unchanged
  counts) and 0 console errors. The raw built CSS was inspected directly to confirm
  every new and pre-existing token value compiled to the correct (functionally
  identical, minifier-lowercased) color — e.g. `--overlay-heavy` compiles to
  `#0f172afa`, the exact hex-alpha equivalent of `rgba(15, 23, 42, 0.98)`.
- Test script and jsdom dev-dependency removed after verification.

## Explicitly out of scope (per GLOBAL CONTROL)

- No existing `font-size`, color, spacing, or radius declaration was rewritten to
  consume a token — only the two literal breakpoint strings in TS were deduplicated,
  which changes no rendered output.
- No new color, size, or motion value was invented — every token added mirrors a value
  already present and in repeated use in the file.
- No section redesign, no visual change of any kind.
