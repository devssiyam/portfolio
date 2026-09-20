# Phase 11 — Projects (COMPLETE)

## Task
Make Projects the strongest proof of actual work. Use available real
information (screenshot, name/context, goal/problem, role, tech,
challenge, solution, result, live, GitHub, case study). Real assets +
verified links only. Never invent missing details/results. Do not force
identical cards. No generic project descriptions. Let each project's
actual content determine hierarchy/presentation. Context-appropriate
interaction. Test images, links, runtime + responsive. Checkpoint + stop.

## Verification of reality (GitHub API, 2026-09-18)
Before designing, every possible "proof" was checked against reality:
- `devssiyam`'s public repos: **only two** — `portfolio` (this site's
  real, public source) and `devs.siyam` (the old portfolio site — repo
  tree contains **README.md only**, no project code).
- **No GitHub Pages** deployment on either repo (404), no other
  published URL found → **no live demo exists for any project**.
- **No screenshots anywhere**: zero image files in the repo; the only
  project visuals are the per-project inline SVG wireframes from the
  frozen baseline.
- Gists: not listable via the integration token (403) — no evidence,
  nothing linked.
- The old data pointed all 6 projects at the SAME repo
  (`devssiyam/devs.siyam`) and every "Live Demo" at `#` — AUDIT risks
  #3 + #8.

**Consequence:** the only verified public project artifact in existence
is the portfolio project's own source (`github.com/devssiyam/portfolio`).
Everything else that is "available real information" is: name, context
(category), what it is (existing description, verbatim), and stack
(tags). Goal/problem/role/challenge/solution/result/case-study
dimensions contain **no source content** — none invented.

## Design: "the work index" (verification-first)
Hierarchy is determined by the data, not by uniform cards:
- **Featured case (01) — Personal Portfolio Website**: the only project
  with a verified public source → its own bordered panel, with the real
  GitHub link (new tab, `noopener noreferrer`). This is the strongest
  available proof, so it sits first and is visually distinct.
- **Numbered index (02–06)**: the other five projects as rows in one
  bordered panel — mono `0N · Category` line, title, verbatim
  description, mono stack tokens, and the real per-project schematic
  wireframe as a small glyph marker (kept from baseline; NOT presented
  as a screenshot — none exist).
- **Factual footnote**: "The source for the other projects is not
  hosted as public repositories." — states the verified fact instead of
  hiding it behind 6 misleading buttons.
- Section header keeps the real existing labels verbatim ("My Work" /
  "Featured Projects" / "A selection of real-world projects I've built
  and designed").

## Explicit decisions (all documented, none silent)
1. **All 6 dead `demoUrl: '#'` removed** (deleted from the data model) —
   no deployment exists; a "Live Demo" button to `#` is a dead end.
2. **The shared placeholder `repoUrl` removed from all 6** —
   `devssiyam/devs.siyam` is real but contains only a profile README;
   linking projects to it implied the code lives there (it doesn't).
   AUDIT risk #8 resolved by verification, not guesswork.
3. **One real link rendered: the verified portfolio repo** on the
   portfolio project only (`repoUrl` became optional in the type — set
   only when real, public, and actually containing the work).
4. **No fake screenshots** — the real baseline wireframes are kept as
   glyph markers (labeled nothing, framed as schematic), per-project
   color preserved. No `generate`d images: a fabricated UI screenshot
   would be inventing work.
5. **Identical-card grid removed** — `ProjectCard.tsx` deleted; the
   card with fake-looking overlay/category chip/tilt is gone.
   `useCardTilt` itself stays (Services/Testimonials still use it).
6. **No invented results/metrics/case studies** — nothing like
   "+40% conversions" or "3 users" exists in the source; none added.
   Descriptions are the existing source copy, verbatim (not rewritten
   into new generic marketing text).
7. **Interaction matched to the presentation** — row hover (number →
   accent, glyph border brightens), scroll reveal (AOS on case + index),
   focus-visible on the GitHub button. 3D card tilt removed with the
   cards — it suited cards, not an index.
8. **AUDIT risks #3 + #8 (projects portion) are now fully resolved** —
   the page-wide link audit shows **0 dead `#` links left on the whole
   site** (CV was removed in Phase 09; Live Demos removed here).

## Changes
- `src/types/content.ts` — `Project`: −`demoUrl`, `repoUrl` → optional
  with verified-target doc, `placeholderSvg` documented as glyph.
- `src/data/projects.ts` — full verified-link pass; all content
  verbatim; portfolio entry carries the one verified `repoUrl`.
- `src/components/Projects.tsx` — rewritten as featured case + numbered
  index + factual footnote; decision log in file header.
- `src/components/ProjectCard.tsx` — deleted.
- `src/styles/style.css` — §11 rewritten in place (`.projects__case`,
  `.projects__tile`, `.projects__meta/-num/-title/-desc/-stack/-tag`,
  `.projects__index`, `.projects__row`, `.projects__note`); media:
  @1024 case padding, @768 case stacks (button drops below) + tighter
  index, @480 glyph/tags shrink (appended into the main 480 block).
  All 3 old `.projects__grid` media lines replaced. The Phase-06
  trailing block's `.project-card__category`/`__title` rules are now
  dead selectors — harmless, block intact (established convention).

## Verification
- `tsc --noEmit`: 0 errors. Build: CSS 34.23 kB / JS 265.19 kB (40
  files). Lint: 0 errors / 3 warnings (pre-existing).
- `/tmp/projects-test.mjs` (36 checks): **36/36 PASS, 0 console
  errors** — header labels verbatim; featured case (correct project,
  verbatim desc/stack, exact verified URL + `_blank` + `noopener
  noreferrer`, real glyph/color); index (5 rows, 02–06, all
  title/meta/desc verbatim, stacks verbatim, real per-row colors +
  glyphs); link honesty (exactly ONE link in the section = the verified
  repo, zero `#` links, no "Live Demo", shared repo not linked,
  factual footnote present, no invented results/metrics); structure
  (no card grid/project-card/tilt, all 6 projects exactly once, no
  `<img>` — none faked); identity (bordered solid panels, zero
  blur/shadow on projects rules, mono tokens/meta); **responsive** in
  built CSS (1024 padding / 768 case stacks + button below / 480
  glyph+tags shrink — resolved against the actual media block); full
  regression (5/3/4 cards, 6 nav, 9 skill tokens, hero/about/header,
  8 sections, loader/cursor/footer).
- **Page-wide image+link audit** (production bundle, jsdom): 0 `<img>`
  elements anywhere (the repo has no image files — consistent); 22
  links total, **0 dead `#`/empty**; externals = the verified portfolio
  repo (projects) + pre-existing footer socials (out of scope,
  unchanged).
- Verification limit: no browser in sandbox — desktop/mobile behavior
  verified via jsdom simulation + built-CSS inspection.

## Blocker
None.
