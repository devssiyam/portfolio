# Phase 14 — Experience (COMPLETE)

## Task
Redesign ONLY Experience using real role / organization / period /
responsibilities / relevant work. Never invent or expand into
fictional detail. Editorial timeline/list only if it suits the actual
content — do not force a standard timeline. Test
responsive/alignment. Checkpoint + stop.

## Key finding: no Experience section existed
Verified across the whole repo: the word "experience" appears only in
"user experience" phrases. No Experience section in the vanilla
baseline, the React app, the nav (6 links), or the MIGRATION-PLAN.
So this is a **conditional creation** (Phase 12 discipline): build it
only from what is real, and let the content decide the form.

## What the source actually supports
| Dimension | Evidence | Verdict |
|---|---|---|
| Role | "first-year Computer Science and Engineering student" (bio 1 verbatim); "Frontend Developer" (bio 1 + Hero H1) | **Two real positions** |
| Organization | No university/organization name exists anywhere in the source | **Absent — not invented** |
| Period | "first-year" + "CSE'30" (About index 04 / old chip); no start dates anywhere | **1st year · CSE'30 / Current — no invented date ranges** |
| Responsibilities | "continuously improving my development skills through projects and hands-on practice" (bio 1), "I work with HTML, CSS, JavaScript, and React.js" (bio 1), "learning through projects" (About index 04), "building modern, responsive, and user-friendly web experiences" (bio 1), "Available for freelance work — Bangladesh 🇧🇩" (Hero kicker) | **Verbatim fragments only** |
| Relevant work | The projects section (real) + this portfolio (public source — verified Phases 11/12) | **Factual cross-reference** |

Nothing else is real: no internships, no employers, no dates, no
institution. With ONE period (the present), a multi-node timeline
would be invented structure — so the presentation is **a single
bordered panel with a CURRENT marker**, not a timeline.

## Design: "the current position"
- **Placement**: between Skills and Projects (can → currently →
  proof → offer). **Not in the nav** — the Stats band sets the
  precedent for non-nav sections; Phase 07's 6-item index is
  untouched.
- **Header**: tag "Experience" (the section name — factual), title
  "Where I Am" (no marketing), **no subtitle** (nothing real to fill
  it with).
- **Panel anatomy** (established panel language — About index /
  Skills manifest / Projects case):
  - `CURRENT` mono marker with the **Hero-kicker pulsing dot**
    (same `#22C55E` dot, same `dotPulse` keyframes — it signals the
    same thing: this is happening now).
  - **01 Computer Science and Engineering Student** — Period:
    `1st year · CSE'30` · Work: the three verbatim bio/index
    fragments joined.
  - **02 Frontend Developer** — Period: `Current` · Work: the
    verbatim "building modern, responsive, and user-friendly web
    experiences" + the verbatim freelance-availability line + the
    factual pointer ("The work is in the projects section; this
    portfolio's source is public.").
  - Mono PERIOD / WORK labels — the same labeled-row language as
    the Services trades.
- Alignment: each entry is a `64px 1fr` label grid (identical for
  both entries) under a baseline-aligned number+role head —
  consistent column alignment at every width.

## Explicit decisions (all documented, none silent)
1. **Created, not redesigned** — the section did not exist; a
   redesign of nothing is impossible, so the honest move is a
   minimal conditional creation.
2. **Not a timeline** — one real period; a timeline would force
   structure the content doesn't have (explicit task constraint).
3. **No organization line** — no institution name exists in the
   source; writing "(university undisclosed)" would be meta-noise,
   so the dimension is simply absent (documented here).
4. **No dates** — "1st year · CSE'30" and "Current" are the source's
   own words; no "2026 – present" inference.
5. **Two positions, both real** — the student role and the
   self-described developer role (both verbatim); no intern/junior/
   employer entries.
6. **No nav change** — Stats precedent; 6 links stay.
7. **Dot language reused, not reinvented** — one `dotPulse`
   definition (from §8), same green "happening now" signal.

## Changes
- `src/types/content.ts` — + `ExperienceEntry` (role/period/work,
  each documented as "source-exact").
- `src/data/experience.ts` — (new) `experiencePeriod = 'Current'` +
  2 entries with the per-line evidence table in comments.
- `src/components/Experience.tsx` — (new) panel: CURRENT marker +
  dot, two numbered entries with PERIOD/WORK rows; decision log in
  file header.
- `src/App.tsx` — `<Experience />` between `<Skills />` and
  `<Projects />` (+ import).
- `src/styles/style.css` — new §10B EXPERIENCE block
  (`.experience__panel`, `__period` + `-dot`, `__entry` + `-head/
  -num/-role/-row/-label/-text`); media: @1024 panel padding, @768
  rows stack + tighter entries, @480 head gap + role size. No other
  rules touched; no dead selectors created.

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, nav, AOS mechanism.

## Verification (28/28 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 36.83 kB / JS 267.39 kB, 41
  files); lint 0 errors, 3 pre-existing warnings.
- `/tmp/experience-test.mjs` (28 checks): **section** (exists once,
  DOM-ordered between Skills and Projects, tag/title exact, no
  subtitle); **period** (single CURRENT marker + dot);
  **presentation** (one panel, zero timeline elements); **entries**
  (exactly two, verbatim roles, numbered); **periods** (exactly
  "1st year · CSE'30" / "Current"); **no invented dates** (no
  4-digit years / "since" / "– present" anywhere in the section),
  **no invented organization** (no university/institute/college/
  polytechnic/department), **no invented positions** (no
  intern/junior/senior/founder); **work** (all verbatim fragments
  present; every rendered string ⊆ data file); **nav untouched**
  (6 links, no #experience); **identity** (mono labels, solid
  bordered panel, dot = #22C55E + dotPulse, zero blur/shadow on
  experience rules); **alignment** (consistent 64px label grid,
  baseline heads); **responsive** (1024 padding — minifier groups
  the rule with `.projects__case`, resolved against the actual
  media block / 768 rows stack + tighter entries / 480 head + role
  adapt); **interaction** (AOS on panel); **full regression** (8
  anchor sections now, Projects case + case file + 5 rows, 2
  services trades, 9 skill tokens, 4/3 counts, hero/about/header,
  0 dead links, 0 `<img>`, loader/cursor/footer).
- Verification limit: no browser in sandbox — desktop/mobile
  alignment verified via jsdom structure + built-CSS inspection.

## Blocker
None.
