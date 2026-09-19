# Phase 12 — Case Study (COMPLETE)

## Task
Create case study ONLY where enough real project information exists.
Use available dimensions: Context → Problem → Role → Approach →
Technical Decisions → Challenges → Solution → Result → Tech → Links.
Never invent metrics, results or decisions. If information is
insufficient, do not create filler. Do not create one merely because
portfolios commonly have case studies. Keep concise + visual. Test
navigation/responsive. Checkpoint + stop.

## The gate — what the evidence allows
The Phase 11 verification (GitHub API + repo audit) defines the
evidence base. Per project:

| Project | Context | Problem | Role | Approach | Tech decisions | Challenges | Solution | Result | Tech | Links |
|---|---|---|---|---|---|---|---|---|---|---|
| **Personal Portfolio Website** | real | — | real | — | real (4) | — | — | — | real | **verified** |
| Modern Tech Store UI | real (name/category) | — | — | — | — | — | — | — | real (tags) | none |
| Shopify Product Page | real (name/category) | — | — | — | — | — | — | — | real (tags) | none |
| Responsive Landing Page | real (name/category) | — | — | — | — | — | — | — | real (tags) | none |
| Login & Signup UI | real (name/category) | — | — | — | — | — | — | — | real (tags) | none |
| Dashboard UI Design | real (name/category) | — | — | — | — | — | — | — | real (tags) | none |

"real" = exists in source with evidence; "—" = no source content,
**not invented**. The other five projects have name/context/tags only —
a case study for them would be filler, so **none created** (not even a
stub). The portfolio project has five real dimensions — enough for one
**concise case file** (not a padded ten-section study).

## What was built — one case file, three dimensions
Inside the Phase 11 featured case (01 — Personal Portfolio Website),
under a hairline divider, a compact labeled block:

```
// case file
CONTEXT            A single-page portfolio for a first-year CSE
                   student, presenting his frontend and Shopify work.
ROLE               Sole developer — the only author on the repository.
TECHNICAL
DECISIONS          — The original build uses no external JS libraries —
                     the typing effect, scroll reveal, and counters are
                     hand-rolled vanilla JS.
                   — One token-based stylesheet — `:root` custom
                     properties drive color, spacing, and typography.
                   — Inline SVG only — the repository contains zero
                     image files.
                   — Now rebuilt in React (Vite + TypeScript) — you are
                     reading the migrated build.
```

Tech (HTML · CSS · JS tokens) and Links (the verified GitHub button)
already live on the case's identity row from Phase 11 — not duplicated.
**Dimensions with no source content (Problem, Approach, Challenges,
Solution, Result) are simply absent — never padded with invented
narrative.**

### Per-line evidence (verification trail)
- Context: single page (one index); "first-year CSE student" is the
  site's own verbatim copy (Hero byline / About kicker); "frontend and
  Shopify work" is his verbatim role ("Frontend Developer & Shopify
  Store Designer").
- Role: `git log --all` → exactly 1 commit, 1 author
  (Siyam Uzzaman) — sole developer is a verifiable fact.
- Decision 1: AUDIT.md (frozen baseline): "No external JS libraries —
  everything (typing effect, scroll-reveal, counters) is hand-rolled
  vanilla JS"; source-confirmed: `index.html` has exactly one
  `<script src="script.js">`, no CDNs.
- Decision 2: AUDIT.md: "Token-based (`:root` custom properties for
  color/spacing/typography/radius/shadow/transition)"; still true in
  the React build (same token system).
- Decision 3: Phase 11 audit — zero image files in the repo, 0 `<img>`
  elements; all visuals inline SVG.
- Decision 4: `package.json` (React ^19.2.8, Vite ^8.3.0,
  TypeScript ~6.0.2); the served app is the migrated React build.

## Explicit decisions (all documented, none silent)
1. **Exactly one case file** — the gate is structural: the `caseStudy`
   field is optional on `Project` and only the portfolio entry has one;
   the component renders it only when present. A project without a
   verified artifact cannot have a case file by construction.
2. **No filler dimensions** — the case file contains only Context /
   Role / Technical decisions; the usual ten-section shape is not
   imitated. Absence is the honest statement.
3. **No metrics, no numbers, no "results"** — the case file contains
   zero numeric claims (tested: no `%`, no `\d+` patterns, no
   improvement verbs).
4. **Placed inside Projects (no new section, no nav change)** — the
   case study is the depth of the one project that has substance;
   Phase 07's 6-item nav and the site's section rhythm are untouched.
5. **Concise + visual** — 3 mono labels + 1 kicker + 4 dash items,
   two-column label grid (150px/1fr), hairline divider; stacks to one
   column at 768. Identity-consistent (mono chrome, solid panel, zero
   blur/shadow/glass).
6. **Verbatim data** — every rendered sentence exists in
   `src/data/projects.ts` (tested: DOM text ⊆ data file text).

## Changes
- `src/types/content.ts` — `Project`: + optional `caseStudy`
  (`context`, `role`, `technicalDecisions[]`) with "only when real"
  doc.
- `src/data/projects.ts` — portfolio entry gains the case file with
  per-line verification sources in comments; all other entries
  unchanged.
- `src/components/Projects.tsx` — renders the case file only when
  `featured.caseStudy` exists (kicker + 3 labeled dimensions +
  dash list); decision log extended in file header.
- `src/styles/style.css` — §11 extended (`.projects__casestudy`,
  `.projects__cs-kicker/-label/-body/-list`, dash `li::before`);
  @768: case file stacks to one column (labels above bodies). No other
  media rules touched.

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, nav, AOS mechanism.

## Verification (32/32 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 35.35 kB / JS 266.41 kB, 40
  files); lint 0 errors, 3 pre-existing warnings.
- `/tmp/casestudy-test.mjs` (32 checks): **gate** (exactly one case
  file, inside the portfolio case, zero on the five index projects);
  **structure** (exactly Context/Role/Technical decisions + kicker;
  no invented dimension labels); **content** (all text verbatim from
  data and ⊆ data file; 4 decisions verbatim; zero
  metrics/numbers/improvement-verbs); **navigation** (`#projects`
  anchor unique, case file reachable inside it, nav link unchanged,
  nav click clean, DOM order case → index → footnote); **links**
  (still exactly one section link = verified repo; zero dead `#`
  site-wide); **identity** (mono labels/kicker/dashes, zero
  blur/shadow, hairline divider); **responsive** (768 case-file stack
  + label spacing, Phase 11 768/480/1024 invariants intact — resolved
  against the actual media block); **full regression** (Phase 11
  case/index/footnote, 5/3/4/6/9 counts, hero/about/header, 0 `<img>`,
  sections/loader/cursor/footer).
- Verification limit: no browser in sandbox — desktop/mobile behavior
  verified via jsdom simulation + built-CSS inspection.

## Blocker
None.
